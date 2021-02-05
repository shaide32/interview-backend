var express = require('express');
var router = express.Router();

const Publications = require('../models/publications');
const Users = require('../models/users');

router.get('/', function(req, res, next) {

    Publications.find({}, (err, pubs) => {
    if(err) {
      console.log('No publications');
    }
    console.log(pubs);
    res.json(pubs);
  });
});

router.get('/user', function(req, res, next) {

    Publications.find({}).then( pubs => {
        const publications = [];
        // console.log(pubs)
        pubs.forEach(pub => {
            
            publications.push(Users.find({publications: pub._id}))
        });
        return Promise.all(publications);   
    }).then((publications) => {
        res.send(publications);
    }).catch((error) => {
        console.log(error)
        res.status(500).send('one of the queries failed', error);
    })
});

router.post('/', (req, res, next) => { 
  const pub = req.body;
  Publications.create(pub, (err, publications) => {
    if(err) {
      res.status(500);
      res.send(err);
      console.log('Could not create publication');
    } else {
      console.log('publications ', publications);
      res.json(publications);
    }
  });
});

router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    Publications.deleteOne({ _id: id }, (err, pub) => {
      if(err) {
        res.status(500);
        res.send(err);
        console.log('Could not delete publication');
      } else {
        res.json(pub);
      }
    });
});

router.put('/:id', (req, res, next) => {
    const id = req.params.id;
    const pub = req.body;
    console.log('Updating pub', pub);
    Publications.updateOne({ _id: id }, pub, (err, publication) => {
      if(err) {
        console.log('Could not update publication');
        res.status(500);
        res.send(err);
      } else {
        res.json(publication);
      }
    });
});

module.exports = router;