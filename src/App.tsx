/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SnakeGame } from './components/SnakeGame';
import { MusicPlayer } from './components/MusicPlayer';
import { Terminal, Cpu, Database, Activity, Wifi, Battery, Binary, ShieldAlert, Cpu as Core } from 'lucide-react';

export default function App() {
  const [score, setScore] = useState(0);

  return (
    <div className="min-h-screen bg-cyber-black flex items-center justify-center p-4">
      {/* Background Static Noise */}
      <div className="fixed inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/60-lines.png')]"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-2 border-4 border-neon-cyan/40 bg-black/80 backdrop-blur-xl relative overflow-hidden"
      >
        {/* Top Navigation Bar / System Header */}
        <div className="col-span-full border-b-2 border-neon-cyan flex items-center justify-between px-6 py-2 bg-neon-cyan/10">
          <div className="flex items-center gap-4">
            <span className="text-xl font-bold tracking-[0.5em] glitch-heavy">DECK_OS // v4.0.2</span>
            <div className="hidden md:flex gap-4 text-[10px] items-center text-neon-cyan/50">
              <span className="flex items-center gap-1"><Wifi size={10} /> LINK: ESTABLISHED</span>
              <span className="flex items-center gap-1"><Battery size={10} /> POWER: 88%</span>
            </div>
          </div>
          <div className="flex items-center gap-6 animate-pulse">
            <span className="text-xs bg-neon-magenta text-black px-2 font-bold uppercase tracking-tighter">UNAUTHORIZED_ACCESS_DETECTED</span>
          </div>
        </div>

        {/* Left Control Deck */}
        <div className="lg:col-span-3 border-r-2 border-neon-cyan/30 p-4 space-y-4">
          <div className="neon-box-cyan p-4 bg-neon-cyan/5">
            <div className="flex items-center gap-2 mb-4 text-neon-cyan border-b border-neon-cyan/20 pb-2">
              <Binary size={16} />
              <h2 className="text-sm font-bold uppercase tracking-widest">Neural_Buffers</h2>
            </div>
            <div className="space-y-4 font-mono text-[11px]">
              <div className="flex justify-between">
                <span>SYN_LATENCY</span>
                <span className="text-neon-cyan">4ms</span>
              </div>
              <div className="w-full h-1 bg-neon-cyan/20">
                <div className="w-4/5 h-full bg-neon-cyan animate-pulse"></div>
              </div>
              <div className="flex justify-between text-neon-magenta">
                <span>GLITCH_PROB</span>
                <span>[HIGH]</span>
              </div>
              <div className="w-full h-1 bg-neon-magenta/20">
                <div className="w-1/3 h-full bg-neon-magenta"></div>
              </div>
            </div>
          </div>

          <div className="neon-box-magenta p-4 bg-neon-magenta/5 border-2 border-neon-magenta shadow-[0_0_10px_#ff00ff]">
            <div className="flex items-center gap-2 mb-2 text-neon-magenta">
              <ShieldAlert size={16} />
              <h2 className="text-sm font-bold uppercase tracking-widest">Ice_Breaker</h2>
            </div>
            <p className="text-[10px] text-neon-magenta/60 leading-tight">
              &gt; OVERRIDING FIREWALL...<br />
              &gt; INJECTING PAYLOAD...<br />
              &gt; ACCESS GRANTED.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-12 border border-neon-cyan/20 bg-black flex items-center justify-center">
                 <Core size={14} className={i % 2 === 0 ? "animate-spin" : ""} />
              </div>
            ))}
          </div>
        </div>

        {/* Main Terminal (Game Space) */}
        <div className="lg:col-span-6 p-8 flex flex-col items-center justify-center relative min-h-[500px]">
           <div className="absolute top-4 left-4 text-[10px] opacity-30 pointer-events-none">
             TRACING_CONNECTION... 127.0.0.1 -&gt; EXTERNAL_VOID
           </div>
           
           <div className="mb-8 text-center relative z-20">
             <h1 className="text-7xl font-bold text-white mb-2 screen-tearing tracking-tighter" style={{ textShadow: '4px 4px #ff00ff, -4px -4px #00f3ff' }}>
               GLITCH_SNAKE
             </h1>
             <div className="flex gap-4 justify-center items-center">
               <div className="px-6 py-2 bg-black border-2 border-neon-green text-neon-green text-3xl font-bold italic translate-x-[-10px]">
                 SCORE: {score.toString().padStart(6, '0')}
               </div>
             </div>
           </div>

           <div className="relative p-1 border-4 border-neon-cyan bg-black shadow-[0_0_50px_rgba(0,243,255,0.2)]">
             <SnakeGame onScoreChange={setScore} />
           </div>

           <div className="mt-8 flex gap-2 w-full max-w-[400px]">
             <button className="flex-1 py-1 border-2 border-neon-cyan bg-neon-cyan/10 text-neon-cyan text-xs font-bold uppercase hover:bg-neon-cyan hover:text-black transition-all">REP_SYS</button>
             <button className="flex-1 py-1 border-2 border-neon-magenta bg-neon-magenta/10 text-neon-magenta text-xs font-bold uppercase hover:bg-neon-magenta hover:text-black transition-all">CLR_MEM</button>
           </div>
        </div>

        {/* Right Sidebar (Music & Data Streams) */}
        <div className="lg:col-span-3 border-l-2 border-neon-cyan/30 p-4 space-y-8 flex flex-col">
          <div className="flex-1 flex flex-col">
            <div className="flex items-center gap-2 text-neon-magenta mb-4 border-b border-neon-magenta/20 pb-2">
              <Activity size={16} />
              <h2 className="text-sm font-bold uppercase tracking-widest">Audio_Jack</h2>
            </div>
            <div className="flex-1 min-h-[300px]">
              <MusicPlayer />
            </div>
          </div>

          <div className="p-4 border-2 border-dashed border-neon-cyan/40 bg-black/60 font-mono text-[9px] leading-relaxed text-neon-cyan/80">
            <p className="mb-2 text-neon-magenta">[SYSTEM_LOGS]</p>
            <p>&gt; Initializing protocol 0x42</p>
            <p>&gt; Buffer overflow avoided</p>
            <p>&gt; Memory leak detected in quadrant 7</p>
            <p>&gt; Music buffer re-synced</p>
            <p>&gt; Neural feedback: OPTIMAL</p>
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div className="col-span-full border-t-2 border-neon-cyan p-1 bg-black text-[9px] flex justify-between uppercase tracking-widest text-neon-cyan/50">
          <span>PORT_STATUS: LISTENING...</span>
          <span>LOCATION: [REDACTED]</span>
          <span>TIME: {new Date().toLocaleTimeString()}</span>
        </div>
      </motion.div>

      {/* Global Glitch Overlay (Severe Noise) */}
      <AnimatePresence>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.05, 0, 0.08, 0, 0.1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, times: [0, 0.2, 0.4, 0.6, 0.8, 0.9, 1] }}
          className="fixed inset-0 pointer-events-none bg-white/5 z-[100] mix-blend-difference"
        />
      </AnimatePresence>
    </div>
  );
}
