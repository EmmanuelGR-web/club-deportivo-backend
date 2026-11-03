import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NewsService } from './news.service.js';
import { CreateNewsDto } from './dto/create-news.dto.js';
import { UpdateNewsDto } from './dto/update-news.dto.js';

@Controller('noticias')
export class NewsController {
  constructor(private readonly noticiasService: NewsService) {}

  @Post()
  crear(@Body() datosNoticia: CreateNewsDto) {
    return this.noticiasService.crear(datosNoticia);
  }

  @Get()
  obtenerTodos() {
    return this.noticiasService.obtenerTodos();
  }

  @Get(':id')
  obtenerUno(@Param('id') id: string) {
    return this.noticiasService.obtenerUno(Number(id));
  }

  @Patch(':id')
  actualizar(@Param('id') id: string, @Body() datosNoticia: UpdateNewsDto) {
    return this.noticiasService.actualizar(Number(id), datosNoticia);
  }

  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.noticiasService.eliminar(Number(id));
  }
}
