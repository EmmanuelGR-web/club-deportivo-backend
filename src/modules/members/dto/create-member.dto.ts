import { EstadoSocio } from '../../../generated/prisma/enums.js';
import type { Prisma } from '../../../generated/prisma/client.js';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsObject,
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
  @IsString({ message: 'La foto debe ser un texto.' })
  @Matches(/^data:image\//, {
    message: 'La foto debe ser una imagen en formato data URL.',
  })
  foto?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'La fecha de la foto debe ser una fecha válida.' })
  fotoActualizada?: Date;

  @IsOptional()
  @IsString({ message: 'El emisor de la tarjeta debe ser un texto.' })
  @MaxLength(30, {
    message: 'El emisor de la tarjeta no puede superar los 30 caracteres.',
  })
  tarjetaEmisor?: string;

  @IsOptional()
  @IsIn(['visa', 'mastercard', 'amex'], {
    message: 'La red de la tarjeta debe ser visa, mastercard o amex.',
  })
  tarjetaRed?: string;

  @IsOptional()
  @Matches(/^[0-9]{4}$/, {
    message: 'Los últimos 4 números de la tarjeta deben ser 4 dígitos.',
  })
  tarjetaUltimos4?: string;

  @IsOptional()
  @IsBoolean({ message: 'Débito automático debe ser verdadero o falso.' })
  debitoAutomatico?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'Alta presencial debe ser verdadero o falso.' })
  altaPresencial?: boolean;

  @IsOptional()
  @IsObject({ message: 'La lectura con IA debe ser un objeto.' })
  lecturaIA?: Prisma.InputJsonObject;

  @IsOptional()
  @IsEnum(EstadoSocio, {
    message: 'El estado debe ser pendiente, activo, moroso o baja.',
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
