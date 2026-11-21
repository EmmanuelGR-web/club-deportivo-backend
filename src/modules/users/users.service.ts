import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

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
    await this.obtenerUno(id);

    if (datosUsuario.email) {
      const otroUsuario = await this.prisma.user.findUnique({
        where: { email: datosUsuario.email },
      });
      if (otroUsuario && otroUsuario.id !== id) {
        throw new ConflictException(
          `Ya existe un usuario con el email ${datosUsuario.email}.`,
        );
      }
    }

    if (datosUsuario.contrasena) {
      datosUsuario.contrasena = await bcrypt.hash(datosUsuario.contrasena, 10);
    }

    return this.prisma.user.update({ where: { id }, data: datosUsuario });
  }

  async eliminar(id: number) {
    await this.obtenerUno(id);

    const socio = await this.prisma.member.findUnique({
      where: { userId: id },
    });
    if (socio) {
      throw new BadRequestException(
        'No se puede borrar el usuario porque tiene una ficha de socio. Borrá primero el socio.',
      );
    }

    const empleado = await this.prisma.staff.findUnique({
      where: { userId: id },
    });
    if (empleado) {
      throw new BadRequestException(
        'No se puede borrar el usuario porque tiene una ficha de personal. Borrá primero el empleado.',
      );
    }

    const noticia = await this.prisma.news.findFirst({
      where: { userId: id },
    });
    if (noticia) {
      throw new BadRequestException(
        'No se puede borrar el usuario porque publicó noticias.',
      );
    }

    return this.prisma.user.delete({ where: { id } });
  }
}
