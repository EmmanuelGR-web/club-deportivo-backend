import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

export class CreateStaffDto {
  @IsString({ message: 'El cargo debe ser un texto.' })
  @IsNotEmpty({ message: 'El cargo es obligatorio.' })
  @MaxLength(80, { message: 'El cargo no puede superar los 80 caracteres.' })
  cargo: string;

  @IsOptional()
  @IsString({ message: 'El teléfono debe ser un texto.' })
  @Matches(/^[0-9 +-]{6,20}$/, {
    message: 'El teléfono solo puede tener números, espacios, + y guiones.',
  })
  telefono?: string;

  @IsInt({ message: 'El usuario debe ser un número entero.' })
  @IsPositive({ message: 'El usuario debe ser positivo.' })
  userId: number;
}
