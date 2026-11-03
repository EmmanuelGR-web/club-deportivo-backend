import { Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto.js';
import { UpdateFileDto } from './dto/update-file.dto.js';

@Injectable()
export class FilesService {
  crear(datosArchivo: CreateFileDto) {
    return 'Se creó un nuevo archivo';
  }

  obtenerTodos() {
    return 'Lista de todos los archivos';
  }

  obtenerUno(id: number) {
    return `Datos del archivo ${id}`;
  }

  actualizar(id: number, datosArchivo: UpdateFileDto) {
    return `Se actualizó el archivo ${id}`;
  }

  eliminar(id: number) {
    return `Se eliminó el archivo ${id}`;
  }
}
