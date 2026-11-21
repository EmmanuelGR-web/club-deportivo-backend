import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateMessageDto } from './dto/create-message.dto.js';
import { UpdateMessageDto } from './dto/update-message.dto.js';

const datosRelacionados = { remitente: true, destinatario: true };

@Injectable()
export class MessagesService {
  constructor(private readonly prisma: PrismaService) {}

  async crear(datosMensaje: CreateMessageDto) {
    await this.validarDatos(datosMensaje);
    return this.prisma.message.create({
      data: datosMensaje,
      include: datosRelacionados,
    });
  }

  obtenerTodos() {
    return this.prisma.message.findMany({
      include: datosRelacionados,
      orderBy: { fecha: 'desc' },
    });
  }

  async obtenerUno(id: number) {
    const mensaje = await this.prisma.message.findUnique({
      where: { id },
      include: datosRelacionados,
    });
    if (!mensaje) {
      throw new NotFoundException(`No existe el mensaje ${id}.`);
    }
    return mensaje;
  }

  async actualizar(id: number, datosMensaje: UpdateMessageDto) {
    await this.obtenerUno(id);
    await this.validarDatos(datosMensaje);
    return this.prisma.message.update({
      where: { id },
      data: datosMensaje,
      include: datosRelacionados,
    });
  }

  async eliminar(id: number) {
    await this.obtenerUno(id);
    return this.prisma.message.delete({ where: { id } });
  }

  private async validarDatos(datosMensaje: UpdateMessageDto) {
    if (datosMensaje.remitenteId) {
      const remitente = await this.prisma.user.findUnique({
        where: { id: datosMensaje.remitenteId },
      });
      if (!remitente) {
        throw new BadRequestException(
          `No existe el usuario remitente ${datosMensaje.remitenteId}.`,
        );
      }
    }

    if (datosMensaje.destinatarioId) {
      const destinatario = await this.prisma.user.findUnique({
        where: { id: datosMensaje.destinatarioId },
      });
      if (!destinatario) {
        throw new BadRequestException(
          `No existe el usuario destinatario ${datosMensaje.destinatarioId}.`,
        );
      }
    }
  }
}
