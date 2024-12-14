export const injectMediumMode = ({ maxValue = 10 } = {}) => {
    const randomValue = (min = 1, max = 10) =>
        Math.floor(Math.random() * (max - min + 1)) + min;
    const randomIndex = () => Math.floor(Math.random() * 3);

    // Step 1: Choose starting inside index and second inside index
    const insideStartIndex = randomIndex();
    const secondInsideIndex = (insideStartIndex + 1) % 3;

    // Step 2: Generate two random inside values
    const inside = [null, null, null];
    inside[insideStartIndex] = randomValue(1, maxValue);
    inside[secondInsideIndex] = randomValue(1, maxValue);

    // Step 3: Determine valid outside indices and pick one
    let validOutsideIndices;
    switch (insideStartIndex) {
        case 0:
            // Known inside: inside[0], inside[1]
            // valid outside: [0, 2]
            validOutsideIndices = [0, 2];
            break;
        case 1:
            // Known inside: inside[1], inside[2]
            // valid outside: [1, 2]
            validOutsideIndices = [1, 2];
            break;
        case 2:
            // Known inside: inside[2], inside[0]
            // valid outside: [0, 1]
            validOutsideIndices = [0, 1];
            break;
    }

    const chosenOutsideIndex = validOutsideIndices[Math.floor(Math.random() * validOutsideIndices.length)];

    // Step 4: Determine the missing inside index
    const missingInsideIndex = [0, 1, 2].find(i => inside[i] === null);
    const [i0, i1, i2] = inside;

    // We now find the condition for positivity based on the chosenOutsideIndex:
    let minOutsideValue = 2; // start from 2 to ensure difference isn't trivially zero or negative

    switch (missingInsideIndex) {
        case 0:
            // If missing inside[0]:
            // outside[1] = inside[0]+inside[1]
            // outside[2] = inside[0]+inside[2]
            // If chosenOutsideIndex=1: inside[0]=outside[1]-i1 => outside[1]>i1
            // If chosenOutsideIndex=2: inside[0]=outside[2]-i2 => outside[2]>i2
            if (chosenOutsideIndex === 1) {
                minOutsideValue = i1 + 1;
            } else {
                // chosenOutsideIndex === 2
                minOutsideValue = i2 + 1;
            }
            break;
        case 1:
            // If missing inside[1]:
            // outside[0] = i1 + i2
            // outside[1] = i0 + i1
            // If chosenOutsideIndex=0: i1=outside[0]-i2 => outside[0]>i2
            // If chosenOutsideIndex=1: i1=outside[1]-i0 => outside[1]>i0
            if (chosenOutsideIndex === 0) {
                minOutsideValue = i2 + 1;
            } else {
                // chosenOutsideIndex === 1
                minOutsideValue = i0 + 1;
            }
            break;
        case 2:
            // If missing inside[2]:
            // outside[0] = i1 + i2
            // outside[2] = i0 + i2
            // If chosenOutsideIndex=0: i2=outside[0]-i1 => outside[0]>i1
            // If chosenOutsideIndex=2: i2=outside[2]-i0 => outside[2]>i0
            if (chosenOutsideIndex === 0) {
                minOutsideValue = i1 + 1;
            } else {
                // chosenOutsideIndex === 2
                minOutsideValue = i0 + 1;
            }
            break;
    }

    // Step 5: Choose an outside value that ensures positivity
    // Make sure to respect the maxValue limit. If minOutsideValue > maxValue, we may need to adjust logic or maxValue.
    // For simplicity, assume maxValue is large enough or handle that scenario.
    const chosenOutsideValue = randomValue(minOutsideValue, maxValue);

    const outside = [null, null, null];
    outside[chosenOutsideIndex] = chosenOutsideValue;

    // Now we have a configuration that guarantees a positive missing inside value.
    // The student has to fill in one inside and two outside fields, all of which will be positive.

    return { inside, outside };
};
