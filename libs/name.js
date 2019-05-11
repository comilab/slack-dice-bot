'use strict';

const _ = require('lodash');

class Name {
  static generate(min = 2, max = 9) {
    // ゥは使わない気がするので一旦外す
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンヴガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポァィェォッャュョー'.split('');
    const prefixes1 = 'ウクグツフブプヴ'.split('');
    const prefixes2 = 'ツフブプヴ'.split('');
    const prefixes3 = 'キシチニヒミリギジヂビピ'.split('');

    if (arguments.length === 1 || min > max) {
      max = min;
    }
    const length = _.random(min, max);

    let name = '';
    while (name.length < length) {
      const c = _.sample(chars);
      if (('ンァィゥェォッャュョー'.match(c) && !name.length)
        || ('ァィゥェォャュョ'.match(c) && (name.length + 2) == length)
        || ('ッ'.match(c) && (name.length + 1) == length)
      ) {
        continue;
      }
      if ('ィェォ'.match(c)) {
        name += _.sample(prefixes1) + c;
      } else if ('ァ'.match(c)) {
        name += _.sample(prefixes2) + c;
      } else if ('ャュョ'.match(c)) {
        name += _.sample(prefixes3) + c;
      } else {
        name += c;
      }
    }
    return name;
  }
}

module.exports = Name;