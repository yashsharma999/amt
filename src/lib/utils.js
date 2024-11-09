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

export { applyBold };
