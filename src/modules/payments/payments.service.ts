import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto.js';
import { UpdatePaymentDto } from './dto/update-payment.dto.js';

@Injectable()
export class PaymentsService {
  crear(datosPago: CreatePaymentDto) {
    return 'Se creó un nuevo pago';
  }

  obtenerTodos() {
    return 'Lista de todos los pagos';
  }

  obtenerUno(id: number) {
    return `Datos del pago ${id}`;
  }

  actualizar(id: number, datosPago: UpdatePaymentDto) {
    return `Se actualizó el pago ${id}`;
  }

  eliminar(id: number) {
    return `Se eliminó el pago ${id}`;
  }
}
