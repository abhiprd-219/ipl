const { matches, deliveries } = require('./Index');
const fs = require('fs');

function findPlayerOfTheMatchPerYear() {
    let seasonMap = new Map();
  
    matches.forEach(i => {
      const season = i.season; 
      const player = i.player_of_match;
  
      if (!seasonMap.has(season)) {
        seasonMap.set(season, new Map());
      }
  
      let playerMap = seasonMap.get(season);
  
      if (playerMap.has(player)) {
        let count = playerMap.get(player);
        playerMap.set(player, count + 1);
      } else {
        playerMap.set(player, 1);
      }
    });
  
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
  
      result.set(season, new Map([['player', bestPlayer], ['awards', maxCount]]));
    });
  
    return result;
}

const output = findPlayerOfTheMatchPerYear();

const outputArray = Array.from(output, ([season, playerMap]) => {
  return {
    season,
    player: playerMap.get('player'),
    awards: playerMap.get('awards')
  };
});

const outputJSON = JSON.stringify(outputArray, null, 2); 

fs.writeFile('src/output/findPlayerOfTheMatchPerYear.json', outputJSON, (err) => {
  if (err) throw err;
  console.log("Output has been written to src/output/name.json");
});
