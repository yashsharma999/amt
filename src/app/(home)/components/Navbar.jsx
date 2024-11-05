import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className='p-[10px] text-sm text-primary-light flex justify-between items-center'>
      <div className='ml-3'>
        <Link href={'#'} className='mr-2 p-[5px] hover:underline'>
          About
        </Link>
        <Link href={'#'} className='mr-2 p-[5px] hover:underline'>
          Store
        </Link>
      </div>
      <div className='flex items-center'>
        <Link
          className='text-[13px] text-primary-light px-[8px] hover:underline'
          href={'#'}
        >
          Gmail
        </Link>
        <Link
          className='text-[13px] text-primary-light px-[8px] hover:underline'
          href={'#'}
        >
          Images
        </Link>

        <Link
          href={'#'}
          className='h-[40px] ml-2 w-[40px] rounded-full flex justify-center items-center hover:bg-[#f0f1f1] transition-all ease-in'
        >
          <svg
            focusable='false'
            height='24px'
            viewBox='0 -960 960 960'
            width='24px'
            fill='#444746'
          >
            <path d='M209-120q-42 0-70.5-28.5T110-217q0-14 3-25.5t9-21.5l228-341q10-14 15-31t5-34v-110h-20q-13 0-21.5-8.5T320-810q0-13 8.5-21.5T350-840h260q13 0 21.5 8.5T640-810q0 13-8.5 21.5T610-780h-20v110q0 17 5 34t15 31l227 341q6 9 9.5 20.5T850-217q0 41-28 69t-69 28H209Zm221-660v110q0 26-7.5 50.5T401-573L276-385q-6 8-8.5 16t-2.5 16q0 23 17 39.5t42 16.5q28 0 56-12t80-47q69-45 103.5-62.5T633-443q4-1 5.5-4.5t-.5-7.5l-78-117q-15-21-22.5-46t-7.5-52v-110H430Z'></path>
          </svg>
        </Link>

        <div className='cursor-pointer ml-3 h-[40px] w-[40px] rounded-full flex justify-center items-center hover:bg-[#f0f1f1] transition-all ease-in'>
          <svg
            fill='#444746'
            focusable='false'
            height='24px'
            viewBox='0 0 24 24'
          >
            <path d='M6,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM16,6c0,1.1 0.9,2 2,2s2,-0.9 2,-2 -0.9,-2 -2,-2 -2,0.9 -2,2zM12,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2z'></path>
          </svg>
        </div>

        <div className='cursor-pointer h-[40px] ml-2 mr-1 w-[40px] rounded-full flex justify-center items-center hover:bg-[#f0f1f1] transition-all ease-in'>
          <div className='rounded-full h-[32px] w-[32px] bg-green-700 flex justify-center items-center text-white'>
            Y
          </div>
        </div>
      </div>
    </nav>
  );
}
