# Design Rules for IELTS Learning Hub

## Spacing System

We follow an 8-point grid system for consistent spacing throughout the application:

- **4px** - Extra small spacing (xs): Used for tight spacing between related elements
- **8px** - Small spacing (sm): Default spacing between closely related elements
- **16px** - Medium spacing (md): Standard spacing between elements
- **24px** - Large spacing (lg): Spacing between distinct elements
- **32px** - Extra large spacing (xl): Spacing between sections
- **48px** - 2x large spacing (2xl): Major section spacing
- **64px** - 3x large spacing (3xl): Spacing between major page sections
- **80px** - 4x large spacing (4xl): Used for very large section separations

Apply these spacing values to margins, paddings, and gaps consistently.

## Responsive Breakpoints

We use the following breakpoints for responsive design:

- **xs**: 0px - 599px (Mobile phones)
- **sm**: 600px - 899px (Tablets and large phones)
- **md**: 900px - 1199px (Small laptops and tablets in landscape)
- **lg**: 1200px - 1535px (Desktops and laptops)
- **xl**: 1536px and above (Large screens)

### Responsive Spacing Adjustments

- On mobile (xs), reduce section spacing by approximately 40-50%
- On tablets (sm), reduce section spacing by approximately 25-30%
- On small laptops (md), reduce section spacing by approximately 15-20%

## Typography Hierarchy

### Headings

- **H1 (Page Title)**: 
  - Desktop: 48px/3rem, bold, line-height: 1.2
  - Tablet: 40px/2.5rem
  - Mobile: 32px/2rem

- **H2 (Section Title)**:
  - Desktop: 36px/2.25rem, bold, line-height: 1.3
  - Tablet: 32px/2rem
  - Mobile: 28px/1.75rem

- **H3 (Subsection Title)**:
  - Desktop: 24px/1.5rem, bold, line-height: 1.4
  - Tablet: 22px/1.375rem
  - Mobile: 20px/1.25rem

- **H4 (Card or Component Title)**:
  - Desktop: 20px/1.25rem, semibold, line-height: 1.4
  - Tablet: 18px/1.125rem
  - Mobile: 16px/1rem

### Body Text

- **Body 1 (Primary text)**:
  - Desktop: 16px/1rem, regular, line-height: 1.6
  - Mobile: 14px/0.875rem

- **Body 2 (Secondary text)**:
  - Desktop: 14px/0.875rem, regular, line-height: 1.6
  - Mobile: 13px/0.8125rem

- **Caption (Small text)**:
  - 12px/0.75rem, regular, line-height: 1.5

## Color Usage

### Primary Colors

- **Primary Main**: #6200ea (Deep purple)
  - Use for primary buttons, active states, and important UI elements
  - Lighter variants: #7c4dff (50% opacity for hover states)
  - Darker variants: #5600e8 (for active/pressed states)

- **Secondary Main**: #03dac6 (Teal)
  - Use for secondary buttons, accents, and highlights
  - Lighter variants: #04e9d1 (for hover states)
  - Darker variants: #02c6b4 (for active/pressed states)

### Neutral Colors

- **Background**: #f5f7fa (Light gray background)
- **Paper**: #ffffff (White surface)
- **Divider**: #e0e0e0 (Light gray divider)

### Text Colors

- **Primary Text**: #1a1a1a (Near black)
- **Secondary Text**: #616161 (Dark gray)
- **Disabled Text**: #9e9e9e (Medium gray)

## Component Styling

### Cards

- Border radius: 16px
- Box shadow: 0px 4px 20px rgba(0, 0, 0, 0.08)
- Padding: 24px
- Hover state: Slight elevation increase and subtle transform

### Buttons

- Primary Button:
  - Height: 48px
  - Padding: 8px 24px
  - Border radius: 8px
  - Text: 16px, medium weight
  - Hover: Slight brightness increase and shadow increase

- Secondary Button:
  - Same dimensions as primary
  - Outlined style with primary color
  - Hover: Light background fill

### Section Containers

- Max width: 1200px for content
- Horizontal padding:
  - Desktop: 24px
  - Tablet: 16px
  - Mobile: 16px

## Layout Guidelines

### Content Width

- Maximum content width: 1200px
- Centered on the page with appropriate padding

### Section Padding

- Top/bottom padding for sections:
  - Desktop: 80px
  - Tablet: 64px
  - Mobile: 48px

### Grid System

- Use 12-column grid for layouts
- Column gap:
  - Desktop: 24px
  - Tablet: 16px
  - Mobile: 16px

### Aspect Ratios

- Hero images: 16:9
- Feature icons: 1:1
- Testimonial avatars: 1:1
- Screenshots: 4:3

## Animation Guidelines

- Use subtle animations with ease-in-out timing
- Duration: 300-500ms for most transitions
- Avoid animations that interfere with readability
- Use intersection observer for scroll-based animations
- Ensure animations are disabled for users with reduced motion preferences

## Accessibility Guidelines

- Maintain contrast ratio of at least 4.5:1 for text
- Ensure all interactive elements have appropriate focus states
- Provide text alternatives for all images
- Ensure text is resizable without breaking layouts
- Support keyboard navigation for all interactive elements
