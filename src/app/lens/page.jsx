'use client';
import { useSearchParams } from 'next/navigation';
import Navbar from './components/Navbar';
import MainSection from './components/MainSection';
import { Suspense } from 'react';

export default function Lens() {
  return (
    <div>
      <Suspense>
        <Navbar />
        <MainSection />
      </Suspense>
    </div>
  );
}
