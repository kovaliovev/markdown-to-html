const { Converter } = require('../converter.js');
const c = new Converter({
  '**': 'b',
  '_': 'i',
  '`': 'tt',
  '```': 'pre',
  '\n': 'p',
});

describe('Valid md to html converting', () => {
  test('bold', () => {
    expect(c.toHTML('This is a **bold** word.')).toBe(
      '<p>This is a <b>bold</b> word.</p>'
    );
  });
  test('italic', () => {
    expect(c.toHTML('This is a _italic_ word.')).toBe(
      '<p>This is a <i>italic</i> word.</p>'
    );
  });
  test('monospaced', () => {
    expect(c.toHTML('This is a `monospaced` word.')).toBe(
      '<p>This is a <tt>monospaced</tt> word.</p>'
    );
  });
  test('preformatted', () => {
    expect(
      c.toHTML(
        '```\r\nThis is **preformatted** _text_\r\n\r\nThis is _preformatted_ `text too`\r\n```'
      )
    ).toBe(
      '<p><pre>\nThis is **preformatted** _text_\n\nThis is _preformatted_ `text too`\n</pre></p>'
    );
  });
  test('empty', () => {
    expect(c.toHTML(' ')).toBe('<p> </p>');
  });
  test('multi paragraphs', () => {
    expect(c.toHTML('**First** _paragraph_\r\n\r\n`Second` line')).toBe(
      '<p><b>First</b> <i>paragraph</i></p>\n<p><tt>Second</tt> line</p>'
    );
  });
});
