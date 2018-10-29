'use strict';

const exec = require('child_process').exec;
const { normalize } = require('path');

/****************** Unit / Integration test config *********************/
process.env.IS_LOCAL_TEST = 1; // Set this 1 -> To point local env. 0 -> to point cloud

// Endpoints
process.env.API_ENDPOINT =
  process.env.IS_LOCAL_TEST == 1
    ? 'http://localhost:3000'
    : 'https://x3f8tsdd63.execute-api.us-east-1.amazonaws.com/dev';

const CURR_DIR = process.cwd();
function executeCmd(cmd) {
  return new Promise((resolve, reject) => {
    let cmdProcess = exec(cmd, (err, stdout, stderr) => {
      if (err) {
        return reject(err);
      }
    });
    cmdProcess.stdout.on('data', data => {
      if (data.match(/Offline listening on/)) {
        return resolve(true);
      }
    });
  });
}

async function init() {
  if (
    process.env.npm_lifecycle_event == 'integration' &&
    process.env.IS_LOCAL_TEST == 1
  ) {
    await executeCmd(
      `cd ${normalize(`${CURR_DIR}`)} && serverless offline start`
    );
  } else {
    return;
  }
}

module.exports = async function() {
  await init();
};
