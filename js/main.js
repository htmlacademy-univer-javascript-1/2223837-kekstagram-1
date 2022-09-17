let randomInt = (min, max) => min >= 0 && max > min
? Math.round(min - 0.5 + Math.random() * (max - min + 1))
: -1;

let isCorrectString = (string, maxLength) => string.length <= maxLength;
