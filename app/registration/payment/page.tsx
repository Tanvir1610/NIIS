import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CreditCard, Banknote, Building2 } from 'lucide-react';

export default function PaymentMethods() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-primary text-primary-foreground py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4">Payment Methods</h1>
          </div>
        </section>

        {/* Content */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-card rounded-xl border border-border p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <CreditCard className="w-8 h-8 text-primary" />
                  <h2 className="text-2xl font-bold">Credit/Debit Card</h2>
                </div>
                <p className="text-foreground/80 mb-6">
                  Pay securely with your credit or debit card. We accept all major credit cards worldwide.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-accent">✓</span>
                    <span>Visa</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-accent">✓</span>
                    <span>MasterCard</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-accent">✓</span>
                    <span>American Express</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-accent">✓</span>
                    <span>Discover</span>
                  </div>
                </div>
                <p className="text-sm text-foreground/70">
                  Processing fee: 2.5% (automatic deduction from final amount)
                </p>
              </div>

              <div className="bg-card rounded-xl border border-border p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <Building2 className="w-8 h-8 text-primary" />
                  <h2 className="text-2xl font-bold">Bank Transfer</h2>
                </div>
                <p className="text-foreground/80 mb-6">
                  Direct bank transfer available for Indian and international participants.
                </p>
                <div className="space-y-3 bg-muted/30 rounded-lg p-4">
                  <p><strong>Bank Name:</strong> Global Tech Bank</p>
                  <p><strong>Account Number:</strong> 123456789</p>
                  <p><strong>IFSC Code:</strong> GTB0000123</p>
                  <p><strong>SWIFT Code:</strong> GTBKINBBXXX</p>
                  <p><strong>Account Holder:</strong> NIIS 2026 Conference</p>
                </div>
                <p className="text-sm text-foreground/70 mt-4">
                  Please mention your registration ID in the transfer reference
                </p>
              </div>

              <div className="bg-card rounded-xl border border-border p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <Banknote className="w-8 h-8 text-primary" />
                  <h2 className="text-2xl font-bold">Digital Wallet</h2>
                </div>
                <p className="text-foreground/80 mb-6">
                  Fast and secure payment using popular digital wallets in India.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-accent">✓</span>
                    <span>Google Pay</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-accent">✓</span>
                    <span>Apple Pay</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-accent">✓</span>
                    <span>Paytm</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-accent">✓</span>
                    <span>PhonePe</span>
                  </div>
                </div>
                <p className="text-sm text-foreground/70">
                  Instant payment confirmation
                </p>
              </div>

              <div className="bg-card rounded-xl border border-border p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <CreditCard className="w-8 h-8 text-primary" />
                  <h2 className="text-2xl font-bold">Wire Transfer</h2>
                </div>
                <p className="text-foreground/80 mb-6">
                  International wire transfers welcome. Contact us for wire transfer instructions.
                </p>
                <div className="space-y-3 bg-muted/30 rounded-lg p-4">
                  <p><strong>Currency:</strong> USD / INR / EUR</p>
                  <p><strong>Processing Time:</strong> 3-5 business days</p>
                  <p><strong>Beneficiary:</strong> NIIS 2026 Conference</p>
                </div>
                <p className="text-sm text-foreground/70 mt-4">
                  Kindly contact us for complete wire transfer details
                </p>
              </div>
            </div>

            <div className="bg-primary/10 border border-primary/30 rounded-xl p-8 mb-12">
              <h2 className="text-2xl font-bold mb-4">Payment Process</h2>
              <ol className="space-y-4">
                <li className="flex gap-4">
                  <span className="text-primary font-bold bg-primary/20 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">1</span>
                  <span>Select your registration package</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-primary font-bold bg-primary/20 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">2</span>
                  <span>Choose your preferred payment method</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-primary font-bold bg-primary/20 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">3</span>
                  <span>Complete the payment transaction</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-primary font-bold bg-primary/20 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">4</span>
                  <span>Receive confirmation email and registration details</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-primary font-bold bg-primary/20 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">5</span>
                  <span>Access your conference materials and schedule</span>
                </li>
              </ol>
            </div>

            <div className="bg-muted/50 border border-border rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-6">Refund Policy</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-primary mb-2">Cancellation Policy</h3>
                  <ul className="space-y-2 text-foreground/80">
                    <li>• Cancellation before Nov 30, 2026: Full refund</li>
                    <li>• Cancellation Dec 1-10, 2026: 50% refund</li>
                    <li>• Cancellation after Dec 10, 2026: No refund</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-primary mb-2">Processing Time</h3>
                  <p className="text-foreground/80">
                    Refunds will be processed within 7-10 business days to the original payment method
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-primary mb-2">Contact for Cancellation</h3>
                  <p className="text-foreground/80">
                    Email: registration@niis2026.com with your registration ID
                  </p>
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
