import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AwsService {
  private bucket = {
    name: process.env.AWS_BUCKET_NAME,
    region: process.env.AWS_BUCKET_REGION,
  };

  private s3 = new S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: this.bucket.region,
  });

  getFileExtension(filename: string): string {
    const splitedFile = filename.split('.');
    return splitedFile[splitedFile.length - 1];
  }

  async upload(dataBuffer: Buffer, filename: string) {
    try {
      const upload = await this.s3
        .upload({
          Bucket: this.bucket.name,
          Key: `testing_1/${uuid()}.${this.getFileExtension(filename)}`,
          Body: dataBuffer,
        })
        .promise();

      return upload;
    } catch (err) {
      console.log(err);
    }
  }

  async url(fileKey: string) {
    try {
      return `https://${this.bucket.name}.s3.amazonaws.com/testing_1/${fileKey}`;
    } catch (err) {
      console.log(err);
    }
  }

  async list() {
    try {
      const files = await this.s3
        .listObjectsV2({ Bucket: this.bucket.name, Prefix: 'eduardo/' })
        .promise();

      return files;
    } catch (err) {
      console.log(err);
    }
  }
}
