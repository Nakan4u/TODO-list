var gulp = require('gulp');
var	useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var ngAnnotate = require('gulp-ng-annotate');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var templateCache = require('gulp-angular-templatecache');
var del = require('del');
var addStream = require('add-stream');
var connect = require('gulp-connect');

// helper for create template cache
function prepareTemplates() {
  return gulp.src('app/**/*tpl.html')
    .pipe(templateCache('templates.js', { module:'myApp', standalone:false }))
    .pipe(gulp.dest('dist/js'));
};
 
gulp.task('connect', function() {
  connect.server({port: 8000});
});

gulp.task('clean', function() {
  return del.sync('dist');
});

gulp.task('js', function () {
  gulp.src(['app/js/app.js', '!app/js/**/*spec.js', 'app/js/controllers/*.js', 'app/js/directives/**/*.js'])
    .pipe(sourcemaps.init())
    .pipe(addStream.obj(prepareTemplates()))
    .pipe(concat('js/app-bundle.js'))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'))
});

// task for dev js-bundle
gulp.task('js-dev', function () {
  gulp.src(['app/js/app.js', '!app/js/**/*spec.js', 'app/js/controllers/*.js', 'app/js/directives/**/*.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('js/app-bundle.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('app'))
});

gulp.task('dev', ['js-dev'], function () {
  gulp.watch('app/**/*.js', ['js-dev'])
});


gulp.task('fonts', function() {
  return gulp.src('node_modules/bootstrap/dist/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
});

gulp.task('favicon', function() {
  return gulp.src('app/favicon.ico')
  .pipe(gulp.dest('dist'))
});

gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('app/css/*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

gulp.task('default', ['connect', 'dev']);

gulp.task('build', ['clean', 'js', 'useref', 'fonts', 'favicon'], function (){
  console.log('Building files');
});