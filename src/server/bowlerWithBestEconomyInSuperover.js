const { deliveries } = require('./Index');
const fs = require('fs');

function findBestEconomyBowlerInSuperOvers() {
    let bowlerStats = new Map();

    deliveries.forEach(delivery => {
        if (delivery.is_super_over === "1") { 
            const bowler = delivery.bowler;
            const runs = parseInt(delivery.total_runs);

            if (!bowlerStats.has(bowler)) {

                bowlerStats.set(bowler, { runsConceded: 0, ballsBowled: 0 });
            }

            const stats = bowlerStats.get(bowler);
            stats.runsConceded += runs;
            stats.ballsBowled += 1; 
            bowlerStats.set(bowler, stats);
        }
    });

    let bestBowler = null;
    let bestEconomyRate = Infinity;

    bowlerStats.forEach((stats, bowler) => {
        const oversBowled = stats.ballsBowled / 6;
        const economyRate = stats.runsConceded / oversBowled;

        if (economyRate < bestEconomyRate) {
            bestEconomyRate = economyRate;
            bestBowler = bowler;
        }
    });

    return { bowler: bestBowler, economyRate: bestEconomyRate };
}

const output = findBestEconomyBowlerInSuperOvers();

const outputJSON = JSON.stringify(output, null, 2); 


fs.writeFile('src/output/findBestEconomyBowlerInSuperOvers.json', outputJSON, (err) => {
    if (err) throw err;
    console.log("Output has been written to src/output/name.json");
});
