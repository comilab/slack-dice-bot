'use strict';

const app = require('express')();
const bodyParser = require('body-parser');

const _ = require('lodash');

const Dice = require('./libs/dice');
const DiceFormula = require('./libs/dice_formula');
const ColorFormula = require('./libs/color_formula');
const NameFormula = require('./libs/name_formula');

app.use(bodyParser.urlencoded({ extended: true }));

app.all('/', function(req, res) {
  const data = (req.method === 'POST') ? req.body : req.query;

  if (_.has(process.env, 'NODE_SLACK_TOKEN') && data.token !== process.env.NODE_SLACK_TOKEN) {
    return res.send({status: 403});
  }

  const text = _.unescape(data.text).replace(/@?dicebot\s*/, '');

  let matches;

  // choice
  matches = text.match(/choice\[(.+?)\]/i);
  if (matches) {
    const choices = matches[1].split(',');
    return res.send({
      text: [
        '`' + matches[0] + '`',
        '->',
        `*${_.sample(choices)}*`
      ].join(' ')
    });
  }

  // color
  if (ColorFormula.isValid(text)) {
    const formula = new ColorFormula(text);
    return res.send({
      text: [
        '`' + formula.getFormula() + '`',
        '->',
        '`' + formula.toRgbString() + '`',
        '->',
        `*${formula.toHexString('*, *')}*`
      ].join(' ')
    });
  }

  // name
  if (NameFormula.isValid(text)) {
    const name = new NameFormula(text);
    return res.send({
      text: [
        '`' + name.getFormula() + '`',
        '->',
        `*${name.toString()}*`
      ].join(' ')
    });
  }

  // D66
  if (text.match(/D66/i)) {
    const dice = Dice.roll(6, 2);
    return res.send({
      text: [
        '`D66`',
        '->',
        '`[' + dice.getValues().join(',') + ']`',
        '->',
        `*${dice.getValues().sort().join('')}*`
      ].join(' ')
    });
  }

  // nDn
  if (!DiceFormula.isValid(text)) {
    return res.status(404).send();
  }

  const formula = new DiceFormula(text);
  const result = [
    '`' + formula.getFormula() + '`',
    '->',
    '`' + formula.getRolledFormula() + '`',
    '->',
    `*${formula.getLeftResult()}*`
  ];

  if (formula.isComparison()) {
    result.push('...');
    if (formula.getResult()) {
      result.push(':ok:');
    } else {
      result.push(':ng:');
    }
  }

  res.send({
    text: result.join(' ')
  });
});

var server = app.listen(8006, '127.0.0.1', function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('app listening at http://%s:%s', host, port);
});
