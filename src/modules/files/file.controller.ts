import {
  Controller,
  HttpCode,
  Post,
  UploadedFile,
  UseInterceptors,
  ParseFilePipe,
  FileTypeValidator,
} from '@nestjs/common';

import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { S3Service } from './file.service';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
@Controller('/v1/api')
@ApiTags('file upload')
export class FileController {
  constructor(private fileservise: S3Service) {}

  @Post('/upload')
  @HttpCode(200)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  uploadfile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: '.(png|pdf|jpg)' })],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.fileservise.uploadFile(file);
  }
}
