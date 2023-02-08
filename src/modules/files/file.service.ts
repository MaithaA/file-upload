import { Injectable, Req, Res } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { ConfigurationService } from '../../shared/services/configuration.service';

@Injectable()
export class S3Service {
  constructor(private readonly configurationService: ConfigurationService) {}

  AWS_S3_BUCKET = this.configurationService.get('AWS_BUCKET_NAME');
  s3 = new AWS.S3({
    accessKeyId: this.configurationService.get('AWS_ACCESS_KEY_ID'),
    secretAccessKey: this.configurationService.get('AWS_SECRET_ACCESS_KEY'),
  });

  async uploadFile(file: Express.Multer.File) {
    console.log(file.buffer);
    const { originalname } = file;

    let url = await this.s3_upload(
      file.buffer,
      this.AWS_S3_BUCKET,
      originalname,
      file.mimetype,
    );

    const res = { url: url };
    return res;
  }

  async s3_upload(
    file: Buffer,
    bucket: string,
    name: string,
    mimetype: string,
  ) {
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
      ACL: 'public-read',
      ContentType: mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: 'us-east-1',
      },
    };

    try {
      await this.s3.upload(params).promise();

      let paramss = { Bucket: bucket, Key: String(name), Expires: 60 };
      var url = this.s3.getSignedUrl('getObject', paramss);
      // console.log('The URL is', url); // expires in 60 seconds
      return url;
    } catch (e) {
      console.log(e);
    }
  }
}
