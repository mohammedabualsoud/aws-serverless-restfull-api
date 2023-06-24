// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();
const tableName = process.env.ORDER_TABLE;

exports.deleteOrder = async (event) => {
    const orderId = event.pathParameters.orderId; // It gets the OrderId from parameter

    let item = {
      user_id:
        event.requestContext.authorizer.claims["cognito:username"] ||
        event.requestContext.authorizer.claims.username, // As we are using Lambda proxy from AWS ApiGateway, the cognito username will directly pass to here.
      id: orderId,
    }


    let params = {
        TableName : tableName,
        Key: item
    };

    // It calls the delete function to delete Item
    try {
        await docClient.delete(params).promise();
    } catch (err) {
        console.log("Failure", err.message)
    }
    
    // Let's return only 204 response
    const response = {
        statusCode: 204
    };

    return response;
}
