import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateDisciplineDto {
  @IsString({ message: 'El nombre debe ser un texto.' })
  @IsNotEmpty({ message: 'El nombre es obligatorio.' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres.' })
  @MaxLength(50, { message: 'El nombre no puede superar los 50 caracteres.' })
  nombre: string;

  @IsOptional()
  @IsString({ message: 'La descripción debe ser un texto.' })
  @MaxLength(500, {
    message: 'La descripción no puede superar los 500 caracteres.',
  })
  descripcion?: string;

  @IsOptional()
  @IsString({ message: 'La imagen debe ser un texto.' })
  imagen?: string;
}
