const { deliveries } = require('./Index');
const fs = require('fs');

function findMostFrequentDismissalPair() {
    let dismissalMap = new Map();

    deliveries.forEach(delivery => {
        const bowler = delivery.bowler;
        const batsman = delivery.batsman;
        const dismissalType = delivery.dismissal_kind;

        if (dismissalType && dismissalType !== "run out") { 
            const pairKey = `${bowler}-${batsman}`;

            if (dismissalMap.has(pairKey)) {
                let count = dismissalMap.get(pairKey);
                dismissalMap.set(pairKey, count + 1);
            } else {
                dismissalMap.set(pairKey, 1);
            }
        }
    });

    let maxDismissals = 0;
    let topPair = null;

    dismissalMap.forEach((count, pairKey) => {
        if (count > maxDismissals) {
            maxDismissals = count;
            topPair = pairKey;
        }
    });

    const [topBowler, topBatsman] = topPair ? topPair.split("-") : [null, null];

    return { bowler: topBowler, batsman: topBatsman, dismissals: maxDismissals };
}

const output = findMostFrequentDismissalPair();

const outputJSON = JSON.stringify(output, null, 2); 

fs.writeFile('src/output/findMostFrequentDismissalPair.json', outputJSON, (err) => {
    if (err) throw err;
    console.log("Output has been written to src/output/name.json");
});
