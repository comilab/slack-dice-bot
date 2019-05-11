'use strict';

const _ = require('lodash');

const Formula = require('./formula');
const Color = require('./color');

class ColorFormula extends Formula {
  constructor (str) {
    super(str);

    const matches = ColorFormula.match(str);

    this.formula = matches[0];

    this.result = [];

    if (matches.length === 1) {
      this.result.push(Color.generate());
    } else {
      this.result = _.times(matches[1], () => Color.generate());
    }
  }

  static getRegExp () {
    return /color(s?\[([0-9]+)\])?/i;
  }

  static match (str) {
    return super.match(str, [0, 2]);
  }

  toRgbString (glue = ', ') {
    return this.getResult()
      .map(color => color.toRgbString())
      .join(glue);
  }

  toHexString (glue = ', ') {
    return this.getResult()
      .map(color => color.toHexString())
      .join(glue);
  }
}

module.exports = ColorFormula;