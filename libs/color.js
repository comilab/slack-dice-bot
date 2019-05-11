'use strict';

const _ = require('lodash');

class Color {
  constructor(values) {
    this.values = values
      .map((value) => _.toString(value))
      .map((value) => Math.min(255, Math.max(0, value)));
  }

  static generate() {
    const values = _.times(3, () => {
      return _.random(0, 255);
    });
    return new Color(values);
  }

  getValues() {
    return this.values;
  }

  toHexString() {
    const values = this.getValues()
      .map((value) => value.toString(16))
      .map((value) => _.padStart(value, 2, '0'))
    return `#${values.join('')}`;
  }

  toRgbString() {
    return `rgb(${this.getValues().join(',')})`;
  }

  toString() {
    return this.toHex();
  }
}

module.exports = Color;