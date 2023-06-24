{"filter":false,"title":"app.js","tooltip":"/order-app/src/order-api/functions/post-orders-sync/app.js","undoManager":{"mark":9,"position":9,"stack":[[{"start":{"row":0,"column":0},"end":{"row":59,"column":0},"action":"insert","lines":["// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.","// SPDX-License-Identifier: MIT-0","","const dynamodb = require('aws-sdk/clients/dynamodb');","const docClient = new dynamodb.DocumentClient();","const uuid = require('node-uuid');","","const tableName = process.env.ORDER_TABLE;","const DEFAULT_ORDER_STATUS = \"PENDING\" // Default Order Status will be written to DynamoDB","","// The function returns current date","const getCurrentDate = () => {","    let date_ob = new Date();","    let date = (\"0\" + date_ob.getDate()).slice(-2);","    let month = (\"0\" + (date_ob.getMonth() + 1)).slice(-2);","    let year = date_ob.getFullYear();","    let hours = date_ob.getHours();","    let minutes = date_ob.getMinutes();","    let seconds = date_ob.getSeconds();","    ","    return year + \"-\" + month + \"-\" + date + \"T\" + hours + \":\" + minutes + \":\" + seconds;","}","","exports.postOrders = async (event) => {","    let formattedDateNow = getCurrentDate();","    const { body } = event;   // It destructures the body payload from event. ","    let parsedBody = JSON.parse(body); // It parses the JSON payload to java script object ","    ","    // The item contains fully order Item. ","    let item = {","        user_id : \"static_user\",   ","        id: uuid.v4(),             ","        name: parsedBody.name, ","        restaurantId: parsedBody.restaurantId, ","        quantity: parsedBody.quantity,","        createdAt: formattedDateNow.toString(),","        orderStatus: DEFAULT_ORDER_STATUS,","    }","    ","    let params = {","        TableName : tableName,","        Item: item","    }; ","","    // We use 'put' operator to put item to Dynamodb.","    try {","        const data = await docClient.put(params).promise()","        console.log(\"Success for putting Item\")","        console.log(data)","    } catch (err) {","        console.log(\"Failure\", err.message)","    }","    const response = {","      statusCode: 200,","      body: JSON.stringify(item)","","    };","    return response;","}",""],"id":1}],[{"start":{"row":27,"column":4},"end":{"row":33,"column":0},"action":"insert","lines":["let get_item = {","  user_id:","    event.requestContext.authorizer.claims[\"cognito:username\"] ||","    event.requestContext.authorizer.claims.username, // As we are using Lambda proxy from AWS ApiGateway, the cognito username will directly pass to here.","  id: orderId,","}",""],"id":3}],[{"start":{"row":36,"column":8},"end":{"row":36,"column":35},"action":"remove","lines":["user_id : \"static_user\",   "],"id":4},{"start":{"row":36,"column":8},"end":{"row":38,"column":154},"action":"insert","lines":[" user_id:","    event.requestContext.authorizer.claims[\"cognito:username\"] ||","    event.requestContext.authorizer.claims.username, // As we are using Lambda proxy from AWS ApiGateway, the cognito username will directly pass to here."]}],[{"start":{"row":27,"column":0},"end":{"row":33,"column":0},"action":"remove","lines":["    let get_item = {","  user_id:","    event.requestContext.authorizer.claims[\"cognito:username\"] ||","    event.requestContext.authorizer.claims.username, // As we are using Lambda proxy from AWS ApiGateway, the cognito username will directly pass to here.","  id: orderId,","}",""],"id":5}],[{"start":{"row":30,"column":0},"end":{"row":30,"column":4},"action":"remove","lines":["    "],"id":6}],[{"start":{"row":31,"column":3},"end":{"row":31,"column":4},"action":"remove","lines":[" "],"id":7},{"start":{"row":31,"column":2},"end":{"row":31,"column":3},"action":"remove","lines":[" "]},{"start":{"row":31,"column":1},"end":{"row":31,"column":2},"action":"remove","lines":[" "]},{"start":{"row":31,"column":0},"end":{"row":31,"column":1},"action":"remove","lines":[" "]},{"start":{"row":30,"column":13},"end":{"row":31,"column":0},"action":"remove","lines":["",""]}],[{"start":{"row":30,"column":13},"end":{"row":30,"column":14},"action":"insert","lines":[" "],"id":8}],[{"start":{"row":31,"column":0},"end":{"row":31,"column":4},"action":"remove","lines":["    "],"id":9},{"start":{"row":30,"column":75},"end":{"row":31,"column":0},"action":"remove","lines":["",""]}],[{"start":{"row":30,"column":75},"end":{"row":30,"column":76},"action":"insert","lines":[" "],"id":10}],[{"start":{"row":30,"column":5},"end":{"row":30,"column":8},"action":"insert","lines":["   "],"id":11}]]},"ace":{"folds":[],"scrolltop":341.3999999999998,"scrollleft":0,"selection":{"start":{"row":27,"column":0},"end":{"row":27,"column":0},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":87,"mode":"ace/mode/javascript"}},"timestamp":1687554925177,"hash":"8b317709fb95c774b2dd61360e8777cdf2cd78b9"}