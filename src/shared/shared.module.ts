import { Global, Module } from '@nestjs/common';
import { ConfigurationService } from './services/configuration.service';

const providers = [ConfigurationService, String];

@Global()
@Module({
  providers,
  exports: [...providers],
})
export class SharedModule {}
