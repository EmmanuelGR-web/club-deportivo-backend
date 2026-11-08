import { Type } from 'class-transformer';
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateNewsDto {
  @IsString({ message: 'El título debe ser un texto.' })
  @IsNotEmpty({ message: 'El título es obligatorio.' })
  @MinLength(3, { message: 'El título debe tener al menos 3 caracteres.' })
  @MaxLength(150, { message: 'El título no puede superar los 150 caracteres.' })
  titulo: string;

  @IsString({ message: 'El resumen debe ser un texto.' })
  @IsNotEmpty({ message: 'El resumen es obligatorio.' })
  @MaxLength(300, {
    message: 'El resumen no puede superar los 300 caracteres.',
  })
  resumen: string;

  @IsString({ message: 'El cuerpo debe ser un texto.' })
  @IsNotEmpty({ message: 'El cuerpo es obligatorio.' })
  cuerpo: string;

  @IsOptional()
  @IsString({ message: 'La imagen debe ser un texto.' })
  imagen?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'La fecha debe ser una fecha válida.' })
  fecha?: Date;

  @IsInt({ message: 'El autor debe ser un número entero.' })
  @IsPositive({ message: 'El autor debe ser positivo.' })
  userId: number;

  @IsInt({ message: 'La categoría debe ser un número entero.' })
  @IsPositive({ message: 'La categoría debe ser positiva.' })
  newsCategoryId: number;
}
