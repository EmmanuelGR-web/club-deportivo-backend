import { Injectable, NotFoundException } from '@nestjs/common';
import bcrypt from 'bcryptjs';
import { PrismaService } from '../../config/prisma.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async crear(datosUsuario: CreateUserDto) {
    const contrasenaCifrada = await bcrypt.hash(datosUsuario.contrasena, 10);
    return this.prisma.user.create({
      data: { ...datosUsuario, contrasena: contrasenaCifrada },
    });
  }

  obtenerTodos() {
    return this.prisma.user.findMany({ orderBy: { id: 'asc' } });
  }

  async obtenerUno(id: number) {
    const usuario = await this.prisma.user.findUnique({ where: { id } });
    if (!usuario) {
      throw new NotFoundException(`No existe el usuario ${id}.`);
    }
    return usuario;
  }

  async actualizar(id: number, datosUsuario: UpdateUserDto) {
    if (datosUsuario.contrasena) {
      datosUsuario.contrasena = await bcrypt.hash(datosUsuario.contrasena, 10);
    }
    return this.prisma.user.update({ where: { id }, data: datosUsuario });
  }

  eliminar(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
