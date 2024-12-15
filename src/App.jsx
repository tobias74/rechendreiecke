import { Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import AppBar from './components/AppBar';
import Imprint from './routes/Imprint';

export default function App() {
  return (
    <div>
      {/* Add the AppBar */}
      <AppBar />
      {/* Define Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/imprint" element={<Imprint />} />
      </Routes>
    </div>
  );
}
