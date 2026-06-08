export default function Footer() {
  return (
    <footer className="bg-[#F7F3EE] border-t border-[#0D0D0D]/10 text-[#0D0D0D]/50 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <p className="font-display text-2xl text-[#0D0D0D] tracking-widest mb-3">mr.kloudy</p>
          <p className="text-sm leading-relaxed">Fine-line botanical tattooing<br />& original artworks.</p>
        </div>

        <div className="text-sm space-y-2">
          <p className="text-[#0D0D0D] tracking-widest text-xs mb-3">Contact</p>
          {/* Replace with real email */}
          <a href="mailto:studio@example.com" className="block hover:text-[#0D0D0D] transition-colors">studio@example.com</a>
          {/* Replace with real Instagram */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block hover:text-[#0D0D0D] transition-colors"
          >
            @handle
          </a>
        </div>

        <div className="text-sm space-y-2">
          <p className="text-[#0D0D0D] tracking-widest text-xs mb-3">Studio</p>
          {/* Replace with real address */}
          <address className="not-italic leading-relaxed">
            Studio Name<br />
            Straße 1<br />
            10115 Berlin, DE
          </address>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-[#0D0D0D]/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs text-[#0D0D0D]/30">
        <p>© {new Date().getFullYear()} mr.kloudy. All rights reserved.</p>
        {/* Impressum — legally required in Germany */}
        <a href="/impressum" className="hover:text-[#0D0D0D]/60 transition-colors">Impressum / Legal Notice</a>
      </div>
    </footer>
  );
}
