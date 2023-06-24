// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

exports.processPayment = async (event) => {
    let paymentResult ={}
    const paymentState = ['ok', 'error']
    const errorMessages = ['could not contact payment processor', 'payment method declined', 'unknown error']
    
    const paymentRandom = Math.floor(Math.random() * paymentState.length);

    if (paymentState[paymentRandom] == "error"){
        let errorRandom = Math.floor(Math.random() * errorMessages.length)
        paymentResult['errorMessage'] = errorMessages[errorRandom]
    }

    paymentResult['status'] = paymentState[paymentRandom]

    console.log(paymentResult)
    return paymentResult;
};
