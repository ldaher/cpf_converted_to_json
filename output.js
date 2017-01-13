var fs = require('fs');
const endOfLine = require('os').EOL;

var loadFile = fs.readFileSync('cpfs.csv', 'utf8', function (err, dt) {
    if (err) {
        console.err(err);
    } else {
        return dt;
    }
});

var jsonObject = {objects: []};
var counter = 1;
var stringCounter = "0000";
var cpfs = loadFile.split(endOfLine);

for (var i = 0; i < cpfs.length; i++) {
    if(cpfs[i].length > 11){
        continue;
    }

    var numberToString = new String(counter);
    var replacedNumber = stringCounter.substring(0, stringCounter.length - numberToString.length) + numberToString;

    jsonObject.objects.push({
        cpf: cpfs[i], 
        token: replacedNumber, 
        timestamp: 494511390, 
        uuid: "TESTSESSION-" + replacedNumber}
        );

    counter++;
}

fs.writeFileSync('json-converted.json', JSON.stringify(jsonObject, null, 4), 'utf8');