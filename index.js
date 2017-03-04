'use strict';

const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const appPath = process.cwd();

class Config {
  constructor(options) {
    this.extensions = ['js', 'json'];
    this.config = null;
    
    options = options || global['jconf'] || {};
    this.debug = options['debug'] || false;
    this.baseName = options['baseName'] || 'config';
    this.configPath = options['configPath'] || appPath;
    this.excludeConfigName = options['excludeConfigName'] || false;
    
    this._loadBase();
    this._loadLocalConfig();
    this._loadEnvConfig();
    
    return this.config;
  }
  
  _findFile(baseName) {
    let found = false;
    this.extensions.forEach((ext) => {
      if (found) {
        return;
      }
      this.debug && console.log('Searching', baseName + '.' + ext, 'in', this.configPath);
      if (fs.existsSync(path.join(this.configPath, baseName + '.' + ext))) {
        this.debug && console.log('Loaded', baseName + '.' + ext, 'in', this.configPath);
        found = require(path.join(this.configPath, baseName + '.' + ext));
      }
    });
    return found;
  }
  
  _loadBase() {
    this.config = this._findFile(this.baseName);
    
    if (!this.config) {
      console.warn('Configuration file is empty or wrong');
      this.config = {};
    }
    if (!this.excludeConfigName) {
      this.config._configName = 'base';
    }
  }
  
  _loadLocalConfig() {
    let localConfig = this._findFile(this.baseName + '.local');
    
    if (localConfig && typeof localConfig === 'object') {
      this.debug && console.info('Use local config file');
      _.merge(this.config, localConfig);
      
      if (!this.excludeConfigName) {
        this.config._configName = 'local';
      }
    }
  }
  
  _loadEnvConfig() {
    if (process.env.NODE_ENV && process.env.NODE_ENV.length > 0) {
      let envConfig = this._findFile(this.baseName + '.' + process.env.NODE_ENV );
      
      if (envConfig && typeof envConfig === 'object') {
        this.debug && console.info('Use env file', this.baseName + '.' + process.env.NODE_ENV, 'config file');
        _.merge(this.config, envConfig);

        if (!this.excludeConfigName) {
          this.config._configName = process.env.NODE_ENV;
        }
      }
    }
  }
}

module.exports = new Config();
