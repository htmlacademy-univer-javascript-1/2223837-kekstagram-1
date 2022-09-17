const RandomInt = (min, max) => min >= 0 && max > min
  ? Math.round(min - 0.5 + Math.random() * (max - min + 1))
  : -1;

RandomInt(1, 100);

const IsCorrectString = (string, maxLength) => string.length <= maxLength;

IsCorrectString('hello', 140);
