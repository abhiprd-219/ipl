const { matches, deliveries } = require('./Index');
const fs = require('fs');

function findPlayerOfTheMatchPerYear() {
  let mp = new Map();
  
  matches.forEach(i => {
    if (mp.has(i.player_of_match)) {
      let count = mp.get(i.player_of_match);
      mp.set(i.player_of_match, count + 1);
    } else {
      mp.set(i.player_of_match, 1);
    }
  });

  return mp;
}

const output = findPlayerOfTheMatchPerYear();

// Convert the Map to an array of key-value pairs and format it as a JSON string
const outputArray = Array.from(output, ([player, count]) => ({ player, count }));
const outputJSON = JSON.stringify(outputArray, null, 2); // Pretty-print JSON with indentation

// Write the output to a file
fs.writeFile('output.txt', outputJSON, (err) => {
  if (err) throw err;
  console.log("Output has been written to output.txt");
});
