function applyBold(word, start, length) {
  const boldPart = word.slice(start, start + length);
  const restPart = word.slice(start + length);
  return `${word.slice(0, start)}<strong>${boldPart}</strong>${restPart}`;
}

export { applyBold };
