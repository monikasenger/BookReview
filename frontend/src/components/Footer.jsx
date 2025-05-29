import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-800 via-cyan-700 to-teal-800 text-white py-6">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        {/* Left - Info */}
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h2 className="text-2xl font-bold text-yellow-300">BookBuzz</h2>
          <p className="text-sm mt-1">© 2025 BookBuzz. All rights reserved.</p>
          <p className="text-sm">Crafted with ❤️ by <span className="text-pink-300 font-semibold">Monika</span></p>
        </div>

        {/* Right - Social Icons */}
        <div className="flex space-x-5">
          <a href="#" aria-label="Facebook" className="hover:text-yellow-300 transition">
            <FaFacebookF size={20} />
          </a>
          <a href="#" aria-label="Twitter" className="hover:text-yellow-300 transition">
            <FaTwitter size={20} />
          </a>
          <a href="#" aria-label="Instagram" className="hover:text-yellow-300 transition">
            <FaInstagram size={20} />
          </a>
          <a href="#" aria-label="LinkedIn" className="hover:text-yellow-300 transition">
            <FaLinkedinIn size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
