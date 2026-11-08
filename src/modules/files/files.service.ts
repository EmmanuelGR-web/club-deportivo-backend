import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../config/prisma.service.js';
import { CreateFileDto } from './dto/create-file.dto.js';
import { UpdateFileDto } from './dto/update-file.dto.js';

@Injectable()
export class FilesService {
  constructor(private readonly prisma: PrismaService) {}

  crear(datosArchivo: CreateFileDto) {
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

  actualizar(id: number, datosArchivo: UpdateFileDto) {
    return this.prisma.file.update({ where: { id }, data: datosArchivo });
  }

  eliminar(id: number) {
    return this.prisma.file.delete({ where: { id } });
  }
}
