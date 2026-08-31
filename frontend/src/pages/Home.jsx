import React from 'react';
import HeroBanner from '../components/HeroBanner';
import CategoryGrid from '../components/CategoryGrid';
import DealsSection from '../components/DealsSection';
import TrustBadges from '../components/TrustBadges';

export default function Home() {
  return (
    <main>
      <HeroBanner />
      <CategoryGrid />
      <DealsSection />
      <TrustBadges />
    </main>
  );
}
