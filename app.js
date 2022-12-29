const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const client = require("@mailchimp/mailchimp_marketing");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/source'))

client.setConfig({
    apiKey: "a4287a9a40a896cbc259ad1af4b123b1-us11",
    server: "us11",
  });

app.post('/failure', function(req, res) {
    res.redirect("/")
});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/source/signup.html');
});

app.post("/", function(req, res) {

    const listid = "4a0a0b11af"
    const run = async () => {
    const response = await client.lists.batchListMembers(listid, {
        members: [{
            "email_address": req.body.email,
            "status": "subscribed",
            "merge_fields": {
                "FNAME": req.body.firstName,
                "LNAME": req.body.lastName,
            }
        }],
    });
    console.log(response)
    if (response.error_count === 0) {
        res.sendFile(__dirname + '/source/success.html')
    }
    else {
        res.sendFile(__dirname + '/source/failure.html')
    }

    };
    run();

});


app.listen(port, () => {
    console.log("Server is running");
});