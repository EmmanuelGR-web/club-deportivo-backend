import { EstadoPago } from '../../../generated/prisma/enums.js';
import type { Prisma } from '../../../generated/prisma/client.js';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsPositive,
  IsString,
  Matches,
  MaxLength,
  Min,
} from 'class-validator';

export class CreatePaymentDto {
  @IsString({ message: 'El concepto debe ser un texto.' })
  @IsNotEmpty({ message: 'El concepto es obligatorio.' })
  @MaxLength(100, {
    message: 'El concepto no puede superar los 100 caracteres.',
  })
  concepto: string;

  @IsOptional()
  @Matches(/^[0-9]{4}-(0[1-9]|1[0-2])$/, {
    message: 'El período debe tener el formato AAAA-MM, por ejemplo 2026-11.',
  })
  periodo?: string;

  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'El monto debe ser un número con hasta 2 decimales.' },
  )
  @IsPositive({ message: 'El monto debe ser positivo.' })
  monto: number;

  @Type(() => Date)
  @IsDate({ message: 'La fecha debe ser una fecha válida.' })
  fecha: Date;

  @IsOptional()
  @IsEnum(EstadoPago, {
    message: 'El estado debe ser pagado, pendiente, vencido o rechazado.',
  })
  estado?: EstadoPago;

  @IsOptional()
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'El recargo debe ser un número con hasta 2 decimales.' },
  )
  @Min(0, { message: 'El recargo no puede ser negativo.' })
  recargo?: number;

  @IsOptional()
  @IsString({ message: 'El comprobante debe ser un texto.' })
  @Matches(/^data:(image\/|application\/pdf)/, {
    message: 'El comprobante debe ser una imagen o un PDF en formato data URL.',
  })
  comprobante?: string;

  @IsOptional()
  @IsString({ message: 'El nombre del comprobante debe ser un texto.' })
  @MaxLength(150, {
    message: 'El nombre del comprobante no puede superar los 150 caracteres.',
  })
  comprobanteNombre?: string;

  @IsOptional()
  @IsObject({ message: 'La verificación con IA debe ser un objeto.' })
  verificacionIA?: Prisma.InputJsonObject;

  @IsOptional()
  @IsString({ message: 'El motivo debe ser un texto.' })
  @MaxLength(300, { message: 'El motivo no puede superar los 300 caracteres.' })
  motivo?: string;

  @IsInt({ message: 'El socio debe ser un número entero.' })
  @IsPositive({ message: 'El socio debe ser positivo.' })
  memberId: number;

  @IsInt({ message: 'El medio de pago debe ser un número entero.' })
  @IsPositive({ message: 'El medio de pago debe ser positivo.' })
  paymentMethodId: number;
}
