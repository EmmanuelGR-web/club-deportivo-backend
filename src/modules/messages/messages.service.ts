import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto.js';
import { UpdateMessageDto } from './dto/update-message.dto.js';

@Injectable()
export class MessagesService {
  crear(datosMensaje: CreateMessageDto) {
    return 'Se creó un nuevo mensaje';
  }

  obtenerTodos() {
    return 'Lista de todos los mensajes';
  }

  obtenerUno(id: number) {
    return `Datos del mensaje ${id}`;
  }

  actualizar(id: number, datosMensaje: UpdateMessageDto) {
    return `Se actualizó el mensaje ${id}`;
  }

  eliminar(id: number) {
    return `Se eliminó el mensaje ${id}`;
  }
}
