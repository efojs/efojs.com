'use strict';
const AWS = require('aws-sdk');

exports.handler = async (event, context) => {

    const documentClient = new AWS.DynamoDB.DocumentClient();

    let responseBody = "";
    let statusCode = 0;

    const { id, left, top } = JSON.parse(event.body);

    const params = {
      TableName: "Points",
      Item: {
        id: id,
        left: left,
        top: top
      }
    };

    try {
      const data = await documentClient.put(params).promise();
      responseBody = JSON.stringify(data);
      statusCode = 201;
    } catch (e) {
      responseBody = `Unable to put item: ${e}`;
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
