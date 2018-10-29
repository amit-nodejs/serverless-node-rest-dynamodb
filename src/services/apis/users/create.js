'use strict';

const uuid = require('uuid');
const dynamodb = require('../../../utils/dynamodb');

module.exports.do = async data => {
  var params = {
    tableName: process.env.TABLE_USER,
    addVal: Object.assign({ id: uuid.v4() }, data)
  };

  await dynamodb.createItem(params);
  
  return params.addVal;
};
