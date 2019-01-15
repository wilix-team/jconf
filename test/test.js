'use strict';
global.jconf = {
  configPath: __dirname,
  excludeConfigName: true
}
process.env.NODE_ENV = "test";
const expect = require ('chai').expect;
const jsconf = require ('../index');

describe("jsconf", function() {

  it("should merge config files", function() {
    const expectedObject = {
        "config": {
          "test": {
            "default": "true",
            "local": "true",
            "env": "true"
          }
        }
      };
    expect(jsconf).to.deep.equal(expectedObject);
  });

});