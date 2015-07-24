    module.exports = function() {
    var public = './public/';
    var publicApp = public + 'app/';
    var server = './server/';
    var temp = public + 'tmp/';
    var views = public + 'views/';

    var config = {
    
        /**
         * Files paths
         */
        alljs: [
            public + '**/*.js',
            server + '**/*.js',
            './*.js'
        ],
        build: './build/',
        public: public,
        css: temp + 'site.css',
        fonts: './bower_components/bootstrap/fonts/**/*.*',
        html: publicApp + '**/*.html',
        htmltemplates: publicApp + '**/*.html',
        images: public + 'images/**/*.*',
        index: public + 'index.html',
        js: [
            publicApp + '**/*.module.js',
            publicApp + '**/*.js',
            '!' + publicApp + '**/*.spec.js'
        ],
        stylus: public + 'css/site.styl',
        server: server,
        swig: [
            public + '*.html'
            //'!' + views + 'layout.html'
        ],
        temp: temp,
        views: views,
        /**
         * optimized files
         */
        optimized: {
            app: 'app.js',
            lib: 'lib.js'
        },
        /**
         * template cache
         */
        templateCache: {
            file: 'templates.js',
            options: {
                module: 'app',
                standAlone: false,
                root: '/app/'
            }
        },

        /**
         * browser sync
         */
        browserReloadDelay: 1000,

        /**
         * Bower and NPM locations
         */
        bower: {
            json: require('./bower.json'),
            directory: './bower_components/',
            ignorePath: '../..'
        },

        /**
         * Node settings
         */
        defaultPort: 3030,
        nodeServer: './server.js'

    };

    config.getWiredepDefaultOptions = function() {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };
        return options;
    };

    return config;
};
