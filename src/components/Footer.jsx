const Footer = () => {
  return (
    <footer className="mt-32 border-t border-white/10 py-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-sm text-white/60">Copyright © 2026 Rahul Tanwar</p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/TanwarRahul21"
            className="h-10 w-10 rounded-full border border-white/10 bg-white/5 inline-flex items-center justify-center hover:border-[#5DCAA5] hover:text-[#5DCAA5] transition-colors"
            aria-label="GitHub"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.5 2.87 8.31 6.84 9.66.5.1.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.9 1.58 2.36 1.12 2.93.86.09-.67.35-1.12.64-1.38-2.22-.26-4.56-1.14-4.56-5.05 0-1.12.39-2.04 1.03-2.76-.1-.26-.45-1.3.1-2.7 0 0 .84-.27 2.75 1.05A9.32 9.32 0 0 1 12 6.84c.85 0 1.71.12 2.51.34 1.91-1.32 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.64 1.03 2.76 0 3.92-2.34 4.78-4.57 5.03.36.32.68.95.68 1.92 0 1.38-.01 2.5-.01 2.84 0 .26.18.59.69.48A10.27 10.27 0 0 0 22 12.25C22 6.58 17.52 2 12 2z" />
            </svg>
          </a>
          <a
            href="https://linkedin.com/in/rahultanwar"
            className="h-10 w-10 rounded-full border border-white/10 bg-white/5 inline-flex items-center justify-center hover:border-[#5DCAA5] hover:text-[#5DCAA5] transition-colors"
            aria-label="LinkedIn"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M4.98 3.5c0 1.38-1.1 2.5-2.48 2.5S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8.5h4V24h-4zM8.5 8.5h3.8v2.1h.05c.53-1 1.82-2.1 3.75-2.1 4 0 4.74 2.68 4.74 6.16V24h-4v-7.5c0-1.79-.03-4.1-2.5-4.1-2.5 0-2.88 1.96-2.88 3.98V24h-4z" />
            </svg>
          </a>
          <a
            href="https://www.instagram.com/rahultanwar__/"
            className="h-10 w-10 rounded-full border border-white/10 bg-white/5 inline-flex items-center justify-center hover:border-[#5DCAA5] hover:text-[#5DCAA5] transition-colors"
            aria-label="Instagram"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5zm10 2c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V7c0-1.66 1.34-3 3-3zm-5 3.5A5.5 5.5 0 1 0 17.5 13 5.5 5.5 0 0 0 12 7.5zm0 2A3.5 3.5 0 1 1 8.5 13 3.5 3.5 0 0 1 12 9.5zm5.75-3.1a1.15 1.15 0 1 0 1.15 1.15A1.15 1.15 0 0 0 17.75 6.4z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
