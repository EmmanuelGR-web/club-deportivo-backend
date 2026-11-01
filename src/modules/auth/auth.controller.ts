import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service.js';

@Controller('autenticacion')
export class AuthController {
  constructor(private readonly autenticacionService: AuthService) {}
}
