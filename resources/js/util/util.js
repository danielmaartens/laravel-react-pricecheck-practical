export const fillRange = (start, end) => {
    return Array(end - start + 1).fill().map((item, index) => start + index);
};

export const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateRandomSelection = (maxRange) => {
    const numbers = fillRange(1, maxRange);
    const numberCount = getRandomInt(1, maxRange);
    const selection = [];

    for (let i = 0; i < numberCount; i++) {
        const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];
        selection.push(randomNumber);
    }

    return selection;
};
