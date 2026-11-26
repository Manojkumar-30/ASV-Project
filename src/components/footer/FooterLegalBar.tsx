import { Link } from 'react-router-dom';

export function FooterLegalBar() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 text-xs text-[#BDBDBD]">
      <p>&copy; {currentYear} ASV Property Management. All rights reserved.</p>
      <div className="flex flex-wrap items-center gap-6">
        <Link to="/privacy-policy" className="link-underline hover:text-white transition-colors">
          Privacy Policy
        </Link>
        <Link
          to="/terms-and-conditions"
          className="link-underline hover:text-white transition-colors"
        >
          Terms &amp; Conditions
        </Link>
      </div>
    </div>
  );
}
