import { Module } from '@nestjs/common';
import { FileModule } from './modules/files/file.module';
import { HealthModule } from './modules/healthchecks/health.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [SharedModule, HealthModule, FileModule],
})
export class AppModule {}
