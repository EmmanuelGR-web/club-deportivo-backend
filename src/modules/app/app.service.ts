import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  saludar(): string {
    return 'API del Club Deportivo funcionando';
  }
}
