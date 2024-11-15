const { matches, deliveries } = require('./Index');
const fs = require('fs');

function findOverallTossAndMatchWinsByTeam() {
    let teamMap = new Map();

    matches.forEach(match => {
        const team = match.winner;

        if (match.toss_winner === team) {
            if (teamMap.has(team)) {
                let count = teamMap.get(team);
                teamMap.set(team, count + 1);
            } else {
                teamMap.set(team, 1);
            }
        }
    });

    return teamMap;
}

const output = findOverallTossAndMatchWinsByTeam();

const outputArray = Array.from(output, ([team, wins]) => ({ team, wins }));
const outputJSON = JSON.stringify(outputArray, null, 2); // Pretty-print JSON with indentation

// Save output to the 'public' folder as requested
fs.writeFile('src/output/findOverallTossAndMatchWinsByTeam.json', outputJSON, (err) => {
    if (err) throw err;
    console.log("Output has been written to src/output/findOverallTossAndMatchWinsByTeam.json");
});
