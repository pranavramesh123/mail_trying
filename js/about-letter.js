var fs = require('fs');

function LetterInfo() {}
LetterInfo.prototype.readInfo = function () {
    return fs.readFileSync('./text/mail.txt');
};
LetterInfo.prototype.writeInfo = function (data) {
    return fs.writeFile('./text/mail.txt', data, function (err) {
        if (err) throw err;
    });
};
global.LetterInfo = LetterInfo;