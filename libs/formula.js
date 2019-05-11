'use strict';

const _ = require('lodash');

class Formula {
  constructor (str) {

  }

  static getRegExp () {
    return /.+/;
  }

  static isValid (str) {
    return this.getRegExp().test(str);
  }

  static match (str, keys) {
    if (!this.isValid(str)) {
      throw 'Parameter is invalid';
      return false;
    }
    const matches = str.match(this.getRegExp());
    if (!keys) {
      return matches;
    }
    const results = keys.map(key => matches[key]);
    return _.compact(results);
  }

  getFormula () {
    return this.formula;
  }

  getResult () {
    return this.result;
  }

  toString () {
    return this.getResult().toString();
  }
}

module.exports = Formula;