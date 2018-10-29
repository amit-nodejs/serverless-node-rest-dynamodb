'use strict';

const create = require('../create');
jest.mock('../../../../utils/dynamodb');

beforeEach(async () => {});

test('User create', async () => {
  let user = {
    firstName: 'TestFirst',
    lastName: 'TestLast',
    email: 'test@example.com'
  };
  let res = await create.do(user);
  expect(typeof res).toBe('object');
  expect(typeof res.id).toBe('string');
  expect(res.firstName).toBe(user.firstName);
  expect(res.lastName).toBe(user.lastName);
  expect(res.email).toBe(user.email);
});
