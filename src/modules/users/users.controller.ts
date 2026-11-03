import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

@Controller('usuarios')
export class UsersController {
  constructor(private readonly usuariosService: UsersService) {}

  @Post()
  crear(@Body() datosUsuario: CreateUserDto) {
    return this.usuariosService.crear(datosUsuario);
  }

  @Get()
  obtenerTodos() {
    return this.usuariosService.obtenerTodos();
  }

  @Get(':id')
  obtenerUno(@Param('id') id: string) {
    return this.usuariosService.obtenerUno(Number(id));
  }

  @Patch(':id')
  actualizar(@Param('id') id: string, @Body() datosUsuario: UpdateUserDto) {
    return this.usuariosService.actualizar(Number(id), datosUsuario);
  }

  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.usuariosService.eliminar(Number(id));
  }
}
