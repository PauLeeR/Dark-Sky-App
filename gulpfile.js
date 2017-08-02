var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var webserver = require('gulp-webserver');
var watch = require('gulp-watch');

gulp.task('script', function(){
	gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/materialize-css/dist/js/materialize.js', 'assets/js/*.js'])
	.pipe(concat('script.js'))
	.pipe(uglify()) //minifica el js y lo deja en una sola linea, así pesa menos
	//carpeta dist
	.pipe(gulp.dest('dist/js'));
});

gulp.task('style', function(){
	gulp.src(['node_modules/materialize-css/dist/css/materialize.css','assets/sass/main.scss'])
	.pipe(sass().on('error', sass.logError)) //ejecuta sass para compilar archivos scss
	.pipe(minifyCSS())
	.pipe(concat('style.min.css'))
	.pipe(gulp.dest('dist/css'));
});

gulp.task('watch', function() {
    gulp.watch('assets/sass/*.scss', 'assets/js/*.js' ['style', 'script']); //incorpora cambios en estilos y en los js
});

gulp.task('default', ['script', 'style', 'watch']);