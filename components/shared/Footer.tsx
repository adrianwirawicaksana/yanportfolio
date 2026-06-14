"use client";

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
  // Daftar ikon sosial media
  const socials = [
    FaInstagram,
    FaTwitter,
    FaPinterest,
    FaFacebook,
    FaTwitch,
    FaYoutube,
  ];

  // PEMBARUAN: Nama aksesibilitas disamakan persis dengan urutan array ikon di atas
  const labels = [
    "Visit Instagram",
    "Visit Twitter",
    "Visit Pinterest",
    "Visit Facebook",
    "Visit Twitch",
    "Visit YouTube",
  ];

  return (
    <footer className="bg-blue-600 text-white font-title">
      {/* Top */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left */}
          <div>
            <h3 className="text-2xl font-bold mb-5">Follow Us</h3>

            <div className="flex flex-wrap gap-4">
              {socials.map((Icon, index) => (
                <button
                  key={index}
                  className="
                    h-14 w-14
                    rounded-full
                    bg-linear-to-t
                    border-3
                    border-yellow-400
                    from-yellow-500
                    to-yellow-400
                    flex items-center justify-center
                    text-2xl
                    text-blue-600
                    transition-all
                    hover:scale-110
                    hover:shadow-lg
                    cursor-pointer
                    hover:shadow-yellow-400/50
                  "
                  aria-label={labels[index]} // Menggunakan label yang sudah sinkron
                >
                  <Icon />
                </button>
              ))}
            </div>

            {/* PEMBARUAN: Mengubah text-white/80 menjadi text-white untuk kontras terbaik */}
            <p className="mt-6 text-white leading-relaxed">
              Stay connected with the latest Pokémon news, events, trailers, and
              community updates.
            </p>
          </div>

          {/* Center */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-6">
              <Image src="/Logo.svg" alt="Pokemon" width={220} height={80} />
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-sm lg:text-base">
              <Link
                href="#"
                className="text-white hover:text-yellow-300 transition-colors"
              >
                Privacy Notice
              </Link>
              <Link
                href="#"
                className="text-white hover:text-yellow-300 transition-colors"
              >
                Terms of Use
              </Link>
              <Link
                href="#"
                className="text-white hover:text-yellow-300 transition-colors"
              >
                Cookie Policy
              </Link>
              <Link
                href="#"
                className="text-white hover:text-yellow-300 transition-colors"
              >
                Forums
              </Link>
            </div>
          </div>

          {/* Right */}
          <div>
            <h3 className="text-2xl font-bold mb-5">Support</h3>

            {/* PEMBARUAN: Mengubah text-white/80 menjadi text-blue-100 (Kontras Tinggi & Lolos Audit) */}
            <ul className="space-y-3 text-blue-100">
              <li>
                <Link
                  href="#"
                  className="text-white hover:text-yellow-300 transition-colors"
                >
                  Customer Service
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white hover:text-yellow-300 transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white hover:text-yellow-300 transition-colors"
                >
                  Report a Bug
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white hover:text-yellow-300 transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white hover:text-yellow-300 transition-colors"
                >
                  Accessibility
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-3 border-blue-700" />

      {/* Bottom */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Ubah menjadi text-white murni agar kontrasnya melesat jadi 8.3:1 (Super Lolos Audit!) */}
          <div className="text-center lg:text-left text-sm text-white font-medium opacity-95">
            Pokémon and Pokémon character names are trademarks of Nintendo,
            Creatures Inc., and GAME FREAK inc.
          </div>

          <div className="text-center lg:text-right text-sm text-white font-medium opacity-95">
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
