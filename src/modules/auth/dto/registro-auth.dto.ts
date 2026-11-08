import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Matches,
  MaxDate,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegistroAuthDto {
  @IsString({ message: 'El nombre debe ser un texto.' })
  @IsNotEmpty({ message: 'El nombre es obligatorio.' })
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres.' })
  @MaxLength(80, { message: 'El nombre no puede superar los 80 caracteres.' })
  nombre: string;

  @IsEmail({}, { message: 'El email debe tener un formato válido.' })
  @MaxLength(120, { message: 'El email no puede superar los 120 caracteres.' })
  email: string;

  @IsString({ message: 'La contraseña debe ser un texto.' })
  @IsNotEmpty({ message: 'La contraseña es obligatoria.' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres.' })
  @MaxLength(128, {
    message: 'La contraseña no puede superar los 128 caracteres.',
  })
  contrasena: string;

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

  @IsInt({ message: 'El medio de pago debe ser un número entero.' })
  @IsPositive({ message: 'El medio de pago debe ser positivo.' })
  paymentMethodId: number;
}
