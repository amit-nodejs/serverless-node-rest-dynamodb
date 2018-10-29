'use strict';

const dynamodb = require('../../../utils/dynamodb');

module.exports.do = async data => {
  var params = {
    tableName: process.env.TABLE_USER,
    key: { id: data.id },
    updateVal: data
  };

  await dynamodb.updateUser(params);
  
  return params.updateVal;
};
