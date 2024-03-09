'use strict';

class Converter {
  constructor() {
    this.markup = {
      '**': 'b',
      _: 'i',
      '`': 'tt',
      '```': 'pre',
      '\n': 'p',
    };
  }

  logError(error) {
    console.error(`\x1b[31m${error}\x1b[0m`);
    process.exit(1);
  }

  toHTML(mdText) {
    const lines = mdText.split('\r\n');
    const result = [];

    for (let i = 0; i <= lines.length; i++) {
      const line = lines[i];
      const resultLine = this.processLine(line);

      if (typeof resultLine === 'string') result.push(resultLine);
    }
    return result.join('\n').replace(/\n<\/p>/g, '</p>');
  }

  processLine(line) {}
}

module.exports = { Converter };
