import { FooterAnimations, TimeSpent } from "./FooterClient";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full pt-8 pb-24 md:pb-12 mb-6 border-t border-white/10 bg-[#030303]">
      <FooterAnimations />
      <div id="footer-content" className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-gray-500 text-sm order-2 md:order-1" style={{ willChange: "transform, opacity" }}>
          &copy; {currentYear} Made with ❤️ &amp; 💻 by Karan Gupta.
        </p>

        <div style={{ willChange: "transform, opacity" }} className="order-1 md:order-2">
          <TimeSpent />
        </div>

        <div className="flex gap-6 order-3" style={{ willChange: "transform, opacity" }}>
          <a href="https://www.linkedin.com/in/guptakaran0720/" className="text-gray-500 hover:text-white transition-colors text-sm">LinkedIn</a>
          <a href="https://github.com/guptakaran20" className="text-gray-500 hover:text-white transition-colors text-sm">GitHub</a>
          <a href="https://www.instagram.com/guptakaran0720/" className="text-gray-500 hover:text-white transition-colors text-sm">Instagram</a>
        </div>
      </div>
    </footer>
  );
}

