import {
  IsDateString,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
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

  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'El monto debe ser un número con hasta 2 decimales.' },
  )
  @IsPositive({ message: 'El monto debe ser positivo.' })
  monto: number;

  @IsDateString({}, { message: 'La fecha debe ser una fecha válida.' })
  fecha: string;

  @IsOptional()
  @IsIn(['pagado', 'pendiente', 'vencido'], {
    message: 'El estado debe ser pagado, pendiente o vencido.',
  })
  estado?: string;

  @IsOptional()
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'El recargo debe ser un número con hasta 2 decimales.' },
  )
  @Min(0, { message: 'El recargo no puede ser negativo.' })
  recargo?: number;

  @IsOptional()
  @IsString({ message: 'El comprobante debe ser un texto.' })
  @MaxLength(255, {
    message: 'El comprobante no puede superar los 255 caracteres.',
  })
  comprobante?: string;

  @IsInt({ message: 'El socio debe ser un número entero.' })
  @IsPositive({ message: 'El socio debe ser positivo.' })
  memberId: number;

  @IsInt({ message: 'El medio de pago debe ser un número entero.' })
  @IsPositive({ message: 'El medio de pago debe ser positivo.' })
  paymentMethodId: number;
}
