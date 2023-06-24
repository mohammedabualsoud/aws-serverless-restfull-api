'use strict'
const uuid = require('node-uuid');
const AWS = require('aws-sdk'),
      {
          DynamoDBDocument
      } = require("@aws-sdk/lib-dynamodb"),
      {
          DynamoDB
      } = require("@aws-sdk/client-dynamodb");

const region = process.env.AWS_REGION; // It reads the env. variable
AWS.config.update({ region: region});

const ordersTable = 'order-table';

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


async function initData(dynamoDb) {
    let formattedDateNow = getCurrentDate();

    let order1 = {};
    order1.user_id = "static_user";
    order1.id = uuid.v4();
    order1.restaurantId = 'Restaurant 1';
    order1.name= "Doner Kebap"
    order1.orderStatus = "PENDING";
    order1.createdAt = formattedDateNow.toString();
    order1.quantity = 2;
    try{
        await dynamoDb.put({ Item: order1, TableName: ordersTable });
    }catch(err){
        console.log(err);
    }

    let order2 = {};
    order2.user_id = "static_user";
    order2.id = uuid.v4();
    order2.restaurantId = 'Restaurant 1';
    order2.name= "Spaghetti"
    order2.orderStatus = "PENDING";
    order2.createdAt = formattedDateNow.toString();
    order2.quantity = 3;
    try{
        await dynamoDb.put({ Item: order2,TableName: ordersTable }); 
    }catch(err){
        console.log(err);
    }
   

    let order3 = {};
    order3.user_id = "static_user";
    order3.id = uuid.v4();
    order3.restaurantId = 'Restaurant 2';
    order3.name= "Beef"
    order3.orderStatus = "PENDING";
    order3.createdAt = formattedDateNow.toString();
    order3.quantity = 2;
    try{
        await dynamoDb.put({ Item: order3, TableName: ordersTable});
    }catch(err){
        console.log(err);
    }
}

const dynamoDb = DynamoDBDocument.from(new DynamoDB());
initData(dynamoDb);
console.log('Done seeding Order table with sample Orders');

