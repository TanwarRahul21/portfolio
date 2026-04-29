import { useState, useEffect } from "react";

const Navbar = ({ hidden = false }) => {
  // ⛔ Saat hidden, jangan render apa pun
  if (hidden) return null;

  const [active, setActive] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setActive(window.scrollY > 150);
    handleScroll(); // init posisi saat mount
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinks = (
    <>
      <li><a href="#home" className="sm:text-lg text-base font-medium" onClick={() => setIsMenuOpen(false)}>Home</a></li>
      <li><a href="#about" className="sm:text-lg text-base font-medium" onClick={() => setIsMenuOpen(false)}>About</a></li>
      <li><a href="#project" className="sm:text-lg text-base font-medium" onClick={() => setIsMenuOpen(false)}>Project</a></li>
      <li><a href="#contact" className="sm:text-lg text-base font-medium" onClick={() => setIsMenuOpen(false)}>Contact</a></li>
    </>
  );

  return (
    <nav className="navbar relative z-50 py-7 flex items-center justify-between px-4 sm:px-6 md:px-12">
      {/* Logo */}
      <div className="logo">
        <h1 className="text-3xl font-bold text-white p-1 md:bg-transparent md:text-white">
          Portofolio
        </h1>
      </div>

      <button
        type="button"
        className="md:hidden inline-flex items-center justify-center rounded-full border border-white/20 p-2 text-white hover:bg-white/10 transition-colors"
        aria-label="Toggle navigation menu"
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((prev) => !prev)}
      >
        <span className="sr-only">Open menu</span>
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>

      {/* Menu */}
      <ul className="hidden md:flex items-center sm:gap-10 gap-4">
        {navLinks}
      </ul>

      <div
        className={`md:hidden absolute left-0 top-full w-full bg-black/70 backdrop-blur-md border-t border-white/10 transition-all duration-300
          ${isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}`}
      >
        <ul className="flex flex-col gap-4 p-6">
          {navLinks}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
