const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', function(req, res){
    const queryText = 'SELECT * FROM koalas';
    pool.query(queryText)
    // runs on successful query
    .then((result) => {
        console.log('query results: ', result);            
        res.send(result.rows);
    })
    // error handling
    .catch((err) => {
        console.log('error making select query:', err);
        res.sendStatus(500);
    });
});

router.post('/', function(req, res) {
    const queryText = 'INSERT INTO koalas(name, gender, age, ready_to_transfer, notes) VALUES($1, $2, $3, $4, $5)';
    pool.query(queryText, [req.body.name, req.body.gender, req.body.age, req.body.transferrable, req.body.notes])
    // runs on successful query
    .then((result) => {
        //console.log('query results: ', result);            
        res.send(201);
    })
    // error handling
    .catch((err) => {
        console.log('error making select query:', err);
        res.sendStatus(500);
    });
});

router.put('/:id', function(req, res){
    const queryText = 'UPDATE koalas SET ready_to_transfer=$1 WHERE id=$2;';
    pool.query(queryText, [req.body.ready_to_transfer, req.params.id])
    // runs on successful query
    .then((result) => {
        //console.log('query results: ', result);            
        res.send(200);
    })
    // error handling
    .catch((err) => {
        console.log('error making select query:', err);
        res.sendStatus(500);
    });
});

module.exports = router;