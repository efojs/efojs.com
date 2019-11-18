# EFOJS
## Features
Для группировки постов по категориям нужны коллекции
https://jekyllrb.com/docs/collections/

## TODO
- как быть с такими: Handcrafted pumpkin (making of) — ссылка на ютуб
- Manually order posts

## Structure, layout
Post:
- 3 paragraphs:
  - description
  - tech_stack
  - status
- figures with figcaptions


## Webpack
Base https://michaelmovsesov.com/articles/jekyll-es6-workflow  

Slightly modified:
- newer modules `npm install webpack webpack-cli @babel/core babel-loader @babel/preset-env" --save-dev`
 https://webpack.js.org/loaders/babel-loader/
 https://webpack.js.org/guides/getting-started/
- to avoid double livereload: `exclude: ['webpack']`

Run dev `npm start`
