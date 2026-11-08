import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import bcrypt from 'bcryptjs';
import { PrismaService } from '../../config/prisma.service.js';
import { LoginAuthDto } from './dto/login-auth.dto.js';
import { RegistroAuthDto } from './dto/registro-auth.dto.js';

const datosDelUsuario = {
  member: { include: { paymentMethod: true } },
  staff: true,
};

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async registrar(datosRegistro: RegistroAuthDto) {
    const { nombre, email, contrasena, ...datosSocio } = datosRegistro;
    const ultimoSocio = await this.prisma.member.aggregate({
      _max: { numeroSocio: true },
    });
    const numeroSocio = (ultimoSocio._max.numeroSocio ?? 1000) + 1;

    return this.prisma.user.create({
      data: {
        nombre,
        email: email.toLowerCase(),
        contrasena: await bcrypt.hash(contrasena, 10),
        rol: 'socio',
        member: {
          create: { ...datosSocio, numeroSocio, estado: 'pendiente' },
        },
      },
      include: datosDelUsuario,
    });
  }

  async iniciarSesion(datosLogin: LoginAuthDto) {
    const usuario = await this.prisma.user.findUnique({
      where: { email: datosLogin.email.toLowerCase() },
      omit: { contrasena: false },
    });

    const contrasenaCorrecta =
      usuario &&
      (await bcrypt.compare(datosLogin.contrasena, usuario.contrasena));
    if (!usuario || !contrasenaCorrecta) {
      throw new UnauthorizedException('Email o contraseña incorrectos.');
    }
    if (usuario.bloqueado) {
      throw new ForbiddenException('El usuario está bloqueado.');
    }

    return this.prisma.user.findUnique({
      where: { id: usuario.id },
      include: datosDelUsuario,
    });
  }
}
