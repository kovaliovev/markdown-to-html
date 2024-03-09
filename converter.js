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

  logError(error) {
    console.error(`\x1b[31m${error}\x1b[0m`);
    process.exit(1);
  }
}

module.exports = { Converter };
