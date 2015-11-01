// app
var app = {
	version: "0.1.0",
	appname: "m3g",
	jsEntries: ["Main"],
	cssEntries: ["Main"]
};

app.name = app.appname + "-" + app.version;

// path
var path = {
	src: {
		self: "./src",
		files: "./src/**/*",
		js: {
			self: "./src/js",
			files: "./src/js/**/*.js"
		},
		css: {
			self: "./src/css",
			files: "./src/css/**/*.scss"
		},
		html: {
			self: "./src/html",
			files: "./src/html/**/*.html"
		},
		lib: {
			self: "./src/lib",
			files: "./src/lib/**/*"
		},
		media: {
			self: "./src/media",
			files: "./src/media/**/*"
		}
	},
	dist: {
		self: "./dist",
		files: "./dist/**/*",
		js: {
			self: "./dist/js",
			files: "./dist/js/**/*.js"
		},
		css: {
			self: "./dist/css",
			files: "./dist/css/**/*.scss"
		},
		html: {
			self: "./dist/html",
			files: "./dist/html/**/*.html"
		},
		lib: {
			self: "./dist/lib",
			files: "./dist/lib/**/*"
		},
		media: {
			self: "./dist/media",
			files: "./dist/media/**/*"
		}
	},
	test: {
		self: "./test",
		files: "./test/**/*"
	}
};

// exports
var config = {
	app: app,
	path: path
};

module.exports = config;
