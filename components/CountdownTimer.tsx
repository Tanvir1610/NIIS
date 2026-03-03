'use client';

import { useState, useEffect } from 'react';

interface TimeLeft {
  submissionDays: number;
  submissionHours: number;
  submissionMinutes: number;
  submissionSeconds: number;
  conferenceDays: number;
  conferenceHours: number;
  conferenceMinutes: number;
  conferenceSeconds: number;
}

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    submissionDays: 0,
    submissionHours: 0,
    submissionMinutes: 0,
    submissionSeconds: 0,
    conferenceDays: 0,
    conferenceHours: 0,
    conferenceMinutes: 0,
    conferenceSeconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const submissionDeadline = new Date(2026, 6, 30, 0, 0, 0).getTime();; // 1 March 2026
      const conferenceStart = new Date(2026, 10, 5, 0, 0, 0).getTime();      // 5 Novem
      const now = new Date().getTime();

      // Submission Countdown
      const submissionDifference = submissionDeadline - now;
      setTimeLeft({
        submissionDays: Math.floor(submissionDifference / (1000 * 60 * 60 * 24)),
        submissionHours: Math.floor(
          (submissionDifference / (1000 * 60 * 60)) % 24
        ),
        submissionMinutes: Math.floor((submissionDifference / 1000 / 60) % 60),
        submissionSeconds: Math.floor((submissionDifference / 1000) % 60),
        conferenceDays: Math.floor((conferenceStart - now) / (1000 * 60 * 60 * 24)),
        conferenceHours: Math.floor(
          ((conferenceStart - now) / (1000 * 60 * 60)) % 24
        ),
        conferenceMinutes: Math.floor(
          ((conferenceStart - now) / 1000 / 60) % 60
        ),
        conferenceSeconds: Math.floor(((conferenceStart - now) / 1000) % 60),
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
        <h3 className="font-semibold mb-4 text-sm opacity-80">Submission Deadline</h3>
        <div className="grid grid-cols-4 gap-2">
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold">{timeLeft.submissionDays}</div>
            <p className="text-xs opacity-70">Days</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold">{timeLeft.submissionHours}</div>
            <p className="text-xs opacity-70">Hours</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold">{timeLeft.submissionMinutes}</div>
            <p className="text-xs opacity-70">Mins</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold">{timeLeft.submissionSeconds}</div>
            <p className="text-xs opacity-70">Secs</p>
          </div>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
        <h3 className="font-semibold mb-4 text-sm opacity-80">Conference Starts</h3>
        <div className="grid grid-cols-4 gap-2">
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold">{timeLeft.conferenceDays}</div>
            <p className="text-xs opacity-70">Days</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold">{timeLeft.conferenceHours}</div>
            <p className="text-xs opacity-70">Hours</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold">{timeLeft.conferenceMinutes}</div>
            <p className="text-xs opacity-70">Mins</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold">{timeLeft.conferenceSeconds}</div>
            <p className="text-xs opacity-70">Secs</p>
          </div>
        </div>
      </div>
    </>
  );
}
