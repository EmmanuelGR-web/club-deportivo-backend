import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PaymentsService } from './payments.service.js';
import { CreatePaymentDto } from './dto/create-payment.dto.js';
import { UpdatePaymentDto } from './dto/update-payment.dto.js';

@Controller('pagos')
export class PaymentsController {
  constructor(private readonly pagosService: PaymentsService) {}

  @Post()
  crear(@Body() datosPago: CreatePaymentDto) {
    return this.pagosService.crear(datosPago);
  }

  @Get()
  obtenerTodos() {
    return this.pagosService.obtenerTodos();
  }

  @Get('medios-pago')
  obtenerMediosPago() {
    return this.pagosService.obtenerMediosPago();
  }

  @Get(':id')
  obtenerUno(@Param('id') id: string) {
    return this.pagosService.obtenerUno(Number(id));
  }

  @Patch(':id')
  actualizar(@Param('id') id: string, @Body() datosPago: UpdatePaymentDto) {
    return this.pagosService.actualizar(Number(id), datosPago);
  }

  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.pagosService.eliminar(Number(id));
  }
}
