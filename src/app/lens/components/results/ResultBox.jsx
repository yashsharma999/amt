import React from 'react';
import { Roboto } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
export const roboto = Roboto({ weight: '400', subsets: ['latin'] });

export default function ResultBox({ img, desc, link, srcImg, srcTitle }) {
  return (
    <Link href={link} target="_blank">
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
