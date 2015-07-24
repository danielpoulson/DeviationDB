var gulp = require('gulp');
var args = require('yargs').argv;
var browserSync = require('browser-sync');
var config = require('./gulp.config')();
var del = require('del');
var $ = require('gulp-load-plugins')({lazy: true});
var port = process.env.PORT || config.defaultPort;

gulp.task('help', $.taskListing);
gulp.task('default', ['help']);

gulp.task('vet', function() {
    log('Analyzing source with JSHint and JSCS');

    return gulp
        .src(config.alljs)
        .pipe($.if(args.verbose, $.print()))
        .pipe($.jscs())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
        .pipe($.jshint.reporter('fail'));
});

gulp.task('styles', ['clean-styles'], function() {
    log('Compiling Stylus --> CSS');

    return gulp
        .src(config.stylus)
        .pipe($.plumber())
        .pipe($.stylus())
        .pipe($.autoprefixer({browsers: ['last 2 version', '> 5%']}))
        .pipe(gulp.dest(config.temp));
});

gulp.task('fonts', ['clean-fonts'], function() {
    log('Copying fonts');

    return gulp
        .src(config.fonts)
        .pipe(gulp.dest(config.build + 'fonts'));
});

gulp.task('images', ['clean-images'], function() {
    log('Copying and compressing the images');

    return gulp
        .src(config.images)
        .pipe($.imagemin({optimizationLevel: 4}))
        .pipe(gulp.dest(config.build + 'images'));
});

gulp.task('clean', function(done) {
    var delconfig = [].concat(config.build, config.temp);
    log('Cleaning: ' + $.util.colors.blue(delconfig));
    del(delconfig, done);
});

gulp.task('clean-fonts', function(done) {
    clean(config.build + 'fonts/**/*.*', done);
});

gulp.task('clean-images', function(done) {
    clean(config.build + 'images/**/*.*', done);
});

gulp.task('clean-styles', function(done) {
    clean(config.temp + '**/*.css', done);
});

gulp.task('clean-code', function(done) {
    var files = [].concat(
        config.temp + '**/*.js',
        config.build + '**/*.html',
        config.build + 'js/**/*.js'
    );
    clean(files, done);
});

gulp.task('less-watcher', function() {
    gulp.watch([config.stylus], ['styles']);
});

gulp.task('templatecache', ['clean-code'], function() {
    log('Creating AngularJS $templateCache');

    return gulp
        .src(config.htmltemplates)
        .pipe($.minifyHtml({empty: true}))
        .pipe($.angularTemplatecache(
            config.templateCache.file,
            config.templateCache.options
            ))
        .pipe(gulp.dest(config.temp));
});

gulp.task('wiredep', function() {
    log('Wire up the bower css js and our app js into the html');
    var options = config.getWiredepDefaultOptions();
    var wiredep = require('wiredep').stream;

    return gulp
        .src(config.index)
        .pipe(wiredep(options))
        .pipe($.inject(gulp.src(config.js),{
                ignorePath: 'public',
                addRootSlash: true
            }))
        .pipe(gulp.dest(config.public));
});

gulp.task('inject', ['wiredep', 'styles', 'templatecache'], function() {
    log('Wire up the app css into the html, and call wiredep ');

    return gulp
        .src(config.index)
        //.pipe($.inject(gulp.src(config.css)))
        .pipe($.inject(gulp.src(config.css), {ignorePath: 'public'}))
        .pipe(gulp.dest(config.public));
});

gulp.task('mvSwig', function(){
    log('Copying Swig Files');

    return gulp
        .src(config.swig)
        .pipe(gulp.dest(config.build));
    
});

//gulp.task('optimize', ['inject', 'fonts', 'images','mvSwig'], function() {
//    log('Optimizing the javascript, css, html');
//
//    var assets = $.useref.assets({searchPath: ['./', 'public']});
//    //TODO: Check dynamic path and remove static
//    var templateCache = config.temp + config.templateCache.file;
//    //var templateCache = './tmp/templates.js';
//    var cssFilter = $.filter('**/*.css');
//    var jsLibFilter = $.filter('**/lib.js');
//    var jsAppFilter = $.filter('**/app.js');
//
//    return gulp
//        .src(config.index)
//        .pipe($.plumber())
//        //.pipe($.inject(gulp.src(templateCache, {read:false}), {name: 'templates'}))//
//        .pipe($.inject(gulp.src(templateCache, {name: 'templates'})))
//        .pipe(assets)
//        .pipe(cssFilter)
//        .pipe($.csso())
//        .pipe(cssFilter.restore())
//        .pipe(jsLibFilter)
//        .pipe($.uglify())
//        .pipe(jsLibFilter.restore())
//        .pipe(jsAppFilter)
//        .pipe($.ngAnnotate())
//        .pipe($.uglify())
//        .pipe(jsAppFilter.restore())
//        .pipe($.rev())
//        .pipe(assets.restore())
//        .pipe($.useref())
//        .pipe($.revReplace())
//        .pipe(gulp.dest(config.build));
//});

