import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

interface CommitteeMember {
  name: string;
  position?: string;
  institution?: string;
  location?: string;
  category: 'International' | 'National';
  image: string;
}

const members: CommitteeMember[] = [
  // ================= INTERNATIONAL =================
  {
    category: 'International',
    name: 'Prof. Valentina Balas',
    position: 'Professor, Aurel Vlaicu University of Arad',
    location: 'Academy of Romanian Scientists, Romania',
    image: '/TecnicalImgs/valentina.jpg',
  },
  {
    category: 'International',
    name: 'Dr. Kalpdrum Passi',
    position: 'Laurentian University',
    location: 'Ontario, Canada',
    image: '/TecnicalImgs/Kalpdrum_Passi.png',
  },
  {
    category: 'International',
    name: 'Dr Sharnil Pandya',
    position: 'Computer and Information Sciences',
    location: 'Northumbria University',
    image: '/TecnicalImgs/sharnil.jpg',
  },
  {
    category: 'International',
    name: 'Dr. Chintan Modi',
    position: 'Fanshawe College',
    location: 'Canada',
    image: '/TecnicalImgs/chintanmodi.jpg',
  },
  {
    category: 'International',
    name: 'Dr Sathishkumar V. Easwaramoorthy',
    position: 'Senior Lecturer',
    location: 'Sunway University, Malaysia',
    image: '/TecnicalImgs/sathishkumar.jpg',
  },
  {
    category: 'International',
    name: 'Dr. Kiran Trivedi',
    position: 'Associate Professor',
    location: 'University of Wollongong, Australia',
    image: '/TecnicalImgs/Kiran.jpg',
  },
  {
    category: 'International',
    name: 'Dr. Nilanjan Dey',
    position: 'Visiting Fellow',
    location: 'University of Reading, UK',
    image: '/TecnicalImgs/Nilanjan.jpg',
  },
  {
    category: 'International',
    name: 'Dr. Chintan Bhatt',
    position: 'Assistant Professor',
    location: 'University of Wollongong, Australia : India',
    image: '/TecnicalImgs/Chintan-bhatt.jpg',
  },

  // ================= NATIONAL =================
  {
    category: 'National',
    name: 'Dr. Lalit Mohan Patnaik',
    location: 'IISc Bangalore',
    image: '/TecnicalImgs/Lalit.png',
  },
  {
    category: 'National',
    name: 'Dr. Rajeeb Dey',
    position: 'Associate Professor',
    location: 'NIT Silchar',
    image: '/TecnicalImgs/Rajeeb.jpg',
  },
  {
    category: 'National',
    name: 'Dr. Mehul Raval',
    position: 'Professor',
    location: 'Ahmedabad University',
    image: '/TecnicalImgs/Mehul-Raval.jpg',
  },
  {
    category: 'National',
    name: 'Prof. (Dr.) Devesh Jinwala',
    position: 'Professor',
    location: 'SVNIT, Surat',
    image: '/keynoteImgs/devesh.jpeg',
  },
  {
    category: 'National',
    name: 'Dr. Kishor Sarawadekar',
    position: 'Associate Professor',
    location: 'IIT (BHU), Varanasi',
    image: '/TecnicalImgs/Kirshor.jpg',
  },
  {
    category: 'National',
    name: 'Prof. Daval Pujara',
    position: 'Professor',
    location: 'School of Technology, PDPU',
    image: '/TecnicalImgs/Daval-Pujara.jpg',
  },
  {
    category: 'National',
    name: 'Dr. Chirag Paunwala',
    position: 'Professor',
    location: 'SCET, Surat',
    image: '/TecnicalImgs/chirag.jpg',
  },
  {
    category: 'National',
    name: 'Dr. Deepak Mishra',
    position: 'Space Application Center (SAC)',
    location: 'ISRO',
    image: '/TecnicalImgs/Deepak-Mishra.jpg',
  },
  {
    category: 'National',
    name: 'Dr. Satish Chetwani',
    position: 'Director',
    location: 'Electrical Research & Development Association',
    image: '/TecnicalImgs/Satish-Chetwani.jpg',
  },
  {
    category: 'National',
    name: 'Dr. Sameer Kulkarni',
    position: 'SVP at Decimal Point Analytics',
    location: 'Ex-Indian Air Force Leader',
    image: '/TecnicalImgs/sameer-kulkarni.jpg',
  },
  {
    category: 'National',
    name: 'Prof. Jayesh Pabari',
    location: 'Physical Research Laboratory',
    image: '/TecnicalImgs/Jayesh.jpg',
  },
  {
    category: 'National',
    name: 'Prof. Priyesh Chauhan',
    position: 'Assistant Professor',
    location: 'IIT-RAM Gandhinagar',
    image: '/TecnicalImgs/PriyeshChauhan.jpg',
  },
  {
    category: 'National',
    name: 'Dr. Rahul Pandya',
    position: 'Professor',
    location: 'IIT Dharwad',
    image: '/keynoteImgs/Rahul_Pandya.jpg',
  },
  {
    category: 'National',
    name: 'Prof. Anand Darji',
    position: 'Professor',
    location: 'SVNIT, Surat',
    image: '/TecnicalImgs/anand-darji.jpg',
  },
  {
    category: 'National',
    name: 'Dr. Omar Farooq',
    position: 'Professor',
    location: 'ZH College of Engineering and Technology, AMU',
    image: '/TecnicalImgs/omar-farooq.jpg',
  },
  {
    category: 'National',
    name: 'Dr. Satyabrata Roy',
    position: 'Associate Professor',
    location: 'Manipal University Jaipur, India',
    image: '/TecnicalImgs/Satyabrata-Roy.jpg',
  },
  {
    category: 'National',
    name: 'Dr. Kaushal Desai',
    position: 'Professor',
    location: 'IIT Jodhpur',
    image: '/TecnicalImgs/Kaushal.png',
  },
];

export default function TechnicalCommittee() {
  const international = members.filter(m => m.category === 'International');
  const national = members.filter(m => m.category === 'National');

  return (
    <>
      <Header />

      <main>
        {/* Hero */}
        <section className="bg-primary text-primary-foreground py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4">
              Technical Advisory Committee
            </h1>
          </div>
        </section>

        {/* Content */}
        <section className="py-20 md:py-32 bg-muted/30">
          <div className="container mx-auto px-4 max-w-6xl">

            {/* International */}
            <Section title="International Committee" members={international} />

            {/* National */}
            <Section title="National Committee" members={national} />

          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

/* ---------- Reusable Section ---------- */
function Section({
  title,
  members,
}: {
  title: string;
  members: CommitteeMember[];
}) {
  return (
    <div className="mb-24">
      <h2 className="text-3xl font-bold mb-10 text-center">
        <span className="text-accent">{title}</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {members.map((m, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-border p-8 text-center hover:shadow-lg transition"
          >
            <div className="w-28 h-28 mx-auto mb-5 rounded-full overflow-hidden border-4 border-accent">
              <img src={m.image} alt={m.name} className="w-full h-full object-cover" />
            </div>

            <h3 className="text-sm font-bold mb-1">{m.name}</h3>

            {m.position && (
              <p className="text-xs text-accent font-semibold mb-1">
                {m.position}
              </p>
            )}

            {m.location && (
              <p className="text-xs text-foreground/70">{m.location}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
