import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AwsController } from './aws/aws.controller';
import { AwsService } from './aws/aws.service';
import { AwsModule } from './aws/aws.module';


@Module({
  controllers: [AppController, AwsController],
  providers: [AppService, AwsService],
  imports: [AwsModule],
})
export class AppModule {}
