const { matches, deliveries } = require('./Index');
const fs = require('fs');

function findMatchesPlayedPerSeason(){
    let mp = new Map();
    matches.forEach(i => {
        if(mp.has(i.season)){
            let count = mp.get(i.season);
            mp.set(i.season, count + 1);
        } else {
            mp.set(i.season, 1);
        }
    });
    return mp;
}

const output = findMatchesPlayedPerSeason();

const outputArray = Array.from(output, ([year, totalMatches]) => ({ year, totalMatches }));
const outputJSON = JSON.stringify(outputArray, null, 2); 
fs.writeFile('public/findMatchesPlayedPerSeason.json', outputJSON, (err) => {
    if (err) throw err;
    console.log("Output has been written to public/output.json");
});
