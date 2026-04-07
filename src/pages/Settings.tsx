import { Globe, Palette, Accessibility, Wifi, WifiOff, Bell, Shield, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const languages = ['English', 'Français', 'Español', 'العربية', 'Swahili'];

export default function Settings() {
  const [lang, setLang] = useState('English');
  const [offlineMode, setOfflineMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [highContrast, setHighContrast] = useState(false);

  return (
    <div className="min-h-screen pb-24 px-4 pt-6">
      <div className="max-w-lg mx-auto">
        <h1 className="font-heading text-xl font-bold text-foreground mb-6">Settings</h1>

        <div className="space-y-3">
          {/* Language */}
          <div className="glass-card p-4">
            <div className="flex items-center gap-3 mb-3">
              <Globe className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-foreground">Language</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {languages.map(l => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    lang === l ? 'bg-primary/20 text-primary neon-border' : 'bg-muted/50 text-muted-foreground'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* Toggles */}
          {[
            { icon: notifications ? Bell : Bell, label: 'Push Notifications', desc: 'Emergency & task alerts', val: notifications, set: setNotifications },
            { icon: offlineMode ? WifiOff : Wifi, label: 'Offline Mode', desc: 'Cache data for offline access', val: offlineMode, set: setOfflineMode },
            { icon: Accessibility, label: 'High Contrast', desc: 'Improve visibility', val: highContrast, set: setHighContrast },
          ].map(item => (
            <button key={item.label} onClick={() => item.set(!item.val)} className="w-full glass-card p-4 flex items-center gap-3">
              <item.icon className={`w-5 h-5 ${item.val ? 'text-primary' : 'text-muted-foreground'}`} />
              <div className="flex-1 text-left">
                <p className="text-sm font-semibold text-foreground">{item.label}</p>
                <p className="text-[10px] text-muted-foreground">{item.desc}</p>
              </div>
              <div className={`w-10 h-6 rounded-full transition-all ${item.val ? 'bg-primary' : 'bg-muted'}`}>
                <div className={`w-4 h-4 rounded-full bg-foreground mt-1 transition-all ${item.val ? 'ml-5' : 'ml-1'}`} />
              </div>
            </button>
          ))}

          {/* More items */}
          {[
            { icon: Shield, label: 'Privacy & Security' },
            { icon: Palette, label: 'Theme Customization' },
          ].map(item => (
            <button key={item.label} className="w-full glass-card p-4 flex items-center gap-3">
              <item.icon className="w-5 h-5 text-muted-foreground" />
              <span className="flex-1 text-left text-sm font-semibold text-foreground">{item.label}</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          ))}
        </div>

        <p className="text-center text-[10px] text-muted-foreground mt-8">CareLink AI v1.0.0 · Built with ❤️</p>
      </div>
    </div>
  );
}
