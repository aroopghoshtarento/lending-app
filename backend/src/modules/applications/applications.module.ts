import { Module } from '@nestjs/common';
import { ThirdPartyService } from '../third-party/third-party.service';
import { ApplicationsController } from './applications.controller';
import { ApplicationsService } from './applications.service';

@Module({
  imports: [],
  controllers: [ApplicationsController],
  providers: [ApplicationsService, ThirdPartyService],
})
export class ApplicationsModule {}
