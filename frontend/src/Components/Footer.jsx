import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
} from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import logo from '../assets/logo.png'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-gradient-to-b from-gray-950 via-gray-900 to-black text-gray-300">

      {/* Top Divider Glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-6 py-20 grid gap-12 md:grid-cols-4">

        {/* Brand */}
        <div>
          <img src={logo} alt="SilverBrick" className="h-11 mb-5" />
          <p className="text-sm leading-relaxed text-gray-400">
            SilverBrick is a trusted real estate platform helping you buy,
            sell, and invest in premium properties with complete confidence.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-6">
            {[
              { icon: <FaGithub />, link: '#' },
              { icon: <FaLinkedin />, link: '#' },
              { icon: <FaXTwitter />, link: '#' },
              { icon: <FaInstagram />, link: '#' },
            ].map((item, i) => (
              <a
                key={i}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full
                bg-white/5 hover:bg-blue-500/20 hover:scale-110
                transition text-gray-300"
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="mb-5 text-sm font-semibold uppercase tracking-widest text-white">
            Quick Links
          </h4>
          <ul className="space-y-3 text-sm">
            {['Home', 'About', 'Properties', 'Contact'].map((item) => (
              <li key={item}>
                <NavLink
                  to={`/${item === 'Home' ? '' : item.toLowerCase().replace(' ', '')}`}
                  className="hover:text-blue-400 transition"
                >
                  {item}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="mb-5 text-sm font-semibold uppercase tracking-widest text-white">
            Our Services
          </h4>
          <ul className="space-y-3 text-sm">
            {[
              'Property Buying',
              'Property Selling',
              'Rental Services',
              'Investment Advice',
            ].map((service) => (
              <li
                key={service}
                className="hover:text-blue-400 transition cursor-pointer"
              >
                {service}
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter + Contact */}
        <div>
          <h4 className="mb-5 text-sm font-semibold uppercase tracking-widest text-white">
            Stay Connected
          </h4>

          <p className="text-sm text-gray-400 mb-4">
            Get exclusive property updates & investment tips.
          </p>

          <div className="flex items-center bg-white/5 rounded-lg overflow-hidden">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-transparent px-4 py-2 text-sm outline-none placeholder-gray-500"
            />
            <button className="bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-500 transition">
              Join
            </button>
          </div>

          <ul className="space-y-2 text-sm mt-6 text-gray-400">
            <li>📍 Kanpur, India</li>
            <li>📞 +91 8707538123</li>
            <li>✉️ support@silverbrick.com</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-[11px] uppercase tracking-widest text-gray-500">
            © {currentYear} SilverBrick. All rights reserved.
          </span>

          <div className="flex gap-6 text-[10px] uppercase tracking-widest text-gray-500">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              Verified Partner
            </span>
            <span>Secure • Encrypted</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer