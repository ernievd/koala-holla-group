const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 7329;
const koalasRouter = require('./routes/koalas.router');

// body parser
app.use(bodyParser.urlencoded({extended: true}));

//serve static files
app.use(express.static('server/public'));

// routes
app.use('/koalas', koalasRouter);

app.listen(PORT, function(){
    console.log('server running on port:', PORT);
});