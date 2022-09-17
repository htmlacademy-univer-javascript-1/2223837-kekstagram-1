function RandomInt(min, max) {
  return min >= 0 && max > min
    ? Math.round(min - 0.5 + Math.random() * (max - min + 1))
    : -1;
}

function IsCorrectString(string, maxLength) {
  return string.length <= maxLength;
}
