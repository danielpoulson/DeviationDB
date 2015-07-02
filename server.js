var express = require('express');

var env = process.env.NODE_ENV || 'dev';
var port = process.env.PORT || 3030;

var app = express();

var config = require('./server/config/config')[env];

require('./server/config/express')(app, config);

require('./server/config/mongoose')(config);

require('./server/config/passport')();

require('./server/config/routes')(app, config);

console.log('About to crank up node');
console.log('PORT=' + port);
console.log('NODE_ENV=' + env);


switch (env) {
    case 'build':
        console.log('** BUILD **');
        break;
    default:
        console.log('** DEV **');
        break;
}

app.listen(port, function() {
    console.log('Express server listening on port ' + port);
    console.log('env = ' + app.get('env') +
                '\n__dirname = ' + __dirname +
                '\nprocess.cwd = ' + process.cwd());
});