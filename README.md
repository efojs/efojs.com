# EFOJS
## TODO
- Manually sort posts

## Structure, layout
Post chunk:
- 3 paragraphs:
  - description
  - tech_stack
  - status
- figures with figcaptions
- excerpt

Front matter:
- permalink (with trailing `/` -> `folder/index.html`)
- excerpt (to avoid filtering from post, because it ruins code highlighting (putting all HTML in one line))

Code highlight with coderay:
- because default rouge adds extra indent to first line of code block (both in MD and HTML files)
- but does not work with `{%- highlight -%}` (may be problem in HTML files)

## Webpack
Base https://michaelmovsesov.com/articles/jekyll-es6-workflow  

Slightly modified:
- newer modules `npm install webpack webpack-cli @babel/core babel-loader @babel/preset-env --save-dev`
 https://webpack.js.org/loaders/babel-loader/
 https://webpack.js.org/guides/getting-started/
- to avoid double livereload: `exclude: ['webpack']`

Run dev `npm start`

## Some used libraries

- `axios` instead of `fetch` — https://stackoverflow.com/questions/40844297/what-is-difference-between-axios-and-fetch

## Test
- [Jest](https://jestjs.io/docs/en/getting-started)
- [DOM Testing library (DTL) queries](https://testing-library.com/docs/dom-testing-library/cheatsheet)  
- [Jest DTL matchers](https://github.com/testing-library/jest-dom#custom-matchers)  
- [React DTL utilities](https://testing-library.com/docs/react-testing-library/cheatsheet)  
- [DTL user events](https://github.com/testing-library/user-event)
