import {
  IsDateString,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Matches,
} from 'class-validator';

export class CreateMemberDto {
  @IsInt({ message: 'El número de socio debe ser un número entero.' })
  @IsPositive({ message: 'El número de socio debe ser positivo.' })
  numeroSocio: number;

  @IsString({ message: 'El DNI debe ser un texto.' })
  @IsNotEmpty({ message: 'El DNI es obligatorio.' })
  @Matches(/^[0-9]{7,8}$/, {
    message: 'El DNI debe tener 7 u 8 números, sin puntos.',
  })
  dni: string;

  @IsOptional()
  @IsIn(['activo', 'moroso', 'baja'], {
    message: 'El estado debe ser activo, moroso o baja.',
  })
  estado?: string;

  @IsOptional()
  @IsDateString({}, { message: 'La fecha de alta debe ser una fecha válida.' })
  fechaAlta?: string;

  @IsInt({ message: 'El usuario debe ser un número entero.' })
  @IsPositive({ message: 'El usuario debe ser positivo.' })
  userId: number;

  @IsInt({ message: 'El medio de pago debe ser un número entero.' })
  @IsPositive({ message: 'El medio de pago debe ser positivo.' })
  paymentMethodId: number;
}
