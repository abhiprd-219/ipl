let csvToJson = require('convert-csv-to-json');
let matches = csvToJson.fieldDelimiter(',').getJsonFromCsv('/home/abhishek/Desktop/ipl-1/src/data//matches.csv');
let deliveries = csvToJson.fieldDelimiter(',').getJsonFromCsv('/home/abhishek/Desktop/ipl-1/src/data/deliveries.csv');
console.log(matches.length);
console.log(deliveries.length);
