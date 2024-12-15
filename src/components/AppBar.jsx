import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AppBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="navbar bg-base-100 shadow-md">
      {/* Logo */}
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          Rechendreiecke
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/data-privacy">Datenschutzerklärung</Link>
          </li>
          <li>
            <Link to="/imprint">Impressum</Link>
          </li>
        </ul>
      </div>

      {/* Mobile Burger Menu */}
      <div className="flex md:hidden">
        <button
          className="btn btn-ghost"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Flyout Menu for Mobile */}
      {menuOpen && (
        <div className="absolute top-16 right-4 bg-base-200 rounded shadow-lg z-50 p-3">
          <ul className="menu menu-vertical">
            <li>
              <Link to="/data-privacy" onClick={() => setMenuOpen(false)}>
                Datenschutzerklärung
              </Link>
            </li>
            <li>
              <Link to="/imprint" onClick={() => setMenuOpen(false)}>
                Impressum
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
