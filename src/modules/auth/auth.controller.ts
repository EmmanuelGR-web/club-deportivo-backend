import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { LoginAuthDto } from './dto/login-auth.dto.js';
import { RegistroAuthDto } from './dto/registro-auth.dto.js';

@Controller('autenticacion')
export class AuthController {
  constructor(private readonly autenticacionService: AuthService) {}

  @Post('registro')
  registrar(@Body() datosRegistro: RegistroAuthDto) {
    return this.autenticacionService.registrar(datosRegistro);
  }

  @Post('login')
  @HttpCode(200)
  iniciarSesion(@Body() datosLogin: LoginAuthDto) {
    return this.autenticacionService.iniciarSesion(datosLogin);
  }
}
