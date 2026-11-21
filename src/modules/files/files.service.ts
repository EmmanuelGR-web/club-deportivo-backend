import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateFileDto } from './dto/create-file.dto.js';
import { UpdateFileDto } from './dto/update-file.dto.js';

@Injectable()
export class FilesService {
  constructor(private readonly prisma: PrismaService) {}

  async crear(datosArchivo: CreateFileDto) {
    await this.validarDatos(datosArchivo);
    return this.prisma.file.create({ data: datosArchivo });
  }

  obtenerTodos() {
    return this.prisma.file.findMany({ orderBy: { fecha: 'desc' } });
  }

  async obtenerUno(id: number) {
    const archivo = await this.prisma.file.findUnique({ where: { id } });
    if (!archivo) {
      throw new NotFoundException(`No existe el archivo ${id}.`);
    }
    return archivo;
  }

  async actualizar(id: number, datosArchivo: UpdateFileDto) {
    await this.obtenerUno(id);
    await this.validarDatos(datosArchivo);
    return this.prisma.file.update({ where: { id }, data: datosArchivo });
  }

  async eliminar(id: number) {
    await this.obtenerUno(id);
    return this.prisma.file.delete({ where: { id } });
  }

  private async validarDatos(datosArchivo: UpdateFileDto) {
    if (datosArchivo.userId) {
      const usuario = await this.prisma.user.findUnique({
        where: { id: datosArchivo.userId },
      });
      if (!usuario) {
        throw new BadRequestException(
          `No existe el usuario ${datosArchivo.userId}.`,
        );
      }
    }
  }
}
