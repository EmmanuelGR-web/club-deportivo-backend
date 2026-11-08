import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../config/prisma.service.js';
import { CreateNewsDto } from './dto/create-news.dto.js';
import { UpdateNewsDto } from './dto/update-news.dto.js';

const datosRelacionados = { newsCategory: true, user: true };

@Injectable()
export class NewsService {
  constructor(private readonly prisma: PrismaService) {}

  crear(datosNoticia: CreateNewsDto) {
    return this.prisma.news.create({
      data: datosNoticia,
      include: datosRelacionados,
    });
  }

  obtenerTodos() {
    return this.prisma.news.findMany({
      include: datosRelacionados,
      orderBy: { fecha: 'desc' },
    });
  }

  obtenerCategorias() {
    return this.prisma.newsCategory.findMany({ orderBy: { id: 'asc' } });
  }

  async obtenerUno(id: number) {
    const noticia = await this.prisma.news.findUnique({
      where: { id },
      include: datosRelacionados,
    });
    if (!noticia) {
      throw new NotFoundException(`No existe la noticia ${id}.`);
    }
    return noticia;
  }

  actualizar(id: number, datosNoticia: UpdateNewsDto) {
    return this.prisma.news.update({
      where: { id },
      data: datosNoticia,
      include: datosRelacionados,
    });
  }

  eliminar(id: number) {
    return this.prisma.news.delete({ where: { id } });
  }
}
