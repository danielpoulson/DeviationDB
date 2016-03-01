var User = require('mongoose').model('User');
var encrypt = require('../utilities/encryption');

exports.getUsers = function(req, res) {
  User.find({}).exec(function(err, collection) {
    res.send(collection);
  });
};

exports.getUserEmail = function(user) {
  var user = user.split(" ");
  var email = "dan@sillyboy.com";
  return User.find({$and: [{ firstName: user[0] }, { lastName: user[1] }]},{email:1, "_id" : 0});
  
};

exports.getAllUsers = function(req, res) {
    User.find({},{firstName : 1, lastName : 1, "_id" : 0}).exec(function(err, collection) {
        var users = [];
        for(var i = 0; i < collection.length; i++){
            users.push(collection[i].firstName + " " + collection[i].lastName);
        }
        res.send(users);
    });
};

exports.createUser = function(req, res, next) {
  var userData = req.body;
  userData.username = userData.username.toLowerCase();
  userData.salt = encrypt.createSalt();
  userData.hashed_pwd = encrypt.hashPwd(userData.salt, userData.password);
  User.create(userData, function(err, user) {
    if(err) {
      if(err.toString().indexOf('E11000') > -1) {
        err = new Error('Duplicate Username');
      }
      res.status(400);
      return res.send({reason:err.toString()});
    }
    //req.logIn(user, function(err) {
    //  if(err) {return next(err);}
    //  res.send(user);
    //})
      res.send(200);

  });
};

exports.updateUser = function(req, res) {
  var userUpdates = req.body;

  if(req.user._id != userUpdates._id && !req.user.hasRole('admin')) {
    res.status(403);
    return res.end();
  }

  req.user.firstName = userUpdates.firstName;
  req.user.lastName = userUpdates.lastName;
  req.user.username = userUpdates.username;
  req.user.email = userUpdates.email;
  if(userUpdates.password && userUpdates.password.length > 0) {
    req.user.sale = encrypt.createSalt();
    req.user.hashed_pwd = encrypt.hashPwd(req.user.sale, userUpdates.password);
  }
  req.user.save(function(err) {
    if(err) { res.status(400); return res.send({reason:err.toString()});}
    res.send(req.user);
  });
};

exports.getUsersById = function(req, res) {
  User.findOne({username:req.params.id})
      .exec(function(err, user) {
        res.send(user);
      });
};

exports.updateAdminUser = function(req, res) {
  if(req.body.password && req.body.password.length > 0) {
    req.body.salt = encrypt.createSalt();
    req.body.hashed_pwd = encrypt.hashPwd(req.body.salt, req.body.password);
  }
  User.update({username:req.params.id}, {$set: req.body}, function (err) {
    if (err) return handleError(err);
    res.send(200);
  });
};

exports.deleteUser = function(req, res) {
  User.remove({username:req.params.id}, function (err) {
    if (err) return handleError(err);
    res.send(200);
  });
};