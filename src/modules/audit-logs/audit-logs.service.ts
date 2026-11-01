import { Injectable } from '@nestjs/common';
import { CreateAuditLogDto } from './dto/create-audit-log.dto.js';
import { UpdateAuditLogDto } from './dto/update-audit-log.dto.js';

@Injectable()
export class AuditLogsService {
  crear(datosRegistro: CreateAuditLogDto) {
    return 'Se creó un nuevo registro';
  }

  obtenerTodos() {
    return 'Lista de todos los registros';
  }

  obtenerUno(id: number) {
    return `Datos del registro ${id}`;
  }

  actualizar(id: number, datosRegistro: UpdateAuditLogDto) {
    return `Se actualizó el registro ${id}`;
  }

  eliminar(id: number) {
    return `Se eliminó el registro ${id}`;
  }
}
