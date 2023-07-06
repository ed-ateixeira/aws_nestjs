import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Req,
  Res,
  Get,
  Query,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { AwsService } from './aws.service';

@Controller('aws')
export class AwsController {
  constructor(private readonly awsService: AwsService) {}

  @Get('')
  async list() {
    try {
      return this.awsService.list();
    } catch (err) {
      return err;
    }
  }

  @Get('file')
  async url(@Req() request, @Query() query: { fileKey: string }) {
    try {
      return this.awsService.url(query.fileKey);
    } catch (err) {
      return err;
    }
  }

  @Post('')
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Req() request,
    @Res() response,
  ) {
    try {
      return this.awsService.upload(file.buffer, file.originalname);
    } catch (err) {
      return response.status(500).json(`Failed to upload file: ${err.message}`);
    }
  }
}
