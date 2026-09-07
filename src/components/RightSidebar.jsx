import React from 'react';
import { useSensor } from '../context/SensorContext';
import {
  Thermometer,
  CloudRain,
  Wind,
  Users,
  Zap,
  Volume2,
  Activity,
  AlertTriangle,
  Brain,
  ShieldCheck,
  TrendingUp,
  Clock
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
);

export default function RightSidebar() {
  const {
    activeFloor,
    healthScore,
    energyHistory,
    criticalCount,
    warningCount,
    alerts
  } = useSensor();

  // Color logic for health score arc
  let scoreColor = '#00ff88'; // green
  if (healthScore < 60) scoreColor = '#ff3355'; // red
  else if (healthScore < 80) scoreColor = '#ffaa00'; // amber

  // Chart.js data configuration
  const chartData = {
    labels: energyHistory.map((_, i) => i.toString()),
    datasets: [
      {
        fill: true,
        label: 'Energy (kW)',
        data: energyHistory,
        borderColor: '#00d4ff',
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.4,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 100);
          gradient.addColorStop(0, 'rgba(0, 212, 255, 0.35)');
          gradient.addColorStop(1, 'rgba(0, 212, 255, 0.0)');
          return gradient;
        },
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: '#070d1a',
        borderColor: 'rgba(0, 212, 255, 0.4)',
        borderWidth: 1,
        displayColors: false,
      },
    },
    scales: {
      x: { display: false },
      y: {
        display: true,
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#3d5a7a', font: { size: 9 } },
      },
    },
  };

  return (
    <aside className="w-[300px] h-[calc(100vh-56px)] bg-[#070d1a]/85 backdrop-blur-md border-l border-cyan-500/15 p-3 flex flex-col justify-between overflow-y-auto z-40 select-none space-y-4">
      {/* PANEL 1: BUILDING HEALTH SCORE */}
      <div className="p-3 rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-[11px] font-bold text-slate-300 tracking-wider uppercase flex items-center space-x-1.5">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span>BUILDING HEALTH SCORE</span>
          </h2>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
            25 SENSORS
          </span>
        </div>

        <div className="flex items-center space-x-4 mb-3">
          {/* Circular SVG Arc */}
          <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-800"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                strokeWidth="3.5"
                strokeDasharray={`${healthScore}, 100`}
                strokeLinecap="round"
                stroke={scoreColor}
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-xl font-extrabold font-mono text-white leading-none">{healthScore}</span>
              <span className="text-[8px] text-slate-400 uppercase">/100</span>
            </div>
          </div>

          {/* Sub-bars */}
          <div className="flex-1 space-y-1.5 text-[10px]">
            <div>
              <div className="flex justify-between text-slate-400 mb-0.5">
                <span>Air Quality</span>
                <span className="font-mono text-cyan-300">62%</span>
              </div>
              <div className="h-1 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-cyan-400 rounded-full" style={{ width: '62%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-400 mb-0.5">
                <span>Energy Efficiency</span>
                <span className="font-mono text-emerald-400">84%</span>
              </div>
              <div className="h-1 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-emerald-400 rounded-full" style={{ width: '84%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-400 mb-0.5">
                <span>Structural Integrity</span>
                <span className="font-mono text-blue-400">98%</span>
              </div>
              <div className="h-1 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-blue-400 rounded-full" style={{ width: '98%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PANEL 2: LIVE SENSOR READINGS (2x3 GRID) */}
      <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-[11px] font-bold text-slate-300 tracking-wider uppercase">
            SENSOR READINGS
          </h2>
          <span className="text-[10px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
            {activeFloor.code} · {activeFloor.name}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {/* Temperature */}
          <div className={`p-2 rounded-xl border transition-all ${
            activeFloor.temperature > 30 ? 'bg-amber-500/15 border-amber-500/40 text-amber-300 animate-pulse' : 'bg-white/5 border-white/5 text-slate-200'
          }`}>
            <div className="flex justify-between items-start">
              <Thermometer className="w-3.5 h-3.5 text-amber-400" />
              <span className={`w-1.5 h-1.5 rounded-full ${activeFloor.temperature > 30 ? 'bg-amber-400' : 'bg-emerald-400'}`} />
            </div>
            <div className="mt-1 text-base font-bold font-mono">{activeFloor.temperature}°C</div>
            <span className="text-[9px] text-slate-400 block">Temperature</span>
          </div>

          {/* Humidity */}
          <div className="p-2 rounded-xl bg-white/5 border border-white/5 text-slate-200">
            <div className="flex justify-between items-start">
              <CloudRain className="w-3.5 h-3.5 text-sky-400" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </div>
            <div className="mt-1 text-base font-bold font-mono">{activeFloor.humidity}%</div>
            <span className="text-[9px] text-slate-400 block">Humidity</span>
          </div>

          {/* CO2 Level */}
          <div className={`p-2 rounded-xl border transition-all ${
            activeFloor.co2 > 1200 ? 'bg-rose-500/15 border-rose-500/40 text-rose-300 animate-pulse' : 'bg-white/5 border-white/5 text-slate-200'
          }`}>
            <div className="flex justify-between items-start">
              <Wind className="w-3.5 h-3.5 text-rose-400" />
              <span className={`w-1.5 h-1.5 rounded-full ${activeFloor.co2 > 1200 ? 'bg-rose-500 animate-ping' : 'bg-emerald-400'}`} />
            </div>
            <div className="mt-1 text-base font-bold font-mono">{activeFloor.co2} <span className="text-[10px]">ppm</span></div>
            <span className="text-[9px] text-slate-400 block">CO2 Concentration</span>
          </div>

          {/* Occupancy */}
          <div className="p-2 rounded-xl bg-white/5 border border-white/5 text-slate-200">
            <div className="flex justify-between items-start">
              <Users className="w-3.5 h-3.5 text-cyan-400" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </div>
            <div className="mt-1 text-base font-bold font-mono">{activeFloor.occupancy}</div>
            <span className="text-[9px] text-slate-400 block">Occupancy</span>
          </div>

          {/* Energy */}
          <div className="p-2 rounded-xl bg-white/5 border border-white/5 text-slate-200">
            <div className="flex justify-between items-start">
              <Zap className="w-3.5 h-3.5 text-yellow-400" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </div>
            <div className="mt-1 text-base font-bold font-mono">{activeFloor.energy} <span className="text-[10px]">kW</span></div>
            <span className="text-[9px] text-slate-400 block">Energy Load</span>
          </div>

          {/* Noise */}
          <div className="p-2 rounded-xl bg-white/5 border border-white/5 text-slate-200">
            <div className="flex justify-between items-start">
              <Volume2 className="w-3.5 h-3.5 text-purple-400" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </div>
            <div className="mt-1 text-base font-bold font-mono">{activeFloor.noise} <span className="text-[10px]">dB</span></div>
            <span className="text-[9px] text-slate-400 block">Acoustics</span>
          </div>
        </div>
      </div>

      {/* PANEL 3: ENERGY TREND CHART */}
      <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-[11px] font-bold text-slate-300 tracking-wider uppercase flex items-center space-x-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
            <span>TOTAL ENERGY DEMAND</span>
          </h2>
          <span className="text-[10px] font-mono text-cyan-300">kW Ticker</span>
        </div>
        <div className="h-24 w-full">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* PANEL 4: AI INSIGHTS */}
      <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-[11px] font-bold text-slate-300 tracking-wider uppercase flex items-center space-x-1.5">
            <Brain className="w-3.5 h-3.5 text-purple-400" />
            <span>AI ANOMALY INSIGHTS</span>
          </h2>
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
            ML Active
          </span>
        </div>

        <div className="space-y-2 text-xs">
          <div className="p-2 rounded-xl bg-rose-500/10 border-l-2 border-rose-500 text-slate-200">
            <div className="font-bold text-rose-400 text-[11px]">Critical CO2 Spike</div>
            <p className="text-[10px] text-slate-300 mt-0.5">2F Classroom 204 reading 1480 ppm. Ventilation boost required.</p>
          </div>

          <div className="p-2 rounded-xl bg-amber-500/10 border-l-2 border-amber-500 text-slate-200">
            <div className="font-bold text-amber-400 text-[11px]">Thermal Variance</div>
            <p className="text-[10px] text-slate-300 mt-0.5">2F Drawing Hall ambient temp at 32.4°C (above 28°C baseline).</p>
          </div>

          <div className="p-2 rounded-xl bg-emerald-500/10 border-l-2 border-emerald-500 text-slate-200">
            <div className="font-bold text-emerald-400 text-[11px]">Structural Integrity</div>
            <p className="text-[10px] text-slate-300 mt-0.5">Vibration sensors nominal across all RCC columns (0.18 mm/s avg).</p>
          </div>

          <div className="p-2 rounded-xl bg-cyan-500/10 border-l-2 border-cyan-500 text-slate-200">
            <div className="font-bold text-cyan-400 text-[11px]">Load Forecast</div>
            <p className="text-[10px] text-slate-300 mt-0.5">Peak building energy load predicted at 14:00 hrs (108 kW peak).</p>
          </div>
        </div>
      </div>

      {/* PANEL 5: ALERT LOG */}
      <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-[11px] font-bold text-slate-300 tracking-wider uppercase flex items-center space-x-1.5">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>REAL-TIME ALERT LOG</span>
          </h2>
          <span className="text-[10px] text-slate-400 font-mono">Live Stream</span>
        </div>

        <div className="max-h-28 overflow-y-auto space-y-1.5 pr-1 text-[10px] font-mono">
          {alerts.map((a) => (
            <div key={a.id} className="flex items-center justify-between p-1.5 rounded bg-black/40 border border-white/5">
              <div className="flex items-center space-x-1.5 truncate">
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${a.level === 'critical' ? 'bg-rose-500' : 'bg-amber-400'}`} />
                <span className="text-slate-200 truncate">{a.floor} — {a.type}</span>
              </div>
              <span className="text-slate-400 shrink-0 ml-1">{a.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER: DEVENDRA GUPTA CREDITS */}
      <footer className="pt-2 border-t border-white/10 text-center">
        <p className="text-[9px] text-slate-400 leading-tight">
          Built by <strong className="text-cyan-300">Devendra Gupta</strong> · BIM Automation Professional · BMSI Gurugram
        </p>
        <p className="text-[8px] text-slate-400/80 mt-0.5">
          Published: Automation in Construction (Elsevier) · JUT Civil Dept 2025
        </p>
      </footer>
    </aside>
  );
}
