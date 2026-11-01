import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

@Injectable()
export class UsersService {
  crear(datosUsuario: CreateUserDto) {
    return 'Se creó un nuevo usuario';
  }

  obtenerTodos() {
    return 'Lista de todos los usuarios';
  }

  obtenerUno(id: number) {
    return `Datos del usuario ${id}`;
  }

  actualizar(id: number, datosUsuario: UpdateUserDto) {
    return `Se actualizó el usuario ${id}`;
  }

  eliminar(id: number) {
    return `Se eliminó el usuario ${id}`;
  }
}
