import Image from 'next/image';
import React from 'react';
import { FaRegClock } from 'react-icons/fa6';
import classNames from 'classnames';

export default function SuggestionText({
  type = 'history',
  text,
  itemRef,
  focusedIndex,
  index,
  suggestionClick,
  setSearchHistory,
  setSearchSuggestions,
}) {
  const deleteSearch = async (text) => {
    const resp = await fetch(`/api/deleteSearchTerm`, {
      body: JSON.stringify({ searchTerm: text }),
      method: 'DELETE',
    });
    const data = await resp.json();
    console.log(data);
  };

  return (
    <li
      ref={itemRef}
      onClick={async (e) => {
        window.location.href = `https://www.google.com/search?q=${text}`;
        const resp = await fetch(`/api/saveSearch`, {
          method: 'POST',
          body: JSON.stringify({
            text,
          }),
        });
        const data = await resp.json();

        // suggestionClick(text);
      }}
      className={classNames(
        'group mb-[2px] px-[20px] py-[2px] hover:bg-[#f0f1f1] rounded-[4px] flex items-center justify-between',
        {
          'bg-[#f0f1f1]': focusedIndex === index,
        }
      )}
    >
      <div className="flex items-center gap-2 max-w-[90%]">
        {type === 'history' ? (
          <FaRegClock className="text-[#9aa0a6] text-sm mr-2" />
        ) : (
          <svg
            className="h-[20px] w-[20px]"
            focusable="false"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#9aa0a6"
          >
            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
          </svg>
        )}

        <p
          className={classNames(
            'overflow-hidden text-ellipsis whitespace-nowrap',
            {
              'text-[#52188C]': type === 'history',
            }
          )}
        >
          {text}
        </p>
      </div>
      {type === 'history' && (
        <button
          onClick={(ev) => {
            ev.stopPropagation();
            setSearchHistory((prev) => {
              const updatedArr = prev.filter((item) => item.text !== text);
              return updatedArr;
            });

            setSearchSuggestions((prev) => {
              const updatedArr = prev.filter((item) => item.text !== text);
              return updatedArr;
            });

            deleteSearch(text);
          }}
          className="hidden group-hover:block text-[#707580] text-[13px] hover:text-[#1558d6] hover:underline"
        >
          Delete
        </button>
      )}
    </li>
  );
}
