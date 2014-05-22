var gulp = require('gulp'),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-ruby-sass'),
    coffee = require('gulp-coffee'),
    concat = require('gulp-concat'),
    livereload = require('gulp-livereload'),
    lr = require('tiny-lr'),
    server = lr();

var sassSources = [
  'src/*.scss'
];

var coffeeSources = [
  'src/*.coffee'
];

var jsSources = [
  'src/*.js'
];

gulp.task('coffee', function() {
  gulp.src(coffeeSources)
    .pipe(coffee({ bare: true})
    .on('error', gutil.log))
    .pipe(gulp.dest('src'))
});

gulp.task('js', function() {
  gulp.src(jsSources)
          .pipe(concat('main.js'))
          .pipe(gulp.dest('js'));
          //.pipe(uglify())
});

gulp.task('sass', function() {
  gulp.src(sassSources)
    .pipe(sass({style: 'expanded', lineNumbers: true}))
    .on('error', gutil.log)
    .pipe(concat('compiled.css'))
    .pipe(gulp.dest('css'))
    .pipe(livereload());
});

gulp.task('watch', function() {
  var server = livereload();
  gulp.watch(jsSources, ['js']);
  gulp.watch(coffeeSources, ['coffee']);
  gulp.watch(sassSources, ['sass']);
  gulp.watch(['*.html', 'css/*.css','js/*.js' ], function(e) {
    server.changed(e.path);
  });
});

gulp.task('default', ['sass','js', 'coffee', 'watch']);

/*

<script>document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>')</script>

package.json
{
  "name": "xxxxxx",
  "version": "0.1.0",
  "description": "xxxxxx",
  "author": "xxxxxx",
  "devDependencies": {
    "gulp-util": "~2.2.14",
    "gulp": "~3.6.2",
    "gulp-coffee": "~1.4.3",
    "gulp-concat": "~2.2.0",
    "gulp-ruby-sass": "~0.5.0",
    "gulp-uglify": "~0.3.0",
    "gulp-livereload": "~1.5.0",
    "tiny-lr": "0.0.7"
  }
}

*/
