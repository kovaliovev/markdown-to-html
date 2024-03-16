const { Converter } = require('../converter.js');
const c = new Converter({
  '**': 'b',
  '_': 'i',
  '`': 'tt',
  '```': 'pre',
  '\n': 'p',
});

describe('bombom', () => {
  test.todo('bimbam');
});
