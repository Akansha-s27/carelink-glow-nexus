import { Bell, TrendingUp, AlertTriangle, MapPin, Users, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const stats = [
  { label: 'People Helped', value: '12,847', icon: Users, change: '+12%', color: 'text-neon-blue' },
  { label: 'Active Tasks', value: '234', icon: Activity, change: '+8%', color: 'text-neon-purple' },
  { label: 'Response Time', value: '14m', icon: TrendingUp, change: '-23%', color: 'text-neon-green' },
];

const urgentNeeds = [
  { id: 1, title: 'Medical Supplies Shortage', zone: 'Zone 4', severity: 'critical', score: 98, people: 450 },
  { id: 2, title: 'Water Contamination', zone: 'Zone 2', severity: 'high', score: 87, people: 320 },
  { id: 3, title: 'Shelter Damage', zone: 'Zone 7', severity: 'high', score: 82, people: 180 },
  { id: 4, title: 'Food Distribution Needed', zone: 'Zone 1', severity: 'medium', score: 65, people: 260 },
];

const severityColors: Record<string, string> = {
  critical: 'text-neon-red bg-neon-red/10 border-neon-red/30',
  high: 'text-neon-yellow bg-neon-yellow/10 border-neon-yellow/30',
  medium: 'text-neon-blue bg-neon-blue/10 border-neon-blue/30',
};

export default function Dashboard({ userName }: { userName: string }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pb-24 px-4 pt-6">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-muted-foreground text-xs">Welcome back,</p>
            <h1 className="font-heading text-xl font-bold text-foreground">{userName || 'Alex'}</h1>
          </div>
          <button onClick={() => navigate('/notifications')} className="relative p-2 glass-card">
            <Bell className="w-5 h-5 text-foreground" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-neon-red text-[9px] font-bold flex items-center justify-center text-primary-foreground">3</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {stats.map((s, i) => (
            <div key={s.label} className="glass-card p-3 animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <s.icon className={`w-4 h-4 ${s.color} mb-1`} />
              <p className="font-heading text-lg font-bold text-foreground">{s.value}</p>
              <p className="text-[10px] text-muted-foreground">{s.label}</p>
              <p className={`text-[10px] mt-0.5 ${s.change.startsWith('+') ? 'text-neon-green' : 'text-neon-red'}`}>{s.change}</p>
            </div>
          ))}
        </div>

        {/* Mini Map Preview */}
        <button onClick={() => navigate('/heatmap')} className="w-full glass-card p-4 mb-6 group">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-heading text-sm font-semibold text-foreground">Live Heatmap</h2>
            <MapPin className="w-4 h-4 text-primary" />
          </div>
          <div className="w-full h-32 rounded-lg overflow-hidden relative" style={{ background: 'linear-gradient(135deg, hsl(230 20% 15%), hsl(240 20% 18%))' }}>
            {/* Simulated hotspots */}
            <div className="absolute top-6 left-8 w-8 h-8 rounded-full bg-neon-red/30 animate-ping" />
            <div className="absolute top-6 left-8 w-4 h-4 rounded-full bg-neon-red/60 mt-2 ml-2" />
            <div className="absolute top-16 right-12 w-6 h-6 rounded-full bg-neon-yellow/30 animate-ping" style={{ animationDelay: '0.5s' }} />
            <div className="absolute top-16 right-12 w-3 h-3 rounded-full bg-neon-yellow/60 mt-1.5 ml-1.5" />
            <div className="absolute bottom-8 left-1/3 w-5 h-5 rounded-full bg-neon-green/30 animate-ping" style={{ animationDelay: '1s' }} />
            <div className="absolute bottom-8 left-1/3 w-2.5 h-2.5 rounded-full bg-neon-green/60 mt-1 ml-1" />
            <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 gap-px opacity-10">
              {Array.from({ length: 24 }).map((_, i) => <div key={i} className="border border-primary/20" />)}
            </div>
            <p className="absolute bottom-2 right-3 text-[10px] text-muted-foreground">Tap to expand →</p>
          </div>
        </button>

        {/* Urgent Needs */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-heading text-sm font-semibold text-foreground flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-neon-red" /> AI-Ranked Urgent Needs
          </h2>
        </div>
        <div className="space-y-3">
          {urgentNeeds.map((need, i) => (
            <div key={need.id} className="glass-card p-4 animate-slide-in-left" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-foreground">{need.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{need.zone} · {need.people} affected</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${severityColors[need.severity]}`}>
                    {need.severity}
                  </span>
                  <span className="text-[10px] text-muted-foreground">Score: {need.score}</span>
                </div>
              </div>
              <div className="mt-2 w-full h-1 rounded-full bg-muted overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${need.score}%`, background: need.severity === 'critical' ? 'hsl(var(--neon-red))' : need.severity === 'high' ? 'hsl(var(--neon-yellow))' : 'hsl(var(--neon-blue))' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
