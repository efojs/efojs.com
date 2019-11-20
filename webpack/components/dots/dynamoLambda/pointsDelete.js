'use strict';
const AWS = require('aws-sdk');

exports.handler = async (event, context) => {

  const allowedOrigins = ["http://www.efojs.com", "http://127.0.0.1:4000"];
  let allowedOrigin = allowedOrigins[0];
  if (allowedOrigins.indexOf(event.headers.origin) != -1) {
    allowedOrigin = event.headers.origin;
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
      statusCode = 200;
    } catch (e) {
      responseBody = `Unable to delete item: ${e}`;
      statusCode = 403;
    }

    return returnResponse(statusCode, allowedOrigin, responseBody);
  } else {
    return returnResponse(200, allowedOrigin, "");
  }

};


function returnResponse(statusCode, allowedOrigin, responseBody) {
  const response = {
      statusCode: statusCode,
      headers: {
        "Content-Type": "appliaction/json",
        "Access-Control-Allow-Origin": allowedOrigin
      },
      body: responseBody
  };
  return response;
}
