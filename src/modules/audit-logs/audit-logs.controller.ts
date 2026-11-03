import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuditLogsService } from './audit-logs.service.js';
import { CreateAuditLogDto } from './dto/create-audit-log.dto.js';
import { UpdateAuditLogDto } from './dto/update-audit-log.dto.js';

@Controller('registro-cambios')
export class AuditLogsController {
  constructor(private readonly registroCambiosService: AuditLogsService) {}

  @Post()
  crear(@Body() datosRegistro: CreateAuditLogDto) {
    return this.registroCambiosService.crear(datosRegistro);
  }

  @Get()
  obtenerTodos() {
    return this.registroCambiosService.obtenerTodos();
  }

  @Get(':id')
  obtenerUno(@Param('id') id: string) {
    return this.registroCambiosService.obtenerUno(Number(id));
  }

  @Patch(':id')
  actualizar(
    @Param('id') id: string,
    @Body() datosRegistro: UpdateAuditLogDto,
  ) {
    return this.registroCambiosService.actualizar(Number(id), datosRegistro);
  }

  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.registroCambiosService.eliminar(Number(id));
  }
}
