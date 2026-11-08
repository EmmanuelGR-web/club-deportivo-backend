import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../config/prisma.service.js';
import { CreateStaffDto } from './dto/create-staff.dto.js';
import { UpdateStaffDto } from './dto/update-staff.dto.js';

const datosRelacionados = { user: true };

@Injectable()
export class StaffService {
  constructor(private readonly prisma: PrismaService) {}

  crear(datosEmpleado: CreateStaffDto) {
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

  actualizar(id: number, datosEmpleado: UpdateStaffDto) {
    return this.prisma.staff.update({
      where: { id },
      data: datosEmpleado,
      include: datosRelacionados,
    });
  }

  eliminar(id: number) {
    return this.prisma.staff.delete({ where: { id } });
  }
}
