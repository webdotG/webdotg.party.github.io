//let preprocessor='less'; //sass

const {src, dest, parallel, series, watch} = require ('gulp');
const c_browserSync = require('browser-sync').create();
const  c_concat = require('gulp-concat');
const c_uglify = require('gulp-uglify-es').default;
const c_sass = require('gulp-sass')(require('sass'));
const c_less = require ('gulp-less');
const c_autoprefixer = require('gulp-autoprefixer');
const c_cleancss = require('gulp-clean-css');
const del = require('del');


function browsersync() {
    c_browserSync.init({
        server:{ baseDir:'app/' },
        notify:true,
        online:false
    })
};

function scripts(){
    return src([
        'node_modules/jquery/dist/jquery.min.js',
        'app/js/app.js',
    ])
        .pipe(c_concat('app.min.js'))
				.pipe(c_uglify())
        .pipe(dest('app/js'))
				.pipe(c_browserSync.stream())
};

function styles(){
	//return src('app/' + preprocessor + '/main.' + preprocessor + '') 
		//.pipe(eval(preprocessor)())
 return src('app/sass/main.sass')
 		.pipe(c_sass())
		.pipe(c_concat('app.min.css'))
		.pipe(c_autoprefixer({ overrideBrowserslist: ['last 10 version'], grid:true }))
 		.pipe(c_cleancss(( { level:{ 1: { specialComments:0 } } /*, format:'beautify'*/} )))
		.pipe(dest('app/css'))
		.pipe(c_browserSync.stream())
};

//const с_compressing = require('compress-images');
//async function images() {
	//с_compressing(
		//"app/images/src/**/*", // Берём все изображения из папки источника
		//"app/images/dest/", // Выгружаем оптимизированные изображения в папку назначения
		//{ compress_force: false, statistic: true, autoupdate: true }, false, // Настраиваем основные параметры
		//{ jpg: { engine: "mozjpeg", command: ["-quality", "75"] } }, // Сжимаем и оптимизируем изображеня
		//{ png: { engine: "pngquant", command: ["--quality=75-100", "-o"] } },
		//{ svg: { engine: "svgo", command: "--multipass" } },
		//{ gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
		//function (err, completed) { // Обновляем страницу по завершению
			//if (completed === true) {
				//browserSync.reload()
			//}
		//}
	//)
//}
//function cleanimg() {
	//return del('app/images/dest/**/*', { force: true }) // Удаляем все содержимое папки "app/images/dest/"
//}


function cleandist(){
	return del('dist/**/*', {force:true})
}

function buildcopy(){
	return src([
		'app/css**/*.min.css',
		'app/js/**/*.min.js',
//  'app/images/dest/**/*', need fix compess-img
		'app/**/*.html'
	], { base:'app' })
	.pipe(dest('dist'));
}

function startwatch(){
	watch('app/**/*.html').on('change', c_browserSync.reload)
	//watch('app/**/' + preprocessor + '**/*',styles)
	watch('app/sass/*.sass',styles);
	watch(['app/**/*.js', '!app/**/*min.js'], scripts);
}

exports.browsersync = browsersync;
exports.scripts = scripts;
exports.styles = styles;
exports.images = images;

exports.build = series(cleandist ,styles, scripts, /*images*/ buildcopy)

exports.default = parallel( styles, scripts, browsersync, startwatch);