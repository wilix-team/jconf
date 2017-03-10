# JConf - Simple node.js config engine

## Overview
It is really simple configuration module. Das't require any options for run.  
Just put some config files to your project root and you are ready!

## Examples
This examples shows how to use jconf in 10 seconds.

For example, you have a default config like: 
```json
{
  "server": {
    "host": "localhost",
    "port": 3000
  },
  "database": {
    "host": "rds.server.com",
    "port": 3306,
    "user": "someUser",
    "password": "somePassword"
  }
}
```

This is config you use in one or more servers, but you want keep it in your repository for simple deploy.  
But, what about your local machine or other developers?

Create file "**config.js**" or "**config.json**" in your project dir and just use:
```javascript
const config = require('jconf');

console.log(config); 
/*
{
  "server": {
    "host": "localhost",
    "port": 3000
  },
  "database": {
    "host": "rds.server.com",
    "port": 3306,
    "user": "someUser",
    "password": "somePassword"
  }
}
*/
```

Now, just create new file, called "**config.local.js**" or "**config.local.json**" with content:
```json
{
  "server": {
    "port": 8000
  },
  "database": {
    "host": "localhost",
    "user": "root",
    "password": ""
  }
}
```

Run previous example and you get merged config like:

```json
{
  "server": {
      "host": "localhost",
      "port": 8000
    },
    "database": {
      "host": "localhost",
      "port": 3306,
      "user": "root",
      "password": ""
    }
}
```

Now add "**config.local.json**" to your **.gitignore** file and that allows you always keep actual config in repo and 
use different options in local machine.

**Pretty simple? :)**

### What a minute! What about different environments?

Just create additional config files like:
 - config.production.json
 - config.development.json
 - config.etc.json
 
 And run your script with NODE_ENV param:
 
```bash
NODE_ENV=produnction node app.js
# jconf load config.js and after that
# merge with config.production.json
```

```bash
NODE_ENV=development node app.js
# jconf load config.js and after that
# merge with config.development.json
```

**Still is simple? ;)**

### Advanced  

jconf load and merge configs in next order:
 - config.js or config.json
 - config.local.js or config.local.json
 - config.NODE_ENV.js or config.NODE_ENV.json
 
 Each next file, overrides previous config via merge way
  
### Options

You can pass additional options to jconf via global object:

- `baseName` - Change default config file name prefix for files. Default: `config`
- `configPath` - Change default config search path. Default: `script start dir`
- `excludeConfigName` - After loading, jconf place to config object property `_configName` with loaded config name.
 if you don't need it, just set `true`. Default: `false`
- `debug` - If true, jconf will be print debug output to via console.log. Default: `false`

### Example

```javascript
'use strict';

global.jconf = {
  configPath: __dirname + '/config',
  excludeConfigName: true
}
const config = require('jconf');
```

Why `global` ???!!!  
jconf try to load your configs on first require and cache result config to nodejs modules cache. 
It helps reduce file operations on application load or in dynamic require.  

At this moment I don't have any idea, how change it and keep caching, pull requests are welcome!