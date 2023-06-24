{"filter":false,"title":"app.js","tooltip":"/order-app/src/order-api/functions/delete-order/app.js","undoManager":{"mark":2,"position":2,"stack":[[{"start":{"row":0,"column":0},"end":{"row":34,"column":0},"action":"insert","lines":["// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.","// SPDX-License-Identifier: MIT-0","","const dynamodb = require('aws-sdk/clients/dynamodb');","const docClient = new dynamodb.DocumentClient();","const tableName = process.env.ORDER_TABLE;","","exports.deleteOrder = async (event) => {","    const orderId = event.pathParameters.orderId; // It gets the OrderId from parameter","","    let item = {","        user_id : \"static_user\",   ","        id: orderId","    }","","    let params = {","        TableName : tableName,","        Key: item","    };","","    // It calls the delete function to delete Item","    try {","        await docClient.delete(params).promise();","    } catch (err) {","        console.log(\"Failure\", err.message)","    }","    ","    // Let's return only 204 response","    const response = {","        statusCode: 204","    };","","    return response;","}",""],"id":1}],[{"start":{"row":10,"column":0},"end":{"row":13,"column":5},"action":"remove","lines":["    let item = {","        user_id : \"static_user\",   ","        id: orderId","    }"],"id":2},{"start":{"row":10,"column":0},"end":{"row":16,"column":0},"action":"insert","lines":["let item = {","  user_id:","    event.requestContext.authorizer.claims[\"cognito:username\"] ||","    event.requestContext.authorizer.claims.username, // As we are using Lambda proxy from AWS ApiGateway, the cognito username will directly pass to here.","  id: orderId,","}",""]}],[{"start":{"row":10,"column":0},"end":{"row":10,"column":4},"action":"insert","lines":["    "],"id":3},{"start":{"row":11,"column":0},"end":{"row":11,"column":4},"action":"insert","lines":["    "]},{"start":{"row":12,"column":0},"end":{"row":12,"column":4},"action":"insert","lines":["    "]},{"start":{"row":13,"column":0},"end":{"row":13,"column":4},"action":"insert","lines":["    "]},{"start":{"row":14,"column":0},"end":{"row":14,"column":4},"action":"insert","lines":["    "]},{"start":{"row":15,"column":0},"end":{"row":15,"column":4},"action":"insert","lines":["    "]}]]},"ace":{"folds":[],"scrolltop":98.10000000000015,"scrollleft":0,"selection":{"start":{"row":14,"column":16},"end":{"row":14,"column":16},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":87,"mode":"ace/mode/javascript"}},"timestamp":1687554837460,"hash":"64d4120a0641d00e9a57b95914f690b941f6ae4c"}