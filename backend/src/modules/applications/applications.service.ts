import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from "cache-manager"
import { uuid } from 'uuidv4';
import { FetchBalanceSheetDto, SubmitApplicationDto } from './applications.dto';
import { ACCOUNTING_PROVIDERS } from 'src/common/constants';
import { ThirdPartyService } from '../third-party/third-party.service';

@Injectable()
export class ApplicationsService {
    constructor(
        @Inject(CACHE_MANAGER) 
        private cacheManager: Cache,
        private readonly thirdPartyService: ThirdPartyService,
    ) {}

    async initiateApplication(): Promise<object> {
        const session_id = uuid()
        await this.cacheManager.set(session_id, {}, 0);
        return {
            session_id: session_id
        };
    }

    async fetchBalanceSheet(data: FetchBalanceSheetDto): Promise<object> {
        const active_application = await this.cacheManager.get(data.session_id);
        if(!active_application){
            throw new HttpException({
                message: 'Invalid Session Id',
            }, HttpStatus.PRECONDITION_FAILED)
        }
        else if(ACCOUNTING_PROVIDERS.indexOf(data.accounting_provider) < 0){
            throw new HttpException({
                message: 'Invalid Accounting Provider',
            }, HttpStatus.BAD_REQUEST)
        }
        return this.thirdPartyService.getLastTwelveMonthsBalanceSheet(data.accounting_provider);
    }

    async submitApplication(data: SubmitApplicationDto): Promise<object> {
        const active_application = await this.cacheManager.get(data.session_id);
        if(!active_application){
            throw new HttpException({
                message: 'Invalid Session Id',
            }, HttpStatus.PRECONDITION_FAILED)
        }
        else if(ACCOUNTING_PROVIDERS.indexOf(data.accounting_provider) < 0){
            throw new HttpException({
                message: 'Invalid Accounting Provider',
            }, HttpStatus.BAD_REQUEST)
        }
        const balance_sheet = await this.thirdPartyService.getLastTwelveMonthsBalanceSheet(data.accounting_provider);
        const summarized_application = await this.summariseApplication(balance_sheet, data.loan_amount)
        let loan_approved_percentage = await this.thirdPartyService.requestDecision({
            businessDetails: {
                name: data.name,
                yearEstablished: data.year_established,
                totalProfitOrLoss: summarized_application.total_profit_loss
            },
            preAssessmentValue: summarized_application.pre_assessment_value
        })
        return {
                approved_amount: loan_approved_percentage*data.loan_amount/100,
                approved_percentage: loan_approved_percentage
        }
    }


    async summariseApplication(balance_sheets, loan_amount){
        let total_profit_loss = 0, total_asset_value=0, average_asset_value = 0, pre_assessment_value = 20
        balance_sheets.map((balance_sheet)=>{
            total_profit_loss += balance_sheet.profitOrLoss
            total_asset_value += balance_sheet.assetsValue
        })
        average_asset_value = total_asset_value / balance_sheets.length
        if(total_profit_loss > 0){
            pre_assessment_value = 60
        }
        if(average_asset_value > loan_amount){
            pre_assessment_value = 100
        }
        return {
            pre_assessment_value: pre_assessment_value,
            total_profit_loss: total_profit_loss
        }

    }
}
