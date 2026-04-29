import { useState, useEffect } from "react";

const Navbar = ({ hidden = false }) => {
  // ⛔ Saat hidden, jangan render apa pun
  if (hidden) return null;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [activeLink, setActiveLink] = useState("home");

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const onScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastScrollY && currentY > 100) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      lastScrollY = currentY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = ["home", "about", "project", "contact"].map((id) =>
      document.getElementById(id)
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveLink(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => section && observer.observe(section));
    return () => observer.disconnect();
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
      <li>
        <a
          href="#home"
          className={`sm:text-lg text-base font-medium nav-link ${activeLink === "home" ? "active" : ""}`}
          aria-current={activeLink === "home" ? "page" : undefined}
          onClick={() => setIsMenuOpen(false)}
        >
          Home
        </a>
      </li>
      <li>
        <a
          href="#about"
          className={`sm:text-lg text-base font-medium nav-link ${activeLink === "about" ? "active" : ""}`}
          aria-current={activeLink === "about" ? "page" : undefined}
          onClick={() => setIsMenuOpen(false)}
        >
          About
        </a>
      </li>
      <li>
        <a
          href="#project"
          className={`sm:text-lg text-base font-medium nav-link ${activeLink === "project" ? "active" : ""}`}
          aria-current={activeLink === "project" ? "page" : undefined}
          onClick={() => setIsMenuOpen(false)}
        >
          Project
        </a>
      </li>
      <li>
        <a
          href="#contact"
          className={`sm:text-lg text-base font-medium nav-link ${activeLink === "contact" ? "active" : ""}`}
          aria-current={activeLink === "contact" ? "page" : undefined}
          onClick={() => setIsMenuOpen(false)}
        >
          Contact
        </a>
      </li>
    </>
  );

  return (
    <nav
      className={`navbar fixed top-0 left-0 w-full z-50 py-4 px-4 sm:px-6 md:px-12 flex items-center justify-between transition-transform duration-300 bg-white/5 backdrop-blur-xl border-b border-white/10
        ${isHidden ? "-translate-y-full" : "translate-y-0"}`}
    >
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

      <div className="hidden md:flex items-center justify-end">
        <ul className="flex items-center sm:gap-10 gap-4 px-6 py-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 shadow-lg">
          {navLinks}
        </ul>
      </div>

      <div
        className={`md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsMenuOpen(false)}
      />

      <aside
        className={`md:hidden fixed top-0 right-0 z-50 h-full w-72 bg-[#0a0a0f]/90 backdrop-blur-xl border-l border-white/10 shadow-2xl transition-transform duration-300
          ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <span className="text-lg font-semibold">Menu</span>
          <button
            type="button"
            className="rounded-full border border-white/20 p-2 text-white hover:bg-white/10 transition-colors"
            aria-label="Close navigation menu"
            onClick={() => setIsMenuOpen(false)}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <ul className="flex flex-col gap-6 p-6">
          {navLinks}
        </ul>
      </aside>
    </nav>
  );
};

export default Navbar;
