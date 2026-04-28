import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, Disc } from 'lucide-react';

const TRACKS = [
  {
    id: 1,
    title: "NEURAL OVERRIDE",
    artist: "GHOST_SHELL",
    duration: "3:45",
    color: "#00f3ff"
  },
  {
    id: 2,
    title: "NEON PULSE",
    artist: "SYNTAX_ERROR",
    duration: "4:20",
    color: "#ff00ff"
  },
  {
    id: 3,
    title: "CHROME DECAY",
    artist: "BINARY_DAWN",
    duration: "2:58",
    color: "#39ff14"
  }
];

export const MusicPlayer: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<number | null>(null);

  const currentTrack = TRACKS[currentTrackIndex];

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = window.setInterval(() => {
        setProgress(p => (p + 1) % 100);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  
  const nextTrack = () => {
    setCurrentTrackIndex((currentTrackIndex + 1) % TRACKS.length);
    setProgress(0);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((currentTrackIndex - 1 + TRACKS.length) % TRACKS.length);
    setProgress(0);
  };

  return (
    <div className="w-full max-w-md bg-black/80 border border-neon-magenta/30 p-6 rounded-xl backdrop-blur-md relative overflow-hidden group">
      {/* Glitch Overlay */}
      <div className="absolute inset-0 bg-neon-magenta/5 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"></div>
      
      <div className="flex items-center gap-6 relative z-10">
        <div className={`relative ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '8s' }}>
          <div className="w-20 h-20 rounded-full border-2 border-dashed border-neon-cyan/50 flex items-center justify-center relative overflow-hidden">
             <Disc size={40} className="text-neon-cyan opacity-80" />
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 bg-black rounded-full border border-neon-cyan"></div>
             </div>
          </div>
          <div className="absolute -inset-1 rounded-full bg-neon-cyan/10 blur-sm"></div>
        </div>

        <div className="flex-1">
          <h3 className="text-xl font-bold tracking-tighter text-neon-cyan glitch-text" data-text={currentTrack.title}>
            {currentTrack.title}
          </h3>
          <p className="text-xs text-neon-magenta/70 font-mono tracking-widest mt-1">
            {currentTrack.artist} // SYNC_STATUS: OK
          </p>
        </div>
      </div>

      <div className="mt-8 relative h-1 bg-white/10 rounded-full overflow-hidden">
        <div 
          className="absolute h-full bg-gradient-to-r from-neon-cyan to-neon-magenta transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
        <div 
          className="absolute h-full w-2 bg-white blur-sm"
          style={{ left: `${progress}%` }}
        ></div>
      </div>

      <div className="flex items-center justify-between mt-6 text-neon-cyan">
        <span className="text-[10px] opacity-60 font-mono">0:24</span>
        <div className="flex items-center gap-6">
          <button onClick={prevTrack} className="hover:text-neon-magenta transition-colors cursor-pointer">
            <SkipBack size={24} />
          </button>
          <button 
            onClick={togglePlay}
            className="w-12 h-12 bg-neon-cyan/10 border border-neon-cyan/50 rounded-full flex items-center justify-center hover:bg-neon-cyan hover:text-black transition-all cursor-pointer"
          >
            {isPlaying ? <Pause fill="currentColor" /> : <Play fill="currentColor" />}
          </button>
          <button onClick={nextTrack} className="hover:text-neon-magenta transition-colors cursor-pointer">
            <SkipForward size={24} />
          </button>
        </div>
        <span className="text-[10px] opacity-60 font-mono">{currentTrack.duration}</span>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <Volume2 size={14} className="text-neon-magenta" aria-label="Volume Icon" />
        <div className="flex-1 h-0.5 bg-white/5 relative">
          <div className="absolute inset-y-0 left-0 w-2/3 bg-neon-magenta"></div>
        </div>
      </div>
    </div>
  );
};
