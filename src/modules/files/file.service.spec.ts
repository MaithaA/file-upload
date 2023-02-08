import { Test, TestingModule } from '@nestjs/testing';
import { FileController } from './file.controller';
import { S3Service } from './file.service';

describe('FileController', () => {
  let service: S3Service;
  let controller: FileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileController],
      providers: [S3Service],
    }).compile();
    controller = module.get<FileController>(FileController);
    service = module.get<S3Service>(S3Service);
  });
  describe('uploadFile', () => {
    it('should return a url', async () => {
      //   const res = await service.uploadFile(file);
      //   expect(res.url).toBeDefined();
    });
  });
});
