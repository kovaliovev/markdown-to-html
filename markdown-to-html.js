'use strict';

const fs = require('node:fs');
const program = require('commander');

const Converter = require('./converter.js');

const MARKUP = {
  '**': 'b',
  '_': 'i',
  '`': 'tt',
  '```': 'pre',
  '\n': 'p',
};

const converter = new Converter(MARKUP);
