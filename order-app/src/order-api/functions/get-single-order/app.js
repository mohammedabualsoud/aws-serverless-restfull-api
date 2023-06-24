// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

const tableName = process.env.ORDER_TABLE;
const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();

exports.getOrderById = async (event) => {
    if (event.httpMethod !== 'GET') {
        throw new Error(`getAllItems only accept GET method, you tried: ${event.httpMethod}`);
    }
    const orderId = event.pathParameters.orderId;    // It gets orderId from url
    
    let get_item = {
      user_id:
        event.requestContext.authorizer.claims["cognito:username"] ||
        event.requestContext.authorizer.claims.username, // As we are using Lambda proxy from AWS ApiGateway, the cognito username will directly pass to here.
      id: orderId,
    }

    let params = {
        TableName : tableName,
        Key: get_item
    };
    
    let item = null;
    // We call the Get function to get the single Item
    try {
        const data = await docClient.get(params).promise();
        item = data.Item;
    } catch (err) {
        console.log("Failure", err.message)
    }

    const response = {
        statusCode: 200,
        body: JSON.stringify(item)
    };

    return response;
}
