const { matches, deliveries } = require('./Index');
const fs = require('fs');

function findEconomicalBowlers2015() {
    const matchIds2015 = matches
        .filter(match => match.season === "2015")
        .map(match => match.id);

    const bowlerStats = new Map();

    deliveries.forEach(delivery => {
        if (matchIds2015.includes(delivery.match_id)) {
            const bowler = delivery.bowler;
            const runs = parseInt(delivery.total_runs);
            const isExtra = parseInt(delivery.extra_runs) > 0;

            if (!bowlerStats.has(bowler)) {
                bowlerStats.set(bowler, { runs: 0, balls: 0 });
            }

            const stats = bowlerStats.get(bowler);

            stats.runs += runs;

            if (!isExtra) {
                stats.balls += 1;
            }

            bowlerStats.set(bowler, stats);
        }
    });

    const economyRates = [];
    bowlerStats.forEach((stats, bowler) => {
        const overs = stats.balls / 6;
        const economyRate = stats.runs / overs;
        economyRates.push({ bowler, economyRate });
    });

    economyRates.sort((a, b) => a.economyRate - b.economyRate);
    const top10EconomicalBowlers = economyRates.slice(0, 10);

    return top10EconomicalBowlers;
}

const output = findEconomicalBowlers2015();
const outputJSON = JSON.stringify(output, null, 2);

fs.writeFile('public/findEconomicalBowlers2015.json', outputJSON, (err) => {
    if (err) throw err;
    console.log("Output has been written to public/output.json");
});
