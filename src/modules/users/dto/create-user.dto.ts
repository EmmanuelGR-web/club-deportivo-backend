import { Rol } from '../../../generated/prisma/enums.js';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
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

  @IsOptional()
  @IsEnum(Rol, {
    message: 'El rol debe ser admin, personal o socio.',
  })
  rol?: Rol;

  @IsOptional()
  @IsBoolean({ message: 'Bloqueado debe ser verdadero o falso.' })
  bloqueado?: boolean;

  @IsOptional()
  @IsBoolean({
    message: 'Debe cambiar la contraseña debe ser verdadero o falso.',
  })
  debeCambiarContrasena?: boolean;
}
