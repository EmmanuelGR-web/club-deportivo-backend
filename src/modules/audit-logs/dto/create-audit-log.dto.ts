import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateAuditLogDto {
  @IsString({ message: 'La acción debe ser un texto.' })
  @IsNotEmpty({ message: 'La acción es obligatoria.' })
  @MaxLength(200, { message: 'La acción no puede superar los 200 caracteres.' })
  accion: string;

  @IsString({ message: 'La tabla debe ser un texto.' })
  @IsNotEmpty({ message: 'La tabla es obligatoria.' })
  @MaxLength(50, { message: 'La tabla no puede superar los 50 caracteres.' })
  tabla: string;

  @IsOptional()
  @IsInt({ message: 'El usuario debe ser un número entero.' })
  @IsPositive({ message: 'El usuario debe ser positivo.' })
  userId?: number;
}
