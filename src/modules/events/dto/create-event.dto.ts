import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateEventDto {
  @IsString({ message: 'El título debe ser un texto.' })
  @IsNotEmpty({ message: 'El título es obligatorio.' })
  @MinLength(3, { message: 'El título debe tener al menos 3 caracteres.' })
  @MaxLength(150, { message: 'El título no puede superar los 150 caracteres.' })
  titulo: string;

  @IsOptional()
  @IsString({ message: 'La descripción debe ser un texto.' })
  @MaxLength(500, {
    message: 'La descripción no puede superar los 500 caracteres.',
  })
  descripcion?: string;

  @IsDateString({}, { message: 'La fecha debe ser una fecha válida.' })
  fecha: string;

  @IsString({ message: 'El lugar debe ser un texto.' })
  @IsNotEmpty({ message: 'El lugar es obligatorio.' })
  @MaxLength(150, { message: 'El lugar no puede superar los 150 caracteres.' })
  lugar: string;

  @IsInt({ message: 'La disciplina debe ser un número entero.' })
  @IsPositive({ message: 'La disciplina debe ser positiva.' })
  disciplineId: number;
}
