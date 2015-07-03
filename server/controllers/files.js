var File = require('mongoose').model('File');
var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');
var fs = require('fs');

exports.downloadFile = function (req, res) {
    var filename = req.params.file;
    var file = '.././uploads/' + filename;
    res.download(file);
};

exports.uploadFile = function (req, res) {
    var fileData = {};
    var fileName = req.files.file.name;


    fileData.fsAddedAt = new Date();
    fileData.fsAddedBy = req.body.dpUser;
    fileData.fsFileName = fileName.split('.').shift();
    fileData.fsFileExt = req.files.file.extension;
    fileData.fsDevNo = req.body.dvNo;


    File.update({fsFileName: fileData.fsFileName}, fileData, {upsert: true}, function (err) {
        if (err) {
            res.status(400);
            return res.send({reason: err.toString()});
        }
        res.sendStatus(200);
    });

};

exports.getFiles = function (req, res) {

    console.log(req.params.files);

    File.find({fsDevNo: req.params.files})
        .exec(function (err, collection) {
            res.send(collection);
        });
};

exports.deletefile = function (req, res) {

    var file = req.params.file;
    var fileDB = file.split('.').shift();

    File.remove({fsFileName: fileDB}, function (err) {
        if (err) return handleError(err);
    });

    fs.unlink('.././uploads/' + file, function (err) {
        if (err) throw err;
        console.log('successfully deleted /uploads/' + file);
        res.sendStatus(200);
    });

};

