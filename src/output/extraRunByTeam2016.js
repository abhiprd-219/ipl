const { matches, deliveries } = require('./Index');
const fs = require('fs');

function findExtraRunsPerTeam2016() {
    const matchIds2016 = matches
        .filter(match => match.season === "2016")
        .map(match => match.id);

    const extraRunsByTeam = new Map();

    deliveries.forEach(delivery => {
        if (matchIds2016.includes(delivery.match_id)) {
            const team = delivery.bowling_team;
            const extraRuns = parseInt(delivery.extra_runs);

            if (!extraRunsByTeam.has(team)) {
                extraRunsByTeam.set(team, 0);
            }
            extraRunsByTeam.set(team, extraRunsByTeam.get(team) + extraRuns);
        }
    });

    return extraRunsByTeam;
}

const output = findExtraRunsPerTeam2016();
const outputArray = Array.from(output, ([team, extraRuns]) => ({ team, extraRuns }));
const outputJSON = JSON.stringify(outputArray, null, 2);

fs.writeFile('public/findExtraRunsPerTeam2016.json', outputJSON, (err) => {
    if (err) throw err;
    console.log("Output has been written to public/output.json");
});
