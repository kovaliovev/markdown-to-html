'use strict';

const fs = require('node:fs/promises');
const { program } = require('commander');
const { Converter } = require('./converter.js');

const MARKUP = {
  '**': 'b',
  '_': 'i',
  '`': 'tt',
  '```': 'pre',
  '\n': 'p',
};

const converter = new Converter(MARKUP);

program
  .version('1.0.0')
  .argument('<input>', 'Path to the input Markdown file')
  .option('-o, --output <output>', 'Path to the output HTML file')
  .parse(process.argv);

(async () => {
  const inputPath = program.args[0];
  const outputPath = program.opts().output;

  const data = await fs.readFile(inputPath, 'utf8').catch((err) => {
    console.error('\x1b[31mError during reading input file:\x1b[0m', err);
    process.exit(1);
  });

  const html = converter.toHTML(data);

  if (outputPath) {
    await fs.writeFile(outputPath, html).catch((err) => {
      console.error('\x1b[31mError during writing to output file:\x1b[0m', err);
      process.exit(1);
    });
  } else console.log(html);
})();
