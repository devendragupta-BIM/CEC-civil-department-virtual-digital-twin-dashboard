import React from 'react';
import { useSensor } from '../context/SensorContext';
import {
  Building2,
  FlaskConical,
  Ruler,
  Zap,
  Droplets,
  Wind,
  Brain,
  Activity,
  AlertCircle,
  Thermometer,
  CloudRain,
  Users,
  Shield
} from 'lucide-react';

const zoneIcons = [
  <Building2 className="w-4 h-4 text-cyan-400" />,
  <FlaskConical className="w-4 h-4 text-blue-400" />,
  <Ruler className="w-4 h-4 text-amber-400" />,
  <Zap className="w-4 h-4 text-yellow-400" />,
  <Droplets className="w-4 h-4 text-emerald-400" />,
  <Wind className="w-4 h-4 text-sky-400" />,
  <Brain className="w-4 h-4 text-purple-400" />
];

export default function LeftSidebar() {
  const {
    selectedFloorId,
    setSelectedFloorId,
    floors,
    criticalCount,
    warningCount,
    avgTemp,
    avgCo2,
    totalOccupancy,
    totalEnergy
  } = useSensor();

  const totalAlerts = criticalCount + warningCount;

  return (
    <aside className="w-[220px] h-[calc(100vh-56px)] bg-[#070d1a]/80 backdrop-blur-md border-r border-cyan-500/15 p-3 flex flex-col justify-between overflow-y-auto z-40 select-none">
      <div>
        {/* SECTION LABEL: BUILDING ZONES */}
        <div className="flex items-center space-x-1.5 mb-2 px-1">
          <Activity className="w-3.5 h-3.5 text-cyan-400" />
          <h2 className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">BUILDING ZONES</h2>
        </div>

        {/* FLOOR BUTTONS LIST (7 TOTAL) */}
        <div className="space-y-1.5 mb-6">
          {floors.map((floor, idx) => {
            const isSelected = selectedFloorId === floor.id;
            // Status dot calculation
            let dotColor = 'bg-emerald-400 shadow-[0_0_8px_#00ff88]';
            if (floor.id === 2 || (floor.co2 > 1300)) {
              dotColor = 'bg-rose-500 animate-ping shadow-[0_0_10px_#ff3355]';
            } else if (floor.temperature > 30 || floor.co2 > 1000) {
              dotColor = 'bg-amber-400 shadow-[0_0_8px_#ffaa00]';
            }

            return (
              <button
                key={floor.id}
                onClick={() => setSelectedFloorId(floor.id)}
                className={`w-full text-left p-2.5 rounded-xl transition-all duration-200 border flex items-start space-x-2.5 relative group ${
                  isSelected
                    ? 'bg-cyan-500/15 border-cyan-400/60 text-white shadow-[0_0_15px_rgba(0,212,255,0.15)]'
                    : 'bg-white/5 border-transparent text-slate-300 hover:bg-white/10 hover:border-cyan-500/20'
                }`}
              >
                <div className="mt-0.5 p-1 rounded-lg bg-black/40 border border-white/5">
                  {zoneIcons[idx]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold truncate leading-tight">{floor.name}</span>
                    <span className={`w-2 h-2 rounded-full ${dotColor}`} />
                  </div>
                  <p className="text-[10px] text-slate-400 truncate mt-0.5 leading-tight">{floor.subLabel}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* SECTION LABEL: BUILDING SUMMARY */}
        <div className="flex items-center space-x-1.5 mb-2 px-1">
          <Shield className="w-3.5 h-3.5 text-cyan-400" />
          <h2 className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">BUILDING SUMMARY</h2>
        </div>

        {/* MINI METRIC CARDS (2 PER ROW) */}
        <div className="grid grid-cols-2 gap-1.5">
          <div className="p-2 rounded-lg bg-white/5 border border-white/5">
            <span className="text-[9px] text-slate-400 block uppercase">Total Sensors</span>
            <span className="text-sm font-bold font-mono text-cyan-300">25</span>
          </div>

          <div className="p-2 rounded-lg bg-white/5 border border-white/5">
            <span className="text-[9px] text-slate-400 block uppercase">Active Alerts</span>
            <span className={`text-sm font-bold font-mono ${totalAlerts > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
              {totalAlerts}
            </span>
          </div>

          <div className="p-2 rounded-lg bg-white/5 border border-white/5">
            <span className="text-[9px] text-slate-400 block uppercase">Avg Temp</span>
            <span className="text-xs font-bold font-mono text-amber-300">{avgTemp}°C</span>
          </div>

          <div className="p-2 rounded-lg bg-white/5 border border-white/5">
            <span className="text-[9px] text-slate-400 block uppercase">Avg CO2</span>
            <span className="text-xs font-bold font-mono text-rose-300">{avgCo2} ppm</span>
          </div>

          <div className="p-2 rounded-lg bg-white/5 border border-white/5">
            <span className="text-[9px] text-slate-400 block uppercase">Occupancy</span>
            <span className="text-xs font-bold font-mono text-cyan-300">{totalOccupancy}</span>
          </div>

          <div className="p-2 rounded-lg bg-white/5 border border-white/5">
            <span className="text-[9px] text-slate-400 block uppercase">Energy</span>
            <span className="text-xs font-bold font-mono text-yellow-300">{totalEnergy} kW</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
