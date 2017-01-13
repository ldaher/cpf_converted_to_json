var fs = require('fs');
var StringBuilder = require('stringbuilder');
var endOfLine = require('os').EOL;

var loadFile = fs.readFileSync('cpfs.csv', 'utf8', function (err, dt) {
    if (err) {
        console.err(err);
    } else {
        return dt;
    }
});

StringBuilder.extend('string');

var jsonObject = new StringBuilder();
var counter = 1;
var stringCounter = "0000";
var cpfs = loadFile.split(endOfLine);

jsonObject.appendLine('{"item":[');
for (var i = 0; i < cpfs.length; i++) {
    if(cpfs[i].length > 11){
        continue;
    }

    var numberToString = new String(counter);
    var replacedNumber = stringCounter.substring(0, stringCounter.length - numberToString.length) + numberToString;

    jsonObject.append('{"cpf": "' + cpfs[i] + '", "token": "' + replacedNumber + '", "timestamp": 494511390, "uuid": "TESTSESSION-' + replacedNumber + '"}');

    if (i != cpfs.length - 1) {
        jsonObject.append(', ');
    }

    jsonObject.appendLine();
    
    counter++;
}
jsonObject.appendLine(']}');

var writeStream = fs.createWriteStream("json-converted.json");

jsonObject.pipe(writeStream);
jsonObject.flush();