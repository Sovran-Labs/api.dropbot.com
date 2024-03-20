# TLDR

```.json
{
    "statistics": {
        "gasFees": [
            { // gas incurring txn #1
                "actionUuid": UUID,
                "txnFee": {
                    {
                        "amount": string,
                        "unit": string,
                        "symbol": string,
                        "conversionRateToUSD": {
                            "rate": number,
                            "timestamp": Datetime,
                            "source": {
                                "company": "Coinmarketcap",
                                "url": "https://coinmarketcap.com/api"
                            }
                        }
                    }
                }
            },
            { // gas incurring txn #2

            },
            { // gas incurring txn #3

            }
        ]
    }
}
```