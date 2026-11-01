import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StaffService } from './staff.service.js';
import { CreateStaffDto } from './dto/create-staff.dto.js';
import { UpdateStaffDto } from './dto/update-staff.dto.js';

@Controller('personal')
export class StaffController {
  constructor(private readonly personalService: StaffService) {}

  @Post()
  crear(@Body() datosEmpleado: CreateStaffDto) {
    return this.personalService.crear(datosEmpleado);
  }

  @Get()
  obtenerTodos() {
    return this.personalService.obtenerTodos();
  }

  @Get(':id')
  obtenerUno(@Param('id') id: string) {
    return this.personalService.obtenerUno(Number(id));
  }

  @Patch(':id')
  actualizar(@Param('id') id: string, @Body() datosEmpleado: UpdateStaffDto) {
    return this.personalService.actualizar(Number(id), datosEmpleado);
  }

  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.personalService.eliminar(Number(id));
  }
}
