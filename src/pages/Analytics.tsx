import { BarChart3, TrendingUp, MapPin, Brain } from 'lucide-react';

const areaData = [
  { zone: 'Zone 1', issues: 45, resolved: 38, active: 7 },
  { zone: 'Zone 2', issues: 72, resolved: 51, active: 21 },
  { zone: 'Zone 3', issues: 33, resolved: 30, active: 3 },
  { zone: 'Zone 4', issues: 89, resolved: 42, active: 47 },
  { zone: 'Zone 5', issues: 28, resolved: 25, active: 3 },
];

const predictions = [
  { label: 'Flood risk Zone 4', prob: 87, trend: 'rising' },
  { label: 'Supply shortage Zone 2', prob: 72, trend: 'stable' },
  { label: 'Medical surge Zone 7', prob: 65, trend: 'rising' },
];

export default function Analytics() {
  const maxIssues = Math.max(...areaData.map(a => a.issues));

  return (
    <div className="min-h-screen pb-24 px-4 pt-6">
      <div className="max-w-lg mx-auto">
        <h1 className="font-heading text-xl font-bold text-foreground mb-1">Analytics</h1>
        <p className="text-xs text-muted-foreground mb-6">NGO resource intelligence dashboard</p>

        {/* Summary cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {[
            { label: 'Total Issues', val: '267', icon: BarChart3, c: 'text-neon-blue' },
            { label: 'Resolution Rate', val: '73%', icon: TrendingUp, c: 'text-neon-green' },
          ].map(s => (
            <div key={s.label} className="glass-card p-4">
              <s.icon className={`w-4 h-4 ${s.c} mb-2`} />
              <p className="font-heading text-2xl font-bold text-foreground">{s.val}</p>
              <p className="text-[10px] text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Bar chart */}
        <div className="glass-card p-4 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-heading font-semibold text-foreground">Area Breakdown</h2>
          </div>
          <div className="space-y-3">
            {areaData.map(a => (
              <div key={a.zone}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">{a.zone}</span>
                  <span className="text-foreground font-medium">{a.issues} issues</span>
                </div>
                <div className="flex gap-0.5 h-3 rounded-full overflow-hidden bg-muted">
                  <div className="h-full bg-neon-green rounded-l-full" style={{ width: `${(a.resolved / maxIssues) * 100}%` }} />
                  <div className="h-full bg-neon-red rounded-r-full" style={{ width: `${(a.active / maxIssues) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-4 mt-3">
            <span className="flex items-center gap-1 text-[10px] text-muted-foreground"><div className="w-2 h-2 rounded-full bg-neon-green" /> Resolved</span>
            <span className="flex items-center gap-1 text-[10px] text-muted-foreground"><div className="w-2 h-2 rounded-full bg-neon-red" /> Active</span>
          </div>
        </div>

        {/* AI Predictions */}
        <div className="glass-card p-4">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="w-4 h-4 text-secondary" />
            <h2 className="text-sm font-heading font-semibold text-foreground">AI Predictions</h2>
          </div>
          <div className="space-y-3">
            {predictions.map(p => (
              <div key={p.label} className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-foreground">{p.label}</p>
                  <p className={`text-[10px] ${p.trend === 'rising' ? 'text-neon-red' : 'text-neon-yellow'}`}>↗ {p.trend}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-foreground">{p.prob}%</span>
                  <div className="w-20 h-1 rounded-full bg-muted mt-1">
                    <div className="h-full rounded-full" style={{ width: `${p.prob}%`, background: p.prob > 80 ? 'hsl(var(--neon-red))' : 'hsl(var(--neon-yellow))' }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
