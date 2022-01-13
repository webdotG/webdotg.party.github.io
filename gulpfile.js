const { src, dest, parallel, series, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');
const del = require('del');
const imagemin = require('gulp-imagemin');

function browsersync (){
	browserSync.init({
		server:{ baseDir: 'app/' },
		notify: false,
		online:false
	})
}
function scripts(){
	return src([
			'node_modules/jquery/dist/jquery.min.js',
			'app/js/app.js',
	])
			.pipe(concat('app.min.js'))
			.pipe(uglify()) 
			.pipe(dest('app/js'))
			.pipe(browserSync.stream())
};

function styles(){
	return src('app/sass/*.sass')
	.pipe(sass().on('error', sass.logError))
	.pipe(concat('style.min.css'))
	.pipe(autoprefixer({ overridBrowserslist:['last 10 versions'], grid:true }))
	.pipe(cleancss(( { level:{1:{specialComments:0} }, /*format:'beautify'*/ } )))
	.pipe(dest('app/css'))
	.pipe(browserSync.stream())
}

function startwatch(){
	watch('app/**/*.html').on('change', browserSync.reload);
	watch('app/**/*.sass', styles);
	watch(['app/**/*.js', '!app/**/*.min.js'], scripts);
	//watch('app/images/**/*', images);
}

function images(){
	return src('app/images/**/*')
	.pipe(imagemin(
		[
			imagemin.gifsicle({interlaced: true}),
			imagemin.mozjpeg({quality: 75, progressive: true}),
			imagemin.optipng({optimizationLevel: 5}),
			imagemin.svgo({
				plugins: [
					{removeViewBox: true},
					{cleanupIDs: false}
				]
			})
		]
	))
	.pipe(dest('dist/images'))
}

 function build() {
	return src([  // выбор файлов
		'app/**/*.html',
		'app/fonts/**/*',
		'app/css/**/*.min.css',
		'app/js/**/*.min.js',
		//'app/images/**/*',
		], { base: 'app' }) //  сохраняю структуру проекта при копировании
	.pipe(dest('dist')) // выгружаю в папку с финальной сборкой
}

//----------------------------------------------на случай чистки-----------------------------------
function cleanimg() {
	return del('app/images/src/**/*', { force: true }) //автономно если захочу удалить содержимое
 }
function cleandist() {
	return del('dist/**/*', { force: true }) //автономно если захочу удалить содержимое dist
}
exports.cleandist = cleandist	//автономно если захочу удалить содержимое
exports.cleanimg = cleanimg;	//автономно если захочу удалить содержимое


exports.browsersync = browsersync;
exports.scripts = scripts;
exports.styles = styles;
exports.images = images;

exports.build = series(cleandist, styles, scripts, build);

exports.default = parallel(styles, scripts, browsersync, startwatch);