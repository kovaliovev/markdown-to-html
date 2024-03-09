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

  validateLine(line) {
    const mdFlags = Object.keys(this.markup);

    for (const flag of mdFlags) {
      const { allOpen, allClose } = this.parseFlags(line, flag);

      if (!allOpen.length && !allClose.length) continue;
      else if (allOpen.length > allClose.length)
        this.logError('Found unclosed md flag!');

      for (let i = 0; i < allOpen.length; i++) {
        const startIndex = allOpen[i].index;
        const endIndex = allClose[i].index + allClose[i][0].trim().length;

        const text = line
          .substring(startIndex, endIndex)
          .trim()
          .slice(flag.length, -flag.length);

        for (const nestedFlag of mdFlags) {
          const { allOpen: allNestedOpen, allClose: allNestedClose } =
            this.parseFlags(text, nestedFlag);

          if (
            allNestedOpen.length &&
            allNestedOpen.length === allNestedClose.length
          )
            this.logError('Found nested md flag!');
        }
      }
    }
    return line;
  }

  replaceFlags(line) {}

  parseFlags(line, flag) {
    const symbol = flag[0];
    const regExp = flag.replace(new RegExp(`\\${symbol}`, 'g'), `\\${symbol}`);

    return {
      allOpen: [...line.matchAll(new RegExp(`(?:\\s|^)${regExp}[^\\s]`, 'g'))],
      allClose: [...line.matchAll(new RegExp(`[^\\s]${regExp}(?:\\s|$)`, 'g'))],
    };
  }
}

module.exports = { Converter };
