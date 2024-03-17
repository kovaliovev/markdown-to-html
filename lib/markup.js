'use strict';

const MARKUP = {
  html: {
    '**': { open: '<b>', close: '</b>' },
    '_': { open: '<i>', close: '</i>' },
    '`': { open: '<tt>', close: '</tt>' },
    '```': { open: '<pre>', close: '</pre>' },
    '\n': { open: '<p>', close: '</p>' },
  },
  ansi: {
    '**': { open: '\x1b[1m', close: '\x1b[0m' },
    '_': { open: '\x1b[3m', close: '\x1b[0m' },
    '`': { open: '\x1b[7m', close: '\x1b[m' },
    '```': { open: '\x1b[7m', close: '\x1b[m' },
    '\n': { open: '', close: '' },
  },
};

module.exports = { MARKUP };
