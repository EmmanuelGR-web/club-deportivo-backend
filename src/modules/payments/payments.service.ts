import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreatePaymentDto } from './dto/create-payment.dto.js';
import { UpdatePaymentDto } from './dto/update-payment.dto.js';

const datosRelacionados = {
  paymentMethod: true,
  member: { include: { user: true } },
};

@Injectable()
export class PaymentsService {
  constructor(private readonly prisma: PrismaService) {}

  async crear(datosPago: CreatePaymentDto) {
    await this.validarDatos(datosPago);
    await this.validarPeriodo(datosPago.memberId, datosPago.periodo);
    return this.prisma.payment.create({
      data: datosPago,
      include: datosRelacionados,
    });
  }

  obtenerTodos() {
    return this.prisma.payment.findMany({
      include: datosRelacionados,
      orderBy: { fecha: 'desc' },
    });
  }

  obtenerMediosPago() {
    return this.prisma.paymentMethod.findMany({ orderBy: { id: 'asc' } });
  }

  async obtenerUno(id: number) {
    const pago = await this.prisma.payment.findUnique({
      where: { id },
      include: datosRelacionados,
    });
    if (!pago) {
      throw new NotFoundException(`No existe el pago ${id}.`);
    }
    return pago;
  }

  async actualizar(id: number, datosPago: UpdatePaymentDto) {
    const pago = await this.obtenerUno(id);
    await this.validarDatos(datosPago);
    const memberId = datosPago.memberId ?? pago.memberId;
    const periodo = datosPago.periodo ?? pago.periodo;
    await this.validarPeriodo(memberId, periodo, id);
    return this.prisma.payment.update({
      where: { id },
      data: datosPago,
      include: datosRelacionados,
    });
  }

  async eliminar(id: number) {
    await this.obtenerUno(id);
    return this.prisma.payment.delete({ where: { id } });
  }

  private async validarDatos(datosPago: UpdatePaymentDto) {
    if (datosPago.memberId) {
      const socio = await this.prisma.member.findUnique({
        where: { id: datosPago.memberId },
      });
      if (!socio) {
        throw new BadRequestException(
          `No existe el socio ${datosPago.memberId}.`,
        );
      }
    }

    if (datosPago.paymentMethodId) {
      const medioPago = await this.prisma.paymentMethod.findUnique({
        where: { id: datosPago.paymentMethodId },
      });
      if (!medioPago) {
        throw new BadRequestException(
          `No existe el medio de pago ${datosPago.paymentMethodId}.`,
        );
      }
    }
  }

  private async validarPeriodo(
    memberId: number,
    periodo?: string | null,
    id?: number,
  ) {
    if (!periodo) {
      return;
    }
    const otroPago = await this.prisma.payment.findFirst({
      where: { memberId, periodo },
    });
    if (otroPago && otroPago.id !== id) {
      throw new ConflictException(
        `El socio ya tiene un pago del período ${periodo}.`,
      );
    }
  }
}
