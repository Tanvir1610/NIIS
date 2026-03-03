'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Clock, MapPin } from 'lucide-react';

const scheduleData = [
  {
    day: 'Day 1 - December 15, 2026',
    date: 'Monday',
    events: [
      { time: '08:00 AM', title: 'Registration & Welcome Breakfast', location: 'Main Foyer', type: 'Registration' },
      { time: '09:30 AM', title: 'Inaugural Ceremony', location: 'Auditorium', type: 'Ceremony' },
      { time: '10:00 AM', title: 'Keynote Address', speaker: 'Prof. David Chen', topic: 'Future of Integrated Systems', location: 'Auditorium', type: 'Keynote' },
      { time: '11:00 AM', title: 'Coffee Break', location: 'Foyer', type: 'Break' },
      { time: '11:30 AM', title: 'Parallel Sessions - Track A & B', location: 'Various Halls', type: 'Session' },
      { time: '01:00 PM', title: 'Lunch Break', location: 'Dining Hall', type: 'Break' },
      { time: '02:00 PM', title: 'Parallel Sessions - Track C & D', location: 'Various Halls', type: 'Session' },
      { time: '04:00 PM', title: 'Tea Break', location: 'Foyer', type: 'Break' },
      { time: '04:30 PM', title: 'Workshop 1: AI Fundamentals', location: 'Lab A', type: 'Workshop' },
      { time: '07:00 PM', title: 'Welcome Dinner', location: 'Grand Ballroom', type: 'Social' },
    ]
  },
  {
    day: 'Day 2 - December 16, 2026',
    date: 'Tuesday',
    events: [
      { time: '08:30 AM', title: 'Keynote Address', speaker: 'Dr. Sarah Johnson', topic: 'Machine Learning Revolution', location: 'Auditorium', type: 'Keynote' },
      { time: '09:30 AM', title: 'Parallel Sessions - Track E & F', location: 'Various Halls', type: 'Session' },
      { time: '11:00 AM', title: 'Coffee Break', location: 'Foyer', type: 'Break' },
      { time: '11:30 AM', title: 'Parallel Sessions - Track G & H', location: 'Various Halls', type: 'Session' },
      { time: '01:00 PM', title: 'Lunch Break', location: 'Dining Hall', type: 'Break' },
      { time: '02:00 PM', title: 'Workshop 2: IoT Systems', location: 'Lab B', type: 'Workshop' },
      { time: '03:30 PM', title: 'Panel Discussion: Industry Perspectives', location: 'Auditorium', type: 'Panel' },
      { time: '05:00 PM', title: 'Poster Session & Networking', location: 'Exhibition Area', type: 'Networking' },
      { time: '07:30 PM', title: 'Gala Dinner', location: 'Grand Ballroom', type: 'Social' },
    ]
  },
  {
    day: 'Day 3 - December 17, 2026',
    date: 'Wednesday',
    events: [
      { time: '08:30 AM', title: 'Keynote Address', speaker: 'Prof. Klaus Schmidt', topic: 'System Integration Challenges', location: 'Auditorium', type: 'Keynote' },
      { time: '09:30 AM', title: 'Parallel Sessions - Track I & J', location: 'Various Halls', type: 'Session' },
      { time: '11:00 AM', title: 'Coffee Break', location: 'Foyer', type: 'Break' },
      { time: '11:30 AM', title: 'Workshop 3: Robotics & Automation', location: 'Lab C', type: 'Workshop' },
      { time: '01:00 PM', title: 'Lunch Break', location: 'Dining Hall', type: 'Break' },
      { time: '02:00 PM', title: 'Closing Session & Award Ceremony', location: 'Auditorium', type: 'Ceremony' },
      { time: '03:30 PM', title: 'Conference Concludes', location: 'Main Hall', type: 'End' },
    ]
  }
];

const venueInfo = {
  name: 'GCET Campus',
  address: 'H-6 Mount Royal Tower, Road No. 2, Banjara Hills, Hyderabad 500034',
  phone: '+91-40-6653 2255',
  email: 'niis2026@gcet.ac.in',
  directions: 'Located in the heart of Hyderabad with easy access to major highways and public transportation'
};

