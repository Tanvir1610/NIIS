import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const keynoteSpeakers = [
  {
    name: 'Prof.(Dr.) Devesh Jinwala',
    // title: 'Professor, Computer Engineering Department, SVNIT',
    title: 'Professor, SVNIT',
    image: 'keynoteImgs/devesh.jpeg',
    bio: 'Pioneering research in AI and human-centered artificial intelligence. Leading expert on machine learning and its societal impact.',
    topic: 'to be announced'
  },
  {
    name: 'Dr Sharnil Pandya',
    // title: 'Professor, Computer and Information Sciences, Northumbria University',
    title: 'Professor, Northumbria University',
    image: 'TecnicalImgs/sharnil.jpg',
    bio: 'Turing Award winner and pioneer of deep learning. Renowned for contributions to neural networks and computer vision.',
    topic: 'to be announced'
  },
];

const expertSpeakers = [
  {
    name: 'Dr. Rahul Pandya',
    // title: 'Professor, Electronics and Communication Engineering, IIT Dharwad',
    title: 'Professor, IIT Dharwad',
    image: 'keynoteImgs/Rahul_Pandya.jpg',
    bio: 'Expert in AI ethics and bias. Advocating for responsible AI development and diverse perspectives in technology.',
    topic: 'to be announced'
  },
];

export default function KeynoteSpeakers() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-primary text-primary-foreground py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4">Keynote Speakers</h1>
          </div>
        </section>

        {/* Content */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 max-w-6xl">
            <p className="text-lg text-foreground/80 mb-12 text-center max-w-3xl mx-auto">
              NIIS 2026 features distinguished keynote speakers from leading institutions and companies worldwide. These visionary leaders will share insights on cutting-edge developments in integrated and intelligent systems.
            </p>

            <div className="space-y-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-center text-foreground">Keynote Speakers</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {keynoteSpeakers.map((speaker, index) => (
                    <div key={"k-" + index} className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center w-full">
                        <img
                          src={speaker.image ?? 'https://via.placeholder.com/400x400?text=Photo'}
                          alt={`${speaker.name} photo`}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-primary mb-2">{speaker.name}</h3>
                        <p className="text-sm font-semibold text-accent mb-3">{speaker.title}</p>
                        <p className="text-foreground/70 text-sm mb-4">{speaker.bio}</p>
                        <div className="bg-primary/10 rounded-lg p-3 border border-primary/20">
                          <p className="text-sm font-semibold text-primary">
                            <span className="font-bold">Topic: </span>{speaker.topic}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-center text-foreground">Expert Speakers</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {expertSpeakers.map((speaker, index) => (
                    <div key={"e-" + index} className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center w-full">
                        <img
                          src={speaker.image ?? 'https://via.placeholder.com/400x400?text=Photo'}
                          alt={`${speaker.name} photo`}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-primary mb-2">{speaker.name}</h3>
                        <p className="text-sm font-semibold text-accent mb-3">{speaker.title}</p>
                        <p className="text-foreground/70 text-sm mb-4">{speaker.bio}</p>
                        <div className="bg-primary/10 rounded-lg p-3 border border-primary/20">
                          <p className="text-sm font-semibold text-primary">
                            <span className="font-bold">Topic: </span>{speaker.topic}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
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
