var gulp = require('gulp'),
	sass = require('gulp-sass'),
	autoprefix = require('gulp-autoprefixer'),
	browserSync = require('browser-sync').create(),
	eslint = require('gulp-eslint'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant');

const reload = browserSync.reload;

gulp.task('serve', ['styles'], function () {

	browserSync.init({
		notify: false,
		server: ['app'],
		port: 3000
	});

	gulp.watch(['app/**/*.html'], reload);
	gulp.watch(['app/styles/**/*.scss'], ['styles', reload]);
	gulp.watch(['app/images/**/*'], reload);
});

/*
gulp.task('images', function () {
	return gulp.src('app/images')
		.pipe(imagemin({
			progressive: true,
			use: [pngquant()]
		}))
		.pipe(gulp.dest('dist/img'));
});
*/

gulp.task('styles', function () {
	return gulp.src('app/styles/**/*.scss')
		.pipe(sass({
			outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(autoprefix({
			browsers: ['last 3 versions']
		}))
		.pipe(gulp.dest('app/styles'))
});
