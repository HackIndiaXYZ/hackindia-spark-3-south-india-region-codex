/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Matchmaker from './pages/Matchmaker';
import Battle from './pages/Battle';
import Compare from './pages/Compare';
import Universe from './pages/Universe';
import Leaderboard from './pages/Leaderboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="matchmaker" element={<Matchmaker />} />
          <Route path="battle" element={<Battle />} />
          <Route path="compare" element={<Compare />} />
          <Route path="universe" element={<Universe />} />
          <Route path="leaderboard" element={<Leaderboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
