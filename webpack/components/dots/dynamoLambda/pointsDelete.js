'use strict';
const AWS = require('aws-sdk');

exports.handler = async (event, context) => {

    const documentClient = new AWS.DynamoDB.DocumentClient();

    let responseBody = "";
    let statusCode = 0;

    const { id } = event.pathParameters;

    const params = {
      TableName: "Points",
      Key: {
        id: id
      }
    };

    try {
      const data = await documentClient.delete(params).promise();
      responseBody = JSON.stringify(data);
      statusCode = 203;
    } catch (e) {
      responseBody = `Unable to delete item: ${e}`;
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
