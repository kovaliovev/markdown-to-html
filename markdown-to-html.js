'use strict';

const fs = require('node:fs/promises');
const { program, Option } = require('commander');
const { Converter } = require('./lib/converter.js');
const { MARKUP } = require('./lib/markup.js');

program
  .version('1.0.0')
  .argument('<input>', 'Path to the input Markdown file')
  .option('-o, --output <output>', 'Path to the output file')
  .addOption(
    new Option('-f, --format <format>', 'Output format: ansi | html').choices([
      'ansi',
      'html',
    ])
  )
  .action((name, opts) => {
    if (!opts.format) opts.format = opts.output ? 'html' : 'ansi';
  })
  .parse(process.argv);

(async () => {
  const outputFormat = program.opts().format;
  const converter = new Converter(MARKUP[outputFormat]);

  const inputPath = program.args[0];
  const outputPath = program.opts().output;

  const data = await fs.readFile(inputPath, 'utf8').catch((err) => {
    throw new Error('Error during reading input file:', err);
  });

  const outputText = converter.fromMarkdown(data);

  if (outputPath) {
    await fs.writeFile(outputPath, outputText).catch((err) => {
      throw new Error('Error during writing to output file:', err);
    });
  } else console.log(outputText);
})();
