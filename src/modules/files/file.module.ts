import { Global, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TerminusModule } from '@nestjs/terminus';

import { FileController } from './file.controller';
import { S3Service } from './file.service';

@Global()
@Module({
  imports: [TerminusModule, ScheduleModule.forRoot()],
  controllers: [FileController],
  exports: [S3Service],
  providers: [S3Service],
})
export class FileModule {}
