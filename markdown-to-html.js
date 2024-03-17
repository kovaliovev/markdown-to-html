'use strict';

const fs = require('node:fs/promises');
const { program } = require('commander');
const { Converter } = require('./converter.js');

const MARKUP = {
  '**': { open: '<b>', close: '</b>' },
  '_': { open: '<i>', close: '</i>' },
  '`': { open: '<tt>', close: '</tt>' },
  '```': { open: '<pre>', close: '</pre>' },
  '\n': { open: '<p>', close: '</p>' },
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
    throw new Error('Error during reading input file:', err);
  });

  const html = converter.toHTML(data);

  if (outputPath) {
    await fs.writeFile(outputPath, html).catch((err) => {
      throw new Error('Error during writing to output file:', err);
    });
  } else console.log(html);
})();
