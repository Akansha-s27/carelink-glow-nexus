import { Brain, TrendingUp, AlertTriangle, MapPin } from 'lucide-react';
import BackButton from '@/components/BackButton';

const riskZones = [
  { zone: 'Zone 4', risk: 92, type: 'Flooding', trend: 'Critical - Rising', days: '2-3 days' },
  { zone: 'Zone 2', risk: 78, type: 'Water Crisis', trend: 'High - Stable', days: '5-7 days' },
  { zone: 'Zone 7', risk: 71, type: 'Medical Surge', trend: 'High - Rising', days: '3-5 days' },
  { zone: 'Zone 3', risk: 45, type: 'Infrastructure', trend: 'Moderate - Declining', days: '7-10 days' },
];

const trends = [
  { label: 'Displacement events', direction: 'up', value: '+34%', period: 'Next 2 weeks' },
  { label: 'Medical emergencies', direction: 'up', value: '+18%', period: 'Next week' },
  { label: 'Supply demand', direction: 'up', value: '+52%', period: 'Next 3 days' },
  { label: 'Volunteer availability', direction: 'down', value: '-12%', period: 'Weekends' },
];

export default function Predictions() {
  return (
    <div className="min-h-screen pb-24 px-4 pt-6">
      {/* Back Button */}
      <BackButton />
      
      <div className="max-w-lg mx-auto">
        <div className="flex items-center gap-2 mb-1">
          <Brain className="w-5 h-5 text-secondary" />
          <h1 className="font-heading text-xl font-bold text-foreground">AI Predictions</h1>
        </div>
        <p className="text-xs text-muted-foreground mb-6">Forecasted risk zones and resource trends</p>

        {/* Risk zones */}
        <h2 className="font-heading text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-neon-red" /> Future Risk Zones
        </h2>
        <div className="space-y-3 mb-6">
          {riskZones.map((z, i) => (
            <div key={z.zone} className="glass-card p-4 animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-sm font-semibold text-foreground flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-primary" /> {z.zone}
                  </h3>
                  <p className="text-xs text-muted-foreground">{z.type} · ETA: {z.days}</p>
                </div>
                <span className={`text-lg font-heading font-bold ${z.risk > 80 ? 'text-neon-red' : z.risk > 60 ? 'text-neon-yellow' : 'text-neon-blue'}`}>
                  {z.risk}%
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full rounded-full transition-all" style={{
                  width: `${z.risk}%`,
                  background: z.risk > 80 ? 'hsl(var(--neon-red))' : z.risk > 60 ? 'hsl(var(--neon-yellow))' : 'hsl(var(--neon-blue))',
                }} />
              </div>
              <p className={`text-[10px] mt-1 ${z.trend.includes('Rising') ? 'text-neon-red' : z.trend.includes('Declining') ? 'text-neon-green' : 'text-neon-yellow'}`}>
                {z.trend}
              </p>
            </div>
          ))}
        </div>

        {/* Trends */}
        <h2 className="font-heading text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-neon-cyan" /> Projected Trends
        </h2>
        <div className="space-y-2">
          {trends.map((t, i) => (
            <div key={t.label} className="glass-card p-3 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-foreground">{t.label}</p>
                <p className="text-[10px] text-muted-foreground">{t.period}</p>
              </div>
              <span className={`text-sm font-bold ${t.direction === 'up' ? 'text-neon-red' : 'text-neon-green'}`}>
                {t.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
