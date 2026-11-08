import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../config/prisma.service.js';
import { CreateMemberDto } from './dto/create-member.dto.js';
import { UpdateMemberDto } from './dto/update-member.dto.js';

const datosRelacionados = { user: true, paymentMethod: true };

@Injectable()
export class MembersService {
  constructor(private readonly prisma: PrismaService) {}

  crear(datosSocio: CreateMemberDto) {
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

  actualizar(id: number, datosSocio: UpdateMemberDto) {
    return this.prisma.member.update({
      where: { id },
      data: datosSocio,
      include: datosRelacionados,
    });
  }

  eliminar(id: number) {
    return this.prisma.member.delete({ where: { id } });
  }
}
