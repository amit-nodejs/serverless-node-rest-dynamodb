'use strict';

const update = require('../update');
jest.mock('../../../../utils/dynamodb');

beforeEach(async () => {});

test('PUT /users/{userId} 200', async () => {
  let user = {
    firstName: 'TestFirst',
    lastName: 'TestLast Updated',
    email: 'test@example.com',
    id: 'c376eaa3-6f78-4f5b-905c-a77d88a15f8e'
  };
  let res = await update.do(user);
  expect(typeof res).toBe('object');
  expect(typeof res.id).toBe('string');
  expect(res.firstName).toBe(user.firstName);
  expect(res.lastName).toBe(user.lastName);
  expect(res.email).toBe(user.email);
});
