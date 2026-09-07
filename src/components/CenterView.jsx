import React, { useState, useEffect } from 'react';
import BuildingModel from './BuildingModel';
import { useSensor } from '../context/SensorContext';
import { Eye, Pause, Play, AlertOctagon, Send, Sparkles, X, Compass, Layers } from 'lucide-react';

export default function CenterView() {
  const [cameraPreset, setCameraPreset] = useState(0); // 0: 3D, 1: Plan, 2: Elevation
  const [isPaused, setIsPaused] = useState(false);
  const [queryInput, setQueryInput] = useState('');
  const [aiResponse, setAiResponse] = useState(null);

  const {
    selectedFloorId,
    setSelectedFloorId,
    latestPopup,
    setLatestPopup,
    answerQuery
  } = useSensor();

  // Auto dismiss alert popup after 4 seconds
  useEffect(() => {
    if (latestPopup) {
      const timer = setTimeout(() => {
        setLatestPopup(null);
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [latestPopup, setLatestPopup]);

  const handleAsk = (e) => {
    e.preventDefault();
    if (!queryInput.trim()) return;
    const res = answerQuery(queryInput);
    setAiResponse(res);
    setQueryInput('');
  };

  return (
    <main className="relative flex-1 h-[calc(100vh-56px)] bg-[#040810] overflow-hidden">
      {/* 3D THREE.JS CANVAS */}
      <BuildingModel cameraPreset={cameraPreset} isPaused={isPaused} />

      {/* OVERLAY 1: VIEW CONTROL BUTTONS (TOP-LEFT) */}
      <div className="absolute top-4 left-4 z-20 flex items-center space-x-2">
        <div className="p-1 rounded-xl bg-[#0a1628]/80 backdrop-blur-md border border-cyan-500/20 flex items-center space-x-1 shadow-lg">
          <button
            onClick={() => setCameraPreset(0)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
              cameraPreset === 0 ? 'bg-cyan-500 text-black shadow-[0_0_10px_#00d4ff]' : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>3D View</span>
          </button>

          <button
            onClick={() => setCameraPreset(1)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
              cameraPreset === 1 ? 'bg-cyan-500 text-black shadow-[0_0_10px_#00d4ff]' : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Floor Plan</span>
          </button>

          <button
            onClick={() => setCameraPreset(2)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
              cameraPreset === 2 ? 'bg-cyan-500 text-black shadow-[0_0_10px_#00d4ff]' : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Front Elevation</span>
          </button>

          <button
            onClick={() => setIsPaused(!isPaused)}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-all ${
              isPaused ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* OVERLAY 2: FLOOR LEVEL TAGS (RIGHT EDGE OF CANVAS) */}
      <div className="absolute top-4 right-4 z-20 flex flex-col space-y-2">
        {[
          { id: 2, label: '2F · Classrooms & Computer Lab' },
          { id: 1, label: '1F · Structural & Concrete Labs' },
          { id: 0, label: 'GF · Reception & HOD Office' }
        ].map((tag) => (
          <button
            key={tag.id}
            onClick={() => setSelectedFloorId(tag.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold backdrop-blur-md border transition-all text-right shadow-md ${
              selectedFloorId === tag.id
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(0,212,255,0.3)]'
                : 'bg-[#0a1628]/70 border-white/10 text-slate-300 hover:bg-white/10'
            }`}
          >
            {tag.label}
          </button>
        ))}
      </div>

      {/* OVERLAY 3: AUTOMATIC ALERT POPUP (BOTTOM-CENTER) */}
      {latestPopup && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 max-w-md w-full px-4 animate-bounce">
          <div className="p-3.5 rounded-2xl bg-rose-950/85 backdrop-blur-xl border border-rose-500/50 shadow-[0_0_30px_rgba(255,51,85,0.4)] flex items-start space-x-3 text-white">
            <AlertOctagon className="w-6 h-6 text-rose-400 shrink-0 mt-0.5 animate-pulse" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-300">{latestPopup.type}</span>
                <span className="text-[10px] text-rose-300/70 font-mono">{latestPopup.time}</span>
              </div>
              <p className="text-xs font-medium text-slate-200 mt-0.5">{latestPopup.msg}</p>
            </div>
            <button onClick={() => setLatestPopup(null)} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* OVERLAY 4: AI NATURAL LANGUAGE QUERY BAR & RESPONSE CARD (BOTTOM-RIGHT) */}
      <div className="absolute bottom-4 right-4 left-4 sm:left-auto z-20 max-w-lg w-full">
        {/* AI Response Card */}
        {aiResponse && (
          <div className="mb-2 p-3.5 rounded-2xl bg-[#0a1628]/95 backdrop-blur-xl border border-cyan-400/50 text-xs text-slate-200 shadow-[0_0_25px_rgba(0,212,255,0.2)] relative animate-fade-in">
            <button
              onClick={() => setAiResponse(null)}
              className="absolute top-2 right-2 text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <div className="flex items-start space-x-2">
              <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div className="leading-relaxed pr-4">{aiResponse}</div>
            </div>
          </div>
        )}

        {/* Input Bar */}
        <form onSubmit={handleAsk} className="flex items-center space-x-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={queryInput}
              onChange={(e) => setQueryInput(e.target.value)}
              placeholder="Ask AI: Which floor has highest CO2?..."
              className="w-full px-4 py-2.5 rounded-xl bg-[#070d1a]/80 backdrop-blur-md border border-cyan-500/30 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 shadow-lg"
            />
            <Sparkles className="w-4 h-4 text-cyan-400 absolute right-3 top-3 pointer-events-none opacity-60" />
          </div>
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold text-xs text-black shadow-[0_0_15px_rgba(0,212,255,0.4)] hover:brightness-110 flex items-center space-x-1.5 transition-all"
          >
            <span>Ask AI</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </main>
  );
}
