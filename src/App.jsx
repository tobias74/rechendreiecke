import { Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import About from './routes/About';
import AppBar from './components/AppBar';

export default function App() {
  return (
    <div>
      {/* Add the AppBar */}
      <AppBar />
      {/* Define Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}
