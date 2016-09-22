var gulp = require('gulp');
var sass = require('gulp-sass');

var order = require("gulp-order");
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var jade = require('jade');
var gulpJade = require('gulp-jade');
var jadeAtomic = require('jade-atomic');
var louis = require('gulp-louis');

gulp.task('jade-html',function(){
  return gulp.src('jade/**/*.jade')
    .pipe(gulpJade({
      jade:jadeAtomic({
        basePath:__dirname,
        fileStructure:'/[module]/[atomic]s/jade/[file].jade'
      }),
      pretty:true
    }))
    .pipe(rename({
          extname: '.php'
    }))
    .pipe(gulp.dest('components/')); 
});

gulp.task('louis', function() {
  louis({
    timeout: 60,
    viewport: '1280x1024',
    engine: 'webkit',
    userAgent: 'Chrome/37.0.2062.120',
    noExternals: false,
    performanceBudget: {
      requests: 2,
      medianLatency: 120,
      slowestResponse: 1000
    }
  });
});

gulp.task('styles', function() {
    gulp.src('atomic-core/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('atomic-core/css/'));
});

gulp.task('styles2', function() {
    gulp.src('scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('css/'));
});

var jsDest = 'atomic-core/js/min';

gulp.task('scripts', function() {
    return gulp.src('atomic-core/js/*.js')
        .pipe(order([
            'js/bootstrap.min.js',
            'js/prism.js',
            'js/spectrum-picker.js',
            'js/uncomment.js',
            'js/prism-builder.js',
            'js/velocity.js',
            'js/velocity-ui.js',
            'js/_expand-form.js',
            'js/formShowHide.js',
            'js/slideAnimation.js',
            'js/hideAll.js',
            'js/hideCode.js',
            'js/hideNotes.js',
            'js/hideTitle.js',
            'js/navSmall.js',
            'js/animateHeight.js',
            'js/editor-stuff.js',
            'js/editable-content.js'
        ], { base: 'atomic-core/' }))
        .pipe(concat('compiled.js'))
        .pipe(gulp.dest(jsDest))
        .pipe(rename('compiled.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest));
});

var jsDest2 = 'js/min';

gulp.task('scripts2', function() {
    return gulp.src('js/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest(jsDest2))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest2));
});

//Watch task
gulp.task('default',function() {
    gulp.watch('jade/**/*.jade', ['jade-html']);
    gulp.watch('atomic-core/scss/**/*.scss',['styles']);
    gulp.watch('scss/**/*.scss',['styles2']);
    gulp.watch('atomic-core/js/*.js',['scripts']);
    gulp.watch('js/*.js',['scripts2']);
});

gulp.task('setup', ['jade-html']);

gulp.task('setup', ['styles']);

gulp.task('setup', ['styles2']);


// backstopjs : 'npm run reference' skriv sen 'npm run test' för att generera screenshots. 
// louis : 'gulp louis' för att köra igång louis
// jade : om den failar skriv 'gulp jade-html'
// scss till css : 'gulp styles2' 