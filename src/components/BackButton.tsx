import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { CornerUpLeft } from 'lucide-react';

interface BackButtonProps {
  className?: string;
}

export default function BackButton({ className = '' }: BackButtonProps) {
  const navigate = useNavigate();
  const [isPressed, setIsPressed] = useState(false);
  const [ripplePosition, setRipplePosition] = useState({ x: 0, y: 0 });
  const [showRipple, setShowRipple] = useState(false);

  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setRipplePosition({ x, y });
    setShowRipple(true);
    setIsPressed(true);
    
    setTimeout(() => {
      setShowRipple(false);
      setIsPressed(false);
    }, 600);
    
    handleBack();
  };

  const handleTouchStart = () => {
    setIsPressed(true);
  };

  const handleTouchEnd = () => {
    setIsPressed(false);
    handleBack();
  };

  return (
    <button
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`
        relative overflow-hidden
        top-4 left-4 z-50
        w-10 h-10
        flex items-center justify-center
        rounded-xl
        transition-all duration-300 ease-out
        ${isPressed ? 'scale-95' : 'scale-100'}
        ${className}
      `}
      style={{
        background: 'hsl(var(--glass-bg) / 0.6)',
        backdropFilter: 'blur(20px)',
        border: '1px solid hsl(var(--glass-border) / 0.5)',
        boxShadow: isPressed
          ? '0 0 20px hsl(var(--primary) / 0.4), 0 0 40px hsl(var(--primary) / 0.2), inset 0 0 15px hsl(var(--primary) / 0.1)'
          : '0 0 15px hsl(var(--primary) / 0.2), 0 0 30px hsl(var(--primary) / 0.1)',
      }}
    >
      {/* Ripple effect */}
      {showRipple && (
        <span
          className="absolute rounded-full animate-ripple"
          style={{
            left: ripplePosition.x,
            top: ripplePosition.y,
            width: '100px',
            height: '100px',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, hsl(var(--primary) / 0.3) 0%, transparent 70%)',
          }}
        />
      )}

      {/* Glow pulse background */}
      <span
        className={`
          absolute inset-0 rounded-xl
          transition-opacity duration-300
          ${isPressed ? 'opacity-100' : 'opacity-0'}
        `}
        style={{
          background: 'radial-gradient(circle at center, hsl(var(--primary) / 0.15) 0%, transparent 70%)',
        }}
      />

      {/* Icon */}
      <CornerUpLeft
        className={`
          relative z-10 w-5 h-5
          transition-all duration-300
          ${isPressed ? 'text-primary' : 'text-foreground/80'}
        `}
        strokeWidth={2.5}
      />
    </button>
  );
}
