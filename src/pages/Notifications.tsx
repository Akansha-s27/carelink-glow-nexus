import { AlertTriangle, ClipboardList, Info, Bell } from 'lucide-react';
import type { Notification } from '@/store/appStore';
import BackButton from '@/components/BackButton';

const iconMap = {
  emergency: AlertTriangle,
  assignment: ClipboardList,
  update: Info,
};
const colorMap = {
  emergency: 'text-neon-red bg-neon-red/10',
  assignment: 'text-neon-blue bg-neon-blue/10',
  update: 'text-neon-green bg-neon-green/10',
};

interface Props {
  notifications: Notification[];
  onRead: (id: string) => void;
}

export default function Notifications({ notifications, onRead }: Props) {
  return (
    <div className="min-h-screen pb-24 px-4 pt-6">
      {/* Back Button */}
      <BackButton />
      
      <div className="max-w-lg mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Bell className="w-5 h-5 text-primary" />
          <h1 className="font-heading text-xl font-bold text-foreground">Notifications</h1>
        </div>

        <div className="space-y-3">
          {notifications.map((n, i) => {
            const Icon = iconMap[n.type];
            return (
              <button
                key={n.id}
                onClick={() => onRead(n.id)}
                className={`w-full glass-card p-4 text-left transition-all animate-fade-in-up ${!n.read ? 'neon-border' : 'opacity-70'}`}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${colorMap[n.type]}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h3 className={`text-sm font-semibold ${!n.read ? 'text-foreground' : 'text-muted-foreground'}`}>{n.title}</h3>
                      {!n.read && <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1" />}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{n.message}</p>
                    <p className="text-[10px] text-muted-foreground/60 mt-1">{n.time}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
