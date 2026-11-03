import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EventsService } from './events.service.js';
import { CreateEventDto } from './dto/create-event.dto.js';
import { UpdateEventDto } from './dto/update-event.dto.js';

@Controller('eventos')
export class EventsController {
  constructor(private readonly eventosService: EventsService) {}

  @Post()
  crear(@Body() datosEvento: CreateEventDto) {
    return this.eventosService.crear(datosEvento);
  }

  @Get()
  obtenerTodos() {
    return this.eventosService.obtenerTodos();
  }

  @Get(':id')
  obtenerUno(@Param('id') id: string) {
    return this.eventosService.obtenerUno(Number(id));
  }

  @Patch(':id')
  actualizar(@Param('id') id: string, @Body() datosEvento: UpdateEventDto) {
    return this.eventosService.actualizar(Number(id), datosEvento);
  }

  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.eventosService.eliminar(Number(id));
  }
}
