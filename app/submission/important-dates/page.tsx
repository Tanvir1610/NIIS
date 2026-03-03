import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Calendar, Clock } from 'lucide-react';

const dates = [
  { event: 'Paper Submission Opens', date: 'March 3, 2026', status: 'upcoming' },
  { event: 'Paper Submission Deadline', date: 'June 30, 2026', status: 'upcoming' },
  { event: 'Acceptance Notification', date: 'August 1, 2026', status: 'upcoming' },
  { event: 'Camera-Ready Deadline', date: 'August 15, 2026', status: 'upcoming' },
  { event: 'Early Bird Registration Deadline', date: 'August 20, 2026', status: 'upcoming' },
  { event: 'Registration Deadline', date: 'August 31, 2026', status: 'upcoming' },
  { event: 'Conference Dates', date: 'November 5 - November 6, 2026', status: 'upcoming' },
];

export default function ImportantDates() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-primary text-primary-foreground py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4">Important Dates</h1>
          </div>
        </section>

        {/* Content */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="space-y-4">
              {dates.map((item, index) => (
                <div key={index} className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <Calendar className="w-6 h-6 text-primary mt-1" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-foreground mb-2">{item.event}</h3>
                      <div className="flex items-center gap-2 text-foreground/70">
                        <Clock className="w-4 h-4" />
                        <p className="font-semibold">{item.date}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-accent/10 border border-accent/30 rounded-xl p-8 mt-12">
              <h2 className="text-2xl font-bold mb-4">Timeline Overview</h2>
              <p className="text-foreground/80 mb-4">
                The timeline above shows all critical dates for NIIS 2026. We recommend:
              </p>
              <ul className="space-y-2">
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Prepare your manuscript early to meet the submission deadline</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Register early to benefit from early bird discounts</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Plan travel arrangements well in advance</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Subscribe to our newsletter for updates and reminders</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
