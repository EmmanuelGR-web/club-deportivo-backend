import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
} from 'class-validator';

export class CreateFileDto {
  @IsString({ message: 'El nombre debe ser un texto.' })
  @IsNotEmpty({ message: 'El nombre es obligatorio.' })
  @MaxLength(150, { message: 'El nombre no puede superar los 150 caracteres.' })
  nombre: string;

  @IsUrl({}, { message: 'La URL debe tener un formato válido.' })
  url: string;

  @IsString({ message: 'El tipo debe ser un texto.' })
  @Matches(/^[a-z]+\/[a-z0-9.+-]+$/, {
    message:
      'El tipo debe ser un tipo de archivo, por ejemplo application/pdf.',
  })
  tipo: string;

  @IsInt({ message: 'El usuario debe ser un número entero.' })
  @IsPositive({ message: 'El usuario debe ser positivo.' })
  userId: number;
}
