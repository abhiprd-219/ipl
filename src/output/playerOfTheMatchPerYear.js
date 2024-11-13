const { matches, deliveries } = require('./Index');
const fs = require('fs');

function findPlayerOfTheMatchPerYear() {
    let seasonMap = new Map();
  
    matches.forEach(i => {
      const season = i.season; // Assuming the season is stored in 'i.season'
      const player = i.player_of_match;
  
      // Initialize season data if it doesn't exist
      if (!seasonMap.has(season)) {
        seasonMap.set(season, new Map());
      }
  
      let playerMap = seasonMap.get(season);
  
      // Increment the count for the player within that season
      if (playerMap.has(player)) {
        let count = playerMap.get(player);
        playerMap.set(player, count + 1);
      } else {
        playerMap.set(player, 1);
      }
    });
  
    // Now we need to find the player with the highest count for each season
    let result = new Map();
  
    seasonMap.forEach((playerMap, season) => {
      let maxCount = 0;
      let bestPlayer = null;
  
      playerMap.forEach((count, player) => {
        if (count > maxCount) {
          maxCount = count;
          bestPlayer = player;
        }
      });
  
      // Store the result for each season as a map
      result.set(season, new Map([['player', bestPlayer], ['awards', maxCount]]));
    });
  
    return result;
}

// Get the result Map
const output = findPlayerOfTheMatchPerYear();

// Convert the Map to an array of key-value pairs
const outputArray = Array.from(output, ([season, playerMap]) => {
  return {
    season,
    player: playerMap.get('player'),
    awards: playerMap.get('awards')
  };
});

// Convert to JSON string
const outputJSON = JSON.stringify(outputArray, null, 2); // Pretty-print JSON with indentation

// Write the output to 'output.json' in the current working directory
fs.writeFile('output.json', outputJSON, (err) => {
  if (err) throw err;
  console.log("Output has been written to output.json in the current directory.");
});
