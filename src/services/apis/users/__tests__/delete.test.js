'use strict';

const del = require('../delete');
jest.mock('../../../../utils/dynamodb');

beforeEach(async () => {});

test('User delete', async () => {
  let res = await del.do('c376eaa3-6f78-4f5b-905c-a77d88a15f8e');
  expect(typeof res).toBe('undefined');
});
