import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import type { ArchivoSubido } from './ai.controller.js';

const modelo = 'gemini-2.5-flash';
const tiposAceptados = ['image/jpeg', 'image/png', 'application/pdf'];

@Injectable()
export class AiService {
  constructor(private readonly prisma: PrismaService) {}

  async verificarComprobante(id: number, archivo: ArchivoSubido) {
    if (!tiposAceptados.includes(archivo.mimetype)) {
      throw new BadRequestException(
        'El archivo debe ser una imagen JPG, PNG o un PDF.',
      );
    }

    const pago = await this.prisma.payment.findUnique({ where: { id } });
    if (!pago) {
      throw new NotFoundException(`No existe el pago ${id}.`);
    }

    const clave = process.env.GEMINI_API_KEY;
    if (!clave) {
      throw new ServiceUnavailableException(
        'Falta configurar GEMINI_API_KEY en el entorno.',
      );
    }

    let respuesta: Response;
    try {
      respuesta = await fetch(
        'https://generativelanguage.googleapis.com/v1beta/models/' +
          `${modelo}:generateContent`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': clave,
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text:
                      'Analizá el archivo y extraé datos visibles de un comprobante de pago. ' +
                      'No confirmes si el pago es válido. Si un dato no se ve con claridad, devolvé null. ' +
                      'Respondé únicamente JSON con estas propiedades: ' +
                      'esComprobante (boolean), monto (number o null), fecha (string o null), ' +
                      'referencia (string o null), medioPago (string o null), observaciones (string).',
                  },
                  {
                    inline_data: {
                      mime_type: archivo.mimetype,
                      data: archivo.buffer.toString('base64'),
                    },
                  },
                ],
              },
            ],
            generationConfig: { responseMimeType: 'application/json' },
          }),
        },
      );
    } catch {
      throw new ServiceUnavailableException(
        'No se pudo conectar con el servicio de Gemini.',
      );
    }

    if (!respuesta.ok) {
      throw new BadGatewayException(
        'Gemini no pudo analizar el comprobante. Intentá nuevamente más tarde.',
      );
    }

    const datosRespuesta = (await respuesta.json()) as {
      candidates?: { content?: { parts?: { text?: string }[] } }[];
    };
    const texto = datosRespuesta.candidates?.[0]?.content?.parts
      ?.map((parte) => parte.text)
      .find((parte) => parte);

    if (!texto) {
      throw new BadGatewayException('Gemini devolvió una respuesta vacía.');
    }

    let resultado: unknown;
    try {
      resultado = JSON.parse(texto);
    } catch {
      throw new BadGatewayException(
        'Gemini devolvió una respuesta que no se pudo interpretar.',
      );
    }

    if (!this.esResultadoValido(resultado)) {
      throw new BadGatewayException(
        'Gemini devolvió datos con un formato inesperado.',
      );
    }

    const verificacionIA = {
      modelo,
      analizadoEl: new Date().toISOString(),
      resultado,
      coincideMonto:
        resultado.monto === null
          ? null
          : resultado.monto === Number(pago.monto),
      requiereRevisionManual: true,
    };

    return this.prisma.payment.update({
      where: { id },
      data: { verificacionIA },
      select: { id: true, estado: true, verificacionIA: true },
    });
  }

  private esResultadoValido(resultado: unknown): resultado is {
    esComprobante: boolean;
    monto: number | null;
    fecha: string | null;
    referencia: string | null;
    medioPago: string | null;
    observaciones: string;
  } {
    if (typeof resultado !== 'object' || resultado === null) {
      return false;
    }

    const datos = resultado as Record<string, unknown>;
    return (
      typeof datos.esComprobante === 'boolean' &&
      (typeof datos.monto === 'number' || datos.monto === null) &&
      (typeof datos.fecha === 'string' || datos.fecha === null) &&
      (typeof datos.referencia === 'string' || datos.referencia === null) &&
      (typeof datos.medioPago === 'string' || datos.medioPago === null) &&
      typeof datos.observaciones === 'string'
    );
  }
}