gulp.task('optimize', ['inject', 'fonts', 'images'], function() {
   log('Optimizing the javascript, css, html');

    var assets = $.useref.assets();
    var jsAppFilter = $.filter('**/app.js');

    return gulp.src(config.index)
        .pipe(assets)
        .pipe($.if('**/app.js', $.ngAnnotate()))
        .pipe($.if('*.js', $.uglify()))
        .pipe($.if('*.css', $.csso()))
        .pipe($.rev())
        .pipe(assets.restore())
        .pipe($.useref())
        .pipe($.revReplace())
        .pipe(gulp.dest('build/views'));
});

/**
 * Optimize all files, move to a build folder,
 * and inject them into the new index.html
 * @return {Stream}
 */
//gulp.task('optimize', ['inject', 'mvSwig'], function() {
//    log('Optimizing the js, css, and html');
//
//    var assets = $.useref.assets({searchPath: './'});
//    // Filters are named for the gulp-useref path
//    var cssFilter = $.filter('**/*.css');
//    var jsAppFilter = $.filter('**/' + config.optimized.app);
//    var jslibFilter = $.filter('**/' + config.optimized.lib);
//
//    var templateCache = config.temp + config.templateCache.file;
//
//    return gulp
//        .src(config.index)
//        .pipe($.plumber())
//        .pipe($.inject(gulp.src(templateCache, {read:false}), {name: 'templates'}))
//        .pipe(assets) // Gather all assets from the html with useref
//        // Get the css
//        .pipe(cssFilter)
//        .pipe($.csso())
//        .pipe(cssFilter.restore())
//        // Get the custom javascript
//        .pipe(jsAppFilter)
//        .pipe($.ngAnnotate({add: true}))
//        .pipe($.uglify())
//        //.pipe(getHeader())
//        .pipe(jsAppFilter.restore())
//        // Get the vendor javascript
//        .pipe(jslibFilter)
//        .pipe($.uglify()) // another option is to override wiredep to use min files
//        .pipe(jslibFilter.restore())
//        // Take inventory of the file names for future rev numbers
//        //.pipe($.rev())
//        // Apply the concat and file replacement with useref
//        .pipe(assets.restore())
//        .pipe($.useref())
//        // Replace the file names in the html with rev numbers
//        //.pipe($.revReplace())
//        .pipe(gulp.dest(config.build));
//});

gulp.task('serve-build', ['optimize'], function() {
    serve(false /* isDev */);
});

gulp.task('serve-dev', ['inject'], function() {
    serve(true /* isDev */);
});

////////////

function serve(isDev) {
    var nodeOptions = {
        script: config.nodeServer,
        delayTime: 1,
        env: {
            'PORT': port,
            'NODE_ENV': isDev ? 'dev' : 'build'
        },
        watch: [config.server]
    };

    return $.nodemon(nodeOptions)
        .on('restart', function(ev) {
            log('*** nodemon restarted');
            log('files changed on restart:\n' + ev);
            setTimeout(function() {
                browserSync.notify('reloading now ...');
                browserSync.reload({stream: false});
            }, config.browserReloadDelay);
        })
        .on('start', function() {
            log('*** nodemon started');
            startBrowserSync(isDev);
        })
        .on('crash', function() {
            log('*** nodemon crashed: script crashed for some reason');
        })
        .on('exit', function() {
            log('*** nodemon exited cleanly');
        });
}

function changeEvent(event) {
    var srcPattern = new RegExp('/.*(?=/' + config.source + ')/');
    log('File ' + event.path.replace(srcPattern, '') + ' ' + event.type);
}

function startBrowserSync(isDev) {
    if (args.nosync || browserSync.active) {
        return;
    }

    log('Starting browser-sync on port ' + port);

    if (isDev) {
        gulp.watch([config.stylus], ['styles'])
            .on('change', function(event) { changeEvent(event); });
    } else {
        gulp.watch([config.stylus, config.js, config.html], ['optimize', browserSync.reload])
            .on('change', function(event) { changeEvent(event); });
    }

    var options = {
        proxy: 'localhost:' + port,
        port: 3000,
        browser: "google chrome",
        files: isDev ? [
            config.public + '**/*.*',
            '!' + config.stylus,
            config.temp + '**/*.css'
        ] : [],
        ghostMode: {
            clicks: true,
            location: false,
            forms: true,
            scroll: true
        },
        injectChanges: true,
        logFileChanges: true,
        logLevel: 'debug',
        logPrefix: 'gulp-patterns',
        notify: true,
        reloadDelay: 0 //1000
    };

    browserSync(options);
}

function clean(path, done) {
    log('Cleaning: ' + $.util.colors.blue(path));
    del(path, done);
}

function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}

/**
 * Inject files in a sorted sequence at a specified inject label
 * @param   {Array} src   glob pattern for source files
 * @param   {String} label   The label name
 * @param   {Array} order   glob pattern for sort order of the files
 * @returns {Stream}   The stream
 */
//function inject(src, label, order) {
//    var options = {read: false};
//    if (label) {
//        options.name = 'inject:' + label;
//    }
//
//    return $.inject(orderSrc(src, order), options);
//}
//
///**
// * Order a stream
// * @param   {Stream} src   The gulp.src stream
// * @param   {Array} order Glob array pattern
// * @returns {Stream} The ordered stream
// */
//function orderSrc (src, order) {
//    //order = order || ['**/*'];
//    return gulp
//        .src(src)
//        .pipe($.if(order, $.order(order)));
//}
