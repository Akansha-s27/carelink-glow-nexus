import { Trophy, Medal, Star, Flame, Shield, Zap } from 'lucide-react';
import BackButton from '@/components/BackButton';

const badges = [
  { icon: Shield, label: 'First Responder', desc: 'Completed 10 urgent tasks', earned: true, color: 'text-neon-blue' },
  { icon: Flame, label: 'On Fire', desc: '7-day activity streak', earned: true, color: 'text-neon-red' },
  { icon: Star, label: 'Top Helper', desc: 'Helped 100+ people', earned: true, color: 'text-neon-yellow' },
  { icon: Zap, label: 'Speed Runner', desc: 'Average response < 10min', earned: false, color: 'text-neon-purple' },
  { icon: Medal, label: 'Community Hero', desc: 'Earn 5000+ points', earned: false, color: 'text-neon-green' },
];

const leaderboard = [
  { rank: 1, name: 'Sarah K.', points: 8240, tasks: 142 },
  { rank: 2, name: 'James M.', points: 7650, tasks: 128 },
  { rank: 3, name: 'You', points: 6320, tasks: 98 },
  { rank: 4, name: 'Amara O.', points: 5810, tasks: 91 },
  { rank: 5, name: 'David L.', points: 5200, tasks: 84 },
];

export default function Gamification() {
  return (
    <div className="min-h-screen pb-24 px-4 pt-6">
      {/* Back Button */}
      <BackButton />
      
      <div className="max-w-lg mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Trophy className="w-5 h-5 text-neon-yellow" />
          <h1 className="font-heading text-xl font-bold text-foreground">Achievements</h1>
        </div>

        {/* Points summary */}
        <div className="glass-card p-5 text-center mb-6 glow-blue">
          <p className="text-xs text-muted-foreground mb-1">Your Points</p>
          <p className="font-heading text-4xl font-bold gradient-text">6,320</p>
          <p className="text-xs text-muted-foreground mt-1">Rank #3 · 98 tasks completed</p>
        </div>

        {/* Badges */}
        <h2 className="font-heading text-sm font-semibold text-foreground mb-3">Badges</h2>
        <div className="grid grid-cols-3 gap-3 mb-6">
          {badges.map((b, i) => (
            <div key={b.label} className={`glass-card p-3 text-center animate-scale-in ${!b.earned ? 'opacity-40' : ''}`} style={{ animationDelay: `${i * 0.08}s` }}>
              <b.icon className={`w-6 h-6 mx-auto mb-1 ${b.color}`} />
              <p className="text-[10px] font-semibold text-foreground">{b.label}</p>
              <p className="text-[8px] text-muted-foreground mt-0.5">{b.desc}</p>
            </div>
          ))}
        </div>

        {/* Leaderboard */}
        <h2 className="font-heading text-sm font-semibold text-foreground mb-3">Leaderboard</h2>
        <div className="space-y-2">
          {leaderboard.map((l, i) => (
            <div key={l.rank} className={`glass-card p-3 flex items-center gap-3 ${l.name === 'You' ? 'neon-border' : ''}`}>
              <span className={`w-7 h-7 rounded-full flex items-center justify-center font-heading font-bold text-xs ${
                l.rank === 1 ? 'bg-neon-yellow/20 text-neon-yellow' :
                l.rank === 2 ? 'bg-muted text-muted-foreground' :
                l.rank === 3 ? 'bg-neon-blue/20 text-neon-blue' : 'bg-muted/50 text-muted-foreground'
              }`}>
                {l.rank}
              </span>
              <div className="flex-1">
                <p className={`text-sm font-semibold ${l.name === 'You' ? 'text-primary' : 'text-foreground'}`}>{l.name}</p>
                <p className="text-[10px] text-muted-foreground">{l.tasks} tasks</p>
              </div>
              <span className="text-sm font-heading font-bold text-foreground">{l.points.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
