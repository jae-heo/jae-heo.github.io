# CSS Architecture Documentation

## Overview
This blog uses a modular CSS architecture designed for maintainability, scalability, and reusability. The styles are organized into logical modules that can be easily understood and modified.

## Directory Structure

```
css/
├── core/              # Foundation styles
│   ├── reset.css      # Modern CSS reset
│   └── typography.css # Typography system & text utilities
├── layouts/           # Layout systems
│   ├── grid.css       # Grid layout utilities
│   └── flexbox.css    # Flexbox layout utilities
├── components/        # Reusable UI components
│   ├── navigation.css # Navigation component
│   ├── cards.css      # Card components (posts, previews)
│   ├── buttons.css    # Button variants & styles
│   └── forms.css      # Form elements & validation
├── utilities/         # Helper classes
│   ├── spacing.css    # Margin, padding, gap utilities
│   └── display.css    # Display, visibility, position utilities
├── animations/        # Animation & transitions
│   └── animations.css # Keyframes & animation classes
├── themes.css         # Theme variables & color system
├── base.css          # Base element styles
├── components.css    # Legacy components (to be refactored)
├── pages.css         # Page-specific styles
├── series-*.css      # Series-specific components
└── custom-overrides.css # Custom overrides (loads last)
```

## Import Order (Important!)

The main stylesheet (`style.css`) imports modules in this specific order:

1. **Core** - Reset, typography
2. **Themes** - CSS variables
3. **Layouts** - Grid & flexbox systems
4. **Components** - UI components
5. **Utilities** - Helper classes
6. **Animations** - Keyframes & transitions
7. **Page-specific** - Individual page styles
8. **Overrides** - Custom overrides (must be last)

## Module Descriptions

### Core Modules

- **reset.css**: Modern CSS reset for consistent cross-browser styling
- **typography.css**: Complete typography system with font scales, line heights, and text utilities

### Layout Modules

- **grid.css**: CSS Grid utilities for complex layouts
- **flexbox.css**: Flexbox utilities for flexible layouts

### Component Modules

- **navigation.css**: Header navigation, mobile menu
- **cards.css**: Post preview cards, list items, tags
- **buttons.css**: Button variants, sizes, states
- **forms.css**: Form controls, validation states, search forms

### Utility Modules

- **spacing.css**: Margin, padding, and gap utilities using consistent spacing scale
- **display.css**: Display, visibility, position, and other visual utilities

### Animation Module

- **animations.css**: Reusable animation keyframes and transition utilities

## CSS Variables

Key CSS variables are defined in `themes.css`:

```css
--text-primary    # Main text color
--text-secondary  # Secondary text color
--text-tertiary   # Muted text color
--bg-primary      # Main background
--bg-secondary    # Card backgrounds
--bg-tertiary     # Subtle backgrounds
--accent          # Primary accent color
--accent-hover    # Accent hover state
--border          # Border color
--max-width       # Maximum content width
```

## Utility Classes

### Spacing
- Margin: `.m-{0-8}`, `.mt-`, `.mr-`, `.mb-`, `.ml-`, `.mx-`, `.my-`
- Padding: `.p-{0-8}`, `.pt-`, `.pr-`, `.pb-`, `.pl-`, `.px-`, `.py-`
- Gap: `.gap-{0-8}`

### Typography
- Size: `.text-xs`, `.text-sm`, `.text-base`, `.text-lg`, `.text-xl`, `.text-2xl`
- Weight: `.font-normal`, `.font-medium`, `.font-semibold`, `.font-bold`
- Transform: `.uppercase`, `.lowercase`, `.capitalize`

### Display
- `.block`, `.inline`, `.flex`, `.grid`, `.hidden`
- `.relative`, `.absolute`, `.fixed`, `.sticky`
- `.opacity-{0-100}`, `.z-{0-100}`

### Animations
- `.animate-fadeIn`, `.animate-slideInUp`, `.animate-bounce`
- `.transition`, `.transition-colors`, `.transition-transform`
- `.duration-{75-1000}`, `.ease-{in|out|in-out}`

## Best Practices

1. **Use CSS Variables**: Always use CSS variables for colors and consistent values
2. **Utility-First**: Use utility classes for simple styling before creating new components
3. **Component Isolation**: Keep component styles isolated and reusable
4. **Consistent Naming**: Follow BEM-like naming for component classes
5. **Mobile-First**: Write mobile styles first, then add responsive breakpoints
6. **Performance**: Minimize specificity and avoid deep nesting

## Adding New Styles

1. **Utilities**: Add to appropriate utility module
2. **Components**: Create new file in `components/` directory
3. **Page-specific**: Add to `pages.css` or create new page file
4. **Animations**: Add keyframes to `animations.css`
5. **Remember to import**: Add import to `style.css` in correct order

## Maintenance

- Regularly review and refactor `components.css` (legacy)
- Remove unused styles periodically
- Keep specificity low for easier overrides
- Document complex styles with comments
- Test changes across different screen sizes

## Future Improvements

- [ ] Complete migration from `components.css` to modular components
- [ ] Add dark mode support with CSS variables
- [ ] Create responsive typography scale
- [ ] Add more animation presets
- [ ] Implement CSS custom properties for component theming