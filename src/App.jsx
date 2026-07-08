import { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import MusicToggle from './components/MusicToggle';
import RoseAnimation from './components/RoseAnimation';
import Landing from './pages/Landing';
import LittleThings from './pages/LittleThings';
import WhatIFeel from './pages/WhatIFeel';
import BeforeAsking from './pages/BeforeAsking';
import Proposal from './pages/Proposal';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Landing />} />
        <Route path="/little-things" element={<LittleThings />} />
        <Route path="/what-i-feel" element={<WhatIFeel />} />
        <Route path="/before-i-ask" element={<BeforeAsking />} />
        <Route path="/proposal" element={<Proposal />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        {!loaded && (
          <LoadingScreen key="loading" onComplete={() => setLoaded(true)} />
        )}
      </AnimatePresence>
      {loaded && (
        <>
          <MusicToggle />
          <RoseAnimation />
          <AnimatedRoutes />
        </>
      )}
    </BrowserRouter>
  );
}

