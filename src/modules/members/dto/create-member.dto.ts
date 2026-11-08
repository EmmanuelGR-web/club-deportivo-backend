import { EstadoSocio } from '../../../generated/prisma/enums.js';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Matches,
  MaxDate,
  MaxLength,
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
  @IsString({ message: 'El teléfono debe ser un texto.' })
  @Matches(/^[0-9 +-]{6,20}$/, {
    message: 'El teléfono solo puede tener números, espacios, + y guiones.',
  })
  telefono?: string;

  @IsOptional()
  @IsString({ message: 'La dirección debe ser un texto.' })
  @MaxLength(150, {
    message: 'La dirección no puede superar los 150 caracteres.',
  })
  direccion?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'La fecha de nacimiento debe ser una fecha válida.' })
  @MaxDate(() => new Date(), {
    message: 'La fecha de nacimiento no puede ser futura.',
  })
  fechaNacimiento?: Date;

  @IsOptional()
  @IsEnum(EstadoSocio, {
    message: 'El estado debe ser activo, moroso o baja.',
  })
  estado?: EstadoSocio;

  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'La fecha de alta debe ser una fecha válida.' })
  fechaAlta?: Date;

  @IsInt({ message: 'El usuario debe ser un número entero.' })
  @IsPositive({ message: 'El usuario debe ser positivo.' })
  userId: number;

  @IsInt({ message: 'El medio de pago debe ser un número entero.' })
  @IsPositive({ message: 'El medio de pago debe ser positivo.' })
  paymentMethodId: number;
}
