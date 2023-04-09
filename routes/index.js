var express = require('express');
var Task = require('../models/task');
var Application = require('../models/application');
var ReactApplication = require('../models/react-app');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  Task.find()
    .then((tasks) => {  
      Application.find()
        .then((apps) => {
          const currentTasks = tasks.filter(task => !task.completed);
          const completedTasks = tasks.filter(task => task.completed === true);
          const createdApps = apps.filter(app => app.completed === true);
          const createdReactApps = createdApps;
          console.log(`Total tasks: ${tasks.length}   Current tasks: ${currentTasks.length}    Completed tasks:  ${completedTasks.length}`)
          res.render('index', { currentTasks: currentTasks, completedTasks: completedTasks,
            createdApps: createdApps, createdReactApps: createdReactApps });
        })
        .catch((err) => {
          console.log(err);
          res.send('Sorrrry! Something went wrong.');
        });
    })
    .catch((err) => {
      console.log(err);
      res.send('Sorry! Something went wrong.');
    });
});

router.post('/addTask', function(req, res, next) {
  const taskName = req.body.taskName;
  const createDate = Date.now();
  
  var task = new Task({
    taskName: taskName,
    createDate: createDate
  });
  console.log(`Adding a new task ${taskName} - createDate ${createDate}`)

  task.save()
      .then(() => { 
        console.log(`Added new task ${taskName} - createDate ${createDate}`)        
        res.redirect('/'); })
      .catch((err) => {
          console.log(err);
          res.send('Sorry! Something went wrong.');
      });
});

router.post('/createApp', function(req, res, next) {
  const appName = req.body.appName;
  const createDate = Date.now();
  const completedDate = Date.now();
  
  var app = new Application({
    appName: appName,
    completed: true,
    createDate: createDate,
    completedDate: completedDate
  });
  console.log(`Creating new App ${appName} - createDate ${createDate}`)

  app.save()
      .then(() => { 
        console.log(`Created new App  ${appName} - createDate ${createDate}`)        
        res.redirect('/'); })
      .catch((err) => {
          console.log(err);
          res.send('Sorry! Something went wrong.');
      });
});

router.post('/createReactApp', function(req, res, next) {
  const figmaUrl = req.body.figmaUrl;
  const createDate = Date.now();
  const completedDate = Date.now();

  var reactApplication = new ReactApplication({
    figmaUrl: figmaUrl,
    completed: true,
    createDate: createDate,
    completedDate: completedDate
  });
  console.log(`Adding a new React App ${figmaUrl} - createDate ${createDate}`)
  reactApplication.save()
      .then(() => { 
        console.log(`Added new React App ${figmaUrl} - createDate ${createDate}`)        
        res.redirect('/'); })
      .catch((err) => {
          console.log(err);
          res.send('Sorry! Something went wrong.');
      });
});

router.post('/completeTask', function(req, res, next) {
  console.log("I am in the PUT method")
  const taskId = req.body._id;
  const completedDate = Date.now();

  Task.findByIdAndUpdate(taskId, { completed: true, completedDate: Date.now()})
    .then(() => { 
      console.log(`Completed task ${taskId}`)
      res.redirect('/'); }  )
    .catch((err) => {
      console.log(err);
      res.send('Sorry! Something went wrong.');
    });
});


router.post('/deleteTask', function(req, res, next) {
  const taskId = req.body._id;
  const completedDate = Date.now();
  Task.findByIdAndDelete(taskId)
    .then(() => { 
      console.log(`Deleted task $(taskId)`)      
      res.redirect('/'); }  )
    .catch((err) => {
      console.log(err);
      res.send('Sorry! Something went wrong.');
    });
});


module.exports = router;
