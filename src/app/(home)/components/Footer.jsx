import Link from 'next/link';
import React from 'react';

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full text-[15px] text-[#1f1f1f]">
      <div className="bg-[#F2F2F2] w-full px-[30px] py-[12px] border-b-[1px] border-[#dadce0]">
        India
      </div>
      <div className="flex justify-between items-center bg-[#F2F2F2] w-full px-[30px] py-[12px]">
        <div className="flex gap-[30px] text-sm ">
          <Link
            href={
              'https://ads.google.com/intl/en_in/home/?subid=ww-ww-et-g-awa-a-g_hpafoot1_1!o2&utm_source=google.com&utm_medium=referral&utm_campaign=google_hpafooter&fg=1'
            }
            className="hover:underline"
          >
            Advertising
          </Link>
          <Link
            href={'https://www.google.com/intl/en_in/business/'}
            className="hover:underline"
          >
            Business
          </Link>
          <Link
            href={'https://www.google.com/search/howsearchworks/?fg=1'}
            className="hover:underline"
          >
            How Search works
          </Link>
        </div>
        <div className="flex gap-[30px] justify-end text-sm">
          <Link
            className="hover:underline cursor-pointer"
            href={'https://policies.google.com/privacy?hl=en-IN&fg=1'}
          >
            Privacy
          </Link>
          <Link
            className="hover:underline cursor-pointer"
            href={'https://policies.google.com/terms?hl=en-IN&fg=1'}
          >
            Terms
          </Link>
          <p className="hover:underline cursor-pointer">Settings</p>
        </div>
      </div>
    </footer>
  );
}
