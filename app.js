var entryPoint = require("./src/entry");

async function getApp() {
  return entryPoint.initApp();
}

module.exports = {
  getApp
};
