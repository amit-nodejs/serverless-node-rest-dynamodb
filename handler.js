/***************** Wrapper for services and can be used as middleware *****************/
'use strict';

const configApi = require('./src/config/api');
const apisUsersCreate = require('./src/services/apis/users/create');
const apisUsersUpdate = require('./src/services/apis/users/update');
const apisUsersDelete = require('./src/services/apis/users/delete');
const apisUsersGet = require('./src/services/apis/users/get');

const formatErr = err => {
  var errMsg = err && JSON.stringify(err) == '{}' ? err.toString() : err;
  return { status: 'error', message: errMsg };
};

module.exports.usersCreate = async (event, context) => {
  try {
    let res = await apisUsersCreate.do(JSON.parse(event.body));

    return {
      statusCode: configApi.STATUS_CODE.SUCCESS,
      headers: configApi.HEADER.DEFAULT,
      body: res
        ? JSON.stringify(res)
        : JSON.stringify(configApi.SUCCESS_MSG.DEFAULT)
    };
  } catch (e) {
    return {
      statusCode: configApi.STATUS_CODE.ERROR,
      headers: configApi.HEADER.DEFAULT,
      body:
        process.env.DEBUG == 1
          ? JSON.stringify(formatErr(e))
          : JSON.stringify(configApi.ERROR_MSG.DEFAULT)
    };
  }
};

module.exports.usersDelete = async (event, context) => {
  try {
    let res = await apisUsersDelete.do(event.pathParameters.userId);

    return {
      statusCode: configApi.STATUS_CODE.SUCCESS,
      headers: configApi.HEADER.DEFAULT,
      body: res
        ? JSON.stringify(res)
        : JSON.stringify(configApi.SUCCESS_MSG.DEFAULT)
    };
  } catch (e) {
    return {
      statusCode: configApi.STATUS_CODE.ERROR,
      headers: configApi.HEADER.DEFAULT,
      body:
        process.env.DEBUG == 1
          ? JSON.stringify(formatErr(e))
          : JSON.stringify(configApi.ERROR_MSG.DEFAULT)
    };
  }
};

module.exports.usersGet = async (event, context) => {
  try {
    let res = await apisUsersGet.get(event.pathParameters.userId);

    return {
      statusCode: res
        ? configApi.STATUS_CODE.SUCCESS
        : configApi.STATUS_CODE.NOT_FOUND,
      headers: configApi.HEADER.DEFAULT,
      body: res ? JSON.stringify(res) : JSON.stringify({ message: 'Not found' })
    };
  } catch (e) {
    return {
      statusCode: configApi.STATUS_CODE.ERROR,
      headers: configApi.HEADER.DEFAULT,
      body:
        process.env.DEBUG == 1
          ? JSON.stringify(formatErr(e))
          : JSON.stringify(configApi.ERROR_MSG.DEFAULT)
    };
  }
};

module.exports.usersList = async (event, context) => {
  try {
    let res = await apisUsersGet.list(null);

    return {
      statusCode: configApi.STATUS_CODE.SUCCESS,
      headers: configApi.HEADER.DEFAULT,
      body: res
        ? JSON.stringify(res)
        : JSON.stringify(configApi.SUCCESS_MSG.DEFAULT)
    };
  } catch (e) {
    return {
      statusCode: configApi.STATUS_CODE.ERROR,
      headers: configApi.HEADER.DEFAULT,
      body:
        process.env.DEBUG == 1
          ? JSON.stringify(formatErr(e))
          : JSON.stringify(configApi.ERROR_MSG.DEFAULT)
    };
  }
};

module.exports.usersUpdate = async (event, context) => {
  try {
    let res = await apisUsersUpdate.do(
      Object.assign(JSON.parse(event.body), { id: event.pathParameters.userId })
    );

    return {
      statusCode: configApi.STATUS_CODE.SUCCESS,
      headers: configApi.HEADER.DEFAULT,
      body: res
        ? JSON.stringify(res)
        : JSON.stringify(configApi.SUCCESS_MSG.DEFAULT)
    };
  } catch (e) {
    return {
      statusCode: configApi.STATUS_CODE.ERROR,
      headers: configApi.HEADER.DEFAULT,
      body:
        process.env.DEBUG == 1
          ? JSON.stringify(formatErr(e))
          : JSON.stringify(configApi.ERROR_MSG.DEFAULT)
    };
  }
};
