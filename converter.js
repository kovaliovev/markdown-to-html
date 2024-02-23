'use strict';

class Converter {
  constructor() {
    this.markup = {
      '**': 'b',
      '~~': 'del',
      '_': 'i',
      '`': 'code',
      '```': 'pre',
    };
  }
}

module.exports = { Converter };
