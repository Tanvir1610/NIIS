import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NIIS2026About() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-primary text-primary-foreground py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4">About NIIS 2026</h1>
          </div>
        </section>
        
        {/* Content */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold mb-6">Conference Overview</h2>
              <p className="text-lg text-foreground/80 mb-6 text-justify">
                NIIS (International Conference on Next-Gen Integrated and Intelligent Systems) is a premier platform dedicated to showcasing cutting-edge research and innovations in the field of integrated and intelligent systems. The conference brings together academics, researchers, industry professionals, and technology leaders from around the world.
              </p>

              <h2 className="text-3xl font-bold mb-6 mt-12">Scope and Objectives</h2>
              <ul className="space-y-4 mb-8">
                <li className="flex gap-4">
                  <span className="text-accent font-bold">•</span>
                  <span>To provide a forum for researchers to present and discuss latest advancements in integrated and intelligent systems</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-accent font-bold">•</span>
                  <span>To foster collaboration between academia and industry in developing next-generation systems</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-accent font-bold">•</span>
                  <span>To exchange knowledge and experiences among professionals from diverse backgrounds</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-accent font-bold">•</span>
                  <span>To identify future research directions and emerging challenges in the field</span>
                </li>
              </ul>

              <h2 className="text-3xl font-bold mb-6">Why NIIS 2026?</h2>
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-3">Global Community</h3>
                  <p>Connect with leading researchers and professionals from more than 50 countries worldwide.</p>
                </div>
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-3">Quality Research</h3>
                  <p>Rigorous peer-review process ensuring only high-quality research papers are presented.</p>
                </div>
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-3">Networking</h3>
                  <p>Extensive networking opportunities, social events, and collaborative sessions.</p>
                </div>
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-3">Publication</h3>
                  <p>Papers published in prestigious journals and indexed in major databases.</p>
                </div>
              </div>

              <h2 className="text-3xl font-bold mb-6">Key Features</h2>
              <ul className="space-y-4 mb-8">
                <li className="flex gap-4">
                  <span className="text-accent font-bold">✓</span>
                  <span><strong>Keynote Presentations:</strong> Renowned experts sharing insights on emerging trends</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-accent font-bold">✓</span>
                  <span><strong>Technical Sessions:</strong> Parallel sessions covering diverse research areas</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-accent font-bold">✓</span>
                  <span><strong>Workshops:</strong> Hands-on sessions on latest technologies and methodologies</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-accent font-bold">✓</span>
                  <span><strong>Panel Discussions:</strong> Interactive sessions with industry leaders</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-accent font-bold">✓</span>
                  <span><strong>Poster Sessions:</strong> Interactive presentation of research work</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-accent font-bold">✓</span>
                  <span><strong>Networking Events:</strong> Informal gatherings to build connections</span>
                </li>
              </ul>

              <h2 className="text-3xl font-bold mb-6">Conference Details</h2>
              <div className="bg-muted/50 border border-border rounded-xl p-6 mb-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-bold text-primary mb-2">Dates</h3>
                    <p className="text-foreground/80">November 5-6, 2026</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-primary mb-2">Venue</h3>
                    <p className="text-foreground/80">GCET, Gujarat, India</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-primary mb-2">Expected Attendees</h3>
                    <p className="text-foreground/80">500+ researchers and professionals</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-primary mb-2">Paper Deadline</h3>
                    <p className="text-foreground/80">March 1, 2026</p>
                  </div>
                </div>
              </div>

              <div className="bg-primary/10 border border-primary/30 rounded-xl p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Ready to Participate?</h3>
                <p className="text-lg text-foreground/80 mb-6">
                  Submit your research paper and be part of NIIS 2026
                </p>
                <Button asChild size="lg">
                  <Link href="/submission/call-for-papers">Submit Your Paper</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
