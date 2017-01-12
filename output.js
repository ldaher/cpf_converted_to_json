var fs = require('fs');

var loadFile = fs.readFileSync('cpfs.csv', 'utf8', function (err, dt) {
    if (err) {
        console.err(err);
    } else {
        return dt;
    }
});

// cpfs array to hold all cpfs
var cpfs = loadFile.split('\r\n');
var jsonObject = "";
var counter = 1;
var stringCounter = "0000";

for (var i = 0; i < cpfs.length; i++) {
    var convertCounter = new String(counter);
    var replaceString = stringCounter.substring(0, stringCounter.length - convertCounter.length) + convertCounter;
    
    if(cpfs[i].length > 11){
        continue;
    }

    if (i == 0) {
        jsonObject = jsonObject + "{\"item\":[";
        jsonObject = jsonObject + "{\"cpf\": \"" + cpfs[i] + "\", \"token\": \"" + replaceString + "\", \"timestamp\": 494511390, \"uuid\": \"TESTSESSION-" + replaceString + "\"},";
    } else if (i == cpfs.length - 1) {
        jsonObject = jsonObject + "{\"cpf\": \"" + cpfs[i] + "\", \"token\": \"" + replaceString + "\", \"timestamp\": 494511390, \"uuid\": \"TESTSESSION-" + replaceString + "\"}";
        jsonObject = jsonObject + "]}";
    } else {
        jsonObject = jsonObject + "{\"cpf\": \"" + cpfs[i] + "\", \"token\": \"" + replaceString + "\", \"timestamp\": 494511390, \"uuid\": \"TESTSESSION-" + replaceString + "\"},";
    }
    counter++;
}

console.log(jsonObject);

fs.writeFileSync("json-converted.json", jsonObject.toString());