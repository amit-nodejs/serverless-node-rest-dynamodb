/************* Wrapper for DynamoDB and can be used as ORM ***************/
'use strict';

// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');

const DynamoDBConfig = {
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION
};

// Set the dynamodb local configurations
if (process.env.DYNAMODB_LOCAL == 1 && process.env.IS_OFFLINE) {
  Object.assign(DynamoDBConfig, {
    region: process.env.DYNAMODB_LOCAL_REGION,
    endpoint: process.env.DYNAMODB_LOCAL_ENDPOINT
  });
}

// Set the configurations
AWS.config.update(DynamoDBConfig);

// Create the DynamoDB service object
const docClient = new AWS.DynamoDB.DocumentClient();

module.exports.createItem = paramsData => {
  var params = {
    TableName: paramsData.tableName,
    Item: paramsData.addVal
  };

  return new Promise((resolve, reject) => {
    docClient.put(params, (err, res) => {
      if (err) {
        return reject(err);
      }
      resolve(res);
    });
  });
};

module.exports.updateItem = paramsData => {
  var params = {
    TableName: paramsData.tableName,
    Key: paramsData.key,
    UpdateExpression: 'set #updateKey = :updateVal',
    ExpressionAttributeValues: {
      ':updateKey': paramsData.updateKey
    },
    ExpressionAttributeNames: {
      '#keyName': paramsData.updateVal
    },
    ReturnValues: 'UPDATED_NEW'
  };

  return new Promise((resolve, reject) => {
    docClient.update(params, (err, res) => {
      if (err) {
        return reject(err);
      }
      resolve(res);
    });
  });
};

module.exports.updateUser = paramsData => {
  var params = {
    TableName: paramsData.tableName,
    Key: paramsData.key,
    ConditionExpression: 'id = :userId',
    UpdateExpression:
      'set firstName = :firstName, lastName = :lastName, email = :email',
    ExpressionAttributeValues: {
      ':firstName': paramsData.updateVal.firstName,
      ':lastName': paramsData.updateVal.lastName,
      ':email': paramsData.updateVal.email,
      ':userId': paramsData.updateVal.id
    }
  };

  return new Promise((resolve, reject) => {
    docClient.update(params, (err, res) => {
      if (err) {
        return reject(err);
      }
      resolve(res);
    });
  });
};

module.exports.getItem = paramsData => {
  var params = {
    TableName: paramsData.tableName,
    Key: paramsData.key
  };

  return new Promise((resolve, reject) => {
    docClient.get(params, (err, res) => {
      if (err) {
        return reject(err);
      }
      resolve(res);
    });
  });
};

module.exports.deleteItem = paramsData => {
  var params = {
    TableName: paramsData.tableName,
    Key: paramsData.key
  };

  return new Promise((resolve, reject) => {
    docClient.delete(params, (err, res) => {
      if (err) {
        return reject(err);
      }
      resolve(res);
    });
  });
};

module.exports.listItem = paramsData => {
  var params = {
    TableName: paramsData.tableName
  };

  return new Promise((resolve, reject) => {
    docClient.scan(params, (err, res) => {
      if (err) {
        return reject(err);
      }
      resolve(res);
    });
  });
};
