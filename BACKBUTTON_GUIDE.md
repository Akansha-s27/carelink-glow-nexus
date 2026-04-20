# Back Button Component - Design & Usage Guide

## 🎨 Design Overview

A modern, minimal back button featuring:
- **Unique Icon**: `CornerUpLeft` from Lucide React (not a traditional arrow)
- **Softly Highlighted**: Glass-morphism card with subtle background
- **Gentle Glow**: Ambient primary color glow that intensifies on interaction
- **Ripple Effect**: Expanding radial gradient on tap for visual feedback
- **Top-Left Position**: Fixed position for consistent access

## ✨ Visual Effects

### 1. **Ambient Glow (Default State)**
```css
box-shadow: 0 0 15px hsl(var(--primary) / 0.2), 
            0 0 30px hsl(var(--primary) / 0.1)
```
- Soft, pulsing glow around the button
- Creates discoverability without being intrusive
- Uses your app's primary color theme

### 2. **Enhanced Glow (Pressed State)**
```css
box-shadow: 0 0 20px hsl(var(--primary) / 0.4), 
            0 0 40px hsl(var(--primary) / 0.2), 
            inset 0 0 15px hsl(var(--primary) / 0.1)
```
- Glow intensifies when button is pressed
- Adds inner glow for depth
- Scale reduces slightly (scale-95) for tactile feel

### 3. **Ripple Effect (On Tap)**
- Expanding radial gradient from tap point
- Fades from 30% opacity to 0%
- Animates over 600ms with ease-out timing
- Provides clear visual confirmation of interaction

### 4. **Icon Color Transition**
- **Default**: `text-foreground/80` (subtle)
- **Pressed**: `text-primary` (highlighted)
- Smooth 300ms transition

## 📦 Component Usage

### Basic Implementation

```tsx
import BackButton from '@/components/BackButton';

export default function YourPage() {
  return (
    <div className="min-h-screen">
      <BackButton />
      {/* Your page content */}
    </div>
  );
}
```

### With Custom Positioning

```tsx
<BackButton className="top-6 left-6" />
```

### With Additional Styling

```tsx
<BackButton className="!bg-black/40" />
```

## 🔧 Customization Options

### Change Icon
Edit `src/components/BackButton.tsx`:

```tsx
// Import alternative icons from lucide-react
import { ArrowLeft, ChevronLeft, CornerUpLeft, Reply } from 'lucide-react';

// Use in component
<CornerUpLeft ... /> // Current
<ArrowLeft ... />    // Traditional arrow
<ChevronLeft ... />  // Chevron style
<Reply ... />        // Reply/reverse icon
```

### Adjust Glow Intensity

```tsx
// In the style prop, modify boxShadow values
boxShadow: isPressed
  ? '0 0 25px hsl(var(--primary) / 0.5), 0 0 50px hsl(var(--primary) / 0.3)' // Stronger
  : '0 0 10px hsl(var(--primary) / 0.15), 0 0 20px hsl(var(--primary) / 0.05)' // Subtler
```

### Modify Ripple Size/Speed

```tsx
// Ripple span
style={{
  width: '120px',    // Larger ripple
  height: '120px',
  // ...
}}

// Animation duration
className="absolute rounded-full animate-ripple"
// Change in index.css: @keyframes ripple
animation: ripple 0.8s ease-out; // Slower
```

### Change Button Size

```tsx
className={`
  // ...
  w-12 h-12  // Larger button
  // w-8 h-8  // Smaller button
  // ...
`}
```

### Adjust Border Radius

```tsx
className={`
  // ...
  rounded-full  // Circular button
  // rounded-xl   // Current (rounded square)
  // rounded-lg   // Less rounded
  // ...
`}
```

## 🎯 Best Practices

### 1. **Positioning**
- Keep in top-left corner for consistency
- Use fixed positioning (already included)
- Ensure adequate padding from screen edges (16px recommended)

### 2. **When to Use**
- Secondary navigation pages (Settings, Analytics, etc.)
- Detail views (Report details, User profiles)
- Sub-screens accessed from main navigation

### 3. **When NOT to Use**
- Root-level pages (Dashboard, Home)
- Pages where edge swipe is sufficient
- Modal dialogs (use modal close buttons instead)

### 4. **Accessibility**
- Add aria-label for screen readers
- Ensure adequate touch target (minimum 44x44px)
- Maintain sufficient color contrast

```tsx
<BackButton 
  className="top-4 left-4"
  // Component already has proper touch target
/>
```

## 🎬 Animation Breakdown

### Press Sequence
```
1. User taps button
   ↓
2. Button scales to 95% (scale-95)
   ↓
3. Glow intensifies (box-shadow increase)
   ↓
4. Icon color changes to primary
   ↓
5. Ripple expands from tap point
   ↓
6. Navigation occurs (navigate(-1))
   ↓
7. Button returns to default state
   ↓
8. Ripple fades out (600ms total)
```

### Continuous Glow Pulse
```tsx
// Optional: Add continuous pulse animation
<BackButton className="soft-pulse" />
```

This applies the `softPulse` keyframe animation for a breathing glow effect.

## 📱 Mobile vs Desktop

### Mobile
- Touch events (`onTouchStart`, `onTouchEnd`)
- Haptic-like visual feedback
- Optimized for thumb reach

### Desktop
- Mouse events (`onClick`)
- Hover states can be added if needed
- Ripple still works on click

## 🔍 Integration with Edge Swipe

The BackButton complements the edge swipe gesture:

- **Edge Swipe**: Primary navigation method (hidden, gesture-based)
- **BackButton**: Visual backup for discoverability
- Both trigger `navigate(-1)` for consistency
- Users can use either method based on preference

### Using Both Together

```tsx
// In your page
<div className="min-h-screen">
  <GlobalBackButton />  {/* Edge swipe - invisible */}
  <BackButton />        {/* Visible button */}
  {/* Content */}
</div>
```

## 🎨 Theme Adaptation

The button automatically adapts to your theme:

- **Glass background**: Uses `--glass-bg` variable
- **Border**: Uses `--glass-border` variable
- **Glow**: Uses `--primary` color
- **Icon**: Uses `--foreground` color

Change these in `src/index.css` to customize appearance globally.

## 📊 Performance

- **Ripple**: Single DOM element, CSS animation (GPU accelerated)
- **Glow**: CSS box-shadow (hardware accelerated)
- **Scale**: CSS transform (GPU accelerated)
- **No external libraries**: Pure React + CSS
- **Minimal re-renders**: State updates only on interaction

## 🐛 Troubleshooting

### Button not showing
- Check z-index (should be z-50)
- Ensure parent has relative positioning if needed
- Verify component is imported correctly

### Ripple not working
- Check CSS animation is defined in index.css
- Ensure button has `overflow-hidden` class
- Verify click event is firing

### Glow too strong/weak
- Adjust opacity values in boxShadow
- Modify CSS custom properties in index.css
- Check theme color values

### Icon not centered
- Verify flex classes: `flex items-center justify-center`
- Check button dimensions (w-10 h-10)
- Ensure no padding interfering

## 🚀 Quick Start Example

```tsx
// 1. Import
import BackButton from '@/components/BackButton';

// 2. Use in any page
export default function MyPage() {
  return (
    <div className="min-h-screen pb-24 px-4 pt-6">
      <BackButton />
      
      <h1>My Page</h1>
      {/* Rest of content */}
    </div>
  );
}
```

That's it! The button is fully functional with beautiful animations out of the box.
