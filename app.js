const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const https = require('https');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/source'))


app.get('/', function(req, res) {
    res.sendFile(__dirname + '/source/signup.html');
});


app.listen(port, () => {
    console.log("Server is running");
});