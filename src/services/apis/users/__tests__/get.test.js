'use strict';

const get = require('../get');
jest.mock('../../../../utils/dynamodb');

beforeEach(async () => {});

test('User list', async () => {
  let res = await get.list();
  expect(Array.isArray(res)).toBe(true);
});

test('User get', async () => {
  let res = await get.get('c376eaa3-6f78-4f5b-905c-a77d88a15f8e');
  expect(typeof res).toBe('object');
  expect(typeof res.id).toBe('string');
});
