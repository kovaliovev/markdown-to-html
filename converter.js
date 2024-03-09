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

    this.isOpened = false;
    this.isPreformatted = false;
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

  processLine(line) {
    if (line === '```') {
      this.isPreformatted = !this.isPreformatted;
      const tag = this.isPreformatted ? '<pre>' : '</pre>';

      if (this.isPreformatted && !this.isOpened) {
        this.isOpened = true;
        return `<p>${tag}`;
      }
      return tag;
    }

    if (this.isPreformatted) return line;

    if (!line && this.isOpened) {
      this.isOpened = false;
      return '</p>';
    } else if (!line) return null;

    const validLine = this.validateLine(line);
    let processedLine = this.replaceFlags(validLine);

    if (!this.isOpened) {
      processedLine = `<p>${processedLine}`;
      this.isOpened = true;
    }
    return processedLine;
  }

  validateLine(line) {}

  replaceFlags(line) {}
}

module.exports = { Converter };
