import {
  BadRequestException,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AiService } from './ai.service.js';

@Controller('ia')
export class AiController {
  constructor(private readonly iaService: AiService) {}

  @Post('pagos/:id/verificar-comprobante')
  @UseInterceptors(
    FileInterceptor('archivo', { limits: { fileSize: 10 * 1024 * 1024 } }),
  )
  verificarComprobante(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() archivo?: ArchivoSubido,
  ) {
    if (!archivo) {
      throw new BadRequestException('Tenés que adjuntar un comprobante.');
    }
    return this.iaService.verificarComprobante(id, archivo);
  }
}

export type ArchivoSubido = {
  buffer: Buffer;
  mimetype: string;
};
