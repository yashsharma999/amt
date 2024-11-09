import React, { useState } from 'react';
///api/scrapeGod?imageUrl=https://google-lens-1.s3.us-east-1.amazonaws.com/eb0874f3-5f1d-44e9-b866-c05028757c47
export default function SearchImageLink({ handleUploadByLink }) {
  const [link, setLink] = useState('');
  return (
    <div>
      <div className="flex items-center gap-4">
        <div className="flex-grow h-[1px] bg-[#e8eaed]"></div>
        <p className="text-sm">OR</p>
        <div className="flex-grow h-[1px] bg-[#e8eaed]"></div>
      </div>
      <div className="flex pt-[12px]">
        <input
          className="bg-white border border-[#dadce0] text-[#3c4043] rounded-full inline-flex flex-grow text-[14px] h-[40px] px-6 w-full outline-none placeholder:text-sm placeholder:text-[#757575]
          hover:border hover:border-[#3c4043] focus:border focus:border-[#1967d2]
          "
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="Paste image link"
        />
        <button
          onClick={() => handleUploadByLink(link)}
          className="w-[95px] items-center justify-center bg-white rounded-[32px] border border-[#dadce0] text-[#1a73e8] cursor-pointer inline-flex flex-shrink-0 text-[14px] tracking-[0.25px] ml-2 outline-none px-6 py-2
        hover:bg-[rgba(25,103,210,0.08)] hover:border hover:border-[#dadce0]
        "
        >
          Search
        </button>
      </div>
    </div>
  );
}
