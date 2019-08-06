const { src, dest, watch } = require('gulp')
const sass = require('gulp-sass')

// compile
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

// watch
const watchSassFiles = () => watch(['assets/scss/*.scss'], compileSass)

exports.default = watchSassFiles;
