'use client';
import { useClickAway } from '@uidotdev/usehooks';
import classNames from 'classnames';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import ButtonGray from '../common/ButtonGray';
import OfferedInList from './OfferedInList';
import SearchImageDialog from '../searchByImage/SearchImageDialog';
import SuggestionBox from './SuggestionBox';
import TextSearch from './TextSearch';
import SearchByAudio from './SearchByAudio';

export default function SearchBar() {
  const [search, setSearch] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [searchActive, setSearchActive] = useState(false);
  const [searchByImage, setSearchByImage] = useState(false);
  const [searchByAudio, setSearchByAudio] = useState(false);

  const toggleSearchByAudio = (value) => {
    value ? setSearchByAudio(value) : setSearchByAudio(!searchByAudio);
  };

  const toggleSearchByImageDialog = (value) => {
    value ? setSearchByImage(value) : setSearchByImage(!searchByImage);
  };

  const handleSubmit = async () => {
    window.location.href = `https://www.google.com/search?q=${search}`;
    const resp = await fetch(`/api/saveSearch`, {
      method: 'POST',
      body: JSON.stringify({
        text: search,
      }),
    });
    const data = await resp.json();
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center pt-[50px]">
        <Image
          src={'/google.png'}
          alt="google"
          height={92}
          width={272}
          className={'mb-[26px]'}
        />

        {searchByImage ? (
          <SearchImageDialog
            toggleSearchByImageDialog={toggleSearchByImageDialog}
          />
        ) : (
          <TextSearch
            searchActive={searchActive}
            setSearchActive={setSearchActive}
            toggleSearchByImageDialog={toggleSearchByImageDialog}
            toggleSearchByAudio={toggleSearchByAudio}
            search={search}
            setSearch={setSearch}
            handleSubmit={handleSubmit}
            searchSuggestions={searchSuggestions}
            setSearchSuggestions={setSearchSuggestions}
            searchHistory={searchHistory}
            setSearchHistory={setSearchHistory}
          />
        )}

        <div
          className={classNames('relative z-10 mt-5 flex gap-2', {
            hidden: searchActive || searchByImage,
          })}
        >
          <ButtonGray>Google Search</ButtonGray>
          <ButtonGray>{`I'm Feeling Lucky`}</ButtonGray>
        </div>
        <div
          className={classNames({
            hidden: searchActive || searchByImage,
          })}
        >
          <OfferedInList />
        </div>
        {/* {!searchActive && <OfferedInList />} */}
      </div>
      {searchByAudio && (
        <SearchByAudio toggleSearchByAudio={toggleSearchByAudio} />
      )}
    </div>
  );
}
