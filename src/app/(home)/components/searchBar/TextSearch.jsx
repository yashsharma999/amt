import { useClickAway, useDebounce } from '@uidotdev/usehooks';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import SuggestionBox from './SuggestionBox';
import CloseIconBtn2 from '../common/CloseIconBtn2';

export default function TextSearch({
  searchActive,
  setSearchActive,
  toggleSearchByImageDialog,
  toggleSearchByAudio,
  search,
  setSearch,
  handleSubmit,
  searchSuggestions,
  setSearchSuggestions,
  searchHistory,
  setSearchHistory,
}) {
  const debouncedSearch = useDebounce(search, 100);

  const ref = useClickAway(() => {
    setSearchActive(false);
    setSearchSuggestions([]);
  });

  const getAutocompleteSuggestions = async (query) => {
    const response = await fetch(`https://api.datamuse.com/sug?s=${query}`);
    const data = await response.json();
    return data.map((item) => item.word);
  };

  const getRecentSearch = async () => {
    const response = await fetch(`/api/getSearchHistory`);
    const data = await response.json();
    return data?.history;
    console.log('rec search', data);
  };

  useEffect(() => {
    if (search.length === 0) return;
    (async () => {
      const data = await getAutocompleteSuggestions(debouncedSearch);

      setSearchSuggestions(
        data.map((item) => {
          return {
            text: item,
            type: 'suggestion',
          };
        })
      );

      // include previous searches
      const arr = searchHistory.filter((item) => {
        if (item.text.includes(debouncedSearch)) {
          return true;
        }
      });

      if (arr.length > 0) {
        setSearchSuggestions((prev) => [...arr, ...prev]);
      }
    })();
  }, [debouncedSearch]);

  useEffect(() => {
    (async () => {
      const data = await getRecentSearch();
      setSearchHistory(
        data.map((item) => {
          return {
            text: item,
            type: 'history',
          };
        })
      );
    })();
  }, [searchActive]);

  const suggestionClick = (text) => {
    setSearch(text);
    handleSubmit();
  };

  return (
    <>
      <div
        style={{
          clipPath: searchActive ? 'inset(-10px -10px -0px -10px)' : null,
        }}
        className={classNames(
          'relative flex flex-1 min-h-[44px] rounded-[24px] w-[580px] border-[1px] border-[#dfe1e5] hover:shadow-[0_1px_6px_rgba(32,33,36,.28)]',
          {
            'pb-1 rounded-bl-none rounded-br-none border-b-0 shadow-[0_1px_6px_rgba(32,33,36,.28)]':
              searchActive,
          }
        )}
      >
        <div className="rounded-[24px] h-[44px] flex px-[14px] flex-col justify-center">
          <svg
            className="h-[20px] w-[20px]"
            focusable="false"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#9aa0a6"
          >
            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
          </svg>
        </div>
        <form
          className="flex flex-grow"
          onSubmit={(ev) => {
            ev.preventDefault();
            handleSubmit();
          }}
        >
          <input
            ref={ref}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClick={() => setSearchActive(true)}
            className="outline-none h-[44px] w-full"
          ></input>
        </form>
        <div className="justify-end flex gap-2 h-[44px] items-center">
          {search.length > 0 && (
            <>
              <CloseIconBtn2 onClick={() => setSearch('')} />
              <div className="ml-2 h-[65%] w-[1px] bg-[#dadce0]"></div>
            </>
          )}

          <button onClick={toggleSearchByAudio} className="px-2">
            <svg
              focusable="false"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="h-[24px] w-[24px]"
            >
              <path
                fill="#4285f4"
                d="m12 15c1.66 0 3-1.31 3-2.97v-7.02c0-1.66-1.34-3.01-3-3.01s-3 1.34-3 3.01v7.02c0 1.66 1.34 2.97 3 2.97z"
              ></path>
              <path fill="#34a853" d="m11 18.08h2v3.92h-2z"></path>
              <path
                fill="#fbbc04"
                d="m7.05 16.87c-1.27-1.33-2.05-2.83-2.05-4.87h2c0 1.45 0.56 2.42 1.47 3.38v0.32l-1.15 1.18z"
              ></path>
              <path
                fill="#ea4335"
                d="m12 16.93a4.97 5.25 0 0 1 -3.54 -1.55l-1.41 1.49c1.26 1.34 3.02 2.13 4.95 2.13 3.87 0 6.99-2.92 6.99-7h-1.99c0 2.92-2.24 4.93-5 4.93z"
              ></path>
            </svg>
          </button>
          <button className="pr-4" onClick={toggleSearchByImageDialog}>
            <svg
              className="h-[24px] w-[24px]"
              focusable="false"
              viewBox="0 0 192 192"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect fill="none" height="192" width="192"></rect>
              <g>
                <circle fill="#34a853" cx="144.07" cy="144" r="16"></circle>
                <circle fill="#4285f4" cx="96.07" cy="104" r="24"></circle>
                <path
                  fill="#ea4335"
                  d="M24,135.2c0,18.11,14.69,32.8,32.8,32.8H96v-16l-40.1-0.1c-8.8,0-15.9-8.19-15.9-17.9v-18H24V135.2z"
                ></path>
                <path
                  fill="#fbbc04"
                  d="M168,72.8c0-18.11-14.69-32.8-32.8-32.8H116l20,16c8.8,0,16,8.29,16,18v30h16V72.8z"
                ></path>
                <path
                  fill="#4285f4"
                  d="M112,24l-32,0L68,40H56.8C38.69,40,24,54.69,24,72.8V92h16V74c0-9.71,7.2-18,16-18h80L112,24z"
                ></path>
              </g>
            </svg>
          </button>
        </div>
      </div>
      {searchActive && (
        <SuggestionBox
          suggestionClick={suggestionClick}
          clickAwayRef={ref}
          setSearchHistory={setSearchHistory}
          setSearchSuggestions={setSearchSuggestions}
          search={search}
          suggestionList={
            search.length === 0
              ? searchHistory.slice(0, 11)
              : searchSuggestions.slice(0, 11)
          }
        />
      )}
    </>
  );
}
