import Link from "next/link";
import Image from "next/image";
import {
  FaInstagram,
  FaTwitter,
  FaPinterest,
  FaFacebook,
  FaTwitch,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  const socials = [
    FaInstagram,
    FaTwitter,
    FaPinterest,
    FaFacebook,
    FaTwitch,
    FaYoutube,
  ];

  return (
    
    <footer className="bg-blue-600 text-white font-title">
      {/* Top */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Left */}
          <div>
            <h3 className="text-2xl font-bold mb-5">
              Follow Us
            </h3>

            <div className="flex flex-wrap gap-4">
              {socials.map((Icon, index) => (
                <button
                  key={index}
                  className="
                    h-14 w-14
                    rounded-full
                    bg-linear-to-t
                    border-3
                    border-red-700
                    from-red-600
                    to-red-500
                    flex items-center justify-center
                    text-2xl
                    transition-all
                    hover:scale-110
                    hover:bg-red-600
                    cursor-pointer
                  "
                >
                  <Icon />
                </button>
              ))}
            </div>

            <p className="mt-6 text-zinc-200">
              Stay connected with the latest Pokémon
              news, events, trailers, and community updates.
            </p>
          </div>

          {/* Center */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-6">
              <Image
                src="/Logo.svg"
                alt="Pokemon"
                width={220}
                height={80}
              />
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-sm lg:text-base">
              <Link href="#">Privacy Notice</Link>
              <Link href="#">Terms of Use</Link>
              <Link href="#">Cookie Policy</Link>
              <Link href="#">Forums</Link>
            </div>
          </div>

          {/* Right */}
          <div>
            <h3 className="text-2xl font-bold mb-5">
              Support
            </h3>

            <ul className="space-y-3 text-zinc-200">
              <li><Link href="#">Customer Service</Link></li>
              <li><Link href="#">FAQ</Link></li>
              <li><Link href="#">Report a Bug</Link></li>
              <li><Link href="#">Contact Us</Link></li>
              <li><Link href="#">Accessibility</Link></li>
            </ul>
          </div>

        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-3 border-blue-700" />

      {/* Bottom */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8">

        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">

          <div className="text-center lg:text-left text-sm text-zinc-200">
            Pokémon and Pokémon character names are
            trademarks of Nintendo, Creatures Inc.,
            and GAME FREAK inc.
          </div>

          <div className="text-center lg:text-right text-sm text-zinc-200">
            © 2026 Pokémon Yan Project.
            <br />
            All Rights Reserved.
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;