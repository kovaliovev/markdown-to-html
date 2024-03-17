'use strict';

const { Converter } = require('../lib/converter.js');
const { MARKUP } = require('../lib/markup.js');

const cHTML = new Converter(MARKUP['html']);

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
      c
        .fromMarkdown('This is a **bold word.')
        .toThrow('Found unclosed md flag!')
    );
  });
  test('unclosed italic', () => {
    expect(() =>
      c
        .fromMarkdown('This is a italic_ word.')
        .toThrow('Found unclosed md flag!')
    );
  });
  test('unclosed monospaced', () => {
    expect(() =>
      c
        .fromMarkdown('This is a `monospaced word.')
        .toThrow('Found unclosed md flag!')
    );
  });
  test('unclosed preformatted', () => {
    expect(() =>
      c
        .fromMarkdown(
          '```\r\nThis is **preformatted** _text_\r\n\r\nThis is _preformatted_ `text too`\r\n'
        )
        .toThrow('Found unclosed md flag!')
    );
  });
  test('nested-1', () => {
    expect(() =>
      c
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
      c
        .fromMarkdown('This is a ****very bold**** word.')
        .toThrow('Found nested md flag!')
    );
  });
});
