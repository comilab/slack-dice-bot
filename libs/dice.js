'use strict';

const _ = require('lodash');

class Dice {
  constructor(values) {
    this.values = values;
  }

  static roll (dim = 6, num = 1) {
    const values = _.times(num, () => _.random(1, dim));
    return new Dice(values);
  }

  getValues () {
    return this.values;
  }

  getTotal () {
    return _.sum(this.getValues());
  }

  toString () {
    return `${this.getTotal()}[${this.getValues().join(',')}]`;
  }
}

module.exports = Dice;