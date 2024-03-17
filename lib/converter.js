'use strict';

class Converter {
  constructor(convertingMarkup) {
    this.markup = convertingMarkup;
    this.isOpened = false;
    this.isPreformatted = false;
  }

  fromMarkdown(mdText) {
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
      const tag = this.isPreformatted
        ? this.markup['```'].open
        : this.markup['```'].close;

      if (this.isPreformatted && !this.isOpened) {
        this.isOpened = true;
        return this.markup['\n'].open + tag;
      }
      return tag;
    }

    if (this.isPreformatted) return line;

    if (!line && this.isOpened) {
      this.isOpened = false;
      return this.markup['\n'].close;
    } else if (!line) return null;

    const validLine = this.validateLine(line);
    let processedLine = this.replaceFlags(validLine);

    if (!this.isOpened) {
      processedLine = this.markup['\n'].open + processedLine;
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
        throw new Error('Found unclosed md flag!');

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
            throw new Error('Found nested md flag!');
        }
      }
    }
    return line;
  }

  replaceFlags(line) {
    let replacedLine = line;

    for (const [flag, tags] of Object.entries(this.markup)) {
      const { allOpen, allClose } = this.parseFlags(replacedLine, flag);

      for (let i = 0; i < allOpen.length; i++) {
        const openFlagPart = allOpen[i][0];
        const closeFlagPart = allClose[i][0];

        replacedLine = replacedLine
          .replace(openFlagPart, openFlagPart.replace(flag, tags.open))
          .replace(closeFlagPart, closeFlagPart.replace(flag, tags.close));
      }
    }
    return replacedLine;
  }

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
