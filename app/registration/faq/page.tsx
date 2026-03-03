import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const faqs = [
  {
    question: 'When will registration open?',
    answer: 'Registration opens on April 1, 2026. Early bird registration offers a 20% discount until November 15, 2026.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept credit cards (Visa, MasterCard, AmEx), bank transfers, digital wallets (Google Pay, Apple Pay, Paytm), and wire transfers.'
  },
  {
    question: 'Can I get a refund if I cannot attend?',
    answer: 'Yes, cancellations before Nov 30, 2026 receive full refund. Cancellations Dec 1-10 receive 50% refund. No refunds after Dec 10, 2026.'
  },
  {
    question: 'Is there a student discount?',
    answer: 'Yes! Students can register at $150. You may need to provide student ID during registration.'
  },
  {
    question: 'Can I register on-site during the conference?',
    answer: 'On-site registration is available on December 15-17, 2026, subject to availability. Standard rates apply.'
  },
  {
    question: 'What documents will I receive?',
    answer: 'You will receive a welcome kit with conference schedule, materials, certificate of participation, and access credentials.'
  },
  {
    question: 'Can I change my registration package after registering?',
    answer: 'Yes, you can upgrade or downgrade your package up to December 10, 2026. Contact registration@niis2026.com for changes.'
  },
  {
    question: 'Will meals be provided?',
    answer: 'Yes, lunch and refreshments are included for all registrations throughout all three days of the conference.'
  },
  {
    question: 'Is accommodation provided?',
    answer: 'Accommodation is not included in the registration package. We can provide a list of nearby hotels at discounted rates.'
  },
  {
    question: 'Can I register for just one day?',
    answer: 'Current packages are for the full 3-day conference. Contact us for single-day registration options.'
  },
  {
    question: 'What is the group registration discount?',
    answer: 'Groups of 5+ can avail of 15% discount. Contact registration@niis2026.com for group registration.'
  },
  {
    question: 'How do I submit a paper if I want to present?',
    answer: 'Submit your paper through the EasyChair portal. Accepted papers can be presented during the conference. Presenter must register.'
  }
];

export default function RegistrationFAQ() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-primary text-primary-foreground py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4">Registration FAQ</h1>
          </div>
        </section>

        {/* Content */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <details key={index} className="bg-card rounded-xl border border-border p-6 group cursor-pointer hover:shadow-lg transition-shadow">
                  <summary className="font-bold text-lg text-foreground flex items-center justify-between">
                    {faq.question}
                    <span className="text-primary group-open:rotate-180 transition-transform">
                      ▼
                    </span>
                  </summary>
                  <p className="text-foreground/80 mt-4">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>

            <div className="bg-primary/10 border border-primary/30 rounded-xl p-8 mt-12">
              <h2 className="text-2xl font-bold mb-4">Didn't find your answer?</h2>
              <p className="text-foreground/80 mb-6">
                If you have additional questions about registration, please don't hesitate to contact our registration team.
              </p>
              <div className="space-y-3">
                <p><strong>Email:</strong> registration@niis2026.com</p>
                <p><strong>Phone:</strong> +91 9999 999 999</p>
                <p><strong>Hours:</strong> Monday - Friday, 9 AM - 5 PM IST</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
