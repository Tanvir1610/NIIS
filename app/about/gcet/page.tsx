'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { GraduationCap, BookOpen, Award } from 'lucide-react';

export default function GCETAbout() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-primary text-primary-foreground py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4"> About GCET</h1>

          </div>
        </section>

        {/* Content */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold mb-6">About GCET</h2>
              <p className="text-lg text-foreground/80 mb-6 text-justify">
                Shri Gordhanbhai Hathibhai Patel, an eminent philanthropist of Gujarat, made a generous donation of Rupees Three Crores for the new college. In honour of this magnanimous gesture, the college has been named G H Patel College of Engineering and Technology, popularly known as GCET. GCET is managed by Charutar Vidya Mandal (CVM), a registered charitable trust established in 1945.
                <br></br><br></br>
                Since its inception the trust has been striving for the upliftment of rural society through education. This college was affiliated to Sardar Patel University from the year 1996 to 2008. Later on from the year 2008, Institute is affiliated to Gujarat Technological University. New admission from year 2020 is done under the Charutar Vidyamandal University.
              </p>

              {/* <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-foreground/80 mb-6">
                To provide high-quality engineering education that nurtures creativity, innovation, and leadership, enabling students to contribute meaningfully to society and the global technology community.
              </p> */}

              <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
              <p className="text-lg text-foreground/80 mb-6 text-justify">
                <i>"To produce engineering graduates who are globally competitive, live by set of core values, are able to accept any professional challenge thrown at them, and remain responsive to the needs of India and the humanity."</i>
              </p>

              <h2 className="text-3xl font-bold mb-6">Key Strengths</h2>
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-3">World-Class Faculty</h3>
                  <p>Experienced educators with advanced degrees from top international universities dedicated to mentoring the next generation.</p>
                </div>
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-3">Advanced Infrastructure</h3>
                  <p>State-of-the-art laboratories, computing facilities, and classrooms equipped with latest technologies.</p>
                </div>
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-3">Research Focus</h3>
                  <p>Strong emphasis on cutting-edge research in areas like AI, IoT, Robotics, and Intelligent Systems.</p>
                </div>
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-3">Industry Collaboration</h3>
                  <p>Partnerships with leading tech companies ensuring practical relevance and career opportunities for students.</p>
                </div>
              </div>

              <h2 className="text-3xl font-bold mb-6">Academic Programs</h2>
              <AcademicPrograms />

              <h2 className="text-3xl font-bold mb-6">Research Centers</h2>
              <div className="bg-muted/50 border border-border rounded-xl p-6 mb-8">
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <span className="text-accent">◆</span>
                    <span><strong>Center for AI & Machine Learning</strong> - Advancing intelligent systems</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent">◆</span>
                    <span><strong>IoT & Embedded Systems Lab</strong> - Smart device development</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent">◆</span>
                    <span><strong>Robotics Research Center</strong> - Autonomous systems and robotics</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent">◆</span>
                    <span><strong>Data Science Lab</strong> - Big data analytics and insights</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent">◆</span>
                    <span><strong>Cloud Computing Center</strong> - Infrastructure and services</span>
                  </li>
                </ul>
              </div>

              <h2 className="text-3xl font-bold mb-6">Why NIIS 2026 at GCET?</h2>
              <p className="text-lg text-foreground/80 mb-6">
                GCET's selection as the host institution for NIIS 2026 reflects its excellence in research, strong industry partnerships, and commitment to fostering innovation. The campus provides an ideal environment for bringing together global researchers and fostering meaningful interactions on integrated and intelligent systems.
              </p>

              <div className="bg-primary/10 border border-primary/30 rounded-xl p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Visit GCET</h3>
                <p className="text-lg text-foreground/80 mb-6">
                  Experience our campus and meet our faculty at NIIS 2026
                </p>
                <Button asChild size="lg">
                  <Link href="https://www.gcet.ac.in/index.php">Visit Official GCET Website</Link>
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

/* ================= ACADEMIC PROGRAMS ================= */
function AcademicPrograms() {
  const programs = [
    {
      id: 1,
      title: 'B.Tech Programs',
      icon: GraduationCap,
      programs: [
        'Chemical Engineering',
        'Information Technology',
        'Computer Science and Engineering (IoT)',
        'Mechanical Engineering',
        'Electronics & Communication',
        'Information & Communication Technology',
        'Mechatronics Engineering',
        'Computer Engineering',
        'Computer Science and Design',
        'Electrical Engineering',
        'Civil Engineering',
        'Applied Science & Humanities',
      ],
    },
    {
      id: 2,
      title: 'M.Tech Programs',
      icon: BookOpen,
      programs: [
        'Communication System Engineering',
        'Information Technology',
        'Industrial Engineering',
        'Mechatronics Engineering',
        'Electrical Engineering',
        'Embedded Systems',
        'Chemical Engineering',
        'Computer Engineering',
      ],
    },
    {
      id: 3,
      title: 'Diploma Programs',
      icon: Award,
      programs: [
        'Chemical',
        'IT',
        'Electrical',
        'Computer',
        'Mechatronics',
      ],
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {programs.map((program) => {
        const IconComponent = program.icon;

        return (
          <div
            key={program.id}
            className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col"
          >
            {/* Program Header */}
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <IconComponent className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground">
                    {program.title}
                  </h3>
                </div>
              </div>
            </div>

            {/* Program Content */}
            <div className="p-6 border-t border-border">
              <ul className="space-y-2">
                {program.programs.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-sm text-foreground/80"
                  >
                    <span className="text-accent font-bold mt-0.5 flex-shrink-0">
                      •
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}
