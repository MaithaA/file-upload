import { config } from 'dotenv';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigurationService {
  constructor() {
    const nodeEnv = this.nodeEnv;
    config({
      path: `.${nodeEnv}.env`,
    });
  }

  get isDevelopment(): boolean {
    return this.nodeEnv === 'development';
  }

  get isProduction(): boolean {
    return this.nodeEnv === 'production';
  }

  get isTest(): boolean {
    return this.nodeEnv === 'test';
  }

  public getNumber(key: string): number {
    const value = this.get(key);

    try {
      return Number(value);
    } catch {
      throw new Error(`${key}:${value} env var is not a number`);
    }
  }

  private getBoolean(key: string): boolean {
    const value = this.get(key);

    try {
      return Boolean(JSON.parse(value));
    } catch {
      throw new Error(`${key}:${value} env var is not a boolean`);
    }
  }

  private getString(key: string): string {
    const value = this.get(key);

    return value.replace(/\\n/g, '\n');
  }

  get nodeEnv(): string {
    return this.get('NODE_ENV') || 'development';
  }

  get fallbackLanguage(): string {
    return this.getString('FALLBACK_LANGUAGE').toLowerCase();
  }

  get documentationEnabled(): boolean {
    return this.getBoolean('ENABLE_DOCUMENTATION');
  }

  get appConfig() {
    return {
      port: this.getString('PORT'),
    };
  }

  public get(key: string): string {
    return process.env[key] ?? '';
  }

  get awsRegion(): string {
    return this.get('AWS_REGION');
  }

  get awsAccessKey(): string {
    return this.get('AWS_ACCESS_KEY_ID');
  }

  get awsSecret(): string {
    return this.get('AWS_SECRET_ACCESS_KEY');
  }
  get awsBucketName(): string {
    return this.get('AWS_BUCKET_NAME');
  }
  get redisHost(): string {
    return this.get('REDIS_HOST').toLowerCase();
  }

  get redisPort(): number {
    return this.getNumber('REDIS_PORT');
  }

  get redisPassword(): string {
    return this.get('REDIS_PASSWORD');
  }
}
