"use strict";
// config
var config = require("./config");

// dependences
var gulp = require("gulp");
var gutil = require("gulp-util");
var sass = require("gulp-sass");
var maps = require("gulp-sourcemaps");
var uglify = require("gulp-uglify");
var minifyCss = require("gulp-minify-css");
var minifyHtml = require("gulp-minify-html");
var rename = require("gulp-rename");
var browserify = require("browserify");
var watchify = require("watchify");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var babelify = require("babelify");
var browserSync = require("browser-sync").create();
var runSequence = require("run-sequence");
var mergeStream = require("merge-stream");
var del = require("del");

function errorHandler(err){
	gutil.log(err.toString());
	gutil.beep();
	this.emit("end");
}

/**
	@arg {boolean} watch - watch the files or not.
	@arg {object} options - fomula:
	{
		{string}		src				: where the source files' path are.
		{string}		dest			: where the transformed files will go.
		{string}		filename	: name of the target file.
		{string}		oriExt		: file's original extension.
		{string}		newExt		: file's new extension.
		{transform} transform	: babelify, sassify, cssifiy...
	}
*/
function compile(watch, options){
	var opts = {
		cache: {},
		packageCache: {},
		standalone: config.app.appname,
		debug: true // produce source map by enabling debug = true
	};
	var bundler = browserify(options.src + "/" + options.filename + options.oriExt, opts);
	bundler.transform(options.transform, options.transformOption);
	function bundle(){
		var stream = bundler
			.bundle()
			.on("error", errorHandler)
			.pipe(source(options.filename + options.newExt))
			.pipe(buffer())
			.pipe(maps.init({loadMaps: true}))
			.pipe(maps.write("."))
		if(watch){
			stream.pipe(gulp.dest(options.dest));
			browserSync.reload();
		}
		else{
			return stream.pipe(gulp.dest(options.dest));
		}
	}
	if(watch){
		bundler = watchify(bundler);
		bundler.on("update", bundle);
		bundler.on("log", gutil.log.bind(gutil));
	}
	return bundle();
}

gulp.task("clean", function(){
	return del([config.path.dist.self]);
});

gulp.task("compileCss", function(){
	var sassOpts = {
		includePaths: require("node-bourbon").includePaths
	};
	var tasks = config.app.cssEntries.map(function(filename){
		return gulp.src(config.path.src.css.self + "/" + filename + ".scss")
			.pipe(rename(filename + ".css"))
			.pipe(maps.init())
			.pipe(sass(sassOpts).on("error", errorHandler))
			.pipe(maps.write("."))
			.pipe(gulp.dest(config.path.dist.css.self));
	});
	return mergeStream(tasks);
});

gulp.task("compileJs", function(){
	var tasks = config.app.jsEntries.map(function(filename){
		var options = {
			src: config.path.src.js.self,
			dest: config.path.dist.js.self,
			filename: filename,
			oriExt: ".js",
			newExt: ".js",
			transform: babelify,
			transformOption: {
			}
		};
		return compile(false, options);
	});
	return mergeStream(tasks);
});

gulp.task("watchJs", function(){
	config.app.jsEntries.map(function(filename){
		var options = {
			src: config.path.src.js.self,
			dest: config.path.dist.js.self,
			filename: filename,
			oriExt: ".js",
			newExt: ".js",
			transform: babelify,
			transformOption: {
			}
		};
		return compile(true, options);
	});
})

gulp.task("minifyCss", ["compileCss"], function(){
	var tasks = config.app.cssEntries.map(function(filename){
		return gulp.src(config.path.dist.css.self + "/" + filename + ".css")
			.pipe(minifyCss())
			.pipe(rename(filename + ".min.css"))
			.pipe(gulp.dest(config.path.dist.css.self));
	});
	return mergeStream(tasks);
});

gulp.task("minifyJs", ["compileJs"], function(){
	var tasks = config.app.jsEntries.map(function(filename){
		return gulp.src(config.path.dist.js.self + "/" + filename + ".js")
			.pipe(uglify())
			.pipe(rename(filename + ".min.js"))
			.pipe(gulp.dest(config.path.dist.js.self));
	});
	return mergeStream(tasks);
});

gulp.task("minifyHtml", function(){
	var opts = {
		empty: true,
		cdata: true,
		comments: false,
		conditionals: true,
		spare: false,
		quotes: false,
		loose: false
	};
	return gulp.src(config.path.src.html.files)
		.pipe(minifyHtml(opts))
		.pipe(gulp.dest(config.path.dist.html.self));
});

gulp.task("copyMisc", function(){
	gulp.src(config.path.src.lib.files)
		.pipe(gulp.dest(config.path.dist.lib.self));

	return gulp.src(config.path.src.media.files)
		.pipe(gulp.dest(config.path.dist.media.self));
});

gulp.task("watch", ["clean"], function(){
	browserSync.init({
		server: {
			baseDir: "./"
		}
	});
	runSequence(["watchJs", "compileCss", "minifyHtml", "copyMisc"]);
	gulp.watch(config.path.src.css.files, ["compileCss"]).on("change", browserSync.reload);
	gulp.watch(config.path.src.html.files, ["minifyHtml"]).on("change", browserSync.reload);
	gulp.watch(config.path.test.files).on("change", browserSync.reload);
});

gulp.task("dev", ["clean"], function(cb){
	runSequence(["compileJs", "compileCss", "minifyHtml", "copyMisc"], cb);
});

gulp.task("build", ["dev"], function(cb){
	runSequence(["minifyJs", "minifyCss"], cb);
});
