import { useState } from 'react';
import { Camera, Mic, MapPin, Send, Tag, AlertTriangle } from 'lucide-react';

const categories = ['Medical', 'Food & Water', 'Shelter', 'Infrastructure', 'Safety', 'Other'];

export default function ReportIssue() {
  const [text, setText] = useState('');
  const [category, setCategory] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 pb-24">
        <div className="animate-scale-in glass-card p-8 text-center max-w-sm">
          <div className="w-16 h-16 rounded-full bg-neon-green/20 flex items-center justify-center mx-auto mb-4 glow-green">
            <AlertTriangle className="w-8 h-8 text-neon-green" />
          </div>
          <h2 className="font-heading text-xl font-bold text-foreground mb-2">Report Submitted</h2>
          <p className="text-sm text-muted-foreground mb-1">AI Priority Score: <span className="text-neon-yellow font-semibold">87/100</span></p>
          <p className="text-xs text-muted-foreground mb-4">Category: <span className="text-primary">{category || 'Medical'}</span></p>
          <p className="text-xs text-muted-foreground">Nearest volunteers notified. ETA: 12 min</p>
          <button onClick={() => { setSubmitted(false); setText(''); setCategory(''); setImageUploaded(false); }} className="btn-glow mt-6 w-full text-primary-foreground text-sm">
            Report Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24 px-4 pt-6">
      <div className="max-w-lg mx-auto">
        <h1 className="font-heading text-xl font-bold text-foreground mb-1">Report Issue</h1>
        <p className="text-xs text-muted-foreground mb-6">AI will auto-categorize and prioritize your report</p>

        <div className="space-y-4">
          {/* Image Upload */}
          <button onClick={() => setImageUploaded(true)} className={`w-full glass-card p-6 flex flex-col items-center gap-2 transition-all ${imageUploaded ? 'neon-border' : ''}`}>
            <Camera className={`w-8 h-8 ${imageUploaded ? 'text-neon-green' : 'text-muted-foreground'}`} />
            <span className="text-xs text-muted-foreground">{imageUploaded ? '✓ Image captured' : 'Tap to add photo'}</span>
          </button>

          {/* Voice Input */}
          <button
            onClick={() => { setIsRecording(!isRecording); if (isRecording) setText(prev => prev + ' Flooding near the main bridge, water level rising fast.'); }}
            className={`w-full glass-card p-4 flex items-center gap-3 transition-all ${isRecording ? 'neon-border pulse-glow' : ''}`}
          >
            <Mic className={`w-5 h-5 ${isRecording ? 'text-neon-red' : 'text-muted-foreground'}`} />
            <span className="text-sm text-muted-foreground">{isRecording ? 'Recording... tap to stop' : 'Tap to record voice'}</span>
            {isRecording && <div className="ml-auto flex gap-0.5">{[1,2,3,4,5].map(i => <div key={i} className="w-1 bg-neon-red rounded-full animate-pulse" style={{ height: `${8 + Math.random() * 12}px`, animationDelay: `${i * 0.1}s` }} />)}</div>}
          </button>

          {/* Text Input */}
          <div className="glass-card p-4">
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Describe the issue..."
              rows={4}
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 outline-none resize-none"
            />
          </div>

          {/* Location */}
          <div className="glass-card p-4 flex items-center gap-3">
            <MapPin className="w-5 h-5 text-neon-green" />
            <div>
              <p className="text-sm text-foreground">Auto-detected Location</p>
              <p className="text-[10px] text-neon-green">📍 -1.2921, 36.8219 · Nairobi Central</p>
            </div>
          </div>

          {/* AI Category */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Tag className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground font-medium">AI Category (tap to change)</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(c => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    category === c ? 'bg-primary/20 text-primary neon-border' : 'bg-muted/50 text-muted-foreground'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => setSubmitted(true)}
            disabled={!text && !imageUploaded}
            className="btn-glow w-full text-primary-foreground flex items-center justify-center gap-2 disabled:opacity-40"
          >
            <Send className="w-4 h-4" /> Submit Report
          </button>
        </div>
      </div>
    </div>
  );
}
