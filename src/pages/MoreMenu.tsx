import { useNavigate } from 'react-router-dom';
import { BarChart3, Brain, Heart, Trophy, TrendingUp, Settings, Bell, WifiOff } from 'lucide-react';
import BackButton from '@/components/BackButton';

const items = [
  { path: '/notifications', icon: Bell, label: 'Notifications', desc: 'Alerts & updates', color: 'text-neon-red' },
  { path: '/analytics', icon: BarChart3, label: 'Analytics', desc: 'NGO dashboard & insights', color: 'text-neon-blue' },
  { path: '/command', icon: Brain, label: 'AI Command Center', desc: 'Live data & priority scoring', color: 'text-neon-purple' },
  { path: '/community', icon: Heart, label: 'Community Impact', desc: 'Live counters & activity', color: 'text-neon-cyan' },
  { path: '/gamification', icon: Trophy, label: 'Achievements', desc: 'Badges, points & leaderboard', color: 'text-neon-yellow' },
  { path: '/predictions', icon: TrendingUp, label: 'Predictions', desc: 'Future risk zones & trends', color: 'text-neon-green' },
  { path: '/settings', icon: Settings, label: 'Settings', desc: 'Language, theme & more', color: 'text-muted-foreground' },
];

export default function MoreMenu() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pb-24 px-4 pt-6">
      {/* Back Button */}
      <BackButton />
      
      <div className="max-w-lg mx-auto">
        <h1 className="font-heading text-xl font-bold text-foreground mb-6">More</h1>
        <div className="space-y-2">
          {items.map((item, i) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="w-full glass-card p-4 flex items-center gap-4 text-left transition-all hover:scale-[1.01] animate-fade-in-up"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-muted/50`}>
                <item.icon className={`w-5 h-5 ${item.color}`} />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{item.label}</p>
                <p className="text-[10px] text-muted-foreground">{item.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
