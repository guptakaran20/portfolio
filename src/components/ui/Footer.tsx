import { FooterAnimations, TimeSpent } from "./FooterClient";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full pt-8 pb-32 md:pb-24 border-t border-slate-200 dark:border-white/10 bg-gray-50 dark:bg-transparent transition-colors duration-300 relative z-20">
      <FooterAnimations />
      <div id="footer-content" className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4 relative z-30">
        
        {/* Left: Time Spent */}
        <div style={{ willChange: "transform, opacity" }} className="order-1 md:order-1 flex-1 flex justify-center md:justify-start">
          <TimeSpent />
        </div>

        {/* Center: Copyright */}
        <p className="text-slate-900 dark:text-white font-medium text-base order-2 md:order-2 flex-1 text-center transition-colors" style={{ willChange: "transform, opacity" }}>
          Made with ❤️ &amp; 💻 by Karan Gupta
        </p>

        {/* Right: Social Icons */}
        <div className="flex gap-4 sm:gap-6 order-3 md:order-3 flex-1 justify-center md:justify-end" style={{ willChange: "transform, opacity" }}>
          <a href="https://www.instagram.com/guptakaran0720/" target="_blank" rel="noopener noreferrer" className="text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          </a>
          <a href="https://www.linkedin.com/in/guptakaran0720/" target="_blank" rel="noopener noreferrer" className="text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
          <a href="https://github.com/guptakaran20" target="_blank" rel="noopener noreferrer" className="text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
          </a>
          <a href="https://leetcode.com/u/guptakaran0720/" target="_blank" rel="noopener noreferrer" className="text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors">
            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125 2.517 5.284 5.284 0 0 0 1.488 2.511l7.05 7.05a1.285 1.285 0 0 0 1.815-.021l4.46-4.46a1.285 1.285 0 0 0-.022-1.815l-7.05-7.05a2.71 2.71 0 0 1-.763-1.287 2.766 2.766 0 0 1 .064-1.291 2.714 2.714 0 0 1 1.08-1.636l5.405-5.405A1.374 1.374 0 0 0 13.483 0zm-2.866 12.815a1.362 1.362 0 1 1 0 2.724H5.34a1.362 1.362 0 1 1 0-2.724z"/></svg>
          </a>
        </div>
      </div>
    </footer>
  );
}

