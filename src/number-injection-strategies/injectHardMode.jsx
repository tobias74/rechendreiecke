export const injectHardMode = ({ maxValue = 10 } = {}) => {
    const randomValue = (min = 1, max = 10) =>
        Math.floor(Math.random() * (max - min + 1)) + min;

    while (true) {
        // Pick two random outside values
        const o0 = randomValue(1, maxValue);
        const o1 = randomValue(1, maxValue);

        // We need to pick o2 such that:
        // 1. o0 + o1 > o2
        // 2. o0 + o2 > o1 => o2 > o1 - o0
        // 3. o1 + o2 > o0 => o2 > o0 - o1
        // Combine 2 & 3 to get a lower bound for o2:
        // o2 > |o1 - o0|
        // Also from 1: o2 < o0 + o1

        const lowerBound = Math.max(1, Math.abs(o1 - o0) + 1);
        const upperBound = o0 + o1 - 1;
        if (lowerBound > upperBound) {
            // No valid o2 for this pair, pick another pair
            continue;
        }

        // We must also ensure that (o0 + o1 + o2) is even for inside values to be integers.
        const sumO01 = o0 + o1;
        const sumO01IsEven = (sumO01 % 2 === 0);

        // If sumO01 is even, we need o2 to be even to keep the total sum even.
        // If sumO01 is odd, we need o2 to be odd.
        const desiredParity = sumO01IsEven ? 0 : 1;

        // Try to find an o2 in [lowerBound, upperBound] that has the correct parity
        let validO2 = null;
        for (let candidate = lowerBound; candidate <= upperBound; candidate++) {
            if (candidate % 2 === desiredParity) {
                validO2 = candidate;
                break;
            }
        }

        if (validO2 === null) {
            // Couldn't find a matching parity, try new o0, o1
            continue;
        }

        // Now we have (o0, o1, o2) that should yield positive integer inside values.
        const outside = [o0, o1, validO2];
        const inside0 = (outside[1] + outside[2] - outside[0]) / 2;
        const inside1 = (outside[0] + outside[1] - outside[2]) / 2;
        const inside2 = (outside[0] + outside[2] - outside[1]) / 2;

        // Double check positivity
        if (inside0 > 0 && inside1 > 0 && inside2 > 0) {
            // We return with all inside values as null, forcing the student to solve them
            return { inside: [null, null, null], outside };
        }
    }
};
