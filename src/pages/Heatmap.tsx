import { useState } from 'react';
import { X, MapPin, Users, AlertTriangle, CheckCircle } from 'lucide-react';

interface Hotspot {
  id: number;
  x: number;
  y: number;
  severity: 'critical' | 'high' | 'low';
  title: string;
  zone: string;
  people: number;
  desc: string;
}

const hotspots: Hotspot[] = [
  { id: 1, x: 20, y: 25, severity: 'critical', title: 'Flash Flood Zone', zone: 'Zone 4', people: 450, desc: 'Active flooding, immediate evacuation needed' },
  { id: 2, x: 65, y: 35, severity: 'high', title: 'Water Crisis', zone: 'Zone 2', people: 320, desc: 'Contaminated water supply, purification kits required' },
  { id: 3, x: 40, y: 60, severity: 'low', title: 'Supply Drop', zone: 'Zone 5', people: 90, desc: 'Regular supply distribution point, well-managed' },
  { id: 4, x: 75, y: 70, severity: 'high', title: 'Medical Camp', zone: 'Zone 7', people: 180, desc: 'Overcrowded medical facility, additional staff needed' },
  { id: 5, x: 30, y: 80, severity: 'critical', title: 'Shelter Collapse', zone: 'Zone 3', people: 200, desc: 'Structural damage from aftershock, relocation required' },
];

const severityConfig = {
  critical: { color: 'bg-neon-red', ring: 'ring-neon-red/30', glow: 'glow-red', size: 'w-5 h-5' },
  high: { color: 'bg-neon-yellow', ring: 'ring-neon-yellow/30', glow: 'glow-purple', size: 'w-4 h-4' },
  low: { color: 'bg-neon-green', ring: 'ring-neon-green/30', glow: 'glow-green', size: 'w-3 h-3' },
};

export default function Heatmap() {
  const [selected, setSelected] = useState<Hotspot | null>(null);

  return (
    <div className="min-h-screen pb-24">
      <div className="px-4 pt-6 mb-4">
        <h1 className="font-heading text-xl font-bold text-foreground">Live Heatmap</h1>
        <p className="text-xs text-muted-foreground">Tap hotspots for details</p>
      </div>

      {/* Legend */}
      <div className="px-4 mb-3 flex gap-4">
        {(['critical', 'high', 'low'] as const).map(s => (
          <div key={s} className="flex items-center gap-1.5">
            <div className={`w-2.5 h-2.5 rounded-full ${severityConfig[s].color}`} />
            <span className="text-[10px] text-muted-foreground capitalize">{s}</span>
          </div>
        ))}
      </div>

      {/* Map */}
      <div className="mx-4 rounded-xl overflow-hidden relative" style={{ height: '60vh', background: 'linear-gradient(180deg, hsl(230 20% 12%), hsl(240 20% 15%))' }}>
        {/* Grid overlay */}
        <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 gap-px opacity-5">
          {Array.from({ length: 64 }).map((_, i) => <div key={i} className="border border-primary" />)}
        </div>

        {/* Zone labels */}
        <span className="absolute top-4 left-4 text-[10px] text-muted-foreground/40">Zone 1</span>
        <span className="absolute top-4 right-4 text-[10px] text-muted-foreground/40">Zone 2</span>
        <span className="absolute bottom-4 left-4 text-[10px] text-muted-foreground/40">Zone 3</span>
        <span className="absolute bottom-4 right-4 text-[10px] text-muted-foreground/40">Zone 7</span>

        {/* Hotspots */}
        {hotspots.map(h => {
          const cfg = severityConfig[h.severity];
          return (
            <button
              key={h.id}
              onClick={() => setSelected(h)}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
              style={{ left: `${h.x}%`, top: `${h.y}%` }}
            >
              <div className={`${cfg.size} rounded-full ${cfg.color} animate-ping absolute`} style={{ opacity: 0.3 }} />
              <div className={`${cfg.size} rounded-full ${cfg.color} relative ring-4 ${cfg.ring}`} />
            </button>
          );
        })}
      </div>

      {/* Detail panel */}
      {selected && (
        <div className="fixed inset-x-0 bottom-20 z-40 px-4 animate-fade-in-up">
          <div className="glass-card-strong p-5 max-w-lg mx-auto">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-heading font-semibold text-foreground">{selected.title}</h3>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3" /> {selected.zone}
                </p>
              </div>
              <button onClick={() => setSelected(null)} className="p-1 rounded-lg bg-muted/50">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <p className="text-xs text-muted-foreground mb-3">{selected.desc}</p>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Users className="w-3 h-3" /> {selected.people} affected
              </div>
              <div className="flex items-center gap-1 text-xs">
                <AlertTriangle className={`w-3 h-3 ${selected.severity === 'critical' ? 'text-neon-red' : selected.severity === 'high' ? 'text-neon-yellow' : 'text-neon-green'}`} />
                <span className="capitalize text-muted-foreground">{selected.severity}</span>
              </div>
            </div>
            <button className="btn-glow w-full text-primary-foreground text-sm flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4" /> Accept Task
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
