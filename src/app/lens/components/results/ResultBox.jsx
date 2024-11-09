import React from 'react';
import { Roboto } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
export const roboto = Roboto({ weight: '400', subsets: ['latin'] });

export default function ResultBox({
  img,
  desc,
  link,
  srcImg,
  srcTitle,
  priceTag,
}) {
  return (
    <Link href={link} target="_blank" className="relative">
      {priceTag.length > 0 && (
        <div className="flex items-center gap-2 absolute top-4 left-4 bg-[#ffffffe6] text-[#202124] text-sm py-1 px-2 rounded-full">
          <span>
            <svg focusable="false" height="16" viewBox="0 0 24 24" width="16">
              <g>
                <rect fill="none" height="24" width="24"></rect>
              </g>
              <g>
                <g>
                  <path d="M19,2h-5.87c-0.8,0-1.56,0.32-2.12,0.88l-8.13,8.13c-1.17,1.17-1.17,3.07,0,4.24l5.87,5.87C9.34,21.71,10.11,22,10.87,22 s1.54-0.29,2.12-0.88L21.12,13c0.56-0.56,0.88-1.33,0.88-2.12V5C22,3.34,20.66,2,19,2z M20,10.88c0,0.27-0.1,0.52-0.29,0.71 l-8.13,8.12C11.33,19.97,11.03,20,10.87,20s-0.45-0.04-0.71-0.29l-5.87-5.87C4.04,13.58,4,13.29,4,13.13s0.04-0.45,0.29-0.71 l8.13-8.13C12.61,4.1,12.87,4,13.13,4H19c0.55,0,1,0.45,1,1V10.88z"></path>
                  <circle cx="16.5" cy="7.5" r="1.5"></circle>
                </g>
              </g>
            </svg>
          </span>
          {priceTag}
        </div>
      )}

      <div className="bg-[#f1f3f4] rounded-[16px] w-full h-fit overflow-hidden">
        <img className="object-contain w-full" src={img} alt="img" />
      </div>
      <div className="px-1 pt-[12px] pb-2">
        <div className="mb-2 flex gap-2 items-center">
          {srcImg && (
            <div className="bg-[#f1f3f4] rounded-[4px] w-[18px] h-[18px] overflow-hidden">
              <img
                className="object-contain h-full w-full"
                src={srcImg}
                alt="img"
              />
            </div>
          )}
          <p className={`${roboto.className} text-sm text-[#5F6368]`}>
            {srcTitle ? srcTitle : ''}
          </p>
        </div>
        <p className="line-clamp-2 text-[#3c4043] text-sm">{desc ?? ''}</p>
      </div>
    </Link>
  );
}
