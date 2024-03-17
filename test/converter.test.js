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

describe('Invalid md to html converting', () => {
  test('unclosed bold', () => {
    expect(() =>
      c.toHTML('This is a **bold word.').toThrow('Found unclosed md flag!')
    );
  });
  test('unclosed italic', () => {
    expect(() =>
      c.toHTML('This is a italic_ word.').toThrow('Found unclosed md flag!')
    );
  });
  test('unclosed monospaced', () => {
    expect(() =>
      c.toHTML('This is a `monospaced word.').toThrow('Found unclosed md flag!')
    );
  });
  test('unclosed preformatted', () => {
    expect(() =>
      c
        .toHTML(
          '```\r\nThis is **preformatted** _text_\r\n\r\nThis is _preformatted_ `text too`\r\n'
        )
        .toThrow('Found unclosed md flag!')
    );
  });
  test('nested-1', () => {
    expect(() =>
      c
        .toHTML('This is a **_italico-bold_** word.')
        .toThrow('Found nested md flag!')
    );
  });
  test('nested-2', () => {
    expect(() =>
      c.toHTML('**`_this is invalid_`**').toThrow('Found nested md flag!')
    );
  });
  test('nested-3', () => {
    expect(() =>
      c
        .toHTML('This is a ****very bold**** word.')
        .toThrow('Found nested md flag!')
    );
  });
});
