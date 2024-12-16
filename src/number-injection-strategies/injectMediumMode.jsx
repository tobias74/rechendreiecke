export const injectMediumMode = ({ maxValue = 10 } = {}) => {
    const randomValue = (min, max) =>
        Math.floor(Math.random() * (max - min + 1)) + min;

    // 1. Generate three inside values from 1 to maxValue/2
    const halfMax = Math.floor(maxValue / 2);
    const inside = [
        randomValue(1, halfMax),
        randomValue(1, halfMax),
        randomValue(1, halfMax),
    ];

    // 2. Calculate outside values
    // outside[0] = inside[1] + inside[2]
    // outside[1] = inside[0] + inside[1]
    // outside[2] = inside[0] + inside[2]
    const outside = [
        inside[1] + inside[2],
        inside[0] + inside[1],
        inside[0] + inside[2],
    ];

    // 3. Choose which two adjacent inside values to leave and which outside to reveal
    // The old logic: pick a random insideStartIndex
    const randomIndex = () => Math.floor(Math.random() * 3);
    const insideStartIndex = randomIndex();
    const secondInsideIndex = (insideStartIndex + 1) % 3;

    // We know we must leave these two inside values:
    const newInside = [null, null, null];
    newInside[insideStartIndex] = inside[insideStartIndex];
    newInside[secondInsideIndex] = inside[secondInsideIndex];

    // For outside, pick one of the valid indices that doesn't solve directly:
    let validOutsideIndices;
    switch (insideStartIndex) {
        case 0:
            validOutsideIndices = [0, 2];
            break;
        case 1:
            validOutsideIndices = [1, 2];
            break;
        case 2:
            validOutsideIndices = [0, 1];
            break;
    }

    const chosenOutsideIndex = validOutsideIndices[Math.floor(Math.random() * validOutsideIndices.length)];

    // Erase all outside values except the chosen one
    const newOutside = [null, null, null];
    newOutside[chosenOutsideIndex] = outside[chosenOutsideIndex];

    return { inside: newInside, outside: newOutside };
};
