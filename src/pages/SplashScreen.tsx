import { useEffect } from 'react';
import logo from '@/assets/carelink-logo.png';

interface Props {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: Props) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center z-50" style={{ background: 'linear-gradient(135deg, hsl(230 25% 7%), hsl(250 30% 12%), hsl(220 30% 10%))' }}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, hsl(220 90% 56% / 0.4), transparent)' }} />
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, hsl(270 60% 55% / 0.4), transparent)' }} />
      </div>

      <div className="relative animate-scale-in">
        <div className="float-animation">
          <img src={logo} alt="CareLink AI" width={120} height={120} className="drop-shadow-[0_0_30px_hsl(var(--neon-blue)/0.5)]" />
        </div>
      </div>

      <h1 className="font-heading text-3xl font-bold mt-6 gradient-text animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
        CareLink AI
      </h1>
      <p className="text-muted-foreground text-sm mt-2 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
        Smart Humanitarian Resource Allocation
      </p>

      <div className="mt-12 animate-fade-in-up" style={{ animationDelay: '1s' }}>
        <div className="w-48 h-1 rounded-full overflow-hidden" style={{ background: 'hsl(var(--muted))' }}>
          <div className="h-full rounded-full shimmer" style={{ background: 'var(--gradient-primary)', animation: 'loadBar 2s ease-in-out forwards' }} />
        </div>
      </div>

      <style>{`
        @keyframes loadBar {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}
