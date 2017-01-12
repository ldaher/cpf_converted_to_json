var fs = require('fs');
var StringBuilder = require('stringbuilder');

var loadFile = fs.readFileSync('cpfs.csv', 'utf8', function (err, dt) {
    if (err) {
        console.err(err);
    } else {
        return dt;
    }
});

var jsonObject = "";
var counter = 1;
var stringCounter = "0000";
// cpfs array to hold all cpfs
var cpfs = loadFile.split('\r\n');

jsonObject = jsonObject + '{"item":[';
for (var i = 0; i < cpfs.length; i++) {
    if(cpfs[i].length > 11){
        continue;
    }

    var numberToString = new String(counter);
    var replacedNumber = stringCounter.substring(0, stringCounter.length - numberToString.length) + numberToString;

    jsonObject = jsonObject + '{"cpf": "' + cpfs[i] + '", "token": "' + replacedNumber + '", "timestamp": 494511390, "uuid": "TESTSESSION-' + replacedNumber + '"}';

    if (i != cpfs.length - 1) {
        jsonObject = jsonObject + ', ';
    }
    
    counter++;
}
jsonObject = jsonObject + ']}';

console.log(jsonObject.toString());

fs.writeFileSync("json-converted.json", jsonObject.toString());