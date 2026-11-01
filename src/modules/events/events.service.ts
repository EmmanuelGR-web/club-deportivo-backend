import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto.js';
import { UpdateEventDto } from './dto/update-event.dto.js';

@Injectable()
export class EventsService {
  crear(datosEvento: CreateEventDto) {
    return 'Se creó un nuevo evento';
  }

  obtenerTodos() {
    return 'Lista de todos los eventos';
  }

  obtenerUno(id: number) {
    return `Datos del evento ${id}`;
  }

  actualizar(id: number, datosEvento: UpdateEventDto) {
    return `Se actualizó el evento ${id}`;
  }

  eliminar(id: number) {
    return `Se eliminó el evento ${id}`;
  }
}
