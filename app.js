const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const https = require('https');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('styles'))


app.get('/', function(req, res) {
    res.sendFile(__dirname + '/templates/signup.html');
});


app.listen(port, () => {
    console.log("Server is running");
});