import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const noBackRoutes = ['/dashboard', '/', '/onboarding', '/profile-setup'];

export default function GlobalBackButton() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSwiping, setIsSwiping] = useState(false);
  const [swipeProgress, setSwipeProgress] = useState(0);
  const [showIndicator, setShowIndicator] = useState(false);
  const touchStartRef = useRef<number | null>(null);
  const touchCurrentRef = useRef<number | null>(null);
  const indicatorTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const minSwipeDistance = 80;
  const edgeThreshold = 30; // px from left edge to activate

  useEffect(() => {
    // Show subtle indicator briefly on page load to hint at gesture
    if (!noBackRoutes.includes(location.pathname)) {
      setShowIndicator(true);
      indicatorTimeoutRef.current = setTimeout(() => {
        setShowIndicator(false);
      }, 2000);
    }

    return () => {
      if (indicatorTimeoutRef.current) {
        clearTimeout(indicatorTimeoutRef.current);
      }
    };
  }, [location.pathname]);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touchX = e.targetTouches[0].clientX;
    
    // Only activate if starting from left edge
    if (touchX <= edgeThreshold) {
      touchStartRef.current = touchX;
      touchCurrentRef.current = touchX;
      setIsSwiping(true);
      setSwipeProgress(0);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSwiping || touchStartRef.current === null) return;
    
    touchCurrentRef.current = e.targetTouches[0].clientX;
    const distance = touchCurrentRef.current - touchStartRef.current;
    const progress = Math.min(Math.max(distance / minSwipeDistance, 0), 1);
    setSwipeProgress(progress);
  };

  const handleTouchEnd = () => {
    if (!isSwiping || touchStartRef.current === null || touchCurrentRef.current === null) {
      setIsSwiping(false);
      setSwipeProgress(0);
      return;
    }
    
    const distance = touchCurrentRef.current - touchStartRef.current;
    
    if (distance >= minSwipeDistance) {
      // Trigger navigation with smooth transition
      navigate(-1);
    }
    
    setIsSwiping(false);
    setSwipeProgress(0);
  };

  // Mouse event handlers for desktop testing
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.clientX <= edgeThreshold) {
      touchStartRef.current = e.clientX;
      touchCurrentRef.current = e.clientX;
      setIsSwiping(true);
      setSwipeProgress(0);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isSwiping || touchStartRef.current === null) return;
    
    touchCurrentRef.current = e.clientX;
    const distance = touchCurrentRef.current - touchStartRef.current;
    const progress = Math.min(Math.max(distance / minSwipeDistance, 0), 1);
    setSwipeProgress(progress);
  };

  const handleMouseUp = () => {
    handleTouchEnd();
  };

  if (noBackRoutes.includes(location.pathname)) {
    return null;
  }

  return (
    <div 
      className="fixed z-40 left-0 top-0 bottom-0 w-8 pointer-events-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{ pointerEvents: isSwiping ? 'auto' : 'none' }}
    >
      {/* Semi-transparent edge indicator */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-[2px] transition-all duration-300 ease-out"
        style={{
          background: `linear-gradient(
            to bottom,
            transparent 0%,
            hsl(var(--primary) / ${0.1 + swipeProgress * 0.4}) 20%,
            hsl(var(--primary) / ${0.2 + swipeProgress * 0.5}) 50%,
            hsl(var(--primary) / ${0.1 + swipeProgress * 0.4}) 80%,
            transparent 100%
          )`,
          boxShadow: isSwiping || showIndicator 
            ? `0 0 ${8 + swipeProgress * 12}px ${2 + swipeProgress * 4}px hsl(var(--primary) / ${0.15 + swipeProgress * 0.25})`
            : 'none',
          opacity: isSwiping ? 1 : showIndicator ? 0.6 : 0,
        }}
      />
      
      {/* Subtle gradient overlay during swipe */}
      <div 
        className="absolute left-0 top-0 bottom-0 transition-opacity duration-200"
        style={{
          width: `${swipeProgress * 100}px`,
          background: 'linear-gradient(to right, hsl(var(--background) / 0.3), transparent)',
          opacity: swipeProgress,
        }}
      />
    </div>
  );
}
