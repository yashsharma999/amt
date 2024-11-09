import React, { useState } from 'react';
import ButtonGray from './common/ButtonGray';
import Image from 'next/image';

import localFont from 'next/font/local';
import { roboto } from './results/ResultBox';
import { useClickAway } from '@uidotdev/usehooks';
import ImageDropzoneScreen from './ImageDropzone';
import UploadFromComputer from './UploadFromComputer';

// Font files can be colocated inside of `pages`
export const fontGoogleSans = localFont({
  src: '../../../../assets/fonts/ProductSans-Regular.ttf',
  variable: '--font-googleSans',
});

export default function UploadButton() {
  const [showMenu, setShowMenu] = useState(false);

  const ref = useClickAway(() => {
    setShowMenu(false);
  });

  return (
    <div className="relative">
      <ButtonGray onClick={() => setShowMenu(true)}>
        <div className="flex gap-2 items-center">
          <span>
            <svg
              width="24"
              fill="#5f6368"
              height="24"
              viewBox="0 0 24 24"
              focusable="false"
            >
              <path d="M4 15h2v3h12v-3h2v3c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2m4.41-7.59L11 7.83V16h2V7.83l2.59 2.59L17 9l-5-5-5 5 1.41 1.41z"></path>
            </svg>
          </span>
          <span className={`text-[#202124] text-sm`}>Upload</span>
        </div>
      </ButtonGray>
      {showMenu && (
        <div
          ref={ref}
          className="absolute top-0 right-0 rounded-[4px] origin-top-right bg-white shadowMenu z-50 min-w-[300px]"
        >
          <div className="border-b-[1px] border-b-[#0000001f] pb-2 cursor-pointer">
            <h3
              className={`uppercase text-[12px] text-[#5F6368] px-[24px] pt-[24px] pb-[8px] ${fontGoogleSans.className} font-bold tracking-wide`}
            >
              Upload from
            </h3>
            <UploadFromComputer onClose={() => setShowMenu(false)} />
          </div>
          <div className="p-[24px]">
            <div className="flex gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
              >
                <path
                  d="M31.9999 17.6106H1.99991V40.6106H31.9999V17.6106Z"
                  fill="#F1F3F4"
                ></path>
                <path
                  d="M31.9999 17.6106H13.9999V32.6106H31.9999V17.6106Z"
                  fill="#DADCE0"
                ></path>
                <path
                  d="M1.99991 21.6106V17.6106H5.99991"
                  stroke="#BDC1C6"
                ></path>
                <path
                  d="M31.9999 36.6106V40.6106H27.9999"
                  stroke="#BDC1C6"
                ></path>
                <path
                  d="M1.99991 36.6106V40.6106H5.99991"
                  stroke="#BDC1C6"
                ></path>
                <path
                  d="M15.9999 30.3894L45.9999 30.3894V7.3894L15.9999 7.3894L15.9999 30.3894Z"
                  fill="#AECBFA"
                ></path>
                <path
                  d="M15.9999 23.8784V30.389H46.0001V22.2507L39.2259 16.5731C38.4181 15.8974 37.3882 15.538 36.3308 15.5627C35.2733 15.5874 34.2617 15.9945 33.4871 16.7071L26.6451 23.0646L22.7741 20.3263C22.2451 19.9572 21.601 19.7855 20.9562 19.8416C20.3113 19.8977 19.7074 20.178 19.2515 20.6327L15.9999 23.8784Z"
                  fill="#669DF6"
                ></path>
                <path
                  d="M24.0044 16.9847C25.3405 16.9847 26.4237 15.9015 26.4237 14.5653C26.4237 13.2292 25.3405 12.146 24.0044 12.146C22.6682 12.146 21.585 13.2292 21.585 14.5653C21.585 15.9015 22.6682 16.9847 24.0044 16.9847Z"
                  fill="#E8F0FE"
                ></path>
              </svg>
              <p
                className={`text-[14px] text-[#5F6368] font-[200] antialiased ${fontGoogleSans.className}`}
              >{`To search, drag an image anywhere on the screen`}</p>
            </div>
          </div>
        </div>
      )}
      {showMenu && <ImageDropzoneScreen onClose={() => setShowMenu(false)} />}
    </div>
  );
}
