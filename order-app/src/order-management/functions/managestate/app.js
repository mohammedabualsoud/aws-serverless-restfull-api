// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();

const {SNSClient, PublishCommand } = require('@aws-sdk/client-sns');
const snsClient = new SNSClient();

const tableName = process.env.ORDER_TABLE;
const snsTopicArn = process.env.SNS_TOPIC_ARN;

exports.manageState = async (event) => {
  // If it gets 'sendOrderToRestaurant' payload in an Event, it will call this block
  if ('sendOrderToRestaurant' in event) {
    let params={}
    let orderStatus = "";
    // If it gets an error from sendOrderToRestaurant function, it updates the Dynamodb with failure message
    if(event["sendOrderToRestaurant"]["status"] == "error"){
      orderStatus = "FAILURE"
      let errorMessage = event["sendOrderToRestaurant"]["errorMessage"]

      // It sets the status with Failure, and adds 'errorMessage'
      params = {
        TableName : tableName,
        Key:{
          "user_id": event.user_id,
          "id": event.id
        },
        UpdateExpression: "set orderStatus = :s, errorMessage = :m",
        ExpressionAttributeValues:{
            ":s": orderStatus,
            ":m": errorMessage
        },
        ReturnValues:"UPDATED_NEW"
      }; 
    }
    else{
      // If it doesn't get any failure, it will return with 'Success' message 
      orderStatus = "SUCCESS"
      params = {
        TableName : tableName,
        Key:{
          "user_id": event.user_id,
          "id": event.id
        },
        UpdateExpression: "set orderStatus = :s",
        ExpressionAttributeValues:{
            ":s": orderStatus,
        },
        ReturnValues:"UPDATED_NEW"
      }; 
    }
    // It calls the updatePut function with params(which is Success or Failure)
    const result = updatePut(params, orderStatus);
    return result;
  }

  // If it gets 'paymentResult' payload in an Event, it will call this block
  if ('paymentResult' in event) {
    // if it gets an error from PaymentResult, it updates the message with Failure
    if(event["paymentResult"]["status"] == "error"){
      let orderStatus = "FAILURE"
      let errorMessage = event["paymentResult"]["errorMessage"]
      
      // sets the order status to Failure
      let params = {
        TableName : tableName,
        Key:{
          "user_id": event.user_id,
          "id": event.id
        },
        UpdateExpression: "set orderStatus = :s, errorMessage = :m",
        ExpressionAttributeValues:{
            ":s": orderStatus,
            ":m": errorMessage
        },
        ReturnValues:"UPDATED_NEW"
      }; 

      // Calls the updatePut function with params
      const result = updatePut(params, orderStatus);
      return result;
    }
  }

  // If it is first calling of ManageState function, it will put the Item with 'pending' status to Dynamodb
  const response = dynamoPut(event);
  return response;
}


const updatePut = async (params, orderStatus) => {
  try {
    await docClient.update(params).promise()
  } catch (err) {
      console.log("Failure", err.message)
  }

  // Call snsPublish method
  await snsPublish(orderStatus);

  return {
    statusCode: 200,
    body: JSON.stringify('Success for updating Item!'),
  }
}

const dynamoPut = async (event) =>{
  let item = {
    user_id : event.user_id, 
    id: event.id, 
    name: event.name, 
    restaurantId: event.restaurantId, 
    createdAt: event.createdAt,
    quantity: event.quantity,
    orderStatus: event.orderStatus,
    messageId: event.messageId
  }

  let params = {
    TableName : tableName,
    Item: item
  }; 

  try {
    await docClient.put(params).promise()
  } catch (err) {
      console.log("Failure", err.message)
  }

  return {
    statusCode: 200,
    body: JSON.stringify('Success for putting Item!'),
  }
}

// Publish SNS message which is Order Status to SNS topic
const snsPublish = async ( status) =>{
  let message = `Order Status: ${status}`;
  try {
    const input = {
      TopicArn: snsTopicArn,
      Message: message
    }
    await snsClient.send(new PublishCommand(input));
  } catch (err) {
      console.log("Failure", err.message)
  }
}
