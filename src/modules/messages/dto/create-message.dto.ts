import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateMessageDto {
  @IsString({ message: 'El texto debe ser un texto.' })
  @IsNotEmpty({ message: 'El texto es obligatorio.' })
  @MaxLength(1000, {
    message: 'El texto no puede superar los 1000 caracteres.',
  })
  texto: string;

  @IsOptional()
  @IsBoolean({ message: 'Leído debe ser verdadero o falso.' })
  leido?: boolean;

  @IsInt({ message: 'El remitente debe ser un número entero.' })
  @IsPositive({ message: 'El remitente debe ser positivo.' })
  remitenteId: number;

  @IsInt({ message: 'El destinatario debe ser un número entero.' })
  @IsPositive({ message: 'El destinatario debe ser positivo.' })
  destinatarioId: number;
}
