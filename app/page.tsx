'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import FlyerModal from '@/components/FlyerModal';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Calendar, Users, MapPin, Zap, Cpu, Brain, Shield } from 'lucide-react';
import { CountdownTimer } from '@/components/CountdownTimer';

export default function Home() {
  return (
    <>
      <Header />
      <FlyerModal />

      <main>
        {/* ================= HERO SECTION ================= */}
        <section className="relative text-white py-16 md:py-28 overflow-hidden">
          {/* Background Slideshow */}
          <HeroSlideshow />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/60 z-10" />

          {/* Content */}
          <div className="relative z-20 container mx-auto px-4">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
              <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                <Calendar className="w-4 h-4 inline mr-2" />
                November 5 - November 6, 2026
              </div>

              <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
                Next-Gen Integrated and Intelligent Systems
              </h1>

              <p className="text-lg opacity-90 mb-8 max-w-2xl">
                Join us for NIIS 2026, a premier international conference bringing
                together researchers, industry professionals, and technology
                leaders to discuss cutting-edge innovations.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
                  <Link href="/submission/call-for-papers">Call for Papers</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 bg-transparent"
                >
                  <Link href="/keynote-speakers">Keynote Speakers</Link>
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-6 w-full max-w-3xl">
                <CountdownTimer />

                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin className="w-5 h-5" />
                    <h3 className="font-semibold text-sm">Venue</h3>
                  </div>
                  <p className="text-sm opacity-90">GCET, Gujarat, India</p>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                  <div className="flex items-center gap-3 mb-2">
                    <Users className="w-5 h-5" />
                    <h3 className="font-semibold text-sm">Attendees</h3>
                  </div>
                  <p className="text-sm opacity-90">1000+ Researchers</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= ABOUT SECTION ================= */}
        <section className="py-12 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div>
                <span className="text-accent font-semibold text-sm">ABOUT CONFERENCE</span>
                <h2 className="text-4xl font-bold mt-3 mb-6">About NIIS 2026</h2>
                <p className="text-lg text-foreground/80 mb-6 text-justify">
                  The International Conference on Next-Gen Integrated and Intelligent Systems (NIIS 2026) aims to bring together researchers, academicians, industry professionals, and policymakers to share their innovative ideas and research in the domains of Electronics, VLSI, Embedded Systems, AI/ML, IoT, Cyber-Physical Systems, and Smart Networks.
                <br></br><br></br>
                  Aligned with national missions like Semicon India, Digital India, and Atmanirbhar Bharat, this conference promotes indigenous innovation and future-ready technology development in intelligent systems and integrated electronic solutions.
                </p>

                {/* <ul className="space-y-3 mb-8">
                  {[
                    'Cutting-edge research presentations from global experts',
                    'Interactive workshops and tutorials on emerging technologies',
                    'Networking opportunities with industry leaders',
                    'Published papers in high-impact journals',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-accent font-bold mt-1">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul> */}

                <Button asChild>
                  <Link href="/about/niis2026">Learn More</Link>
                </Button>
              </div>

              <div className="rounded-xl overflow-hidden bg-white border border-border shadow-md">
                <LatestNewsSection />
              </div>
            </div>
          </div>
        </section>

        {/* ================= TRACKS SECTION ================= */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Conference Tracks</h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                Discover the diverse range of topics covered at NIIS 2026, from AI and IoT to VLSI and Cyber-Physical Systems.
              </p>
            </div>

            <ConferenceTracks />
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="bg-primary text-white py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Participate?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Submit your research paper to NIIS 2026 and join the global community
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
                <Link href="/submission/call-for-papers">Submit Paper</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-blue text-white hover:bg-white-100-text-blue">
                <Link href="/registration/conference">Register Now</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

/* ================= HERO SLIDESHOW ================= */
function HeroSlideshow() {
  const images = [
    '/SDSTDImgs/sdstd1.jpg',
    '/SDSTDImgs/sdstd2.jpg',
    '/SDSTDImgs/sdstd3.jpg',
    '/SDSTDImgs/sdstd4.jpg',
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            index === current ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}
    </div>
  );
}

/* ================= LATEST NEWS SECTION ================= */
function LatestNewsSection() {
  const ITEM_HEIGHT = 100; // Height of each news item in pixels
  const TOTAL_ITEMS = 6;
  const SCROLL_DURATION = 24; // Total duration for one complete cycle in seconds

  const newsItems = 
    [
    {
      id: 1,
      date: 'Feb 14, 2026',
      title: 'Conference Dates Confirmed – Nov 5-6, 2026',
      description: 'NIIS 2026 will be held on 5–6 November 2026. Save the dates and plan your participation.',
    },
    {
      id: 2,
      date: 'Feb 14, 2026',
      title: 'Submission Deadline – June 30',
      description: 'All paper submissions must be completed by 30th June. No late entries will be considered.',
    },
    {
      id: 3,
      date: 'Feb 14, 2026',
      title: 'Acceptance Notification – Aug 1',
      description: 'Authors will receive paper acceptance decisions on 1st August 2026.',
    },
    {
      id: 4,
      date: 'Feb 14, 2026',
      title: 'Early Registration Opens – Aug 20',
      description: 'Early registration starts on 20th August. Register early to secure your spot.',
    },
    {
      id: 5,
      date: 'Feb 14, 2026',
      title: 'Publisher Announcement Soon',
      description: 'The official conference publisher details will be announced shortly.',
    },
    {
      id: 6,
      date: 'Feb 14, 2026',
      title: 'Contact Conveners for Queries',
      description: 'For any issues or clarifications, reach out directly to the conference conveners.',
    },
  ];


  // Create animation keyframes
  const scrollAnimation = `
    @keyframes newsScroll {
      0% {
        transform: translateY(0);
      }
      100% {
        transform: translateY(-${TOTAL_ITEMS * ITEM_HEIGHT}px);
      }
    }
  `;

  return (
    <div className="flex flex-col h-[400px]">
      <style>{scrollAnimation}</style>
      
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/90 text-white px-6 py-4 border-b border-border shrink-0">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-accent animate-pulse"></span>
          Latest News
        </h3>
      </div>

      {/* News Content */}
      <div className="flex-1 overflow-hidden relative bg-white">
        <div
          className="h-full"
          style={{
            animation: `newsScroll ${SCROLL_DURATION}s linear infinite`,
          }}
        >
          {/* Duplicate items for seamless looping */}
          {[...newsItems, ...newsItems].map((item, index) => (
            <div 
              key={index} 
              className="px-6 py-4 border-b border-border/50 flex flex-col justify-center hover:bg-muted/50 transition-colors"
              style={{ height: `${ITEM_HEIGHT}px` }}
            >
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                  {item.date}
                </span>
              </div>
              <h4 className="text-sm font-bold text-foreground leading-tight line-clamp-2">
                {item.title}
              </h4>
              <p className="text-xs text-foreground/60 line-clamp-1 mt-0.5">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Fade Effects - Top */}
        <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-white via-white to-transparent pointer-events-none z-20"></div>
        {/* Fade Effects - Bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white via-white to-transparent pointer-events-none z-20"></div>
      </div>

      {/* Footer Info */}
      <div className="bg-muted/40 px-6 py-3 border-t border-border text-center shrink-0">
        <p className="text-xs text-foreground/60 font-medium">Stay tuned for news!</p>
      </div>
    </div>
  );
}

/* ================= CONFERENCE TRACKS ================= */
function ConferenceTracks() {
  const tracks = [
    {
      id: 1,
      title: 'Integrated Systems in Energy, Communication & Sensing',
      icon: Zap,
      items: [
        'Optical & Microwave Communication',
        'Satellite Communication Systems',
        'Antenna Design & RF Propagation',
        'Wireless Power Transfer and Energy Harvesting',
        'Terahertz and Millimeter-Wave Communication',
        'VLSI Design and Semiconductor Technologies',
        'Nanoelectronics and Organic Electronics',
        'System-on-Chip (SoC) and Lab-on-Chip Designs',
        'MEMS/NEMS and Sensor Design',
        'Biomedical Instrumentation & Biosensors',
        'IoT-Enabled Sensor Networks',
        'Electric Vehicles and Battery Management Systems (BMS)',
        'Solar Energy Systems and Photovoltaics',
        'Smart Grid Technologies and Microgrids',
        'Power Electronics and Energy Conversion Systems',
        'Electric Drives and Motor Control Systems',
        'Renewable Energy Integration and Control',
        'HVDC and FACTS in Power Systems',
        'Wireless Charging Technologies',
        'EMI/EMC in Power and Communication Systems',
        'Control Systems for Energy and Industrial Applications',
        'Sustainable and Green Electronics',
        'Electromagnetic Interference & Compatibility (EMI/EMC)',
        'High-Frequency Circuit Design',
        'Radar and Remote Sensing Technologies',
      ],
    },
    {
      id: 2,
      title: 'Embedded Systems, IoT & Robotics',
      icon: Cpu,
      items: [
        'Embedded Systems Design and Optimization',
        'Real-Time and Safety-Critical Embedded Systems',
        'Wireless Sensor Networks (WSN) and Protocols',
        'Low-Power and Energy-Harvesting Sensor Networks',
        'Mobile Ad-hoc Networks (MANETs) and Routing Protocols',
        'Vehicular Ad-hoc Networks (VANETs) and Intelligent Transportation Systems',
        'Underwater and Under-Ice Communication Networks',
        'Internet of Things (IoT) Architectures, Protocols, and Standards',
        'IoT Security and Privacy Issues',
        'Fog, Edge, and Cloud Integration for IoT Systems',
        'Robotics: Autonomous Robots and Human-Robot Interaction',
        'Industrial Robotics and Industry 5.0 Applications',
        'Automation in Manufacturing and Process Control',
        'Control Systems: Adaptive, Robust, and Predictive Control',
        'Intelligent Networking: Software Defined Networks (SDN) for IoT',
        'Communication Systems for Low-Latency and High Reliability',
        'Wearable Health Monitoring Devices and Remote Patient Monitoring',
        'Cyber-Physical Systems (CPS) and Digital Twins',
        'Sensor Fusion and Multimodal Data Processing',
        'AI and Machine Learning in Embedded and Networked Systems',
        'Smart Cities: IoT and Networked Automation',
        'Network Security for Embedded and IoT Systems',
        'Cooperative and Swarm Robotics',
        'Autonomous Vehicles and Drone Networks',
        'Wireless Power Transfer in Sensor and Embedded Networks',
      ],
    },
    {
      id: 3,
      title: 'Artificial Intelligence & Computing',
      icon: Brain,
      items: [
        'Artificial Intelligence (AI), Machine Learning (ML), and Deep Learning (DL)',
        'Explainable AI (XAI) and Responsible AI',
        'Natural Language Processing (NLP) and Language Models',
        'Generative AI and Foundation Models',
        'Reinforcement Learning and Adaptive Systems',
        'Transfer Learning and Few-shot Learning',
        'Data Analytics and Predictive Modeling',
        'Big Data Processing and Scalable AI Architectures',
        'Time Series Analysis and Forecasting',
        'Computer Vision and Pattern Recognition',
        'Image & Video Processing and Compression Techniques',
        '3D Image Reconstruction and Object Detection',
        'Fuzzy Logic and Hybrid Intelligent Systems',
        'Evolutionary Algorithms and Swarm Intelligence',
        'Neuro-Fuzzy and Genetic Algorithms',
        'Signal Processing for AI and Communications',
        'Audio and Speech Processing',
        'Cognitive Radio Networks and Dynamic Spectrum Access',
        'Brain-Computer Interface (BCI) Systems',
        'Human-Centered AI and Affective Computing',
        'Cognitive Modeling and Neural Computation',
        'Computational Neuroscience and Neural Signal Analysis',
        'Bio-Informatics and Genomic Signal Processing',
        'Biomedical Signal and Image Processing',
        'Bio-Mechanics and Computational Physiology',
      ],
    },
    {
      id: 4,
      title: 'Secure & Emerging Technologies',
      icon: Shield,
      items: [
        'Cyber Security and Threat Intelligence',
        'Network Security and Intrusion Detection Systems',
        'Privacy-Preserving Machine Learning and Federated Learning',
        'Software Defined Networking (SDN) and Network Function Virtualization (NFV)',
        'Virtualization and Containerization Technologies (e.g., Docker, Kubernetes)',
        'Blockchain, Smart Contracts, and Decentralized Applications (dApps)',
        'Distributed Ledger Technologies for Industry 5.0',
        'Cloud Computing Models and Virtualized Infrastructure',
        'Edge, Fog, and Mist Computing Architectures',
        'Serverless and Microservices-based Computing',
        'Quantum Cryptography and Post-Quantum Security',
        'Digital Twin Technology in Smart Systems',
        'Augmented Reality (AR), Virtual Reality (VR), and Mixed Reality (MR)',
        'Extended Reality (XR) and Human-Centered Computing',
        'Nanoelectronics in Smart Devices',
        'Nano Sensors and Nano-Communication Networks',
        '5G/6G Networks and Next-Gen Wireless Standards',
        'Future Internet Architectures (e.g., Named Data Networking)',
        'Internet of Everything (IoE) and Smart Environments',
        'Cyber-Physical Systems (CPS) Security and Resilience',
        'Autonomous Systems and Secure Control Architectures',
        'Trustworthy AI and Secure Intelligent Systems',
        'Green Computing and Sustainable Data Centers',
        'Energy-Efficient Cloud and Edge Infrastructures',
        'Digital Sovereignty and Decentralized Identity Systems',
      ],
    },
  ];

  const [expandedTrack, setExpandedTrack] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {tracks.map((track) => {
        const IconComponent = track.icon;
        const isExpanded = expandedTrack === track.id;

        return (
          <div
            key={track.id}
            className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col"
          >
            {/* Track Header */}
            <div
              onClick={() => setExpandedTrack(isExpanded ? null : track.id)}
              className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 cursor-pointer hover:from-primary/15 hover:to-primary/10 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <IconComponent className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground leading-tight">
                    {track.title}
                  </h3>
                </div>
                <div className="flex-shrink-0 mt-1">
                  <div
                    className={`transition-transform duration-300 ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  >
                    ▼
                  </div>
                </div>
              </div>
            </div>

            {/* Track Content */}
            {isExpanded && (
              <div className="p-6 border-t border-border overflow-y-auto max-h-[500px]">
                <ul className="space-y-2">
                  {track.items.map((item, idx) => (
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
            )}

            {/* Click to expand hint */}
            {!isExpanded && (
              <div className="px-6 py-4 text-xs text-foreground/60 text-center border-t border-border bg-muted/20">
                Click to view topics
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
