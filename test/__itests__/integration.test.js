'use strict';

const request = require('request');

function reqProcess(req) {
  return new Promise((resolve, reject) => {
    request(req, function(err, res, body) {
      if (err) {
        return reject(err);
      }
      resolve(res);
    });
  });
}

beforeEach(async () => {});

var userRes;
test('POST /users 200', async () => {
  let user = {
    firstName: 'TestFirst',
    lastName: 'TestLast',
    email: 'test@example.com'
  };
  let res = await reqProcess({
    uri: `${process.env.API_ENDPOINT}/users`,
    method: 'POST',
    body: JSON.stringify(user)
  });
  res.body = JSON.parse(res.body);
  userRes = res;
  expect(res.statusCode).toBe(200);
  expect(typeof res.body).toBe('object');
  expect(typeof res.body.id).toBe('string');
  expect(res.body.firstName).toBe(user.firstName);
  expect(res.body.lastName).toBe(user.lastName);
  expect(res.body.email).toBe(user.email);
});

test('POST /users 500', async () => {
  let user = {
    firstName: '',
    lastName: 'TestLast',
    email: 'test@example.com'
  };
  let res = await reqProcess({
    uri: `${process.env.API_ENDPOINT}/users`,
    method: 'POST',
    body: JSON.stringify(user)
  });
  res.body = JSON.parse(res.body);
  expect(res.statusCode).toBe(500);
});

test('GET /users/{userId} 200', async () => {
  let res = await reqProcess({
    uri: `${process.env.API_ENDPOINT}/users/${userRes.body.id}`,
    method: 'GET'
  });
  res.body = JSON.parse(res.body);
  expect(res.statusCode).toBe(200);
  expect(typeof res.body).toBe('object');
});

test('GET /users/{userId} 404', async () => {
  let res = await reqProcess({
    uri: `${process.env.API_ENDPOINT}/users/A123456`,
    method: 'GET'
  });
  res.body = JSON.parse(res.body);
  expect(res.statusCode).toBe(404);
});

test('GET /users 200', async () => {
  let res = await reqProcess({
    uri: `${process.env.API_ENDPOINT}/users`,
    method: 'GET'
  });
  res.body = JSON.parse(res.body);
  expect(res.statusCode).toBe(200);
  expect(typeof res.body).toBe('object');
});

test('PUT /users/{userId} 200', async () => {
  let user = {
    firstName: 'TestFirst',
    lastName: 'TestLast Updated',
    email: 'test@example.com'
  };
  let res = await reqProcess({
    uri: `${process.env.API_ENDPOINT}/users/${userRes.body.id}`,
    method: 'PUT',
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

test('DELETE /users/{userId} 200', async () => {
  let res = await reqProcess({
    uri: `${process.env.API_ENDPOINT}/users/${userRes.body.id}`,
    method: 'DELETE'
  });
  res.body = JSON.parse(res.body);
  expect(res.statusCode).toBe(200);
  expect(typeof res.body).toBe('object');
});
