import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const tracks = [
  {
    name: 'Track 1: Integrated Systems in Energy, Communication & Sensing',
    coordinators: [
      { name: 'Will announce Soon....', institution: '' },
      // { name: 'Will announce Soon....', institution: '' }
    ]
  },
  {
    name: 'Track 2: Embedded Systems, IoT & Robotics',
    coordinators: [
      { name: 'Will announce Soon....', institution: '' },
      // { name: 'Prof. Vikram Singh', institution: 'NIT Warangal' },
      // { name: 'Dr. Anjali Sharma', institution: 'BITS Pilani' }
    ]
  },
  {
    name: 'Track 3: Artificial Intelligence & Computing',
    coordinators: [
      { name: 'Will announce Soon....', institution: '' },
      // { name: 'Dr. Suresh Kumar', institution: 'VIT Vellore' },
      // { name: 'Prof. Priya Gupta', institution: 'GCET' }
    ]
  },
  {
    name: 'Track 4: Secure & Emerging Technologies',
    coordinators: [
      { name: 'Will announce Soon....', institution: '' },
      // { name: 'Prof. Arjun Reddy', institution: 'IIIT Delhi' },
      // { name: 'Dr. Ananya Mishra', institution: 'NIT Rourkee' }
    ]
  },
  // {
  //   name: 'Track 5: Smart Systems & Applications',
  //   coordinators: [
  //     { name: 'Dr. Ramesh Babu', institution: 'GCET' },
  //     { name: 'Prof. Sneha Singh', institution: 'DTU Delhi' }
  //   ]
  // },
  // {
  //   name: 'Track 6: Cybersecurity & Privacy',
  //   coordinators: [
  //     { name: 'Prof. Deepak Sharma', institution: 'IIT Delhi' },
  //     { name: 'Dr. Kavya Krishnan', institution: 'IIIT Bangalore' }
  //   ]
  // },
];

export default function TrackCoordinators() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-primary text-primary-foreground py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4">Track Coordinators</h1>
          </div>
        </section>

        {/* Content */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 max-w-5xl">
            <p className="text-lg text-foreground/80 mb-12">
              Track Coordinators are responsible for managing paper submissions, organizing sessions, and ensuring the quality of presentations within their respective tracks.
            </p>

            <div className="space-y-8">
              {tracks.map((track, index) => (
                <div key={index} className="bg-card rounded-xl border border-border p-8">
                  <h3 className="text-2xl font-bold text-primary mb-6">{track.name}</h3>
                  <div className="space-y-4">
                    {track.coordinators.map((coordinator, i) => (
                      <div key={i} className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-muted/30 rounded-lg p-4">
                        <div>
                          <p className="font-semibold text-lg">{coordinator.name}</p>
                          <p className="text-sm text-foreground/70">{coordinator.institution}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
