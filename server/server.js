const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 7329;

//serve static files
app.use(express.static('server/public'));

app.listen(PORT, function(){
    console.log('server running on port:', PORT);
});