'use strict';

const _ = require('lodash');
const math = require('mathjs');

const Formula = require('./formula');
const Dice = require('./dice');

class DiceFormula extends Formula {
  constructor(str) {
    super(str);

    const matches = DiceFormula.match(str);

    this.formula = _.trim(matches[0]);

    this.rolls = [];
    this.rolledFormula = this.getFormula()
      .replace(/([0-9]+)d([0-9]+)/ig, (exp, p1, p2) => {
        const dice = Dice.roll(_.toInteger(p2), _.toInteger(p1));
        this.rolls.push(dice);
        return dice.toString();
      });

    let i = -1;
    this.mathFormula = this.getFormula()
      .replace(/([0-9]+)d([0-9]+)/ig, () => {
        i++;
        return this.rolls[i].getTotal();
      });

    this.node = this.leftNode = math.parse(this.getMathFormula());
    if (this.isComparison()) {
      this.leftNode = this.node.args[0];
    }
  }

  static match (str) {
    return super.match(str, [0]);
  }

  static getRegExp () {
    return /[0-9d+-/\*()^<>= ]+/i;
  }

  isComparison () {
    return this.node.op && this.node.op.match(/<|>|=/);
  }

  getRolledFormula () {
    return this.rolledFormula;
  }

  getMathFormula () {
    return this.mathFormula;
  }

  getLeftResult () {
    return this.leftNode.eval();
  }

  getResult () {
    return this.node.eval();
  }
}

module.exports = DiceFormula;