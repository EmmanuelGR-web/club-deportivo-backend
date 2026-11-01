import { Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto.js';
import { UpdateMemberDto } from './dto/update-member.dto.js';

@Injectable()
export class MembersService {
  crear(datosSocio: CreateMemberDto) {
    return 'Se creó un nuevo socio';
  }

  obtenerTodos() {
    return 'Lista de todos los socios';
  }

  obtenerUno(id: number) {
    return `Datos del socio ${id}`;
  }

  actualizar(id: number, datosSocio: UpdateMemberDto) {
    return `Se actualizó el socio ${id}`;
  }

  eliminar(id: number) {
    return `Se eliminó el socio ${id}`;
  }
}
