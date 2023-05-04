import { Controller, Get, Post, Query, Body } from '@nestjs/common';
import { V1_APPLICATIONS } from 'src/common/constants';
import { FetchBalanceSheetDto, SubmitApplicationDto } from './applications.dto';
import { ApplicationsService } from './applications.service';

@Controller(V1_APPLICATIONS)
export class ApplicationsController {
  constructor(private readonly applicationService: ApplicationsService) {}

  @Get('/initiate-application')
  async initiateApplication(): Promise<object> {
    return this.applicationService.initiateApplication();
  }

  @Get('/fetch-balance-sheet')
  async fetchBalanceSheet(@Query() query: FetchBalanceSheetDto){
    return this.applicationService.fetchBalanceSheet(query);
  }

  @Post('/submit-application')
  async submitApplication(@Body() body: SubmitApplicationDto){
    return this.applicationService.submitApplication(body);
  }


}
