import React from 'react'

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-blue-600 text-white shadow-lg z-10">
    <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
      {/* Logo or Brand Name */}
      <div className="text-2xl font-bold">MyApp</div>
      
      {/* Navbar Links */}
      <div className="space-x-6 hidden md:flex">
        <a href="#home" className="hover:text-gray-300 transition">Home</a>
        <a href="#login" className="hover:text-gray-300 transition">Login</a>
        <a href="#about" className="hover:text-gray-300 transition">About</a>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button id="menu-btn" className="focus:outline-none">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
    </div>

    {/* Mobile Menu */}
    <div className="md:hidden bg-blue-700 text-white px-4 py-2 hidden" id="mobile-menu">
      <a href="#home" className="block py-2 hover:bg-blue-600 rounded">Home</a>
      <a href="#login" className="block py-2 hover:bg-blue-600 rounded">Login</a>
      <a href="#about" className="block py-2 hover:bg-blue-600 rounded">About</a>
    </div>
  </nav>
  )
}

export default Navbar