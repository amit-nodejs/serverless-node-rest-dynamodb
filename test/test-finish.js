'use strict';

const kill = require('kill-port');

function closePort() {
  if (
    process.env.npm_lifecycle_event == 'integration' &&
    process.env.IS_LOCAL_TEST == 1
  ) {
    kill(8000);
    kill(3000);
    return setTimeout(() => process.exit(), 1000);
  } else {
    return setTimeout(() => process.exit(), 1000);
  }
}

module.exports = async function() {
  return await closePort();
};
