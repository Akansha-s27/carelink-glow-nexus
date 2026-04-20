import { useState, useEffect } from 'react';
import { Brain, Zap, ArrowUp, ArrowDown, Radio } from 'lucide-react';
import BackButton from '@/components/BackButton';

interface LiveData {
  id: number;
  type: string;
  location: string;
  priority: number;
  status: 'incoming' | 'processing' | 'dispatched';
  time: string;
}

const initialData: LiveData[] = [
  { id: 1, type: 'Flood Report', location: 'Zone 4 - Sector B', priority: 95, status: 'incoming', time: 'now' },
  { id: 2, type: 'Medical Request', location: 'Zone 2 - Camp C', priority: 88, status: 'processing', time: '30s ago' },
  { id: 3, type: 'Supply Request', location: 'Zone 1 - Distribution', priority: 72, status: 'dispatched', time: '2m ago' },
  { id: 4, type: 'Shelter Alert', location: 'Zone 7 - Block D', priority: 84, status: 'processing', time: '1m ago' },
  { id: 5, type: 'Infrastructure', location: 'Zone 3 - Bridge', priority: 67, status: 'dispatched', time: '5m ago' },
];

const statusColors = {
  incoming: 'text-neon-red bg-neon-red/10 border-neon-red/30',
  processing: 'text-neon-yellow bg-neon-yellow/10 border-neon-yellow/30',
  dispatched: 'text-neon-green bg-neon-green/10 border-neon-green/30',
};

export default function CommandCenter() {
  const [data, setData] = useState(initialData);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(p => !p);
      setData(prev => prev.map(d => ({
        ...d,
        priority: Math.min(100, Math.max(50, d.priority + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 3))),
      })).sort((a, b) => b.priority - a.priority));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen pb-24 px-4 pt-6">
      {/* Back Button */}
      <BackButton />
      
      <div className="max-w-lg mx-auto">
        <div className="flex items-center gap-2 mb-1">
          <Brain className="w-5 h-5 text-secondary" />
          <h1 className="font-heading text-xl font-bold text-foreground">AI Command Center</h1>
        </div>
        <div className="flex items-center gap-2 mb-6">
          <Radio className={`w-3 h-3 ${pulse ? 'text-neon-red' : 'text-neon-green'}`} />
          <p className="text-xs text-neon-green">Live — Processing 24 data streams</p>
        </div>

        {/* Priority gauge */}
        <div className="glass-card p-4 mb-6">
          <p className="text-xs text-muted-foreground mb-2">System Priority Level</p>
          <div className="flex items-end gap-1 h-16">
            {[65, 72, 80, 88, 95, 78, 85, 91, 70, 82, 93, 77].map((v, i) => (
              <div key={i} className="flex-1 rounded-t transition-all duration-500" style={{
                height: `${v}%`,
                background: v > 85 ? 'hsl(var(--neon-red))' : v > 70 ? 'hsl(var(--neon-yellow))' : 'hsl(var(--neon-blue))',
                opacity: 0.6 + (v / 250),
              }} />
            ))}
          </div>
        </div>

        {/* Live feed */}
        <h2 className="font-heading text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <Zap className="w-4 h-4 text-neon-yellow" /> Live Incoming Data
        </h2>
        <div className="space-y-2">
          {data.map((d, i) => (
            <div key={d.id} className="glass-card p-3 flex items-center gap-3 animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
              <div className="w-10 text-center">
                <span className={`text-lg font-bold font-heading ${d.priority > 85 ? 'text-neon-red' : d.priority > 70 ? 'text-neon-yellow' : 'text-neon-blue'}`}>
                  {d.priority}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-foreground truncate">{d.type}</p>
                <p className="text-[10px] text-muted-foreground truncate">{d.location}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className={`text-[9px] px-2 py-0.5 rounded-full border font-medium ${statusColors[d.status]}`}>
                  {d.status}
                </span>
                <span className="text-[9px] text-muted-foreground">{d.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
