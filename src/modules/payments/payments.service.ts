import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../config/prisma.service.js';
import { CreatePaymentDto } from './dto/create-payment.dto.js';
import { UpdatePaymentDto } from './dto/update-payment.dto.js';

const datosRelacionados = {
  paymentMethod: true,
  member: { include: { user: true } },
};

@Injectable()
export class PaymentsService {
  constructor(private readonly prisma: PrismaService) {}

  crear(datosPago: CreatePaymentDto) {
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

  actualizar(id: number, datosPago: UpdatePaymentDto) {
    return this.prisma.payment.update({
      where: { id },
      data: datosPago,
      include: datosRelacionados,
    });
  }

  eliminar(id: number) {
    return this.prisma.payment.delete({ where: { id } });
  }
}
