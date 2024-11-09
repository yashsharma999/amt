import React, { useEffect, useRef, useState } from 'react';
import ButtonGray from '../common/ButtonGray';
import SuggestionText from './SuggestionText';

export default function SuggestionBox({
  suggestionList,
  clickAwayRef,
  suggestionClick,
  setSearchHistory,
  setSearchSuggestions,
  search,
  handleSubmit,
}) {
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const itemRefs = useRef([]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown') {
        // If no item is focused, start with the first item
        setFocusedIndex((prevIndex) =>
          prevIndex === -1
            ? 0
            : Math.min(prevIndex + 1, suggestionList.length - 1)
        );
      } else if (e.key === 'ArrowUp') {
        setFocusedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [suggestionList.length]);

  useEffect(() => {
    // Focus the item when the focusedIndex changes
    if (focusedIndex >= 0 && itemRefs.current[focusedIndex]) {
      itemRefs.current[focusedIndex].focus();
    }
  }, [focusedIndex]);

  return (
    <div ref={clickAwayRef} className="mt-[-3px]">
      <div
        style={{
          clipPath: 'inset(0px -10px -10px -10px)',
        }}
        className="bg-white relative z-30 pb-4 w-[580px] border-[1px] border-[#dfe1e5] border-t-0  pt-0  shadow-[0_1px_6px_rgba(32,33,36,.28)] rounded-bl-[24px] rounded-br-[24px]"
      >
        <div className="border-t-[1px] border-[#e8eaed] w-[95%] mx-auto pb-[10px]"></div>
        {suggestionList.map((item, i) => (
          <SuggestionText
            itemRef={(el) => (itemRefs.current[i] = el)}
            focusedIndex={focusedIndex}
            index={i}
            key={i}
            text={item.text}
            type={item.type}
            suggestionClick={suggestionClick}
            setSearchHistory={setSearchHistory}
            setSearchSuggestions={setSearchSuggestions}
            search={search}
          />
        ))}
        <div className="flex justify-center gap-1 mt-2">
          <ButtonGray
            onClick={() => {
              if (search.length === 0) return;
              handleSubmit();
            }}
          >
            Google Search
          </ButtonGray>
          <ButtonGray
            onClick={() => {
              window.location.href = 'https://doodles.google/';
            }}
          >{`I'm Feeling Lucky`}</ButtonGray>
        </div>
      </div>
    </div>
  );
}

const mock = [
  {
    type: 'history',
    text: 'test',
  },
  {
    type: 'history',
    text: 'testing',
  },
  {
    type: 'history',
    text: 'test 123',
  },
  {
    type: 'suggestion',
    text: 'test hero',
  },
  {
    type: 'suggestion',
    text: 'test 11122123',
  },
];
