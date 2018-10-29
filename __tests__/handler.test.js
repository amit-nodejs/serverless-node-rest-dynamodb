'use strict';

const handler = require('../handler');
jest.mock('../src/utils/dynamodb');

beforeEach(async () => {});

test('User create with valid payload', async () => {
  let user = {
    firstName: 'TestFirst',
    lastName: 'TestLast',
    email: 'test@example.com'
  };
  let res = await handler.usersCreate({
    body: JSON.stringify(user)
  });
  res.body = JSON.parse(res.body);
  expect(res.statusCode).toBe(200);
  expect(typeof res.body).toBe('object');
  expect(typeof res.body.id).toBe('string');
  expect(res.body.firstName).toBe(user.firstName);
  expect(res.body.lastName).toBe(user.lastName);
  expect(res.body.email).toBe(user.email);
});

test('User create with invalid payload', async () => {
  let res = await handler.usersCreate({
    body: {
      firstName: 'TestFirst',
      lastName: 'TestLast',
      email: 'test@example.com'
    }
  });
  res.body = JSON.parse(res.body);
  expect(res.statusCode).toBe(500);
});

test('User delete with valid params', async () => {
  let res = await handler.usersDelete({
    pathParameters: { userId: 'c376eaa3-6f78-4f5b-905c-a77d88a15f8e' }
  });
  res.body = JSON.parse(res.body);
  expect(res.statusCode).toBe(200);
  expect(typeof res.body).toBe('object');
});

test('User delete with invalid params', async () => {
  let res = await handler.usersDelete({
    pathParameter: { userId: 'c376eaa3-6f78-4f5b-905c-a77d88a15f8e' }
  });
  res.body = JSON.parse(res.body);
  expect(res.statusCode).toBe(500);
});

test('User list all', async () => {
  let res = await handler.usersList();
  res.body = JSON.parse(res.body);
  expect(res.statusCode).toBe(200);
  expect(typeof res.body).toBe('object');
});

test('User fetch by userId', async () => {
  let res = await handler.usersGet({
    pathParameters: { userId: 'c376eaa3-6f78-4f5b-905c-a77d88a15f8e' }
  });
  res.body = JSON.parse(res.body);
  expect(res.statusCode).toBe(200);
  expect(typeof res.body).toBe('object');
});

test('User update by userId', async () => {
  let user = {
    firstName: 'TestFirst',
    lastName: 'TestLast Updated',
    email: 'test@example.com'
  };
  let res = await handler.usersUpdate({
    body: JSON.stringify(user),
    pathParameters: { userId: 'c376eaa3-6f78-4f5b-905c-a77d88a15f8e' }
  });
  res.body = JSON.parse(res.body);
  expect(res.statusCode).toBe(200);
  expect(typeof res.body).toBe('object');
  expect(typeof res.body.id).toBe('string');
  expect(res.body.firstName).toBe(user.firstName);
  expect(res.body.lastName).toBe(user.lastName);
  expect(res.body.email).toBe(user.email);
});
