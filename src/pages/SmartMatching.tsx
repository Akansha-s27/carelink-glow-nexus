import { MapPin, Clock, Star, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const tasks = [
  { id: 1, title: 'Medical Supply Delivery', zone: 'Zone 4', distance: '1.2 km', match: 96, skills: ['First Aid', 'Driving'], urgency: 'Critical', time: '~30 min' },
  { id: 2, title: 'Water Purification Setup', zone: 'Zone 2', distance: '2.8 km', match: 89, skills: ['Tech Support'], urgency: 'High', time: '~1 hr' },
  { id: 3, title: 'Food Distribution', zone: 'Zone 1', distance: '0.5 km', match: 84, skills: ['Cooking'], urgency: 'Medium', time: '~2 hrs' },
  { id: 4, title: 'Shelter Construction', zone: 'Zone 7', distance: '3.1 km', match: 72, skills: ['Construction'], urgency: 'High', time: '~3 hrs' },
  { id: 5, title: 'Translation Support', zone: 'Zone 5', distance: '1.7 km', match: 68, skills: ['Translation'], urgency: 'Medium', time: '~45 min' },
];

export default function SmartMatching() {
  const [accepted, setAccepted] = useState<number[]>([]);

  return (
    <div className="min-h-screen pb-24 px-4 pt-6">
      <div className="max-w-lg mx-auto">
        <h1 className="font-heading text-xl font-bold text-foreground mb-1">Smart Matching</h1>
        <p className="text-xs text-muted-foreground mb-6">AI-matched tasks based on your skills & location</p>

        <div className="space-y-3">
          {tasks.map((task, i) => (
            <div key={task.id} className={`glass-card p-4 animate-fade-in-up ${accepted.includes(task.id) ? 'neon-border' : ''}`} style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-sm font-semibold text-foreground">{task.title}</h3>
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full" style={{ background: `hsl(var(--neon-blue) / ${task.match / 200})` }}>
                  <Star className="w-3 h-3 text-neon-blue" />
                  <span className="text-xs font-bold text-neon-blue">{task.match}%</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {task.zone} · {task.distance}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {task.time}</span>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-3">
                {task.skills.map(s => (
                  <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary">{s}</span>
                ))}
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${task.urgency === 'Critical' ? 'bg-neon-red/10 text-neon-red' : task.urgency === 'High' ? 'bg-neon-yellow/10 text-neon-yellow' : 'bg-neon-blue/10 text-neon-blue'}`}>
                  {task.urgency}
                </span>
              </div>

              <div className="w-full h-1 rounded-full bg-muted overflow-hidden mb-3">
                <div className="h-full rounded-full transition-all duration-500" style={{ width: `${task.match}%`, background: 'var(--gradient-primary)' }} />
              </div>

              <button
                onClick={() => setAccepted(prev => prev.includes(task.id) ? prev : [...prev, task.id])}
                className={`w-full py-2 rounded-lg text-xs font-semibold transition-all ${
                  accepted.includes(task.id)
                    ? 'bg-neon-green/20 text-neon-green'
                    : 'btn-glow text-primary-foreground'
                }`}
              >
                {accepted.includes(task.id) ? '✓ Accepted' : 'Accept Task'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
