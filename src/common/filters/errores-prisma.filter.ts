import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ConflictException,
  ExceptionFilter,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '../../generated/prisma/client.js';

@Catch(Prisma.PrismaClientKnownRequestError)
export class ErroresPrismaFilter
  extends BaseExceptionFilter
  implements ExceptionFilter
{
  catch(error: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    let respuesta: HttpException = new BadRequestException(
      'No se pudo guardar el dato.',
    );

    if (error.code === 'P2002') {
      respuesta = new ConflictException(
        'Ya existe un registro con ese dato (email, DNI, nombre o un pago del mismo mes).',
      );
    }

    if (error.code === 'P2003') {
      respuesta = new BadRequestException(
        'El dato relacionado no existe o todavía tiene datos que dependen de él.',
      );
    }

    if (error.code === 'P2025') {
      respuesta = new NotFoundException('No se encontró el registro pedido.');
    }

    super.catch(respuesta, host);
  }
}
