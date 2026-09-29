import React, { useEffect, useRef } from 'react';

export default function LuxuryAudio({ isPlaying }) {
  const audioCtxRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContext();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Luxury Pentatonic Warm Chords frequencies
      const frequencies = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 659.25];

      const playChime = () => {
        if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') return;
        
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // Randomly pick a gentle frequency from the luxury pentatonic scale
        const freq = frequencies[Math.floor(Math.random() * frequencies.length)];
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        // Soft attack and lingering luxury decay
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.04, now + 0.8);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.8);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 4);
      };

      // Play immediately, then every 4.5 seconds
      playChime();
      intervalRef.current = setInterval(playChime, 4500);

    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
        audioCtxRef.current.suspend();
      }
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying]);

  return null;
}
