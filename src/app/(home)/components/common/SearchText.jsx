import React, { useEffect, useState } from 'react';

export default function SearchText({ word, substring }) {
  const [text, setText] = useState({
    normal: substring,
    bold: '',
  });
  useEffect(() => {
    if (substring.length === 0) return;
    if (word.startsWith(substring)) {
      const boldText = word.split(substring)[1];

      setText((p) => ({ normal: substring, bold: boldText }));
    }
  }, [word, substring]);

  if (substring.length === 0) {
    return <span>{word}</span>;
  }

  return (
    <>
      <span>{text.normal}</span>
      <span className="font-bold">{text.bold}</span>
    </>
  );
}
