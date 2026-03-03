import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function SubmissionGuidelines() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-primary text-primary-foreground py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4">Submission Guidelines</h1>
          </div>
        </section>

        {/* Content */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold mb-6">Submission Portal</h2>
              <p className="text-foreground/80 mb-6">
                Papers must be submitted through the EasyChair submission portal. Follow these steps to submit your work:
              </p>

              <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-8">
                <ol className="space-y-3">
                  <li>
                    <strong>Step 1: Create Account</strong><br />
                    Visit the EasyChair portal and create an account if you don't have one
                  </li>
                  <li>
                    <strong>Step 2: Select Conference</strong><br />
                    Choose NIIS 2026 from the conference list
                  </li>
                  <li>
                    <strong>Step 3: Enter Paper Details</strong><br />
                    Fill in title, abstract, keywords, and author information
                  </li>
                  <li>
                    <strong>Step 4: Upload Paper</strong><br />
                    Upload your PDF file in the correct format
                  </li>
                  <li>
                    <strong>Step 5: Submit</strong><br />
                    Review your submission and click submit
                  </li>
                  <li>
                    <strong>Step 6: Confirmation</strong><br />
                    Receive confirmation email with submission details
                  </li>
                </ol>
              </div>

              <h2 className="text-3xl font-bold mb-6">Paper Templates</h2>
              <p className="text-foreground/80 mb-6">
                Download the official NIIS 2026 paper template:
              </p>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-bold text-primary mb-2">Microsoft Word Template</h3>
                  <p className="text-sm text-foreground/70 mb-4">
                    Download the template in Microsoft Word format (.docx)
                  </p>
                  <button className="text-primary hover:text-primary/80 font-semibold">
                    Download (.docx)
                  </button>
                </div>
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-bold text-primary mb-2">LaTeX Template</h3>
                  <p className="text-sm text-foreground/70 mb-4">
                    Download the template in LaTeX format (.tex)
                  </p>
                  <button className="text-primary hover:text-primary/80 font-semibold">
                    Download (.tex)
                  </button>
                </div>
              </div>

              <h2 className="text-3xl font-bold mb-6">Manuscript Evaluation Criteria</h2>
              <div className="space-y-4 mb-8">
                <div className="bg-accent/5 border border-accent/20 rounded-xl p-6">
                  <h3 className="font-bold text-accent mb-2">Technical Quality (40%)</h3>
                  <p className="text-foreground/80">
                    Rigor of the research, correctness of methodology, appropriate use of techniques
                  </p>
                </div>
                <div className="bg-accent/5 border border-accent/20 rounded-xl p-6">
                  <h3 className="font-bold text-accent mb-2">Originality & Significance (30%)</h3>
                  <p className="text-foreground/80">
                    Novel contributions to the field and potential impact on research and practice
                  </p>
                </div>
                <div className="bg-accent/5 border border-accent/20 rounded-xl p-6">
                  <h3 className="font-bold text-accent mb-2">Clarity & Presentation (20%)</h3>
                  <p className="text-foreground/80">
                    Clear writing, well-organized structure, effective use of figures and tables
                  </p>
                </div>
                <div className="bg-accent/5 border border-accent/20 rounded-xl p-6">
                  <h3 className="font-bold text-accent mb-2">Relevance to NIIS (10%)</h3>
                  <p className="text-foreground/80">
                    Alignment with conference scope and topics
                  </p>
                </div>
              </div>

              <h2 className="text-3xl font-bold mb-6">Review Process</h2>
              <div className="bg-muted/50 border border-border rounded-xl p-6 mb-8">
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="text-3xl font-bold text-primary flex-shrink-0">1</div>
                    <div>
                      <h3 className="font-bold mb-1">Initial Screening</h3>
                      <p className="text-foreground/70">Submitted papers are checked for scope and basic requirements</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-3xl font-bold text-primary flex-shrink-0">2</div>
                    <div>
                      <h3 className="font-bold mb-1">Peer Review</h3>
                      <p className="text-foreground/70">Each paper is reviewed by 2-3 expert reviewers (double-blind process)</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-3xl font-bold text-primary flex-shrink-0">3</div>
                    <div>
                      <h3 className="font-bold mb-1">Decision</h3>
                      <p className="text-foreground/70">Track chairs make final decision based on reviewer feedback</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-3xl font-bold text-primary flex-shrink-0">4</div>
                    <div>
                      <h3 className="font-bold mb-1">Notification</h3>
                      <p className="text-foreground/70">Authors are notified of acceptance or required revisions</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-3xl font-bold text-primary flex-shrink-0">5</div>
                    <div>
                      <h3 className="font-bold mb-1">Camera-Ready</h3>
                      <p className="text-foreground/70">Accepted papers submitted in final form for publication</p>
                    </div>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold mb-6">Important Notes</h2>
              <ul className="space-y-3 mb-8">
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Submissions must be in English only</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Authors should not identify themselves in the paper (for blind review)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Papers are checked for plagiarism using automated tools</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>At least one author must register for the conference to present</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Accepted papers will be published in the conference proceedings</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Selected papers may be recommended for journal publication</span>
                </li>
              </ul>

              <div className="bg-primary/10 border border-primary/30 rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
                <p className="text-foreground/80 mb-4">
                  For submission-related questions, please contact:
                </p>
                <div className="space-y-2">
                  <p><strong>Email:</strong> submissions@niis2026.com</p>
                  <p><strong>Phone:</strong> +91 9999 999 999</p>
                  <p><strong>Website:</strong> www.niis2026.com</p>
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
