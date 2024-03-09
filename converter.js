'use strict';

class Converter {
  constructor() {
    this.markup = {
      '**': 'b',
      '_': 'i',
      '`': 'tt',
      '```': 'pre',
      '\n': 'p',
    };
  }
}

module.exports = { Converter };
