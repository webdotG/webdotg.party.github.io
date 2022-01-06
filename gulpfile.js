const c_sass = require('gulp-sass')(require('sass'));
const c_less = require ('gulp-less');

const preprocessor = {
	name: 'sass',
	executor: c_sass
}

const {src, dest, parallel, series, watch} = require ('gulp');
const c_browserSync = require('browser-sync').create();
const  c_concat = require('gulp-concat');
const c_uglify = require('gulp-uglify-es').default;
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
	return src('app/' + preprocessor.name + '/main.' + preprocessor.name + '')
		.pipe(preprocessor.executor())
		// return src('app/sass/main.sass')
 		//.pipe(c_sass())
		.pipe(c_concat('app.min.css'))
		.pipe(c_autoprefixer({ overrideBrowserslist: ['last 10 version'], grid:true }))
 		.pipe(c_cleancss(( { level:{ 1: { specialComments:0 } } , format:'beautify'} )))
		.pipe(dest('app/css'))
		.pipe(c_browserSync.stream())
};

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
	watch('app/**/' + preprocessor + '**/*',styles)
	watch('app/sass/*.sass',styles);
	watch(['app/**/*.js', '!app/**/*min.js'], scripts);
}

exports.browsersync = browsersync;
exports.scripts = scripts;
exports.styles = styles;
// exports.images = images;

exports.build = series(cleandist ,styles, scripts, /*images*/ buildcopy)

exports.default = parallel( styles, scripts, browsersync, startwatch);