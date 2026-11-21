import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateMemberDto } from './dto/create-member.dto.js';
import { UpdateMemberDto } from './dto/update-member.dto.js';

const datosRelacionados = {
  user: true,
  paymentMethod: true,
  payments: { orderBy: { periodo: 'asc' as const } },
};

@Injectable()
export class MembersService {
  constructor(private readonly prisma: PrismaService) {}

  async crear(datosSocio: CreateMemberDto) {
    await this.validarDatos(datosSocio);
    return this.prisma.member.create({
      data: datosSocio,
      include: datosRelacionados,
    });
  }

  obtenerTodos() {
    return this.prisma.member.findMany({
      include: datosRelacionados,
      orderBy: { numeroSocio: 'asc' },
    });
  }

  async obtenerUno(id: number) {
    const socio = await this.prisma.member.findUnique({
      where: { id },
      include: datosRelacionados,
    });
    if (!socio) {
      throw new NotFoundException(`No existe el socio ${id}.`);
    }
    return socio;
  }

  async actualizar(id: number, datosSocio: UpdateMemberDto) {
    await this.obtenerUno(id);
    await this.validarDatos(datosSocio, id);
    return this.prisma.member.update({
      where: { id },
      data: datosSocio,
      include: datosRelacionados,
    });
  }

  async eliminar(id: number) {
    await this.obtenerUno(id);
    return this.prisma.member.delete({ where: { id } });
  }

  private async validarDatos(datosSocio: UpdateMemberDto, id?: number) {
    if (datosSocio.dni) {
      const otroSocio = await this.prisma.member.findUnique({
        where: { dni: datosSocio.dni },
      });
      if (otroSocio && otroSocio.id !== id) {
        throw new ConflictException(
          `Ya existe un socio con el DNI ${datosSocio.dni}.`,
        );
      }
    }

    if (datosSocio.numeroSocio) {
      const otroSocio = await this.prisma.member.findUnique({
        where: { numeroSocio: datosSocio.numeroSocio },
      });
      if (otroSocio && otroSocio.id !== id) {
        throw new ConflictException(
          `Ya existe un socio con el número ${datosSocio.numeroSocio}.`,
        );
      }
    }

    if (datosSocio.userId) {
      const usuario = await this.prisma.user.findUnique({
        where: { id: datosSocio.userId },
      });
      if (!usuario) {
        throw new BadRequestException(
          `No existe el usuario ${datosSocio.userId}.`,
        );
      }
      const fichaDelUsuario = await this.prisma.member.findUnique({
        where: { userId: datosSocio.userId },
      });
      if (fichaDelUsuario && fichaDelUsuario.id !== id) {
        throw new ConflictException(
          `El usuario ${datosSocio.userId} ya tiene una ficha de socio.`,
        );
      }
    }

    if (datosSocio.paymentMethodId) {
      const medioPago = await this.prisma.paymentMethod.findUnique({
        where: { id: datosSocio.paymentMethodId },
      });
      if (!medioPago) {
        throw new BadRequestException(
          `No existe el medio de pago ${datosSocio.paymentMethodId}.`,
        );
      }
    }
  }
}
