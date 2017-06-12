// theft program for overfive and underfive
const readline = require('readline'); //varible for readline
const fs = require('fs'); //file system
// getting csv file
const rl = readline.createInterface({
    input: fs.createReadStream('data/chicagocrimes.csv')
});
var $year;
var $description;
// creating final result array
jsonobj = [];
rl.on('line', function(line) {
    header = line.split(","); //Getting header values
    for (var i = 0; i < header.length; i++) {
        if (header[i] == "Year")
            $year = i;
        else if (header[i] == "Description")
            $description = i;
    }

});

rl.on('line', (line) => {
    var lin = line.split(",");
    var obj = {};
    obj.year = lin[$year];
    var description = ["OVER $500", "$500 AND UNDER"];
    obj.overfive = 0;
    obj.underfive = 0;
    var flag = 0;

    if (description.indexOf(lin[$description]) != -1) {

        for (var i = 0; i < jsonobj.length; i++) {

            if (jsonobj[i].year == lin[$year]) {
                if (lin[$description] == description[0]) {
                    jsonobj[i].overfive = parseInt(jsonobj[i].overfive) + 1;
                    flag++;
                } else if (lin[$description] == description[1]) {
                    jsonobj[i].underfive = parseInt(jsonobj[i].underfive) + 1;
                    flag++;
                }
            }
        };
        if (flag == 0) {
            if (lin[$description] == description[0]) {
                obj.overfive = 1;
                jsonobj.push(obj);
            }
            if (lin[$description] == description[1]) {
                obj.underfive = 1;
                jsonobj.push(obj);
            }
        }
    }
});

rl.on('close', function() {
    //console.log(jsonobj);
    fs.writeFileSync('output/theft.json', JSON.stringify(jsonobj));
});

//assault program for arrested and not arrested

//const readline = require('readline');
//const fs = require('fs');

const r = readline.createInterface({
    input: fs.createReadStream('data/chicagocrimes.csv')
});

jsonobj = [];
r.on('line', function(line) {
    header = line.split(","); //Getting header values
    for (var i = 0; i < header.length; i++) {
        if (header[i] == "Year")
            $year = i;
        else if (header[i] == "Primary Type")
            $primarytype = i;
        else if (header[i] == "Arrest")
            $arrest = i;
    }

});

r.on('line', (line) => {
    //var lin = line.split(',');
    var lin = line.split(",");
    var obj = {};
    var arrest = ["true", "false"];
    //console.log(lin);
    obj.year = lin[$year];
    obj.arrested = 0;
    obj.notarrested = 0;
    var flag = 0;

    if (lin[$primarytype] === "ASSAULT") {

        for (var i = 0; i < jsonobj.length; i++) {
            if (jsonobj[i].year == lin[$year]) {

                if (lin[$arrest] == arrest[0]) {

                    jsonobj[i].arrested = parseInt(jsonobj[i].arrested) + 1;
                    flag++;
                } else if (lin[$arrest] == arrest[1]) {
                    jsonobj[i].notarrested = parseInt(jsonobj[i].notarrested) + 1;
                    flag++;
                }
            }
        };
        if (flag == 0) {
            if (lin[$arrest] == arrest[0]) {
                obj.arrested = 1;
                jsonobj.push(obj);
            }
            if (lin[$arrest] == arrest[1]) {
                obj.notarrested = 1;
                jsonobj.push(obj);
            }
        }
    }

});

r.on('close', function() {
    //console.log(jsonobj);
    fs.writeFileSync('output/assault.json', JSON.stringify(jsonobj));
});

module.exports = {
    a: jsonobj,
    b: jsonobj
};