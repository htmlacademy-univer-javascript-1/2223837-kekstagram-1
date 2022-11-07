const getRandomPositiveInt = (min, max) => min >= 0 && max > min
  ? Math.round(min - 0.5 + Math.random() * (max - min + 1)) : -1;

const getRandomArrayElement = (elements) => elements[getRandomPositiveInt(0, elements.length - 1)];

const checkStringLength = (string, maxLength) => string.length <= maxLength;

function throttle(callback, delayBetweenFrames = 500) {
  let lastTime = 0;
  return (...rest) => {
    const now = new Date();
    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
}

export { getRandomArrayElement, getRandomPositiveInt, checkStringLength, throttle };
