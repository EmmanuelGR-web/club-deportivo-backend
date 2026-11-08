import { IntersectionType, OmitType, PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from '../../users/dto/create-user.dto.js';
import { CreateMemberDto } from '../../members/dto/create-member.dto.js';

export class RegistroAuthDto extends IntersectionType(
  PickType(CreateUserDto, ['nombre', 'email', 'contrasena']),
  OmitType(CreateMemberDto, ['numeroSocio', 'userId', 'estado', 'fechaAlta']),
) {}
