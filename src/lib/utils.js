function applyBold(word, substring) {
  if (word.startsWith(substring)) {
    console.log(
      word,
      substring,
      word.startsWith(substring),
      word.split(substring)
    );

    return <div></div>;
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export { applyBold, sleep };
