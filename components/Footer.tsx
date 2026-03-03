import Link from 'next/link';
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram, Youtube, EarthIcon } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4">NIIS 2026</h3>
            <p className="text-sm opacity-90">
              International Conference on Next-Gen Integrated and Intelligent Systems
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:opacity-80 transition-opacity">Home</Link></li>
              <li><Link href="/about/niis2026" className="hover:opacity-80 transition-opacity">About NIIS</Link></li>
              <li><Link href="/keynote-speakers" className="hover:opacity-80 transition-opacity">Keynotes</Link></li>
              <li><Link href="/submission/call-for-papers" className="hover:opacity-80 transition-opacity">Call for Papers</Link></li>
            </ul>
          </div>

          {/* Submission */}
          <div>
            <h4 className="font-semibold mb-4">Submission</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/submission/important-dates" className="hover:opacity-80 transition-opacity">Important Dates</Link></li>
              <li><Link href="/submission/author-guidelines" className="hover:opacity-80 transition-opacity">Author Guidelines</Link></li>
              <li><Link href="/submission/guidelines" className="hover:opacity-80 transition-opacity">Guidelines</Link></li>
              <li><Link href="/registration/conference" className="hover:opacity-80 transition-opacity">Registration</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span> <Link href="https://maps.app.goo.gl/YK5vEtfhYqDoqFHx8">GCET Auditorium, Gujarat, India</Link></span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:niis2026@gcet.ac.in" className="hover:opacity-80 transition-opacity">
                  niis2026@gcet.ac.in
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a href="tel:+91 9574383265" className="hover:opacity-80 transition-opacity">
                  Dr. Bhaskar Thakker: +91 9574383265
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a href="tel:+91 9879849707" className="hover:opacity-80 transition-opacity">
                  Dr. Priyang Bhatt: +91 9879849707
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-primary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm opacity-90 mb-4 md:mb-0">
              Follow us on social media
            </p>
            <div className="flex gap-4">
              <a href="https://www.gcet.ac.in/index.php" className="hover:opacity-80 transition-opacity">
                <EarthIcon className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/school/g-h-patel-college-of-engineering-&-technology/posts/?feedView=all" className="hover:opacity-80 transition-opacity">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/gcet_official/?hl=en" className="hover:opacity-80 transition-opacity">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.youtube.com/@ghpatelcollegeofengineerin6344/featured" className="hover:opacity-80 transition-opacity">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm opacity-90">
          <p>
            Copyright © {currentYear} NIIS 2026. All rights reserved. | Hosted by GCET, CVM University
          </p>
        </div>
      </div>
    </footer>
  );
}
