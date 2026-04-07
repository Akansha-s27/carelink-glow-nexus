import { useState, useCallback } from 'react';

export type UserRole = 'volunteer' | 'ngo' | 'reporter' | null;

export interface AppState {
  hasSeenSplash: boolean;
  hasOnboarded: boolean;
  role: UserRole;
  profileComplete: boolean;
  userName: string;
  notifications: Notification[];
}

export interface Notification {
  id: string;
  type: 'emergency' | 'assignment' | 'update';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const DUMMY_NOTIFICATIONS: Notification[] = [
  { id: '1', type: 'emergency', title: 'Flash Flood Alert', message: 'Urgent: Flooding in Zone 4, volunteers needed immediately', time: '2m ago', read: false },
  { id: '2', type: 'assignment', title: 'New Task Assigned', message: 'Medical supply delivery to Camp B - 2.3km away', time: '15m ago', read: false },
  { id: '3', type: 'update', title: 'Task Completed', message: 'Food distribution at Zone 2 marked complete', time: '1h ago', read: true },
  { id: '4', type: 'emergency', title: 'Earthquake Aftershock', message: 'Moderate aftershock detected in northern region', time: '2h ago', read: true },
  { id: '5', type: 'assignment', title: 'Volunteer Check-in', message: 'Please confirm availability for tomorrow\'s deployment', time: '3h ago', read: true },
];

export function useAppState() {
  const [state, setState] = useState<AppState>({
    hasSeenSplash: false,
    hasOnboarded: false,
    role: null,
    profileComplete: false,
    userName: '',
    notifications: DUMMY_NOTIFICATIONS,
  });

  const setSplashSeen = useCallback(() => setState(s => ({ ...s, hasSeenSplash: true })), []);
  const setRole = useCallback((role: UserRole) => setState(s => ({ ...s, role, hasOnboarded: true })), []);
  const completeProfile = useCallback((name: string) => setState(s => ({ ...s, profileComplete: true, userName: name })), []);
  const markNotificationRead = useCallback((id: string) => {
    setState(s => ({
      ...s,
      notifications: s.notifications.map(n => n.id === id ? { ...n, read: true } : n),
    }));
  }, []);

  return { state, setSplashSeen, setRole, completeProfile, markNotificationRead };
}
