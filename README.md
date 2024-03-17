# markdown-to-html (or ansi)
### Simple console application to convert markdown-formatted text to HTML / ANSI.  

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
### Additional: testing
```shell
npm test
```

# Usage
```shell
node markdown-to-html <inputPath> [options]
```
- `<inputPath>` - relative path to the input markdown file.
- `[options]`:
  - `-o, --output <outputPath>` - relative path to the output file.
  - `-f, --format [html | ansi]` - output format.  
  Set by default as `html` if output file is specified and as `ansi` if not specified.
# Example
```shell
node markdown-to-html ./rso-shemsika.md -o ./rso-shemsika.html -f ansi
```

# Revert commit - [ccf3129](https://github.com/kovaliovev/markdown-to-html/commit/ccf31296844e73bd49b702fb284a6b3a2dbed715)
# Commit with failed tests - [580df54](https://github.com/kovaliovev/markdown-to-html/commit/580df5424f9a0267884485d6e947d303bafcb453)
# Висновки
До цього моменту, в мене вже був [досвід написання юніт тестів](https://github.com/kovaliovev/ip-tool), і під час виконання лабораторної я лише підтвердив свої попередні спостереження.  

**Плюси:**
- тести, а особливо якшо вони запускаються автоматично при пуші на ремоут, допомагають відловлювати баги при зміні програми. Коли я покрив ними функціональність проєкту з першої лабораторної і почав його рефакторити та переписувати так, щоб було зручно дописувати нові фічі, запуск тестів допомагав мені впевнитися що я поки що нічого не зламав, і помітити наявні проблеми, бо я все таки щось зламав.

**Мінуси:**
- юніт тести сильно зав'язані на функціональність, і якщо вимоги до метода чи компонента, уже покритого тестами, зміняться - доведеться переписувати всі тести, що мають до нього відношення. Наприклад захочу я завтра відмінити парсинг тегів для жирного тексту (**) і доведеться мені переписати не лише функціонал, а і тести, що його контролюють, а це як-не-як додаткова витрата часу.
