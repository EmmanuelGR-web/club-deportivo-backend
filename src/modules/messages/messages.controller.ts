import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MessagesService } from './messages.service.js';
import { CreateMessageDto } from './dto/create-message.dto.js';
import { UpdateMessageDto } from './dto/update-message.dto.js';

@Controller('mensajes')
export class MessagesController {
  constructor(private readonly mensajesService: MessagesService) {}

  @Post()
  crear(@Body() datosMensaje: CreateMessageDto) {
    return this.mensajesService.crear(datosMensaje);
  }

  @Get()
  obtenerTodos() {
    return this.mensajesService.obtenerTodos();
  }

  @Get(':id')
  obtenerUno(@Param('id') id: string) {
    return this.mensajesService.obtenerUno(Number(id));
  }

  @Patch(':id')
  actualizar(@Param('id') id: string, @Body() datosMensaje: UpdateMessageDto) {
    return this.mensajesService.actualizar(Number(id), datosMensaje);
  }

  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.mensajesService.eliminar(Number(id));
  }
}
