export class ResponseStatus{
    static Ok = 200;
    static Accepted = 201;
    static BadRequest = 400;
    static Invalid = 412;
    static Unauthorised = 401;
    static NotFound = 404;
    static Conflict = 409;
    static InternalServerError = 500;
}

export const V1_APPLICATIONS = 'v1/application'

export const ACCOUNTING_PROVIDERS = ['Xero', 'MYOB']

export const BALANCE_SHEETS = {
    'Xero': [
        {
            "year": 2023,
            "month": 4,
            "profitOrLoss": 250000,
            "assetsValue": 1234
        },
        {
            "year": 2023,
            "month": 3,
            "profitOrLoss": 1150,
            "assetsValue": 5789
        },
        {
            "year": 2023,
            "month": 2,
            "profitOrLoss": 2500,
            "assetsValue": 22345
        },
        {
            "year": 2023,
            "month": 1,
            "profitOrLoss": -187000,
            "assetsValue": 223452
        },
        {
            "year": 2022,
            "month": 12,
            "profitOrLoss": 250000,
            "assetsValue": 1234
        },
        {
            "year": 2022,
            "month": 11,
            "profitOrLoss": 1150,
            "assetsValue": 5789
        },
        {
            "year": 2022,
            "month": 10,
            "profitOrLoss": 2500,
            "assetsValue": 22345
        },
        {
            "year": 2022,
            "month": 9,
            "profitOrLoss": -187000,
            "assetsValue": 223452
        },
        {
            "year": 2022,
            "month": 8,
            "profitOrLoss": 250000,
            "assetsValue": 1234
        },
        {
            "year": 2022,
            "month": 7,
            "profitOrLoss": 1150,
            "assetsValue": 5789
        },
        {
            "year": 2022,
            "month": 6,
            "profitOrLoss": 2500,
            "assetsValue": 22345
        },
        {
            "year": 2022,
            "month": 5,
            "profitOrLoss": -187000,
            "assetsValue": 223452
        }
    ],
    'MYOB': [
        {
            "year": 2023,
            "month": 4,
            "profitOrLoss": 250000,
            "assetsValue": 1234
        },
        {
            "year": 2023,
            "month": 3,
            "profitOrLoss": 1150,
            "assetsValue": 5789
        },
        {
            "year": 2023,
            "month": 2,
            "profitOrLoss": 2500,
            "assetsValue": 22345
        },
        {
            "year": 2023,
            "month": 1,
            "profitOrLoss": -187000,
            "assetsValue": 223452
        },
        {
            "year": 2022,
            "month": 12,
            "profitOrLoss": 250000,
            "assetsValue": 1234
        },
        {
            "year": 2022,
            "month": 11,
            "profitOrLoss": 1150,
            "assetsValue": 5789
        },
        {
            "year": 2022,
            "month": 10,
            "profitOrLoss": 2500,
            "assetsValue": 22345
        },
        {
            "year": 2022,
            "month": 9,
            "profitOrLoss": -187000,
            "assetsValue": 223452
        },
        {
            "year": 2022,
            "month": 8,
            "profitOrLoss": 250000,
            "assetsValue": 1234
        },
        {
            "year": 2022,
            "month": 7,
            "profitOrLoss": 1150,
            "assetsValue": 5789
        },
        {
            "year": 2022,
            "month": 6,
            "profitOrLoss": 2500,
            "assetsValue": 22345
        },
        {
            "year": 2022,
            "month": 5,
            "profitOrLoss": -187000,
            "assetsValue": 223452
        }
    ]
}