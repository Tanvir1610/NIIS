import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function Contact() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-primary text-primary-foreground py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
          </div>
        </section>

        {/* Content */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 mb-12">
              {/* Contact Information */}
              <div>
                <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>

                <div className="space-y-6 mb-8">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1">Conference Venue</h3>
                      <p className="text-foreground/80">
                        GCET (Gokaraju Chandraiah Educational Technologies)
                        <br />Gujarat, India
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-accent/10">
                        <Mail className="h-6 w-6 text-accent" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1">Email</h3>
                      <p className="text-foreground/80">
                        General Inquiries: info@niis2026.com
                        <br />
                        Paper Submission: submissions@niis2026.com
                        <br />
                        Registration: registration@niis2026.com
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-secondary/10">
                        <Phone className="h-6 w-6 text-secondary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1">Phone</h3>
                      <p className="text-foreground/80">
                        +91 9999 999 999
                        <br />
                        +91 8888 888 888 (Ext. 201)
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                        <Clock className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1">Working Hours</h3>
                      <p className="text-foreground/80">
                        Monday - Friday: 9:00 AM - 5:00 PM IST
                        <br />
                        Saturday & Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <div className="bg-card rounded-xl border border-border p-8">
                  <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Name</label>
                      <input
                        type="text"
                        placeholder="Your full name"
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Email</label>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Subject</label>
                      <input
                        type="text"
                        placeholder="What is this about?"
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Message</label>
                      <textarea
                        placeholder="Your message here..."
                        rows={5}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                        required
                      ></textarea>
                    </div>
                    <Button type="submit" className="w-full">
                      Send Message
                    </Button>
                  </form>
                </div>
              </div>
            </div>

            {/* Additional Contacts */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
                <h3 className="text-lg font-bold text-primary mb-2">For Paper Submissions</h3>
                <p className="text-foreground/80 text-sm mb-3">
                  Have questions about submitting your research paper?
                </p>
                <p className="font-semibold">submissions@niis2026.com</p>
              </div>
              <div className="bg-accent/5 border border-accent/20 rounded-xl p-6">
                <h3 className="text-lg font-bold text-accent mb-2">For Registration</h3>
                <p className="text-foreground/80 text-sm mb-3">
                  Need help with registration or payment?
                </p>
                <p className="font-semibold">registration@niis2026.com</p>
              </div>
              <div className="bg-secondary/5 border border-secondary/20 rounded-xl p-6">
                <h3 className="text-lg font-bold text-secondary mb-2">For Sponsorship</h3>
                <p className="text-foreground/80 text-sm mb-3">
                  Interested in sponsoring NIIS 2026?
                </p>
                <p className="font-semibold">sponsorship@niis2026.com</p>
              </div>
            </div>

            {/* Map Section */}
            <div className="mt-12 bg-muted rounded-xl overflow-hidden border border-border h-96">
              <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                  <p className="text-foreground/70">
                    GCET Campus, Hyderabad, India
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ Link */}
            <div className="bg-primary/10 border border-primary/30 rounded-xl p-8 mt-12 text-center">
              <h2 className="text-2xl font-bold mb-4">Quick Questions?</h2>
              <p className="text-foreground/80 mb-6 max-w-2xl mx-auto">
                Check out our FAQ section for answers to common questions about registration, submission, and the conference.
              </p>
              <Button asChild>
                <a href="/registration/faq">View FAQ</a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
