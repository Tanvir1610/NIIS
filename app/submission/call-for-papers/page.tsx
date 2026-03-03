import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function CallForPapers() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-primary text-primary-foreground py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4">Call for Papers</h1>
          </div>
        </section>

        {/* Content */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold mb-6">Call for Papers - NIIS 2026</h2>
              
              <p className="text-lg text-foreground/80 mb-6">
                NIIS 2026 invites researchers, academicians, and professionals to submit original and unpublished research papers in all areas related to integrated and intelligent systems.
              </p>

              <h2 className="text-3xl font-bold mb-6">Scope</h2>
              <p className="text-foreground/80 mb-4">
                We welcome papers addressing, but not limited to, the following areas:
              </p>
              <ul className="space-y-2 mb-8">
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Artificial Intelligence and Machine Learning</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Internet of Things (IoT) and Edge Computing</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Robotics and Autonomous Systems</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Cloud Computing and Distributed Systems</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Cybersecurity and Privacy</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Smart Applications and Services</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Big Data Analytics</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Network Security and Protocols</span>
                </li>
              </ul>

              <h2 className="text-3xl font-bold mb-6">Submission Guidelines</h2>
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-8">
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">1.</span>
                    <span><strong>Paper Format:</strong> PDF format following the template</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">2.</span>
                    <span><strong>Length:</strong> 6-8 pages including references</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">3.</span>
                    <span><strong>Language:</strong> English</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">4.</span>
                    <span><strong>Originality:</strong> Papers must be original and not previously published</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">5.</span>
                    <span><strong>Peer Review:</strong> All papers undergo double-blind peer review</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">6.</span>
                    <span><strong>Author Details:</strong> Include affiliations and contact information</span>
                  </li>
                </ul>
              </div>

              <h2 className="text-3xl font-bold mb-6">Submission Process</h2>
              <ol className="space-y-4 mb-8">
                <li className="flex gap-4">
                  <span className="text-accent font-bold bg-accent/20 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">1</span>
                  <span><strong>Prepare your paper:</strong> Follow the provided template and guidelines</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-accent font-bold bg-accent/20 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">2</span>
                  <span><strong>Register:</strong> Create an account on the submission portal</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-accent font-bold bg-accent/20 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">3</span>
                  <span><strong>Submit:</strong> Upload your paper and complete the submission form</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-accent font-bold bg-accent/20 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">4</span>
                  <span><strong>Receive Confirmation:</strong> Get acknowledgment of submission</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-accent font-bold bg-accent/20 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">5</span>
                  <span><strong>Peer Review:</strong> Your paper will be reviewed by experts</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-accent font-bold bg-accent/20 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">6</span>
                  <span><strong>Decision:</strong> Receive notification of acceptance or revision needed</span>
                </li>
              </ol>

              <h2 className="text-3xl font-bold mb-6">Key Dates</h2>
              <div className="bg-muted/50 border border-border rounded-xl p-6 mb-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="font-bold text-primary mb-1">Paper Submission Opens</p>
                    <p className="text-foreground/80">April 1, 2026</p>
                  </div>
                  <div>
                    <p className="font-bold text-primary mb-1">Submission Deadline</p>
                    <p className="text-foreground/80">August 15, 2026</p>
                  </div>
                  <div>
                    <p className="font-bold text-primary mb-1">Author Notification</p>
                    <p className="text-foreground/80">October 15, 2026</p>
                  </div>
                  <div>
                    <p className="font-bold text-primary mb-1">Conference Dates</p>
                    <p className="text-foreground/80">December 15-17, 2026</p>
                  </div>
                </div>
              </div>

              <div className="bg-primary/10 border border-primary/30 rounded-xl p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Ready to Submit?</h3>
                <p className="text-foreground/80 mb-6">
                  Download the paper template and submission guidelines to get started
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild>
                    <Link href="#download">Download Template</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/submission/author-guidelines">Author Guidelines</Link>
                  </Button>
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
