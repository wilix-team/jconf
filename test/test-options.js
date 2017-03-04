'use strict';

const path = require('path');

global.jconf = {
  configPath: path.join(__dirname, 'configs')
};

const config = require('./../');

console.log(config);