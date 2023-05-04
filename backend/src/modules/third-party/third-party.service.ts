import { Injectable } from '@nestjs/common';
import { BALANCE_SHEETS } from 'src/common/constants';
import { SummarizedApplication } from '../applications/applications.dto';

@Injectable()
export class ThirdPartyService {
  async getLastTwelveMonthsBalanceSheet(accounting_provider: string): Promise<object> {
    return BALANCE_SHEETS[accounting_provider]
  }

  async requestDecision(summarized_application: SummarizedApplication): Promise<number> {
    return summarized_application.preAssessmentValue
  }
}
