# markdown-to-html
### Simple console application to convert markdown-formatted text to HTML.  

Print converted text in console or to the specified file.  
Styles that can be parsed:
- bold
- italic
- monospaced
- preformatted
- paragraphs

# Installation
### 1 step
```shell
git clone https://github.com/kovaliovev/markdown-to-html.git
```
### 2 step
```shell
npm i
```

# Usage
```shell
node markdown-to-html <inputPath> [options]
```
- `<inputPath>` - relative path to the input markdown file.
- `[options]`:
  - `-o, --output <outputPath>` - relative path to the output HTML file.

# Example
```shell
node markdown-to-html ./rso-shemsika.md -o ./rso-shemsika.html
```

# Revert commit - [ccf3129](https://github.com/kovaliovev/markdown-to-html/commit/ccf31296844e73bd49b702fb284a6b3a2dbed715)
