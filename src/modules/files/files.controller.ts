import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FilesService } from './files.service.js';
import { CreateFileDto } from './dto/create-file.dto.js';
import { UpdateFileDto } from './dto/update-file.dto.js';

@Controller('archivos')
export class FilesController {
  constructor(private readonly archivosService: FilesService) {}

  @Post()
  crear(@Body() datosArchivo: CreateFileDto) {
    return this.archivosService.crear(datosArchivo);
  }

  @Get()
  obtenerTodos() {
    return this.archivosService.obtenerTodos();
  }

  @Get(':id')
  obtenerUno(@Param('id') id: string) {
    return this.archivosService.obtenerUno(Number(id));
  }

  @Patch(':id')
  actualizar(@Param('id') id: string, @Body() datosArchivo: UpdateFileDto) {
    return this.archivosService.actualizar(Number(id), datosArchivo);
  }

  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.archivosService.eliminar(Number(id));
  }
}
