const { matches, deliveries } = require('./Index');
const fs = require('fs');

function findTossAndMatchWinsByTeamAndYear() {
    let seasonMap = new Map();

    matches.forEach(match => {
        const season = match.season;
        const team = match.winner;

        if (match.toss_winner === team) {
            if (!seasonMap.has(season)) {
                seasonMap.set(season, new Map());
            }

            let teamMap = seasonMap.get(season);

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

const outputArray = Array.from(output, ([season, teamMap]) => ({
    season,
    teams: Array.from(teamMap, ([team, wins]) => ({ team, wins }))
}));
const outputJSON = JSON.stringify(outputArray, null, 2); // Pretty-print JSON with indentation

fs.writeFile('public/findTossAndMatchWinsByTeamAndYear.json', outputJSON, (err) => {
    if (err) throw err;
    console.log("Output has been written to public/output.json");
});