import { ChevronLeft } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function GlobalBackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  const noBackRoutes = ['/', '/dashboard'];

  if (noBackRoutes.includes(location.pathname)) {
    return null;
  }

  return (
    <div className="px-4 pt-4 bg-background w-full">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-muted-foreground hover:text-foreground transition-colors w-fit p-1 -ml-1 rounded-lg"
      >
        <ChevronLeft className="w-5 h-5" />
        <span className="text-sm font-medium">Back</span>
      </button>
    </div>
  );
}
