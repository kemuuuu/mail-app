const { src, dest, watch } = require('gulp');
const sass = require('gulp-sass');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config')

// compile-sass
const compileSass = () => {
  return (
    src('assets/scss/index.scss')
    .pipe(
      sass({outputStyle: 'expanded'})
      .on('error', sass.logError)
    )
    .pipe(dest('dist'))
  )
}

// compile-react
const compileReact = () => {
  return (
    src('src/index.tsx')
    .pipe( webpackStream(webpackConfig, webpack) )
    .pipe(dest('dist'))
  );
}

// watch
const watchFiles = () => { 
  watch(['src/**/*.tsx'], compileReact);
  watch(['assets/scss/*.scss'], compileSass);
}

exports.default = watchFiles;
