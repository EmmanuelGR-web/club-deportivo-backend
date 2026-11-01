import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MembersService } from './members.service.js';
import { CreateMemberDto } from './dto/create-member.dto.js';
import { UpdateMemberDto } from './dto/update-member.dto.js';

@Controller('socios')
export class MembersController {
  constructor(private readonly sociosService: MembersService) {}

  @Post()
  crear(@Body() datosSocio: CreateMemberDto) {
    return this.sociosService.crear(datosSocio);
  }

  @Get()
  obtenerTodos() {
    return this.sociosService.obtenerTodos();
  }

  @Get(':id')
  obtenerUno(@Param('id') id: string) {
    return this.sociosService.obtenerUno(Number(id));
  }

  @Patch(':id')
  actualizar(@Param('id') id: string, @Body() datosSocio: UpdateMemberDto) {
    return this.sociosService.actualizar(Number(id), datosSocio);
  }

  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.sociosService.eliminar(Number(id));
  }
}