export default function Schedule() {
  const getEventColor = (type: string) => {
    switch (type) {
      case 'Keynote':
        return 'border-l-4 border-primary bg-primary/5';
      case 'Session':
        return 'border-l-4 border-accent bg-accent/5';
      case 'Workshop':
        return 'border-l-4 border-secondary bg-secondary/5';
      case 'Break':
        return 'border-l-4 border-gray-400 bg-gray-50';
      case 'Social':
        return 'border-l-4 border-purple-500 bg-purple-50';
      default:
        return 'border-l-4 border-gray-300 bg-gray-50';
    }
  };

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-primary text-primary-foreground py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4">Conference Schedule</h1>
          </div>
        </section>

        {/* Schedule */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="space-y-12">
              {scheduleData.map((daySchedule, dayIndex) => (
                <div key={dayIndex} className="bg-muted/30 rounded-xl overflow-hidden border border-border">
                  <div className="bg-gradient-to-r from-primary to-accent text-white px-6 py-4">
                    <h2 className="text-2xl font-bold">{daySchedule.day}</h2>
                    <p className="text-sm opacity-90">{daySchedule.date}</p>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {daySchedule.events.map((event, index) => (
                        <div key={index} className={`rounded-lg p-4 ${getEventColor(event.type)}`}>
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Clock className="w-4 h-4 text-primary" />
                                <span className="font-bold text-foreground">{event.time}</span>
                              </div>
                              <h3 className="text-lg font-bold text-foreground mb-1">{event.title}</h3>
                              {event.speaker && (
                                <p className="text-sm text-foreground/70 mb-1">
                                  <span className="font-semibold">Speaker:</span> {event.speaker}
                                </p>
                              )}
                              {event.topic && (
                                <p className="text-sm text-foreground/70">
                                  <span className="font-semibold">Topic:</span> {event.topic}
                                </p>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-foreground/70 text-sm whitespace-nowrap">
                              <MapPin className="w-4 h-4" />
                              {event.location}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Venue Information */}
        <section className="py-20 md:py-32 bg-muted/30">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-4xl font-bold mb-4 text-center">
              Venue <span className="text-accent">Information</span>
            </h2>
            <p className="text-lg text-foreground/80 text-center mb-12 max-w-2xl mx-auto">
              Join us at the state-of-the-art GCET campus for an unforgettable three-day conference
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white border border-border rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-6">Venue Details</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-primary mb-2">Institution</h4>
                    <p className="text-foreground/80">{venueInfo.name}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-primary mb-2">Address</h4>
                    <p className="text-foreground/80">{venueInfo.address}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-primary mb-2">Phone</h4>
                    <p className="text-foreground/80">{venueInfo.phone}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-primary mb-2">Email</h4>
                    <p className="text-foreground/80">{venueInfo.email}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-border rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-6">Facilities</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-accent font-bold">✓</span>
                    <span>Auditorium with 1000+ seating capacity</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent font-bold">✓</span>
                    <span>Multiple parallel session halls</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent font-bold">✓</span>
                    <span>Modern laboratory facilities</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent font-bold">✓</span>
                    <span>High-speed Wi-Fi throughout campus</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent font-bold">✓</span>
                    <span>On-campus dining and refreshment services</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent font-bold">✓</span>
                    <span>Parking facilities</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent font-bold">✓</span>
                    <span>Accommodation assistance</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 bg-white border border-border rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4">Getting There</h3>
              <p className="text-foreground/80 mb-4">{venueInfo.directions}</p>
              <div className="grid md:grid-cols-3 gap-6 mt-6">
                <div>
                  <h4 className="font-bold text-primary mb-2">By Air</h4>
                  <p className="text-sm text-foreground/80">Hyderabad International Airport is 30 km away with direct connections to major cities</p>
                </div>
                <div>
                  <h4 className="font-bold text-primary mb-2">By Train</h4>
                  <p className="text-sm text-foreground/80">Secunderabad Railway Station offers connections across India with modern transportation</p>
                </div>
                <div>
                  <h4 className="font-bold text-primary mb-2">By Road</h4>
                  <p className="text-sm text-foreground/80">Easy access via major highways with taxi and cab services available</p>
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
