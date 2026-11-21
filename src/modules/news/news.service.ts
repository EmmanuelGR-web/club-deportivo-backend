import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateNewsDto } from './dto/create-news.dto.js';
import { UpdateNewsDto } from './dto/update-news.dto.js';

const datosRelacionados = { newsCategory: true, user: true };

@Injectable()
export class NewsService {
  constructor(private readonly prisma: PrismaService) {}

  async crear(datosNoticia: CreateNewsDto) {
    await this.validarDatos(datosNoticia);
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

  async actualizar(id: number, datosNoticia: UpdateNewsDto) {
    await this.obtenerUno(id);
    await this.validarDatos(datosNoticia);
    return this.prisma.news.update({
      where: { id },
      data: datosNoticia,
      include: datosRelacionados,
    });
  }

  async eliminar(id: number) {
    await this.obtenerUno(id);
    return this.prisma.news.delete({ where: { id } });
  }

  private async validarDatos(datosNoticia: UpdateNewsDto) {
    if (datosNoticia.userId) {
      const autor = await this.prisma.user.findUnique({
        where: { id: datosNoticia.userId },
      });
      if (!autor) {
        throw new BadRequestException(
          `No existe el usuario ${datosNoticia.userId}.`,
        );
      }
    }

    if (datosNoticia.newsCategoryId) {
      const categoria = await this.prisma.newsCategory.findUnique({
        where: { id: datosNoticia.newsCategoryId },
      });
      if (!categoria) {
        throw new BadRequestException(
          `No existe la categoría ${datosNoticia.newsCategoryId}.`,
        );
      }
    }
  }
}
