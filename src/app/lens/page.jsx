'use client';
import { useSearchParams } from 'next/navigation';
import Navbar from './components/Navbar';
import MainSection from './components/MainSection';

export default function Lens() {
  return (
    <div>
      <Navbar />
      <MainSection />
    </div>
  );
}
