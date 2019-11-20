'use strict';
const AWS = require('aws-sdk');

exports.handler = async (event, context) => {

    const documentClient = new AWS.DynamoDB.DocumentClient();

    let responseBody = "";
    let statusCode = 0;

    const params = {
      TableName: "Points"
    };

    try {
      const data = await documentClient.scan(params).promise();
      responseBody = JSON.stringify(data.Items);
      statusCode = 200;
    } catch (e) {
      responseBody = `Unable to get items: ${e}`;
      statusCode = 403;
    }

    const response = {
        statusCode: statusCode,
        headers: {
          "Content-Type": "appliaction/json",
          "Access-Control-Allow-Origin": "http://www.efojs.com"
        },
        body: responseBody
    };
    return response;
};
