var express = require('express');
var router = express.Router();

const Users = require('../models/users');
const Publications = require('../models/publications');

router.get('/', function(req, res, next) {

  Users.find({}, (err, users) => {
    if(err) {
      console.log('No user');
    }
    console.log(users);
    res.json(users);
  });
});


router.post('/', (req, res, next) => { 
  const user = req.body;
  Users.create(user, (err, user) => {
    if(err) {
      res.status(500);
      res.send(err);
      console.log('Could not create user');
    } else {
      console.log('User ', user);
      res.json(user);
    }
    
  })
});

router.post('/pub/:id', (req, res, next) => { 
  const pub = req.body;
  const userId = req.params.id;
  Publications.create(pub, (err, pub) => {
    if(err) {
      res.status(500);
      res.send(err);
      console.log('Could not create publication');
    } else {
      Users.findByIdAndUpdate(
        userId,
        { $push: { publications: pub._id } },
        { new: true, useFindAndModify: false }
       ).populate('publications')
       .exec((err, user) => {
        if(err) {
          console.log('Could not update user');
        }
        res.json(user);
      })
    }
  });
    
});

router.get('/pub', (req, res, next) => { 
  Users.find({})
  .populate('publications')
  .exec((err, user) => {
    console.log(user)
    if(err) {
        
        console.log(err)
    }
      res.json(user);
    
  });
});

router.get('/pub/:id', (req, res, next) => { 
  Users.find({publications: req.params.id}, (err, user) => {
    console.log(user)
    if(err) {
        
        console.log(err)
    }
      res.json(user);
    
  });
});

router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  Users.deleteOne({ _id: id }, (err, user) => {
    if(err) {
      res.status(500);
      res.send(err);
      console.log('Could not delete publication');
    } else {
      res.json(user);
    }
  });
});

module.exports = router;
