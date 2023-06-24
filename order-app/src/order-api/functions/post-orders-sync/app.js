// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();
const uuid = require('node-uuid');

const tableName = process.env.ORDER_TABLE;
const DEFAULT_ORDER_STATUS = "PENDING" // Default Order Status will be written to DynamoDB

// The function returns current date
const getCurrentDate = () => {
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    
    return year + "-" + month + "-" + date + "T" + hours + ":" + minutes + ":" + seconds;
}

exports.postOrders = async (event) => {
    let formattedDateNow = getCurrentDate();
    const { body } = event;   // It destructures the body payload from event. 
    let parsedBody = JSON.parse(body); // It parses the JSON payload to java script object 

    // The item contains fully order Item. 
    let item = {
        user_id: event.requestContext.authorizer.claims["cognito:username"] || event.requestContext.authorizer.claims.username, // As we are using Lambda proxy from AWS ApiGateway, the cognito username will directly pass to here.
        id: uuid.v4(),             
        name: parsedBody.name, 
        restaurantId: parsedBody.restaurantId, 
        quantity: parsedBody.quantity,
        createdAt: formattedDateNow.toString(),
        orderStatus: DEFAULT_ORDER_STATUS,
    }
    
    let params = {
        TableName : tableName,
        Item: item
    }; 

    // We use 'put' operator to put item to Dynamodb.
    try {
        const data = await docClient.put(params).promise()
        console.log("Success for putting Item")
        console.log(data)
    } catch (err) {
        console.log("Failure", err.message)
    }
    const response = {
      statusCode: 200,
      body: JSON.stringify(item)

    };
    return response;
}
