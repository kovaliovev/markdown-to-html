'use strict';

const MARKUP = {
  html: {
    '**': { open: '<b>', close: '</b>' },
    '_': { open: '<i>', close: '</i>' },
    '`': { open: '<tt>', close: '</tt>' },
    '```': { open: '<pre>', close: '</pre>' },
    '\n': { open: '<p>', close: '</p>' },
  },
};

module.exports = { MARKUP };
