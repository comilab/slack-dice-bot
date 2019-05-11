'use strict';

const _ = require('lodash');

const Formula = require('./formula');
const Name = require('./name');

class NameFormula extends Formula {
  constructor (str) {
    super(str);

    const matches = NameFormula.match(str);
    this.formula = matches[0];

    if (matches.length === 1) {
      this.result = Name.generate();
    } else if (matches.length === 2) {
      this.result = Name.generate(matches[1]);
    } else {
      this.result = Name.generate(matches[1], matches[2]);
    }
  }

  static getRegExp () {
  // すごく分かりにくいけど name, name[2], name[2,9] に対応している
  return /name(\[([0-9]+)(,([0-9]+)?)?\])?/i;
  }

  static match (str) {
    return super.match(str, [0, 2, 4]);
  }
}

module.exports = NameFormula;