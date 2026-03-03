import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function AuthorGuidelines() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-primary text-primary-foreground py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4">Author Guidelines</h1>
          </div>
        </section>

        {/* Content */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold mb-6">Paper Preparation Guidelines</h2>

              <h3 className="text-2xl font-bold mb-4">Document Format</h3>
              <ul className="space-y-2 mb-8">
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>File Format: PDF only</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Page Size: A4 (210 × 297 mm)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Font: Times New Roman or similar serif font, 10-12pt</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Line Spacing: Single or 1.5</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Margins: 25mm on all sides</span>
                </li>
              </ul>

              <h3 className="text-2xl font-bold mb-4">Paper Structure</h3>
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-8">
                <ol className="space-y-4">
                  <li>
                    <strong className="text-primary">Title:</strong> Clear, concise, and informative (max 15 words)
                  </li>
                  <li>
                    <strong className="text-primary">Author Information:</strong> Name, affiliation, email
                  </li>
                  <li>
                    <strong className="text-primary">Abstract:</strong> 150-200 words summarizing the paper
                  </li>
                  <li>
                    <strong className="text-primary">Keywords:</strong> 4-6 relevant keywords
                  </li>
                  <li>
                    <strong className="text-primary">Introduction:</strong> Motivation and problem statement
                  </li>
                  <li>
                    <strong className="text-primary">Literature Review:</strong> Related work and contributions
                  </li>
                  <li>
                    <strong className="text-primary">Methodology:</strong> Proposed approach and methodology
                  </li>
                  <li>
                    <strong className="text-primary">Results:</strong> Experimental results and analysis
                  </li>
                  <li>
                    <strong className="text-primary">Conclusion:</strong> Summary and future work
                  </li>
                  <li>
                    <strong className="text-primary">References:</strong> Properly formatted citations
                  </li>
                </ol>
              </div>

              <h3 className="text-2xl font-bold mb-4">Length Requirements</h3>
              <ul className="space-y-2 mb-8">
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Regular Papers: 6-8 pages</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Short Papers: 4-5 pages</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Page count includes all figures, tables, and references</span>
                </li>
              </ul>

              <h3 className="text-2xl font-bold mb-4">Figures and Tables</h3>
              <ul className="space-y-2 mb-8">
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>All figures and tables must have captions</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Figures should be clear and legible</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Use standard formats (JPEG, PNG, PDF for images)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Avoid using colors that are hard to distinguish</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Minimum resolution: 300 dpi</span>
                </li>
              </ul>

              <h3 className="text-2xl font-bold mb-4">References</h3>
              <ul className="space-y-2 mb-8">
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Use IEEE citation style</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>All citations must be properly formatted</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Include DOI or URL for accessible references</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Minimum 15-20 relevant references required</span>
                </li>
              </ul>

              <h2 className="text-3xl font-bold mb-6 mt-12">Ethical Guidelines</h2>
              <ul className="space-y-2 mb-8">
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span><strong>Originality:</strong> Papers must be original and not under review elsewhere</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span><strong>Plagiarism:</strong> Zero tolerance for plagiarism and self-plagiarism</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span><strong>Author Names:</strong> Cannot be changed after submission</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span><strong>Conflicts of Interest:</strong> Disclose any financial or personal interests</span>
                </li>
              </ul>

              <h2 className="text-3xl font-bold mb-6 mt-12">Submission Checklist</h2>
              <div className="bg-muted/50 border border-border rounded-xl p-6">
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <input type="checkbox" className="w-5 h-5 text-primary flex-shrink-0" defaultChecked />
                    <span>Paper is in PDF format</span>
                  </div>
                  <div className="flex gap-3">
                    <input type="checkbox" className="w-5 h-5 text-primary flex-shrink-0" defaultChecked />
                    <span>Follows the paper template and guidelines</span>
                  </div>
                  <div className="flex gap-3">
                    <input type="checkbox" className="w-5 h-5 text-primary flex-shrink-0" defaultChecked />
                    <span>Contains proper title, authors, and affiliation</span>
                  </div>
                  <div className="flex gap-3">
                    <input type="checkbox" className="w-5 h-5 text-primary flex-shrink-0" defaultChecked />
                    <span>Has abstract (150-200 words) and keywords</span>
                  </div>
                  <div className="flex gap-3">
                    <input type="checkbox" className="w-5 h-5 text-primary flex-shrink-0" defaultChecked />
                    <span>All figures and tables have captions</span>
                  </div>
                  <div className="flex gap-3">
                    <input type="checkbox" className="w-5 h-5 text-primary flex-shrink-0" defaultChecked />
                    <span>References are properly formatted</span>
                  </div>
                  <div className="flex gap-3">
                    <input type="checkbox" className="w-5 h-5 text-primary flex-shrink-0" defaultChecked />
                    <span>Paper is original and not plagiarized</span>
                  </div>
                  <div className="flex gap-3">
                    <input type="checkbox" className="w-5 h-5 text-primary flex-shrink-0" defaultChecked />
                    <span>Checked for grammar and spelling errors</span>
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
