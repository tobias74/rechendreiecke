export const injectHardMode = ({ maxValue = 10 } = {}) => {
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
    const outside = [
        inside[1] + inside[2], // outside[0]
        inside[0] + inside[1], // outside[1]
        inside[0] + inside[2], // outside[2]
    ];

    // 3. For hard mode, we erase all inside values, leaving only outside:
    const newInside = [null, null, null]; // Student must find all
    return { inside: newInside, outside };
};
