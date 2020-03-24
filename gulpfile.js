const gulp = require('gulp')
const nodemon = require('gulp-nodemon')
gulp.task('nodemon', function () {
  nodemon({
    script: './src/main.ts',
      ext: 'ts scss js css html',
      env: { 'NODE_ENV': 'development' }
  })
})
