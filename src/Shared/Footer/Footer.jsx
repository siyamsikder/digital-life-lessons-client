import React from "react";
import { Link } from "react-router";
import { FaFacebookF, FaLinkedinIn, FaGithub } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="bg-base border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold text-primary mb-3">
            LifeNotes
          </h2>
          <p className="text-soft leading-relaxed">
            Capture, reflect, and grow with meaningful life lessons.
            A peaceful place to store wisdom and learn from others.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-heading mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-soft">
            <li>
              <Link to="/" className="hover:text-primary transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/public-lessons" className="hover:text-primary transition">
                Public Lessons
              </Link>
            </li>
            <li>
              <Link to="/dashboard/add-lesson" className="hover:text-primary transition">
                Add Lesson
              </Link>
            </li>
            <li>
              <Link to="/pricing" className="hover:text-primary transition">
                Pricing / Upgrade
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-lg font-semibold text-heading mb-4">
            Connect With Us
          </h3>
          <p className="text-soft mb-4">
            Email: support@lifenotes.app
          </p>

          <div className="flex gap-4">
            <a
              href="#"
              className="w-9 h-9 flex items-center justify-center rounded-full 
              border border-border text-heading hover:bg-primary hover:text-white transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="w-9 h-9 flex items-center justify-center rounded-full 
              border border-border text-heading hover:bg-primary hover:text-white transition"
            >
              <BsTwitterX />
            </a>
            <a
              href="#"
              className="w-9 h-9 flex items-center justify-center rounded-full 
              border border-border text-heading hover:bg-primary hover:text-white transition"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="#"
              className="w-9 h-9 flex items-center justify-center rounded-full 
              border border-border text-heading hover:bg-primary hover:text-white transition"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border py-4 text-center text-sm text-soft">
        © {new Date().getFullYear()} LifeNotes. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
