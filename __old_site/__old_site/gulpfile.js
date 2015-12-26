var colour = require('colour');

var gulp = require('gulp'),
	gutil = require('gulp-util');

var sass = require('gulp-sass'),
	react = require('gulp-react'),
	uglify = require('gulp-uglify');

gulp.task('watch', ['build'], function() {
	gulp.run('jekyll-serve-watch');
	gulp.watch('./_sass/**/*.scss', ['sass-build']);
	gulp.watch('./_react/**/*.jsx', ['react-build', 'js-compress']);
});

gulp.task('jekyll-serve-watch', function(cb) {
	require('child_process').spawn('jekyll', ['server', '--watch'], {
		stdio: 'inherit'
	});
});

gulp.task('jekyll-build', function(cb) {
	console.log('Generating Jekyll site...');
	require('child_process').spawn('jekyll', ['build'], {
		stdio: 'inherit'
	}).on('close', function(code) {
		cb();
	});
});

gulp.task('sass-build', function() {
	console.log('Building SASS sources...');
	return gulp.src('_sass/**/*.scss')
		.pipe(sass({
			outputStyle: 'compressed'
		}).on('error', handleError))
		.pipe(gulp.dest('assets/css'));
});

gulp.task('react-build', function(cb) {
	console.log('Building React sources...');
	return gulp.src('_react/**/*.jsx')
		.pipe(react({
			harmony: true
		}))
		.on('error', handleError)
		.pipe(gulp.dest('assets/js'))
});

gulp.task('js-compress', ['react-build'], function() {
	return;
	console.log('Compressing Javascript sources...');
	return gulp.src('assets/js/*.js')
		.pipe(uglify())
		.on('error', handleError)
		.pipe(gulp.dest('assets/js'));
});

gulp.task('build', ['react-build', 'js-compress', 'sass-build', 'jekyll-build'], function() {});

function handleError(e) {
	console.log('[%s] with \'%s\': %s', e.name.red, e.plugin.cyan, e.message);
	if (e.fileName) {
		console.log('    in ' + e.fileName);
	}
	if (e.stack) {
		// console.log(e.stack);
	}
	this.emit('end');
}