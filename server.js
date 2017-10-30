const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const fs = require('fs');
require('./js/about-letter');
const port = 8000;
var mysql = require('mysql');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    'extended': 'true'
}));
app.use(cors());
var connection = mysql.createConnection({
    host: '193.93.216.145'
    , user: 'sqlkn15_3_ppr'
    , password: 'kn15_ppr'
    , database: 'sqlkn15_3_ppr'
});
//connection to mysql database
var initDb = function () {
    connection.query('' + 'CREATE TABLE IF NOT EXISTS Mail (' + 'id int(11) NOT NULL AUTO_INCREMENT,' + 'name varchar(50), ' + 'nick varchar(50),' + 'pass varchar(50), ' + 'gender varchar(25), ' + 'phone int(11),' + 'PRIMARY KEY(id) )', function (err) {
        if (err) throw err;
    });
};
initDb();
//get all users from mysql
app.get('/Mail', function (req, res) {
    connection.query('SELECT * FROM Mail', function (err, rows) {
        if (err) throw err;
        res.status(200).send(rows);
    });
});
//adding new user to database
app.post('/Mail', function (req, res) {
    connection.query('INSERT INTO Mail SET ?', req.body, function (err, result) {
        if (err) throw err;
    });
    res.sendStatus(200);
});
//twilio- sms verification
const twilio = require('twilio');
const clientTwilio = new twilio('AC45f99cd39a27291dc51d53af8794eeaf', 'cf095f26aa173dde3b4755df858649ed');
app.post('/testtwilio', function (req, res) {
    clientTwilio.messages.create({
        body: req.body.code
        , to: req.body.number
        , from: '+17087164339'
    }).then((message) => console.log(message.sid));
    res.sendStatus(200);
});
//send mail to user. based on FS
app.post('/send-mail', function (req, res) {
    var str = new LetterInfo().readInfo().toString();
    if (str == "") {
        str = str + req.body.text + "/t/" + req.body.from + "/t/" + req.body.to;
    }
    else {
        str = str + "/mail/" + req.body.text + "/t/" + req.body.from + "/t/" + req.body.to;
    }
    var str2 = new LetterInfo().writeInfo(str);
    res.sendStatus(200);
});
//check inmail
app.post('/check-mail', function (req, res) {
    var test = [];
    var str = new LetterInfo().readInfo().toString().split('/mail/');
    for (var i = 0; i < str.length; i++) {
        var testArr = str[i].split("/t/");
        if (testArr[2] == req.body.login) {
            test.push({
                text: testArr[0]
                , from: testArr[1]
                , to: testArr[2]
            })
        }
        testArr = [];
    }
    res.status(200).send(test);
});
//check outmail
app.post('/check-mail2', function (req, res) {
    var test2 = [];
    var str2 = new LetterInfo().readInfo().toString().split('/mail/');
    for (var i = 0; i < str2.length; i++) {
        var testArr2 = str2[i].split("/t/");
        if (testArr2[1] == req.body.login) {
            test2.push({
                text: testArr2[0]
                , from: testArr2[1]
                , to: testArr2[2]
            })
        }
        testArr2 = [];
    }
    res.status(200).send(test2);
});
app.get('*', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
//--------------------
app.listen(port, function (err) {
    if (err) throw err;
    console.log('Server start on port 8000!');
});