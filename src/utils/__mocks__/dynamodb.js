'use strict';

const dynamodb = jest.genMockFromModule('../dynamodb');

dynamodb.createItem = () => {
  return true;
};
dynamodb.deleteItem = () => {
  return true;
};
dynamodb.listItem = () => {
  return {
    Items: [
      {
        id: 'c376eaa3-6f78-4f5b-905c-a77d88a15f8e',
        firstName: 'TestFirst',
        lastName: 'TestLast',
        email: 'test@example.com'
      }
    ]
  };
};
dynamodb.getItem = () => {
  return {
    Item: {
      id: 'c376eaa3-6f78-4f5b-905c-a77d88a15f8e',
      firstName: 'TestFirst',
      lastName: 'TestLast',
      email: 'test@example.com'
    }
  };
};
dynamodb.updateUser = () => {
  return true;
};
module.exports = dynamodb;
