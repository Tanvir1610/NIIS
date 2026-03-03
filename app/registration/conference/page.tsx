'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Check } from 'lucide-react';

const packages = [
  {
    name: 'Student',
    price: '₹800',
    includes: [
      'Conference access (all 3 days)',
      'Welcome kit and materials',
      'Lunch and refreshments',
      'Certificate of participation',
      'Access to all sessions'
    ]
  },
  {
    name: 'Academic / Faculty',
    price: '₹1500',
    includes: [
      'Conference access (all 3 days)',
      'Welcome kit and materials',
      'Lunch and refreshments',
      'Certificate of participation',
      'Access to all sessions',
      'Networking events',
      'Paper presentation slot'
    ],
    featured: true
  },
  {
    name: 'Industry Professional',
    price: '₹2000',
    includes: [
      'Conference access (all 3 days)',
      'Welcome kit and materials',
      'Lunch and refreshments',
      'Certificate of participation',
      'Access to all sessions',
      'Networking events',
      'Paper presentation slot',
      'Priority seating',
      'VIP badge'
    ]
  },
  {
    name: 'Attendee',
    price: '₹1000',
    includes: [
      'Conference access (all days)',
      'Welcome kit',
      'Lunch and refreshments',
      'Networking opportunities',
      'Certificate of attendance'
    ]
  }
];

export default function ConferenceRegistration() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-primary text-primary-foreground py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4">Conference Registration</h1>
          </div>
        </section>

        {/* Content */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Registration Packages</h2>
              <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
                Choose the registration package that best fits your needs and join us at NIIS 2026
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6 mb-12">
              {packages.map((pkg, index) => (
                <div
                  key={index}
                  className={`rounded-xl border p-8 flex flex-col ${pkg.featured
                      ? 'bg-primary text-primary-foreground border-primary shadow-xl scale-105'
                      : 'bg-card border-border hover:shadow-lg transition-shadow'
                    }`}
                >
                  <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                  <div className={`text-3xl font-bold mb-6 ${pkg.featured ? 'text-white' : 'text-primary'}`}>
                    {pkg.price}
                  </div>
                  <ul className="space-y-3 flex-1 mb-6">
                    {pkg.includes.map((feature, i) => (
                      <li key={i} className="flex gap-3">
                        <Check className="w-5 h-5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    className={pkg.featured ? 'bg-white text-primary hover:bg-gray-100' : ''}
                  >
                    <Link href="/register">Register Now</Link>
                  </Button>
                </div>
              ))}
            </div>

            <div className="bg-muted/50 border border-border rounded-xl p-8 mb-12">
              <h2 className="text-3xl font-bold mb-6">What's Included</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-bold text-primary mb-3">All Packages Include:</h3>
                  <ul className="space-y-2">
                    <li className="flex gap-3">
                      <Check className="w-5 h-5 text-accent flex-shrink-0" />
                      <span>Full conference access for all 3 days</span>
                    </li>
                    <li className="flex gap-3">
                      <Check className="w-5 h-5 text-accent flex-shrink-0" />
                      <span>Welcome kit with conference materials</span>
                    </li>
                    <li className="flex gap-3">
                      <Check className="w-5 h-5 text-accent flex-shrink-0" />
                      <span>Lunch and refreshments throughout the conference</span>
                    </li>
                    <li className="flex gap-3">
                      <Check className="w-5 h-5 text-accent flex-shrink-0" />
                      <span>Certificate of participation</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-primary mb-3">Early Bird Discount:</h3>
                  <p className="text-foreground/80 mb-4">
                    Register before November 15, 2026 and get 20% discount on all packages!
                  </p>
                  <p className="text-sm text-foreground/70">
                    *Corporate packages require custom quotation
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-primary/10 border border-primary/30 rounded-xl p-8">
              <h2 className="text-3xl font-bold mb-4">Registration Information</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-bold text-primary mb-3">Important Dates</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold">Early Bird: Until Nov 15, 2026</p>
                      <p className="text-sm text-foreground/70">20% discount on all packages</p>
                    </div>
                    <div>
                      <p className="font-semibold">Regular: Nov 16 - Dec 10, 2026</p>
                      <p className="text-sm text-foreground/70">Standard registration rates</p>
                    </div>
                    <div>
                      <p className="font-semibold">On-Spot: Dec 15-17, 2026</p>
                      <p className="text-sm text-foreground/70">Subject to availability</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-primary mb-3">Need Help?</h3>
                  <p className="text-foreground/80 mb-4">
                    Contact our registration team for any questions:
                  </p>
                  <div className="space-y-2 text-sm">
                    <p><strong>Email:</strong> registration@niis2026.com</p>
                    <p><strong>Phone:</strong> +91 9999 999 999</p>
                    <p><strong>Hours:</strong> Mon-Fri, 9 AM - 5 PM IST</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
