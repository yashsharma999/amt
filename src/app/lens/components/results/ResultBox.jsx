import React from 'react';
import { Roboto } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
const roboto = Roboto({ weight: '400', subsets: ['latin'] });

export default function ResultBox({ img, desc, link }) {
  return (
    <Link href={link}>
      <div className="bg-[#f1f3f4] rounded-[16px] w-full h-[120px] overflow-hidden">
        <img className="object-contain h-full w-full" src={img} alt="img" />
      </div>
      <div className="px-1 pt-[12px] pb-2">
        <div className="mb-2">
          <p className={`${roboto.className} text-sm text-[#5F6368]`}>
            Youtube
          </p>
        </div>
        <p className="line-clamp-2 text-[#3c4043] text-sm">{desc ?? ''}</p>
      </div>
    </Link>
  );
}
