// var path = require('path');
// var rootPath = path.normalize(__dirname + '/../../');

// module.exports = {
//     dev: {
//        db: 'mongodb://localhost/deviationDB',
//         // db: 'mongodb://au01a112/DeviationDB',
//         rootPath: rootPath,
//         staticFiles: rootPath + 'public/',
//         appViews: rootPath + '/public/',
//         views: rootPath + 'public/'
//         //port: process.env.PORT || 3030
//     },
//     build: {
//         rootPath: rootPath,
//         staticFiles: rootPath + 'build/',
//         appViews: rootPath + 'build/views',
//         views: rootPath + 'build/views',
//         db: 'mongodb://au01a112/DeviationDB'
//         //port: process.env.PORT || 8080
//     }
// };

var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    dev: {
        db: 'mongodb://localhost/DeviationDB',
        rootPath: rootPath,
        staticFiles: rootPath + 'public/',
        appViews: rootPath + 'public/views/',
        views: rootPath + 'public/'
        //port: process.env.PORT || 3030
    },
    build: {
        rootPath: rootPath,
        staticFiles: rootPath + 'build/',
        appViews: rootPath + 'build/views/',
        views: rootPath + 'build/views/',
        db: 'mongodb://localhost/DeviationDB'
        //port: process.env.PORT || 8080
    }
};
