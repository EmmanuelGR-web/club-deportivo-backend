import { Injectable } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto.js';
import { UpdateNewsDto } from './dto/update-news.dto.js';

@Injectable()
export class NewsService {
  crear(datosNoticia: CreateNewsDto) {
    return 'Se creó una nueva noticia';
  }

  obtenerTodos() {
    return 'Lista de todas las noticias';
  }

  obtenerUno(id: number) {
    return `Datos de la noticia ${id}`;
  }

  actualizar(id: number, datosNoticia: UpdateNewsDto) {
    return `Se actualizó la noticia ${id}`;
  }

  eliminar(id: number) {
    return `Se eliminó la noticia ${id}`;
  }
}
