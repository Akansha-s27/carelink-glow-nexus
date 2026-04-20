# Edge Swipe Navigation

## Overview
A modern, minimal edge swipe gesture navigation system that allows users to navigate back by swiping from the left edge of the screen.

## Features

### 🎯 Minimal Design
- **Thin semi-transparent indicator**: A subtle 2px vertical line on the left edge
- **No arrows, text, or floating buttons**: Clean, distraction-free interface
- **Adaptive glow effect**: Indicator responds to swipe progress with dynamic opacity and glow

### 👆 Gesture Interaction
- **Edge detection**: Only activates when swipe starts within 30px from left edge
- **Swipe threshold**: Requires 80px swipe distance to trigger navigation
- **Real-time feedback**: Visual indicator intensity increases with swipe progress
- **Smooth transitions**: Pages animate with fade and slide effects

### 💡 Discoverability
- **Auto-hint on page load**: Indicator briefly appears for 2 seconds when navigating to a new page
- **Progressive reveal**: Visual feedback scales with interaction strength
- **Natural gesture**: Mimics native mobile app behavior (iOS/Android)

### 🖥️ Cross-Platform
- **Touch support**: Optimized for mobile devices
- **Mouse support**: Works on desktop for testing and development
- **Responsive**: Adapts to different screen sizes

## Technical Implementation

### Components

#### GlobalBackButton (`src/components/GlobalBackButton.tsx`)
- Handles touch and mouse events
- Manages swipe state and progress tracking
- Renders the semi-transparent edge indicator
- Controls navigation triggers

#### PageTransition (`src/components/PageTransition.tsx`)
- Wraps route content for smooth transitions
- Applies fade and slide animations
- Manages transition states (fadeIn/fadeOut)

### How It Works

1. **User touches/clicks within 30px of left edge**
   - Gesture tracking begins
   - Edge indicator becomes visible

2. **User swipes/drags right**
   - Progress calculated (0 to 1 based on 80px threshold)
   - Indicator glow intensifies proportionally
   - Gradient overlay appears behind content

3. **Swipe distance >= 80px**
   - Navigation triggered (`navigate(-1)`)
   - Page exits with smooth animation

4. **Swipe distance < 80px**
   - Gesture cancelled
   - Indicator fades out
   - No navigation occurs

### Customization

#### Adjust Sensitivity
```typescript
const minSwipeDistance = 80; // Increase for less sensitive, decrease for more
const edgeThreshold = 30;    // Edge activation zone in pixels
```

#### Modify Visual Style
```typescript
// Edge indicator opacity range
background: `hsl(var(--primary) / ${0.1 + swipeProgress * 0.4})`

// Glow intensity
boxShadow: `0 0 ${8 + swipeProgress * 12}px ...`
```

#### Change Animation Duration
```css
/* In index.css */
.page-enter-active {
  transition: opacity 300ms ease-out, transform 300ms ease-out;
}
```

### Excluded Routes
The following routes don't show the back gesture (root-level pages):
- `/dashboard`
- `/`
- `/onboarding`
- `/profile-setup`

Modify the `noBackRoutes` array in `GlobalBackButton.tsx` to customize.

## User Experience

### Mobile
- Natural gesture matching iOS/Android conventions
- Haptic-like visual feedback
- Smooth 60fps animations

### Desktop
- Mouse drag from left edge
- Same visual feedback as mobile
- Useful for responsive testing

## Performance
- Uses refs for touch tracking (no re-renders during swipe)
- GPU-accelerated CSS transforms
- Minimal DOM footprint (2px indicator line)
- Debounced state updates

## Browser Support
- Modern browsers (Chrome, Safari, Firefox, Edge)
- Touch-enabled devices
- Mouse-enabled devices
