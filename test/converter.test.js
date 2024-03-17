'use strict';

const { Converter } = require('../lib/converter.js');
const { MARKUP } = require('../lib/markup.js');

const cHTML = new Converter(MARKUP['html']);
const cANSI = new Converter(MARKUP['ansi']);

describe('Valid md to html converting', () => {
  test('bold', () => {
    expect(cHTML.fromMarkdown('This is a **bold** word.')).toBe(
      '<p>This is a <b>bold</b> word.</p>'
    );
  });
  test('italic', () => {
    expect(cHTML.fromMarkdown('This is a _italic_ word.')).toBe(
      '<p>This is a <i>italic</i> word.</p>'
    );
  });
  test('monospaced', () => {
    expect(cHTML.fromMarkdown('This is a `monospaced` word.')).toBe(
      '<p>This is a <tt>monospaced</tt> word.</p>'
    );
  });
  test('preformatted', () => {
    expect(
      cHTML.fromMarkdown(
        '```\r\nThis is **preformatted** _text_\r\n\r\nThis is _preformatted_ `text too`\r\n```'
      )
    ).toBe(
      '<p><pre>\nThis is **preformatted** _text_\n\nThis is _preformatted_ `text too`\n</pre></p>'
    );
  });
  test('empty', () => {
    expect(cHTML.fromMarkdown(' ')).toBe('<p> </p>');
  });
  test('multi paragraphs', () => {
    expect(
      cHTML.fromMarkdown('**First** _paragraph_\r\n\r\n`Second` line')
    ).toBe('<p><b>First</b> <i>paragraph</i></p>\n<p><tt>Second</tt> line</p>');
  });
});

describe('Invalid md to html converting', () => {
  test('unclosed bold', () => {
    expect(() =>
      cHTML
        .fromMarkdown('This is a **bold word.')
        .toThrow('Found unclosed md flag!')
    );
  });
  test('unclosed italic', () => {
    expect(() =>
      cHTML
        .fromMarkdown('This is a italic_ word.')
        .toThrow('Found unclosed md flag!')
    );
  });
  test('unclosed monospaced', () => {
    expect(() =>
      cHTML
        .fromMarkdown('This is a `monospaced word.')
        .toThrow('Found unclosed md flag!')
    );
  });
  test('unclosed preformatted', () => {
    expect(() =>
      cHTML
        .fromMarkdown(
          '```\r\nThis is **preformatted** _text_\r\n\r\nThis is _preformatted_ `text too`\r\n'
        )
        .toThrow('Found unclosed md flag!')
    );
  });
  test('nested-1', () => {
    expect(() =>
      cHTML
        .fromMarkdown('This is a **_italico-bold_** word.')
        .toThrow('Found nested md flag!')
    );
  });
  test('nested-2', () => {
    expect(() =>
      cHTML
        .fromMarkdown('**`_this is invalid_`**')
        .toThrow('Found nested md flag!')
    );
  });
  test('nested-3', () => {
    expect(() =>
      cHTML
        .fromMarkdown('This is a ****very bold**** word.')
        .toThrow('Found nested md flag!')
    );
  });
});

describe('Valid md to ansi converting', () => {
  test('bold', () => {
    expect(cANSI.fromMarkdown('This is a **bold** word')).toBe(
      'This is a \x1b[1mbold\x1b[0m word\n'
    );
  });
  test('italic', () => {
    expect(cANSI.fromMarkdown('This is a _italic_ word.')).toBe(
      'This is a \x1b[3mitalic\x1b[0m word.\n'
    );
  });
  test('monospaced', () => {
    expect(cANSI.fromMarkdown('This is a `monospaced` word.')).toBe(
      'This is a \x1b[7mmonospaced\x1b[m word.\n'
    );
  });
  test('preformatted', () => {
    expect(
      cANSI.fromMarkdown(
        '```\r\nThis is **preformatted** _text_\r\n\r\nThis is _preformatted_ `text too`\r\n```'
      )
    ).toBe(
      '\x1b[7m\nThis is **preformatted** _text_\n\nThis is _preformatted_ `text too`\n\x1b[m\n'
    );
  });
  test('empty', () => {
    expect(cANSI.fromMarkdown(' ')).toBe(' \n');
  });
  test('multi paragraphs', () => {
    expect(
      cANSI.fromMarkdown('**First** _paragraph_\r\n\r\n`Second` line')
    ).toBe(
      '\x1b[1mFirst\x1b[0m \x1b[3mparagraph\x1b[0m\n\n\x1b[7mSecond\x1b[m line\n'
    );
  });
});

describe('Invalid md to ansi converting', () => {
  test('unclosed bold', () => {
    expect(() =>
      cANSI
        .fromMarkdown('This is a **bold word.')
        .toThrow('Found unclosed md flag!')
    );
  });
  test('unclosed italic', () => {
    expect(() =>
      cANSI
        .fromMarkdown('This is a italic_ word.')
        .toThrow('Found unclosed md flag!')
    );
  });
  test('unclosed monospaced', () => {
    expect(() =>
      cANSI
        .fromMarkdown('This is a `monospaced word.')
        .toThrow('Found unclosed md flag!')
    );
  });
  test('unclosed preformatted', () => {
    expect(() =>
      cANSI
        .fromMarkdown(
          '```\r\nThis is **preformatted** _text_\r\n\r\nThis is _preformatted_ `text too`\r\n'
        )
        .toThrow('Found unclosed md flag!')
    );
  });
  test('nested-1', () => {
    expect(() =>
      cANSI
        .fromMarkdown('This is a **_italico-bold_** word.')
        .toThrow('Found nested md flag!')
    );
  });
  test('nested-2', () => {
    expect(() =>
      cANSI
        .fromMarkdown('**`_this is invalid_`**')
        .toThrow('Found nested md flag!')
    );
  });
  test('nested-3', () => {
    expect(() =>
      cANSI
        .fromMarkdown('This is a ****very bold**** word.')
        .toThrow('Found nested md flag!')
    );
  });
});
