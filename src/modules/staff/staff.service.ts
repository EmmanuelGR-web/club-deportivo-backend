import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateStaffDto } from './dto/create-staff.dto.js';
import { UpdateStaffDto } from './dto/update-staff.dto.js';

const datosRelacionados = { user: true };

@Injectable()
export class StaffService {
  constructor(private readonly prisma: PrismaService) {}

  async crear(datosEmpleado: CreateStaffDto) {
    await this.validarDatos(datosEmpleado);
    return this.prisma.staff.create({
      data: datosEmpleado,
      include: datosRelacionados,
    });
  }

  obtenerTodos() {
    return this.prisma.staff.findMany({
      include: datosRelacionados,
      orderBy: { id: 'asc' },
    });
  }

  async obtenerUno(id: number) {
    const empleado = await this.prisma.staff.findUnique({
      where: { id },
      include: datosRelacionados,
    });
    if (!empleado) {
      throw new NotFoundException(`No existe el empleado ${id}.`);
    }
    return empleado;
  }

  async actualizar(id: number, datosEmpleado: UpdateStaffDto) {
    await this.obtenerUno(id);
    await this.validarDatos(datosEmpleado, id);
    return this.prisma.staff.update({
      where: { id },
      data: datosEmpleado,
      include: datosRelacionados,
    });
  }

  async eliminar(id: number) {
    await this.obtenerUno(id);
    return this.prisma.staff.delete({ where: { id } });
  }

  private async validarDatos(datosEmpleado: UpdateStaffDto, id?: number) {
    if (datosEmpleado.userId) {
      const usuario = await this.prisma.user.findUnique({
        where: { id: datosEmpleado.userId },
      });
      if (!usuario) {
        throw new BadRequestException(
          `No existe el usuario ${datosEmpleado.userId}.`,
        );
      }
      const fichaDelUsuario = await this.prisma.staff.findUnique({
        where: { userId: datosEmpleado.userId },
      });
      if (fichaDelUsuario && fichaDelUsuario.id !== id) {
        throw new ConflictException(
          `El usuario ${datosEmpleado.userId} ya tiene una ficha de personal.`,
        );
      }
    }
  }
}
