import { Injectable } from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto.js';
import { UpdateStaffDto } from './dto/update-staff.dto.js';

@Injectable()
export class StaffService {
  crear(datosEmpleado: CreateStaffDto) {
    return 'Se creó un nuevo empleado';
  }

  obtenerTodos() {
    return 'Lista de todos los empleados';
  }

  obtenerUno(id: number) {
    return `Datos del empleado ${id}`;
  }

  actualizar(id: number, datosEmpleado: UpdateStaffDto) {
    return `Se actualizó el empleado ${id}`;
  }

  eliminar(id: number) {
    return `Se eliminó el empleado ${id}`;
  }
}
