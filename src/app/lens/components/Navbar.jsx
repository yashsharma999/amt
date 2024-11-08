import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import ButtonGray from './common/ButtonGray';
import UploadButton from './UploadButton';

export default function Navbar() {
  return (
    <nav className="flex p-[10px] justify-between items-center border-b border-[1px] border-[#f0f0f0]">
      <Link href={'/'}>
        <Image src={'/google.png'} alt="google" height={24} width={74} />
      </Link>

      <div className="flex items-center">
        <UploadButton />
        <div className="cursor-pointer ml-3 h-[40px] w-[40px] rounded-full flex justify-center items-center hover:bg-[#f0f1f1] transition-all ease-in">
          <svg
            fill="#444746"
            focusable="false"
            height="24px"
            viewBox="0 0 24 24"
          >
            <path d="M6,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM16,6c0,1.1 0.9,2 2,2s2,-0.9 2,-2 -0.9,-2 -2,-2 -2,0.9 -2,2zM12,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2z"></path>
          </svg>
        </div>

        <div className="cursor-pointer h-[40px] ml-2 mr-1 w-[40px] rounded-full flex justify-center items-center hover:bg-[#f0f1f1] transition-all ease-in">
          <div className="rounded-full h-[32px] w-[32px] bg-green-700 flex justify-center items-center text-white">
            Y
          </div>
        </div>
      </div>
    </nav>
  );
}
