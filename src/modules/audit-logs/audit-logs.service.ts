import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateAuditLogDto } from './dto/create-audit-log.dto.js';
import { UpdateAuditLogDto } from './dto/update-audit-log.dto.js';

const datosRelacionados = { user: true };

@Injectable()
export class AuditLogsService {
  constructor(private readonly prisma: PrismaService) {}

  async crear(datosRegistro: CreateAuditLogDto) {
    await this.validarDatos(datosRegistro);
    return this.prisma.auditLog.create({
      data: datosRegistro,
      include: datosRelacionados,
    });
  }

  obtenerTodos() {
    return this.prisma.auditLog.findMany({
      include: datosRelacionados,
      orderBy: { fecha: 'desc' },
    });
  }

  async obtenerUno(id: number) {
    const registro = await this.prisma.auditLog.findUnique({
      where: { id },
      include: datosRelacionados,
    });
    if (!registro) {
      throw new NotFoundException(`No existe el registro ${id}.`);
    }
    return registro;
  }

  async actualizar(id: number, datosRegistro: UpdateAuditLogDto) {
    await this.obtenerUno(id);
    await this.validarDatos(datosRegistro);
    return this.prisma.auditLog.update({
      where: { id },
      data: datosRegistro,
      include: datosRelacionados,
    });
  }

  async eliminar(id: number) {
    await this.obtenerUno(id);
    return this.prisma.auditLog.delete({ where: { id } });
  }

  private async validarDatos(datosRegistro: UpdateAuditLogDto) {
    if (datosRegistro.userId) {
      const usuario = await this.prisma.user.findUnique({
        where: { id: datosRegistro.userId },
      });
      if (!usuario) {
        throw new BadRequestException(
          `No existe el usuario ${datosRegistro.userId}.`,
        );
      }
    }
  }
}
