import { Heart, Building, Megaphone } from 'lucide-react';
import type { UserRole } from '@/store/appStore';

interface Props {
  onSelectRole: (role: UserRole) => void;
}

const roles = [
  { id: 'volunteer' as const, icon: Heart, title: 'Volunteer', desc: 'Join missions, help communities, make an impact', color: 'neon-blue' },
  { id: 'ngo' as const, icon: Building, title: 'NGO Admin', desc: 'Manage resources, coordinate teams, track outcomes', color: 'neon-purple' },
  { id: 'reporter' as const, icon: Megaphone, title: 'Reporter', desc: 'Report issues, document needs, alert responders', color: 'neon-cyan' },
];

export default function Onboarding({ onSelectRole }: Props) {
  return (
    <div className="min-h-screen flex flex-col px-6 py-12" style={{ background: 'linear-gradient(180deg, hsl(230 25% 7%), hsl(240 20% 10%))' }}>
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <h1 className="font-heading text-2xl font-bold gradient-text mb-2">Welcome to CareLink AI</h1>
        <p className="text-muted-foreground text-sm mb-10">Choose your role to get started</p>

        <div className="space-y-4">
          {roles.map((role, i) => (
            <button
              key={role.id}
              onClick={() => onSelectRole(role.id)}
              className="w-full glass-card p-5 flex items-center gap-4 text-left transition-all duration-300 hover:scale-[1.02] animate-fade-in-up group"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${role.color}/10 group-hover:glow-blue transition-all`}>
                <role.icon className={`w-6 h-6 text-${role.color}`} />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground">{role.title}</h3>
                <p className="text-muted-foreground text-xs mt-0.5">{role.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
