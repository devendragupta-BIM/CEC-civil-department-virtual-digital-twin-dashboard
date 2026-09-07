import React, { useState, useEffect } from 'react';
import { Layers, Users, AlertTriangle, Zap, Clock, ShieldCheck } from 'lucide-react';
import { useSensor } from '../context/SensorContext';

export default function Navbar() {
  const { totalOccupancy, criticalCount, warningCount, totalEnergy } = useSensor();
  const [timeStr, setTimeStr] = useState('');

  const totalAlerts = criticalCount + warningCount;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeStr(new Date().toTimeString().split(' ')[0]);
    }, 1000);
    setTimeStr(new Date().toTimeString().split(' ')[0]);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="h-[56px] w-full bg-[#070d1a]/90 backdrop-blur-md border-b border-cyan-500/20 px-4 flex items-center justify-between z-50 select-none">
      {/* LEFT: Branding & Logo */}
      <div className="flex items-center space-x-3">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 shadow-[0_0_15px_rgba(0,212,255,0.4)] flex items-center justify-center">
          <div className="w-full h-full bg-[#040810] rounded-[6px] flex items-center justify-center">
            <Layers className="w-5 h-5 text-cyan-400" />
          </div>
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-sm font-bold text-white tracking-wide">
              CEC Civil Dept <span className="text-cyan-400">· AI Digital Twin</span>
            </h1>
          </div>
          <p className="text-[10px] text-slate-400">
            Chaibasa Engineering College · JUT Ranchi
          </p>
        </div>
      </div>

      {/* CENTER: Live Chips */}
      <div className="hidden lg:flex items-center space-x-3">
        {/* Live Indicator */}
        <div className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#00ff88]" />
          <span className="text-[10px] font-bold text-emerald-400 tracking-wider">LIVE MONITORING</span>
        </div>

        {/* Occupancy Chip */}
        <div className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 flex items-center space-x-2 text-xs">
          <Users className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-slate-300 font-mono"><strong className="text-white">{totalOccupancy}</strong> Occupants</span>
        </div>

        {/* Alerts Chip */}
        <div className={`px-3 py-1 rounded-lg border flex items-center space-x-2 text-xs transition-colors ${
          totalAlerts > 0 ? 'bg-rose-500/15 border-rose-500/40 text-rose-300 animate-pulse' : 'bg-white/5 border-white/10 text-slate-300'
        }`}>
          <AlertTriangle className={`w-3.5 h-3.5 ${totalAlerts > 0 ? 'text-rose-400' : 'text-slate-400'}`} />
          <span className="font-mono"><strong className={totalAlerts > 0 ? 'text-rose-400' : 'text-white'}>{totalAlerts}</strong> Alerts</span>
        </div>

        {/* Energy Chip */}
        <div className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 flex items-center space-x-2 text-xs">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-slate-300 font-mono"><strong className="text-amber-300">{totalEnergy}</strong> kW</span>
        </div>

        {/* Clock Chip */}
        <div className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 flex items-center space-x-2 text-xs">
          <Clock className="w-3.5 h-3.5 text-blue-400" />
          <span className="text-cyan-300 font-mono font-bold tracking-wider">{timeStr}</span>
        </div>
      </div>

      {/* RIGHT: Elsevier Publication Badge */}
      <div className="flex items-center">
        <div className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-950/60 to-blue-950/60 border border-cyan-500/30 text-cyan-300 text-xs flex items-center space-x-2 shadow-[0_0_12px_rgba(0,212,255,0.15)]">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="font-medium text-[11px]">
            Published · <span className="text-white font-semibold">Automation in Construction (Elsevier)</span>
          </span>
        </div>
      </div>
    </header>
  );
}
