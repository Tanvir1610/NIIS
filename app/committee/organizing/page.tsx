import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

interface CommitteeMember {
  name: string;
  role: string;
  institution?: string;
  location?: string;
  category: string;
  image: string;
  large?: boolean;
}

const organizingMembers: CommitteeMember[] = [
  // Chief Patron
  {
    category: 'Chief Patron',
    name: 'Er. Shri Bhikhubhai B. Patel',
    role: 'President, CVMU',
    institution: 'Chairman, CVM',
    location: 'Vallabh Vidyanagar',
    image: '/OrganizingImgs/Bikhubhai.jpeg',
    large: true,
  },

  // Patrons
  {
    category: 'Patrons',
    name: 'Shri Manishbhai S. Patel',
    role: 'Vice President',
    institution: 'Charutar Vidya Mandal',
    image: '/OrganizingImgs/ManishBhai.jpeg',
  },
  {
    category: 'Patrons',
    name: 'Dr. S. G. Patel',
    role: 'Hon. Secretary',
    institution: 'Charutar Vidya Mandal',
    image: '/OrganizingImgs/Dr. S. G. Patel.jpg',
  },
  {
    category: 'Patrons',
    name: 'Shri Ramesh Talati',
    role: 'Hon. Jt. Secretary',
    institution: 'Charutar Vidya Mandal',
    image: '/OrganizingImgs/rct.jpg',
  },
  {
    category: 'Patrons',
    name: 'Shri Mehul D. Patel',
    role: 'Hon. Jt. Secretary',
    institution: 'Charutar Vidya Mandal',
    image: '/OrganizingImgs/mdp.jpg',
  },
  {
    category: 'Patrons',
    name: 'Shri Vishal H. Patel',
    role: 'Hon. Jt. Secretary',
    institution: 'Charutar Vidya Mandal',
    image: '/OrganizingImgs/vhp.jpg',
  },

  // Advisors
  {
    category: 'Advisors',
    name: 'Prof. (Dr.) Indrajit Patel',
    role: 'Provost',
    institution: 'CVM University',
    image: '/OrganizingImgs/Indrajit Patel.jpg',
  },
  {
    category: 'Advisors',
    name: 'Dr. Sandeep Walia',
    role: 'Registrar',
    institution: 'CVM University',
    image: '/OrganizingImgs/registrar.png',
  },

  // Conference Chairs
  {
    category: 'Conference Chairs',
    name: 'Dr. Amit Ganatra',
    role: 'Director (Dean) R&D, Dean FET',
    institution: 'CVM University',
    image: '/OrganizingImgs/Amit-Ganatra.png',
    large: true,
  },
  {
    category: 'Conference Chairs',
    name: 'Dr. Kaushik Nath',
    role: 'Principal',
    institution: 'GCET',
    image: '/OrganizingImgs/kaushik_nath.jpg',
    large: true,
  },

  // Conveners
  {
    category: 'Conveners',
    name: 'Dr. Bhaskar Thakker',
    role: 'Professor & Head, EC Dept',
    institution: 'GCET',
    image: '/OrganizingImgs/Bhaskar Thakkar.jpg',
  },
  {
    category: 'Conveners',
    name: 'Dr. Priyang Bhatt',
    role: 'Associate Professor, CP Dept',
    institution: 'GCET',
    image: '/OrganizingImgs/Priyang-Bhatt.png',
  },
];

export default function OrganizingCommittee() {
  const categories = [
    'Chief Patron',
    'Patrons',
    'Advisors',
    'Conference Chairs',
    'Conveners',
  ];

  return (
    <>
      <Header />

      <main>
        {/* Hero */}
        <section className="bg-primary text-primary-foreground py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4">Organizing Committee</h1>
          </div>
        </section>

        {/* Content */}
        <section className="py-20 md:py-32 bg-muted/30">
          <div className="container mx-auto px-4 max-w-6xl">
            {categories.map((category) => {
              const members = organizingMembers.filter(
                (m) => m.category === category
              );

              if (!members.length) return null;

              return (
                <div key={category} className="mb-20">
                  <h2 className="text-3xl font-bold mb-10 text-center">
                    <span className="text-accent">{category}</span>
                  </h2>

                  <div
                    className={`grid gap-8 ${
                      category === 'Chief Patron'
                        ? 'grid-cols-1 max-w-md mx-auto'
                        : category === 'Patrons'
                        ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                        : 'grid-cols-1 sm:grid-cols-2'
                    }`}
                  >
                    {members.map((member, index) => (
                      <div
                        key={index}
                        className={`bg-white rounded-xl border border-border text-center p-8 hover:shadow-lg transition ${
                          member.large ? 'py-10' : ''
                        }`}
                      >
                        {/* Image */}
                        <div
                          className={`mx-auto mb-5 overflow-hidden rounded-full border-4 border-accent ${
                            member.large ? 'w-40 h-40' : 'w-32 h-32'
                          }`}
                        >
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Info */}
                        <h3 className="text-lg font-bold mb-1">
                          {member.name}
                        </h3>
                        <p className="text-accent font-semibold">
                          {member.role}
                        </p>
                        {member.institution && (
                          <p className="text-sm text-foreground/70">
                            {member.institution}
                          </p>
                        )}
                        {member.location && (
                          <p className="text-sm text-foreground/60">
                            {member.location}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
