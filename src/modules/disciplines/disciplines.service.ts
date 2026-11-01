import { Injectable } from '@nestjs/common';
import { CreateDisciplineDto } from './dto/create-discipline.dto.js';
import { UpdateDisciplineDto } from './dto/update-discipline.dto.js';

@Injectable()
export class DisciplinesService {
  crear(datosDisciplina: CreateDisciplineDto) {
    return 'Se creó una nueva disciplina';
  }

  obtenerTodos() {
    return 'Lista de todas las disciplinas';
  }

  obtenerUno(id: number) {
    return `Datos de la disciplina ${id}`;
  }

  actualizar(id: number, datosDisciplina: UpdateDisciplineDto) {
    return `Se actualizó la disciplina ${id}`;
  }

  eliminar(id: number) {
    return `Se eliminó la disciplina ${id}`;
  }
}
