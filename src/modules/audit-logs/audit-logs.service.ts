import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../config/prisma.service.js';
import { CreateAuditLogDto } from './dto/create-audit-log.dto.js';
import { UpdateAuditLogDto } from './dto/update-audit-log.dto.js';

const datosRelacionados = { user: true };

@Injectable()
export class AuditLogsService {
  constructor(private readonly prisma: PrismaService) {}

  crear(datosRegistro: CreateAuditLogDto) {
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

  actualizar(id: number, datosRegistro: UpdateAuditLogDto) {
    return this.prisma.auditLog.update({
      where: { id },
      data: datosRegistro,
      include: datosRelacionados,
    });
  }

  eliminar(id: number) {
    return this.prisma.auditLog.delete({ where: { id } });
  }
}
