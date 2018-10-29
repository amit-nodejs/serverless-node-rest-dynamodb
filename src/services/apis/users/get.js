'use strict';

const dynamodb = require('../../../utils/dynamodb');

module.exports.get = async data => {
  var params = {
    tableName: process.env.TABLE_USER,
    key: { id: data }
  };

  var res = await dynamodb.getItem(params);

  return res.Item;
};

module.exports.list = async data => {
  var params = {
    tableName: process.env.TABLE_USER
  };

  var res = await dynamodb.listItem(params);
  
  return res.Items;
};
