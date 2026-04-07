import { useState } from 'react';
import { MapPin, Clock, Wrench, ChevronRight } from 'lucide-react';

interface Props {
  onComplete: (name: string) => void;
}

const skillOptions = ['First Aid', 'Translation', 'Driving', 'Cooking', 'Tech Support', 'Construction', 'Counseling', 'Teaching'];
const availOptions = ['Weekdays', 'Weekends', 'Mornings', 'Evenings', 'On-Call 24/7'];

export default function ProfileSetup({ onComplete }: Props) {
  const [name, setName] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedAvail, setSelectedAvail] = useState<string[]>([]);
  const [location, setLocation] = useState('');

  const toggleSkill = (s: string) => setSelectedSkills(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  const toggleAvail = (a: string) => setSelectedAvail(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]);

  return (
    <div className="min-h-screen px-6 py-8" style={{ background: 'linear-gradient(180deg, hsl(230 25% 7%), hsl(240 20% 10%))' }}>
      <div className="max-w-md mx-auto">
        <h1 className="font-heading text-2xl font-bold gradient-text mb-1">Set Up Profile</h1>
        <p className="text-muted-foreground text-sm mb-8">Help us match you with the right tasks</p>

        <div className="space-y-6">
          <div className="glass-card p-4">
            <label className="text-xs text-muted-foreground font-medium mb-2 block">Full Name</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full bg-muted/50 rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:ring-1 focus:ring-primary transition"
            />
          </div>

          <div className="glass-card p-4">
            <div className="flex items-center gap-2 mb-3">
              <Wrench className="w-4 h-4 text-primary" />
              <label className="text-xs text-muted-foreground font-medium">Skills</label>
            </div>
            <div className="flex flex-wrap gap-2">
              {skillOptions.map(s => (
                <button
                  key={s}
                  onClick={() => toggleSkill(s)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    selectedSkills.includes(s)
                      ? 'bg-primary/20 text-primary neon-border'
                      : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="glass-card p-4">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-secondary" />
              <label className="text-xs text-muted-foreground font-medium">Availability</label>
            </div>
            <div className="flex flex-wrap gap-2">
              {availOptions.map(a => (
                <button
                  key={a}
                  onClick={() => toggleAvail(a)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    selectedAvail.includes(a)
                      ? 'bg-secondary/20 text-secondary neon-border'
                      : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          <div className="glass-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-neon-green" />
              <label className="text-xs text-muted-foreground font-medium">Location</label>
            </div>
            <input
              value={location}
              onChange={e => setLocation(e.target.value)}
              placeholder="City or area (auto-detected)"
              className="w-full bg-muted/50 rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:ring-1 focus:ring-primary transition"
            />
            <p className="text-[10px] text-neon-green mt-1.5">📍 Suggested: Nairobi, Kenya</p>
          </div>

          <button
            onClick={() => onComplete(name || 'Alex')}
            disabled={!name && selectedSkills.length === 0}
            className="btn-glow w-full text-primary-foreground flex items-center justify-center gap-2 disabled:opacity-40"
          >
            Get Started <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
