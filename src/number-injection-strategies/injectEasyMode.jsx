export const injectEasyMode = ({ maxValue = 10 } = {}) => {
    const randomValue = () => Math.floor(Math.random() * (maxValue + 1)); // Random value between 0 and maxValue
    return {
        inside: [randomValue(), randomValue(), randomValue()], // Random inner values
        outside: [null, null, null], // Outer values unset
    };
};