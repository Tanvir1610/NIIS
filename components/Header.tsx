'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import RegisterButton from '@/components/RegisterButton';

export function Header() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);



  return (
    <header className="z-50">
      {/* Logo Bar - Scrolls away */}
      <div className="border-b border-border bg-muted/30">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-center gap-8 flex-wrap">
            <img src="/logos/gcetlogo.png" alt="GCET Logo" className="h-12 w-auto" />
            <img src="/logos/Niis2026.png" alt="NIIS Logo" className="h-12 w-auto" />
            <img src="/logos/cvm.png" alt="CVM Logo" className="h-12 w-auto" />
          </div>
        </div>
      </div>

      {/* Navigation - Sticky at top */}
      <nav className="w-full bg-white/95 border-b border-border sticky top-0 z-50 transition-all duration-200 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-1 absolute left-1/2 transform -translate-x-1/2">
              <Link href="/" className="px-3 py-2 text-sm font-medium hover:text-primary transition-colors">
                Home
              </Link>
              {/* About Dropdown */}
              <div className="relative group">
                <button className="px-3 py-2 text-sm font-medium hover:text-primary transition-colors flex items-center gap-1">
                  About <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute left-0 mt-0 w-48 bg-white border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all pt-2">
                  <Link href="/about/niis2026" className="block px-4 py-2 hover:bg-muted text-sm">
                    About NIIS 2026
                  </Link>
                  <Link href="/about/gcet" className="block px-4 py-2 hover:bg-muted text-sm">
                    About GCET
                  </Link>
                  {/* <Link href="/schedule" className="block px-4 py-2 hover:bg-muted text-sm">
                    Schedule
                  </Link> */}
                </div>
              </div>

              {/* Committee Dropdown */}
              <div className="relative group">
                <button className="px-3 py-2 text-sm font-medium hover:text-primary transition-colors flex items-center gap-1">
                  Committee <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute left-0 mt-0 w-48 bg-white border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all pt-2">
                  <Link href="/committee/organizing" className="block px-4 py-2 hover:bg-muted text-sm">
                    Organizing Committee
                  </Link>
                  <Link href="/committee/technical" className="block px-4 py-2 hover:bg-muted text-sm">
                    Technical Advisory
                  </Link>
                  <Link href="/committee/track-coordinators" className="block px-4 py-2 hover:bg-muted text-sm">
                    Track Coordinators
                  </Link>
                </div>
              </div>

              <Link href="/keynote-speakers" className="px-3 py-2 text-sm font-medium hover:text-primary transition-colors whitespace-nowrap">
                Keynote Speakers
              </Link>

              {/* Submission Dropdown */}
              <div className="relative group">
                <button className="px-3 py-2 text-sm font-medium hover:text-primary transition-colors flex items-center gap-1">
                  Submission <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute left-0 mt-0 w-48 bg-white border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all pt-2">
                  <Link href="/submission/important-dates" className="block px-4 py-2 hover:bg-muted text-sm">
                    Important Dates
                  </Link>
                  <Link href="/submission/call-for-papers" className="block px-4 py-2 hover:bg-muted text-sm">
                    Call for Papers
                  </Link>
                  <Link href="/submission/author-guidelines" className="block px-4 py-2 hover:bg-muted text-sm">
                    Author Guidelines
                  </Link>
                  <Link href="/submission/guidelines" className="block px-4 py-2 hover:bg-muted text-sm">
                    Submission Guidelines
                  </Link>
                </div>
              </div>

              {/* Registration Dropdown */}
              <div className="relative group">
                <button className="px-3 py-2 text-sm font-medium hover:text-primary transition-colors flex items-center gap-1">
                  Registration <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute left-0 mt-0 w-48 bg-white border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all pt-2">
                  <Link href="/registration/conference" className="block px-4 py-2 hover:bg-muted text-sm">
                    Conference Registration
                  </Link>
                  <Link href="/registration/payment" className="block px-4 py-2 hover:bg-muted text-sm">
                    Payment Methods
                  </Link>
                  <Link href="/registration/faq" className="block px-4 py-2 hover:bg-muted text-sm">
                    Registration FAQ
                  </Link>
                </div>
              </div>

              <Link href="/contact" className="px-3 py-2 text-sm font-medium hover:text-primary transition-colors">
                Contact
              </Link>

              {/* Submit (desktop) */}
              <div className="ml-3 flex items-center">
                <RegisterButton className="px-3 py-2 text-sm font-medium" onClick={() => router.push('/submission/call-for-papers')}>
                  <b> Submit </b>
                </RegisterButton>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-border">
            <Link href="/" className="block px-3 py-2 text-sm font-medium hover:bg-muted">
              Home
            </Link>

            <div className="px-3 py-2">
              <button
                onClick={() => setOpenDropdown(openDropdown === 'about' ? null : 'about')}
                className="flex items-center justify-between w-full text-sm font-medium hover:text-primary"
              >
                About <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === 'about' ? 'rotate-180' : ''}`} />
              </button>
              {openDropdown === 'about' && (
                <div className="pl-4 mt-2 space-y-2">
                  <Link href="/about/niis2026" className="block text-sm hover:text-primary">
                    About NIIS 2026
                  </Link>
                  <Link href="/about/gcet" className="block text-sm hover:text-primary">
                    About GCET
                  </Link>
                  {/* <Link href="/schedule" className="block text-sm hover:text-primary">
                    Schedule
                  </Link> */}
                </div>
              )}
            </div>

            <div className="px-3 py-2">
              <button
                onClick={() => setOpenDropdown(openDropdown === 'committee' ? null : 'committee')}
                className="flex items-center justify-between w-full text-sm font-medium hover:text-primary"
              >
                Committee <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === 'committee' ? 'rotate-180' : ''}`} />
              </button>
              {openDropdown === 'committee' && (
                <div className="pl-4 mt-2 space-y-2">
                  <Link href="/committee/organizing" className="block text-sm hover:text-primary">
                    Organizing Committee
                  </Link>
                  <Link href="/committee/technical" className="block text-sm hover:text-primary">
                    Technical Advisory
                  </Link>
                  <Link href="/committee/track-coordinators" className="block text-sm hover:text-primary">
                    Track Coordinators
                  </Link>
                </div>
              )}
            </div>

            <Link href="/keynote-speakers" className="block px-3 py-2 text-sm font-medium hover:bg-muted">
              Keynote Speakers
            </Link>

            <div className="px-3 py-2">
              <button
                onClick={() => setOpenDropdown(openDropdown === 'submission' ? null : 'submission')}
                className="flex items-center justify-between w-full text-sm font-medium hover:text-primary"
              >
                Submission <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === 'submission' ? 'rotate-180' : ''}`} />
              </button>
              {openDropdown === 'submission' && (
                <div className="pl-4 mt-2 space-y-2">
                  <Link href="/submission/important-dates" className="block text-sm hover:text-primary">
                    Important Dates
                  </Link>
                  <Link href="/submission/call-for-papers" className="block text-sm hover:text-primary">
                    Call for Papers
                  </Link>
                  <Link href="/submission/author-guidelines" className="block text-sm hover:text-primary">
                    Author Guidelines
                  </Link>
                  <Link href="/submission/guidelines" className="block text-sm hover:text-primary">
                    Submission Guidelines
                  </Link>
                </div>
              )}
            </div>

            <div className="px-3 py-2">
              <button
                onClick={() => setOpenDropdown(openDropdown === 'registration' ? null : 'registration')}
                className="flex items-center justify-between w-full text-sm font-medium hover:text-primary"
              >
                Registration <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === 'registration' ? 'rotate-180' : ''}`} />
              </button>
              {openDropdown === 'registration' && (
                <div className="pl-4 mt-2 space-y-2">
                  <Link href="/registration/conference" className="block text-sm hover:text-primary">
                    Conference Registration
                  </Link>
                  <Link href="/registration/payment" className="block text-sm hover:text-primary">
                    Payment Methods
                  </Link>
                  <Link href="/registration/faq" className="block text-sm hover:text-primary">
                    Registration FAQ
                  </Link>
                </div>
              )}
            </div>

            <Link href="/contact" className="block px-3 py-2 text-sm font-medium hover:bg-muted">
              Contact
            </Link>

            {/* Submit (mobile) */}
            <div className="px-3 py-2">
              <RegisterButton className="w-full text-left px-3 py-2 text-sm font-medium" onClick={() => router.push('/submission/call-for-papers')}>
                Submit
              </RegisterButton>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}