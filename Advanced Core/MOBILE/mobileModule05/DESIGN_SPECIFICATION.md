# Diary App - Complete Design Specification

This document provides a comprehensive description of the Diary App design, enabling someone to recreate the exact interface without viewing the original.

---

## 1. Overall Layout & Device Frame

### Device Specifications
- **Viewport Size**: 390px × 844px (iPhone 13/14 dimensions)
- **Device Frame**: 
  - Rounded corners with 40px border radius
  - Positioned centered on screen with shadow
  - Shadow: Large drop shadow (shadow-2xl equivalent)
  - Background behind frame: Light gray (#F5F7FA) or dark (#1C1C1E)

### Screen Structure
- All screens fill the 390×844 container completely
- Content is organized vertically with scrollable areas where needed
- Navigation elements fixed at bottom (rounded top corners at 32px)

---

## 2. Color Palette

### Light Mode Colors
- **Primary Blue**: `#5B8CFF` (calming blue for buttons, active states)
- **Darker Primary**: `#4A7AE8` (hover states)
- **Background**: `#F5F7FA` (soft light gray)
- **Surface/Cards**: `#FFFFFF` (pure white)
- **Text Primary**: `#1C1C1E` (almost black)
- **Text Secondary**: `#8E8E93` (medium gray)
- **Divider/Border**: `#E5E5EA` (very light gray)

### Dark Mode Colors
- **Primary Blue**: `#5B8CFF` (same as light mode)
- **Darker Primary**: `#4A7AE8` (hover states)
- **Background**: `#1C1C1E` (very dark gray)
- **Surface/Cards**: `#2C2C2E` (lighter dark gray)
- **Text Primary**: `#FFFFFF` (white)
- **Text Secondary**: `#98989D` (medium gray)
- **Divider/Border**: `#38383A` (dark gray)

### Feeling Colors (Same in both modes)
- **Happy**: `#FFD60A` (yellow)
- **Sad**: `#FF6B6B` (soft red)
- **Excited**: `#FF9500` (orange) / `#FF9F0A` (dark mode variant)
- **Calm**: `#64D2FF` (light blue)
- **Anxious**: `#BF5AF2` (purple)

---

## 3. Typography

### Font Sizing (uses default system)
- **h1**: Extra large (2xl), medium weight
- **h2**: Extra large (xl), medium weight
- **h3**: Large (lg), medium weight
- **h4**: Base size, medium weight
- **p**: Base size, normal weight
- **Small text**: Small (sm), 14px equivalent
- **Extra small**: Extra small (xs), 12px equivalent

### Font Weighrepo:MaratAsh/42-exam-rank-subjects ts
- **Medium**: 500 (headings, buttons, labels)
- **Normal**: 400 (body text, inputs)

---

## 4. Spacing & Sizing System

### Padding/Margin Standards
- **Screen edge padding**: 24px (px-6)
- **Card padding**: 16px (p-4)
- **Large padding**: 32px (p-8)
- **Gap between elements**: 12px (gap-3) or 16px (gap-4)
- **Top safe area**: 56px (pt-14) for header areas

### Border Radius
- **Large components** (cards, modals): 16px (rounded-2xl)
- **Medium components** (buttons): 12px (rounded-xl)
- **Calendar dates**: 12px (rounded-xl)
- **Pills/tags**: 8px (rounded-lg)
- **Screen corners**: 32px (rounded-[32px])
- **Device frame**: 40px (rounded-[40px])
- **Circle buttons** (FAB, avatar): 50% (rounded-full)

---

## 5. Login Screen - Detailed Specification

### Layout Structure (Top to Bottom, Vertically Centered)

1. **App Icon**
   - Size: 64px × 64px icon inside container
   - Container: Padding 24px, gradient background
   - Gradient: Linear from `#5B8CFF` to `#4A7AE8` (top-left to bottom-right)
   - Border radius: 24px (rounded-3xl)
   - Shadow: Medium drop shadow
   - Icon: BookOpen (Lucide React), white color, 1.5px stroke width

2. **App Title** (8px margin-bottom)
   - Text: "Diary App"
   - Color: `#1C1C1E` (light mode) / `#FFFFFF` (dark mode)
   - Size: h1 (2xl)
   - Alignment: Center
   - Tracking: Tight letter spacing

3. **Subtitle** (48px margin-bottom)
   - Text: "Your personal journal"
   - Color: `#8E8E93` (light mode) / `#98989D` (dark mode)
   - Size: Body text
   - Alignment: Center

4. **Primary Login Button** (24px margin-bottom)
   - Width: 100%
   - Height: 48px (py-4)
   - Background: `#5B8CFF`
   - Text: "Login" in white
   - Border radius: 16px
   - Shadow: Medium
   - Hover: Background changes to `#4A7AE8`
   - Active: Scales to 98%
   - Transition: All properties 200ms

5. **Divider Section** (24px margin-bottom)
   - Structure: Line - Text - Line (flex row)
   - Lines: 1px height, `#E5E5EA` (light) / `#38383A` (dark)
   - Text: "Or continue with"
   - Text color: `#8E8E93` (light) / `#98989D` (dark)
   - Padding: 16px horizontal on text

6. **Google Login Button** (12px margin-bottom)
   - Width: 100%
   - Height: 48px (py-4)
   - Background: `#FFFFFF` (light) / `#2C2C2E` (dark)
   - Border: 1px solid `#E5E5EA` (light) / `#38383A` (dark)
   - Border radius: 16px
   - Shadow: Small
   - Content: Flex row, centered, 12px gap
     - Google Logo SVG (20px × 20px, full color)
     - Text: "Continue with Google"
   - Hover: Shadow increases to medium
   - Active: Scales to 98%

7. **GitHub Login Button**
   - Same styling as Google button
   - GitHub Logo SVG (20px × 20px, `#1C1C1E` in light, `#FFFFFF` in dark)
   - Text: "Continue with GitHub"

### SVG Specifications

**Google Logo**: Four-color segments (exact Google brand colors)
- Blue: `#4285F4`
- Green: `#34A853`
- Yellow: `#FBBC05`
- Red: `#EA4335`

**GitHub Logo**: Single color, solid fill, matches theme

---

## 6. Profile Screen - Detailed Specification

### Header Section
- **Background**: Gradient from `#5B8CFF` to `#4A7AE8` (diagonal)
- **Bottom corners**: Rounded 32px
- **Padding**: 24px horizontal, 56px top, 32px bottom
- **Shadow**: Large drop shadow

#### Profile Row (flex, space-between)
Left side:
- **Avatar Circle**
  - Size: 64px × 64px
  - Background: White with 20% opacity
  - Border: 2px solid white with 30% opacity
  - Border radius: Full circle
  - Content: User emoji "👤"
  - Backdrop blur: Applied

- **User Info** (next to avatar, 16px gap)
  - Name: "Sarah Johnson"
  - Color: White
  - Size: h2
  - Margin bottom: 4px
  
  - Email: "sarah.j@email.com"
  - Color: White with 80% opacity
  - Size: Small (14px)

Right side (flex, 8px gap):
- **Dark Mode Toggle Button**
  - Size: 40px × 40px (p-2)
  - Background: White with 20% opacity, backdrop blur
  - Border radius: 12px
  - Icon: Sun (light mode) or Moon (dark mode)
  - Icon size: 20px, white color
  - Hover: Background 30% opacity
  - Active: Scale 95%

- **Logout Button**
  - Same styling as toggle
  - Icon: LogOut, 20px, white

#### Stats Card (24px margin-top)
- **Background**: White with 20% opacity, backdrop blur
- **Border radius**: 16px
- **Padding**: 16px

- **Total Entries Row** (flex, space-between, 12px margin-bottom)
  - Left text: "Total Entries"
  - Right number: Entry count
  - Both white/90% opacity

- **Feelings Distribution** (flex row, 8px gap)
  - 5 equal-width columns
  - Each column:
    - Background: White with 30% opacity
    - Border radius: 8px
    - Padding: 8px
    - Content: Centered vertically
      - Feeling icon (16px, white)
      - Percentage text (12px, white)
    - Gap: 4px between icon and text

### Content Area
- **Padding**: 24px horizontal, 24px vertical
- **Bottom padding**: 96px (for FAB and nav)
- **Overflow**: Vertical scroll

#### Recent Entries Section (24px margin-bottom)
- **Title**: "Recent Entries"
- **Color**: `#1C1C1E` (light) / `#FFFFFF` (dark)
- **Size**: h3
- **Margin bottom**: 16px

- **Entry Cards** (12px vertical gap)
  - Width: 100%
  - Background: White (light) / `#2C2C2E` (dark)
  - Border radius: 16px
  - Padding: 16px
  - Shadow: Small
  - Hover: Shadow increases to medium
  - Active: Scale 98%
  
  Card content (top to bottom):
  - **Header row** (flex, space-between, 8px margin-bottom)
    - Entry title (h4, primary text color)
    - Feeling icon (20px, feeling color, 8px left margin)
  
  - **Content preview** (8px margin-bottom)
    - Text: First 2 lines of content
    - Color: `#8E8E93` (light) / `#98989D` (dark)
    - Size: Small (14px)
    - Line clamp: 2 lines max
  
  - **Date**
    - Format: "Nov 20, 2025"
    - Color: `#8E8E93` (light) / `#98989D` (dark)
    - Size: Extra small (12px)

#### All Entries Section
- **Title**: "All Entries"
- Same styling as Recent Entries title
- **Margin bottom**: 16px

- **Entry Cards** (12px vertical gap)
  - Same base styling as recent entries
  - Layout: Horizontal flex, space-between
  
  Left side (clickable, flex-1):
  - **Row** (flex, 12px gap, 8px margin-bottom)
    - Feeling icon (20px, feeling color)
    - Entry title (h4, primary color)
  
  - **Date**
    - Format: "Nov 20, 2025"
    - Color: Secondary text
    - Size: Extra small (12px)
  
  Right side:
  - **Delete button**
    - Size: 32px × 32px (p-2)
    - Color: `#FF6B6B`
    - Icon: Trash2 (16px)
    - Hover: Background `#FF6B6B` with 10% opacity
    - Border radius: 8px
    - Active: Scale 95%

### Floating Action Button (FAB)
- **Position**: Fixed, bottom-right
- **Bottom offset**: 96px (above navigation)
- **Right offset**: 24px
- **Size**: 56px × 56px
- **Background**: `#5B8CFF`
- **Border radius**: Full circle
- **Shadow**: Large
- **Icon**: Plus (24px, white, 2.5px stroke)
- **Hover**: Shadow increases to xl
- **Active**: Scale 95%

### Bottom Navigation
- **Position**: Fixed, bottom
- **Width**: 100%
- **Background**: White (light) / `#2C2C2E` (dark)
- **Border top**: 1px solid `#E5E5EA` (light) / `#38383A` (dark)
- **Border radius top**: 32px
- **Padding**: 24px horizontal, 16px vertical

- **Navigation items** (flex row, space-around)
  
  Each item (flex column, centered, 4px gap):
  - **Icon**: 24px, 2px stroke
  - **Label**: Extra small (12px)
  
  Active state (Home):
  - Icon color: `#5B8CFF`
  - Text color: `#5B8CFF`
  
  Inactive state (Agenda):
  - Icon color: `#8E8E93` (light) / `#98989D` (dark)
  - Text color: Same as icon

---

## 7. Agenda Screen - Detailed Specification

### Header Section
- **Background**: Gradient from `#5B8CFF` to `#4A7AE8` (diagonal)
- **Bottom corners**: Rounded 32px
- **Padding**: 24px horizontal, 56px top, 24px bottom
- **Shadow**: Large drop shadow

#### Title (24px margin-bottom)
- Text: "Calendar"
- Color: White
- Size: h1

#### Month Navigation Row (16px margin-bottom)
- **Layout**: Flex, space-between

- **Previous Month Button**
  - Size: 36px × 36px (p-2)
  - Background: White with 20% opacity, backdrop blur
  - Border radius: 12px
  - Icon: ChevronLeft (20px, white)
  - Hover: Background 30% opacity
  - Active: Scale 95%

- **Month/Year Label**
  - Text: "November 2025"
  - Color: White
  - Size: h2
  - Alignment: Center

- **Next Month Button**
  - Same as previous button
  - Icon: ChevronRight

#### Calendar Container
- **Background**: White with 20% opacity, backdrop blur
- **Border radius**: 16px
- **Padding**: 16px

##### Day Names Row (8px margin-bottom)
- **Grid**: 7 columns, 8px gap
- Each day label:
  - Text: "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
  - Color: White with 70% opacity
  - Size: Extra small (12px)
  - Alignment: Center
  - Padding: 4px vertical

##### Calendar Days Grid
- **Grid**: 7 columns, 8px gap

Each date button:
- **Aspect ratio**: 1:1 (square)
- **Border radius**: 12px
- **Text size**: Small (14px)
- **Transition**: All properties
- **Content**: Flex column, centered

States:
1. **Selected Date**
   - Background: White
   - Text color: `#5B8CFF`
   - Shadow: Medium
   - Scale: 105%

2. **Today (not selected)**
   - Background: White with 40% opacity
   - Text color: White

3. **Regular Date**
   - Background: White with 10% opacity
   - Text color: White
   - Hover: Background 20% opacity

4. **Entry Indicator**
   - Small dot below number
   - Size: 4px × 4px (w-1 h-1)
   - Border radius: Full circle
   - Color: Same as text
   - Margin top: 4px

### Entries List Section
- **Padding**: 24px horizontal, 24px vertical
- **Bottom padding**: 96px (for navigation)
- **Overflow**: Vertical scroll

#### Selected Date Title (16px margin-bottom)
- Text: "Wednesday, November 20, 2025"
- Color: `#1C1C1E` (light) / `#FFFFFF` (dark)
- Size: h3

#### No Entries State
- **Card**: Full width
  - Background: White (light) / `#2C2C2E` (dark)
  - Border radius: 16px
  - Padding: 32px
  - Shadow: Small
  - Content: Centered
    - Text: "No entries for this date"
    - Color: `#8E8E93` (light) / `#98989D` (dark)

#### Entry Cards (12px vertical gap)
- **Background**: White (light) / `#2C2C2E` (dark)
- **Border radius**: 16px
- **Padding**: 16px
- **Shadow**: Small

Card content:
- **Header row** (flex, space-between, 8px margin-bottom)
  - Left side (flex, 12px gap, flex-1):
    - Feeling icon (20px, feeling color)
    - Entry title (h4, primary text)
  
  - Right side:
    - Delete button (same as Profile screen)

- **Content preview**
  - Text: First 2 lines
  - Color: `#8E8E93` (light) / `#98989D` (dark)
  - Size: Small (14px)
  - Line clamp: 2 lines

### Bottom Navigation
- Same as Profile screen
- Active state: Agenda (blue)
- Inactive state: Home (gray)

---

## 8. New Entry Modal - Detailed Specification

### Modal Overlay
- **Position**: Absolute, covers entire screen (inset-0)
- **Background**: Black with 50% opacity, backdrop blur
- **Layout**: Flex, items-end, centered
- **Z-index**: 50

### Modal Panel
- **Position**: Bottom of screen
- **Width**: 100%
- **Background**: White (light) / `#2C2C2E` (dark)
- **Border radius top**: 32px
- **Padding**: 24px
- **Max height**: 80vh
- **Animation**: Slide up from bottom (300ms ease-out)
- **Layout**: Flex column

#### Header (24px margin-bottom)
- **Layout**: Flex row, space-between

- **Title**: "New Entry"
  - Color: Primary text
  - Size: h2

- **Close Button**
  - Size: 36px × 36px (p-2)
  - Icon: X (20px, secondary text)
  - Hover: Background `#F5F7FA` (light) / `#38383A` (dark)
  - Border radius: 12px

#### Form Content (scrollable, flex-1)
- **Spacing**: 16px between sections

##### Title Input Field
- **Label**: "Title"
  - Color: `#8E8E93` (light) / `#98989D` (dark)
  - Size: Small (14px)
  - Margin bottom: 8px

- **Input**
  - Width: 100%
  - Padding: 12px 16px
  - Background: `#F5F7FA` (light) / `#1C1C1E` (dark)
  - Border: 1px solid `#E5E5EA` (light) / `#38383A` (dark)
  - Border radius: 12px
  - Text color: Primary
  - Placeholder: "Enter a title"
  - Placeholder color: Secondary text
  - Focus: 2px ring `#5B8CFF` with 50% opacity

##### Date Input Field
- Same styling as Title input
- Label: "Date"
- Type: date
- Default: Current date

##### Feeling Selector
- **Label**: "How are you feeling?"
  - Same styling as other labels
  - Margin bottom: 8px

- **Button Group** (flex row, 8px gap, wrap)
  
  Each feeling button:
  - Flex row, 12px gap
  - Padding: 8px 16px
  - Border radius: 12px
  - Transition: All properties
  
  Content:
  - Feeling icon (16px)
  - Feeling label (14px)
  
  States:
  1. **Selected**
     - Background: `#5B8CFF`
     - Text color: White
     - Shadow: Medium
     - Scale: 105%
  
  2. **Unselected**
     - Background: `#F5F7FA` (light) / `#1C1C1E` (dark)
     - Text color: Primary
     - Border: 1px solid `#E5E5EA` (light) / `#38383A` (dark)
     - Hover: Border color `#5B8CFF`

##### Content Textarea
- **Label**: "Content"
  - Same styling as other labels

- **Textarea**
  - Same base styling as input
  - Rows: 6
  - Placeholder: "Write your thoughts..."
  - Resize: None

#### Action Buttons Section
- **Margin top**: 24px
- **Padding top**: 16px
- **Border top**: 1px solid `#E5E5EA` (light) / `#38383A` (dark)
- **Layout**: Flex row, 12px gap

- **Cancel Button** (flex-1)
  - Height: 48px (py-3)
  - Background: `#F5F7FA` (light) / `#1C1C1E` (dark)
  - Text color: Primary
  - Border radius: 12px
  - Text: "Cancel"
  - Hover: Background `#E5E5EA` (light) / `#38383A` (dark)
  - Active: Scale 98%

- **Save Button** (flex-1)
  - Height: 48px (py-3)
  - Background: `#5B8CFF`
  - Text color: White
  - Border radius: 12px
  - Text: "Save Entry"
  - Shadow: Medium
  - Hover: Background `#4A7AE8`
  - Active: Scale 98%

---

## 9. Entry Detail Modal - Detailed Specification

### Modal Structure
- Same overlay and panel as New Entry Modal

#### Header (24px margin-bottom)
- **Layout**: Flex row, space-between

Left side (flex row, 12px gap, flex-1):
- **Feeling Badge**
  - Size: 36px × 36px (p-2)
  - Background: Feeling color with 20% opacity
  - Border radius: 12px
  - Icon: Feeling icon (20px, feeling color)

- **Title Section** (flex column, flex-1)
  - Entry title
    - Color: Primary text
    - Size: h2
  
  - Feeling label
    - Color: Secondary text
    - Size: Small (14px)
    - Examples: "Happy", "Sad", "Excited", "Calm", "Anxious"

Right side:
- **Close Button**
  - Same as New Entry Modal

#### Content Section (scrollable, flex-1)

- **Date Label** (16px margin-bottom)
  - Format: "Wednesday, November 20, 2025"
  - Color: `#8E8E93` (light) / `#98989D` (dark)
  - Size: Small (14px)

- **Content Card**
  - Background: `#F5F7FA` (light) / `#1C1C1E` (dark)
  - Border radius: 16px
  - Padding: 16px
  - Text: Entry content
    - Color: Primary text
    - Line height: Relaxed (1.625)
    - White space: Pre-wrap (preserves line breaks)

#### Action Buttons Section
- **Margin top**: 24px
- **Padding top**: 16px
- **Border top**: 1px solid border color
- **Layout**: Flex row, 12px gap

- **Delete Button** (flex-1)
  - Height: 48px (py-3)
  - Background: `#FF6B6B` with 10% opacity
  - Text color: `#FF6B6B`
  - Border radius: 12px
  - Layout: Flex row, centered, 8px gap
  - Content:
    - Trash2 icon (16px)
    - Text: "Delete Entry"
  - Hover: Background 20% opacity
  - Active: Scale 98%

- **Close Button** (flex-1)
  - Height: 48px (py-3)
  - Background: `#5B8CFF`
  - Text color: White
  - Border radius: 12px
  - Shadow: Medium
  - Text: "Close"
  - Hover: Background `#4A7AE8`
  - Active: Scale 98%

---

## 10. Icons & Visual Elements

### Icon Library
All icons from **Lucide React** package

#### Icons Used
- **BookOpen**: Login screen app icon
- **Home**: Navigation (home/profile)
- **Calendar**: Navigation (agenda)
- **LogOut**: Profile logout button
- **Moon/Sun**: Dark mode toggle
- **Plus**: Floating action button
- **X**: Close modals
- **Trash2**: Delete buttons
- **ChevronLeft/ChevronRight**: Calendar navigation
- **Smile**: Happy feeling
- **Frown**: Sad feeling
- **Zap**: Excited feeling
- **Wind**: Calm feeling
- **AlertCircle**: Anxious feeling

### Icon Sizing
- **Extra small**: 16px (w-4 h-4)
- **Small**: 20px (w-5 h-5)
- **Medium**: 24px (w-6 h-6)
- **Large**: 64px (w-16 h-16) - Login icon only

### Icon Stroke Width
- **Default**: 2px
- **Thin**: 1.5px (Login icon)
- **Thick**: 2.5px (FAB plus icon)

---

## 11. Interactions & Animations

### Hover States
- **Buttons**: Background color change, shadow increase
- **Cards**: Shadow increase from small to medium
- **Delete/Action buttons**: Background opacity change

### Active/Click States
- **All interactive elements**: Scale to 98% or 95%
- **Selected calendar dates**: Scale to 105%

### Transitions
- **Default**: All properties, 200ms ease
- **Color scheme change**: 300ms duration
- **Smooth transitions** on backgrounds, shadows, transforms

### Animations
- **Modal slide-up**: 300ms ease-out
  - From: translateY(100%)
  - To: translateY(0)

### Backdrop Effects
- **Modal overlays**: Black with 50% opacity + backdrop blur
- **Header stat cards**: White with 20% opacity + backdrop blur
- **Calendar container**: White with 20% opacity + backdrop blur

---

## 12. Responsive Behavior

### Fixed Dimensions
- Container: Always 390px × 844px
- Content adapts within this frame

### Scrollable Areas
- **Profile screen**: Main content area (Recent + All entries)
- **Agenda screen**: Entries list for selected date
- **Modals**: Form content area (80vh max)

### Fixed Elements
- **Bottom navigation**: Always visible at bottom
- **Header sections**: Fixed at top (scrolls with content)
- **FAB**: Fixed position, 96px from bottom, 24px from right
- **Modals**: Overlay entire screen

---

## 13. Content & Copy

### User Information
- Name: "Sarah Johnson"
- Email: "sarah.j@email.com"
- Avatar: Emoji "👤"

### Placeholder Entries
7 sample entries with varied:
- Titles (descriptive of mood/activity)
- Content (2-3 sentences)
- Dates (spread across November 2025)
- Feelings (all 5 types represented)

### Button Labels
- "Login"
- "Continue with Google"
- "Continue with GitHub"
- "Logout"
- "Save Entry"
- "Cancel"
- "Close"
- "Delete Entry"

### Section Headers
- "Recent Entries"
- "All Entries"
- "Calendar"
- "New Entry"

### Form Labels
- "Title"
- "Date"
- "How are you feeling?"
- "Content"

### Placeholders
- "Enter a title"
- "Write your thoughts..."
- "No entries for this date"

---

## 14. States & Logic

### Screen Navigation
- Three screens: Login → Profile ↔ Agenda
- Bottom nav switches between Profile and Agenda
- Login is entry point

### Dark Mode Toggle
- Icon changes: Sun (in dark mode) / Moon (in light mode)
- Toggles entire app theme instantly
- Persists across screen changes

### Calendar Interaction
- Click date to select
- Selected date shows entries below
- Visual indicator (dot) on dates with entries
- Month navigation with arrows

### Entry Management
- **Create**: FAB → New Entry Modal
- **View**: Click entry card → Detail Modal
- **Delete**: Trash icon in list OR delete button in detail modal
- Confirmation prompt before deletion

### Form Validation
- Title and content required
- Alert if attempting to save without both

---

## 15. Shadow System

### Shadow Levels
- **Small** (shadow-sm): Entry cards, buttons at rest
- **Medium** (shadow-md): Buttons on hover, selected items
- **Large** (shadow-lg): Header sections, FAB, device frame
- **Extra Large** (shadow-xl): FAB on hover
- **2XL** (shadow-2xl): Device frame container

### Shadow Colors
- Subtle, semi-transparent black
- Maintain visibility in both light and dark modes

---

## 16. Special Design Details

### Gradient Applications
- Login app icon background
- Profile and Agenda headers
- Direction: Diagonal (top-left to bottom-right)
- Colors: `#5B8CFF` → `#4A7AE8`

### Glassmorphism Effects
- User avatar border
- Stats cards in header
- Calendar container
- All use: white with low opacity + backdrop blur

### Typography Hierarchy
- Clear distinction between heading levels
- Consistent use of primary/secondary text colors
- Small text for metadata (dates, labels)

### Feeling System
- 5 distinct emotions
- Each with unique icon and color
- Consistent representation across all screens
- Used in: stats, entry cards, selectors, detail view

### Border Radius Consistency
- Larger radius (16px) for major components
- Medium radius (12px) for interactive elements
- Small radius (8px) for minor elements
- Full circle for avatars and FAB

---

This specification provides complete details to recreate the Diary App design pixel-perfect without viewing the original implementation.
