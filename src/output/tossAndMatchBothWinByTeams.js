const { matches, deliveries } = require('./Index');
const fs = require('fs');

function findTossAndMatchWinsByTeamAndYear() {
    let seasonMap = new Map();

    matches.forEach(match => {
        const season = match.season;
        const team = match.winner;

        // Check if the team won both the toss and the match
        if (match.toss_winner === team) {
            // Initialize season data if it doesn't exist
            if (!seasonMap.has(season)) {
                seasonMap.set(season, new Map());
            }

            let teamMap = seasonMap.get(season);

            // Increment the count for the team within that season
            if (teamMap.has(team)) {
                let count = teamMap.get(team);
                teamMap.set(team, count + 1);
            } else {
                teamMap.set(team, 1);
            }
        }
    });

    return seasonMap;
}

const output = findTossAndMatchWinsByTeamAndYear();

// Convert the nested Map to an array of key-value pairs for JSON formatting
const outputArray = Array.from(output, ([season, teamMap]) => ({
    season,
    teams: Array.from(teamMap, ([team, wins]) => ({ team, wins }))
}));
const outputJSON = JSON.stringify(outputArray, null, 2); // Pretty-print JSON with indentation

// Write the output to 'output.json' in the current directory
fs.writeFile('output.json', outputJSON, (err) => {
    if (err) throw err;
    console.log("Output has been written to output.json");
});
