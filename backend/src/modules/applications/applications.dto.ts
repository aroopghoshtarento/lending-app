import { IsNotEmpty } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";



export class FetchBalanceSheetDto {
    @IsNotEmpty()
    @ApiProperty()
    readonly session_id: string;

    @IsNotEmpty()
    @ApiProperty()
    readonly name: string;

    @IsNotEmpty()
    @ApiProperty()
    readonly accounting_provider: string;
}


export class SubmitApplicationDto {
    @IsNotEmpty()
    @ApiProperty()
    readonly session_id: string;

    @IsNotEmpty()
    @ApiProperty()
    readonly name: string;

    @IsNotEmpty()
    @ApiProperty()
    readonly accounting_provider: string;

    @IsNotEmpty()
    @ApiProperty()
    readonly loan_amount: number;

    @IsNotEmpty()
    @ApiProperty()
    readonly year_established: string;
}

export class BusinessDetails {
    name: string;
    yearEstablished: string;
    totalProfitOrLoss: number;
}

export class SummarizedApplication {
    businessDetails: BusinessDetails;
    preAssessmentValue: number
}