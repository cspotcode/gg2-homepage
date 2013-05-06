var exec = require('exec');
require('shelljs/global');
var async = require('async');

execAndPipeToFile = function(args, outputFile, cb) {
    exec(args, function(err, out, code) {
        code || out.to(outputFile);
        cb(code);
    });
};

nodejs = process.argv[0];
recess = 'node_modules/recess/' + require('recess/package.json').bin.recess;

async.series([
    // Build Twitter Bootstrap's CSS files
    function(cb) {
        mkdir('-p', 'src/files/css');

        execAndPipeToFile([nodejs, recess, '--compile', 'bootstrap/less/bootstrap.less'], 'src/files/css/bootstrap.css', cb);
    }, function(cb) {
        execAndPipeToFile([nodejs, recess, '--compress', 'bootstrap/less/bootstrap.less'], 'src/files/css/bootstrap.min.css', cb);
    }, function(cb) {
        execAndPipeToFile([nodejs, recess, '--compile', 'bootstrap/less/responsive.less'], 'src/files/css/bootstrap-responsive.css', cb);
    }, function(cb) {
        execAndPipeToFile([nodejs, recess, '--compress', 'bootstrap/less/responsive.less'], 'src/files/css/bootstrap-responsive.min.css', cb);
    }
]);
