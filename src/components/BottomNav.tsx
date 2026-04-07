import { Home, Map, AlertTriangle, Users, Menu } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const navItems = [
  { path: '/dashboard', icon: Home, label: 'Home' },
  { path: '/heatmap', icon: Map, label: 'Map' },
  { path: '/report', icon: AlertTriangle, label: 'Report' },
  { path: '/matching', icon: Users, label: 'Match' },
  { path: '/more', icon: Menu, label: 'More' },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-card-strong border-t border-glass-border safe-area-bottom">
      <div className="flex items-center justify-around py-2 px-2 max-w-lg mx-auto">
        {navItems.map(({ path, icon: Icon, label }) => {
          const active = location.pathname === path || (path === '/more' && ['/analytics', '/command', '/community', '/gamification', '/predictions', '/settings', '/notifications'].includes(location.pathname));
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-300 ${
                active
                  ? 'text-primary glow-blue'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className={`w-5 h-5 ${active ? 'drop-shadow-[0_0_8px_hsl(var(--neon-blue)/0.6)]' : ''}`} />
              <span className="text-[10px] font-medium">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
