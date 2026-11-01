import { Controller } from '@nestjs/common';
import { AiService } from './ai.service.js';

@Controller('ia')
export class AiController {
  constructor(private readonly iaService: AiService) {}
}
