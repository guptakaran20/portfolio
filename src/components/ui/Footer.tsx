export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-8 border-t border-white/10 bg-[#030303]">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-gray-500 text-sm">
          &copy; {currentYear} Karan Gupta. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a href="https://www.linkedin.com/in/guptakaran0720/" className="text-gray-500 hover:text-white transition-colors text-sm">LinkedIn</a>
          <a href="https://github.com/guptakaran20" className="text-gray-500 hover:text-white transition-colors text-sm">GitHub</a>
          <a href="https://www.instagram.com/guptakaran20/" className="text-gray-500 hover:text-white transition-colors text-sm">Instagram</a>
        </div>
      </div>
    </footer>
  );
}
