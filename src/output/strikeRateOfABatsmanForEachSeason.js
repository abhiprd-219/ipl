const { matches, deliveries } = require('./Index');
const fs = require('fs');

function findStrikeRatePerSeason() {
    let seasonData = new Map();

    const matchSeasonMap = new Map();
    matches.forEach(match => {
        matchSeasonMap.set(match.id, match.season);
    });

    deliveries.forEach(delivery => {
        const matchId = delivery.match_id;
        const season = matchSeasonMap.get(matchId);
        const batsman = delivery.batsman;
        const runs = parseInt(delivery.batsman_runs);

        if (!seasonData.has(season)) {
            seasonData.set(season, new Map());
        }

        let batsmanData = seasonData.get(season);
        if (!batsmanData.has(batsman)) {
            batsmanData.set(batsman, { runs: 0, balls: 0 });
        }

        let data = batsmanData.get(batsman);
        data.runs += runs;
        data.balls += 1; 

        batsmanData.set(batsman, data);
    });

    const result = new Map();
    seasonData.forEach((batsmanData, season) => {
        const seasonStrikeRates = [];
        batsmanData.forEach((data, batsman) => {
            const strikeRate = (data.runs / data.balls) * 100;
            seasonStrikeRates.push({ batsman, strikeRate: strikeRate.toFixed(2) });
        });
        result.set(season, seasonStrikeRates);
    });

    return result;
}

const output = findStrikeRatePerSeason();

const outputArray = Array.from(output, ([season, strikeRates]) => ({ season, strikeRates }));
const outputJSON = JSON.stringify(outputArray, null, 2); // Pretty-print JSON with indentation

fs.writeFile('public/findStrikeRatePerSeason.json', outputJSON, (err) => {
    if (err) throw err;
    console.log("Output has been written to public/output.json");
});
