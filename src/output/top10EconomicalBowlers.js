const { matches, deliveries } = require('./Index');
const fs = require('fs');

function findEconomicalBowlers2015() {
    // Step 1: Find match IDs for the year 2015
    const matchIds2015 = matches
        .filter(match => match.season === "2015")
        .map(match => match.id);

    // Step 2: Calculate runs conceded and deliveries bowled for each bowler
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

            // Add to runs given
            stats.runs += runs;

            // Increment balls bowled (only if it’s not an extra)
            if (!isExtra) {
                stats.balls += 1;
            }

            bowlerStats.set(bowler, stats);
        }
    });

    // Step 3: Calculate economy rate for each bowler
    const economyRates = [];
    bowlerStats.forEach((stats, bowler) => {
        const overs = stats.balls / 6;
        const economyRate = stats.runs / overs;
        economyRates.push({ bowler, economyRate });
    });

    // Step 4: Sort by economy rate and get the top 10
    economyRates.sort((a, b) => a.economyRate - b.economyRate);
    const top10EconomicalBowlers = economyRates.slice(0, 10);

    return top10EconomicalBowlers;
}

const output = findEconomicalBowlers2015();
const outputJSON = JSON.stringify(output, null, 2);

fs.writeFile('output.json', outputJSON, (err) => {
    if (err) throw err;
    console.log("Top 10 economical bowlers of 2015 have been written to output.json");
});
