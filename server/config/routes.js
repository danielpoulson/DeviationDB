var auth = require('./auth');
var users = require('../controllers/users');
var deviations = require('../controllers/deviations');
var tasks = require('../controllers/tasks');
var mongoose = require('mongoose');
var files = require('../controllers/files');
var User = mongoose.model('User');

module.exports = function(app, config) {
//*************User Routes************************
  app.get('/api/users', auth.requiresRole('admin'), users.getUsers);
  app.post('/api/users', users.createUser);
  //app.put('/api/users', users.updateUser);
  app.get('/api/allusers', users.getAllUsers);
  app.get('/api/users/admin/:id', users.getUsersById);
  app.put('/api/users/admin/:id', users.updateAdminUser);
  app.delete('/api/users/admin/:id', users.deleteUser);

  //*************Deviation Routes************************
  //Deviations
  app.get('/api/DevItem', deviations.deviationCountYear);
  app.get('/api/deviationlist/:status/:cust', deviations.getDeviations);
  //app.get('/api/deviations', deviations.getDeviations);
  app.get('/api/deviations/:id', deviations.getDeviationById);
  app.get('/api/deviationName/:id', deviations.getDeviationNameById);

  app.put('/api/deviations/:id', deviations.updateDeviation);
  app.post('/api/deviations', deviations.createDeviation);
  app.delete('/api/deviation/:id', deviations.deleteDeviation);

  //*************Customer Routes************************
  //Deviations
  app.get('/api/customers', deviations.getCustomers);

  //Task

  app.get('/api/deviation/tasks/:id', tasks.getDeviationTaskList);
//  app.get('/api/tasks', tasks.getTasks);
  app.get('/api/alltasks/:status/:capa', tasks.getTasks);
  app.get('/api/tasks/:id', tasks.getTaskById);
  app.put('/api/tasks/:id', tasks.updateTask);
  app.post('/api/tasks', tasks.createTask);
  app.delete('/api/tasks/:id', tasks.deleteTask);


  //**********File function ***************
  app.get('/server/upload/:file', files.downloadFile);
  app.get('/api/files/:files', files.getFiles);
  //app.post('/api/files', files.createFile);
  app.post('/server/upload', files.uploadFile);
  app.delete('/server/delete/:file', files.deletefile);
  app.get('/api/exportcsv', deviations.dumpDeviation);

//**********Dashboard function ***************

    app.get('/api/dashboard/class', deviations.getClass);
    app.get('/api/dashboard/summary', deviations.getDashboard);



//********* Helper Routes**********
  app.get('/api/taskcount/:id', tasks.getTaskCount);
  app.get('/api/filecount/:id', files.getFileCount);

//  app.get('/partials/*', function(req, res) {
//    res.render('../../public/app/' + req.params[0]);
//  });

  app.post('/login', auth.authenticate);

  app.post('/logout', function(req, res) {
    req.logout();
    res.end();
  });
    
// application -------------------------------------------------------------
//	app.get('*', function(req, res) {
//		res.sendfile(config.appViews + 'layout.html'); // load the single view file (angular will handle the page changes on the front-end)
//	});    

  app.get('*', function(req, res) {
      //console.log(req.user);
    res.render('index', {
      bootstrappedUser: req.user
        
    });
      
  });
};