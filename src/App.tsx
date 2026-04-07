import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAppState } from "@/store/appStore";
import BottomNav from "@/components/BottomNav";
import SplashScreen from "@/pages/SplashScreen";
import Onboarding from "@/pages/Onboarding";
import ProfileSetup from "@/pages/ProfileSetup";
import Dashboard from "@/pages/Dashboard";
import Heatmap from "@/pages/Heatmap";
import ReportIssue from "@/pages/ReportIssue";
import SmartMatching from "@/pages/SmartMatching";
import Notifications from "@/pages/Notifications";
import Analytics from "@/pages/Analytics";
import CommandCenter from "@/pages/CommandCenter";
import CommunityImpact from "@/pages/CommunityImpact";
import Gamification from "@/pages/Gamification";
import Predictions from "@/pages/Predictions";
import Settings from "@/pages/Settings";
import MoreMenu from "@/pages/MoreMenu";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

function AppContent() {
  const { state, setSplashSeen, setRole, completeProfile, markNotificationRead } = useAppState();

  if (!state.hasSeenSplash) {
    return <SplashScreen onComplete={setSplashSeen} />;
  }

  if (!state.hasOnboarded) {
    return <Onboarding onSelectRole={setRole} />;
  }

  if (!state.profileComplete) {
    return <ProfileSetup onComplete={completeProfile} />;
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard userName={state.userName} />} />
          <Route path="/heatmap" element={<Heatmap />} />
          <Route path="/report" element={<ReportIssue />} />
          <Route path="/matching" element={<SmartMatching />} />
          <Route path="/notifications" element={<Notifications notifications={state.notifications} onRead={markNotificationRead} />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/command" element={<CommandCenter />} />
          <Route path="/community" element={<CommunityImpact />} />
          <Route path="/gamification" element={<Gamification />} />
          <Route path="/predictions" element={<Predictions />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/more" element={<MoreMenu />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <BottomNav />
      </div>
    </BrowserRouter>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <AppContent />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
