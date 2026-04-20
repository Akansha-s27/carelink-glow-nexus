import { useState, useEffect } from 'react';
import { Heart, CheckCircle, Users, TrendingUp } from 'lucide-react';
import BackButton from '@/components/BackButton';

const counters = [
  { label: 'People Helped', value: 12847, icon: Heart, color: 'text-neon-blue', prefix: '' },
  { label: 'Tasks Completed', value: 3421, icon: CheckCircle, color: 'text-neon-green', prefix: '' },
  { label: 'Active Volunteers', value: 892, icon: Users, color: 'text-neon-purple', prefix: '' },
  { label: 'Hours Contributed', value: 28450, icon: TrendingUp, color: 'text-neon-cyan', prefix: '' },
];

const recentActivity = [
  { user: 'Sarah K.', action: 'delivered medical supplies', zone: 'Zone 4', time: '3m ago' },
  { user: 'James M.', action: 'completed food distribution', zone: 'Zone 1', time: '8m ago' },
  { user: 'Amara O.', action: 'set up water purification', zone: 'Zone 2', time: '15m ago' },
  { user: 'David L.', action: 'rebuilt shelter structure', zone: 'Zone 7', time: '22m ago' },
  { user: 'Fatima A.', action: 'provided translation services', zone: 'Zone 5', time: '30m ago' },
];

export default function CommunityImpact() {
  const [animated, setAnimated] = useState(false);
  useEffect(() => { setAnimated(true); }, []);

  return (
    <div className="min-h-screen pb-24 px-4 pt-6">
      {/* Back Button */}
      <BackButton />
      
      <div className="max-w-lg mx-auto">
        <h1 className="font-heading text-xl font-bold text-foreground mb-1">Community Impact</h1>
        <p className="text-xs text-muted-foreground mb-6">Real-time humanitarian impact metrics</p>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {counters.map((c, i) => (
            <div key={c.label} className="glass-card p-4 animate-scale-in" style={{ animationDelay: `${i * 0.1}s` }}>
              <c.icon className={`w-5 h-5 ${c.color} mb-2`} />
              <p className="font-heading text-2xl font-bold text-foreground animate-count-up">
                {animated ? c.value.toLocaleString() : '0'}
              </p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{c.label}</p>
            </div>
          ))}
        </div>

        <h2 className="font-heading text-sm font-semibold text-foreground mb-3">Live Activity Feed</h2>
        <div className="space-y-2">
          {recentActivity.map((a, i) => (
            <div key={i} className="glass-card p-3 flex items-center gap-3 animate-slide-in-left" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-primary">{a.user[0]}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-foreground"><span className="font-semibold">{a.user}</span> {a.action}</p>
                <p className="text-[10px] text-muted-foreground">{a.zone} · {a.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
