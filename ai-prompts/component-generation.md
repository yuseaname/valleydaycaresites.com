# Component Generation Prompts for AI Assistants

Use these prompts with GitHub Copilot, VS Code AI assistants, or other AI coding tools to generate consistent, high-quality components for Valley Daycare Sites.

## General Component Prompt Template

```
Create a [component name] component for Valley Daycare Sites following these guidelines:

Context:
- Site specializes in websites for daycare centers
- Uses Oxygen 6 design system
- Target audience: daycare owners and parents
- Brand colors: Primary #f9ad00 (yellow), Secondary #0080c8 (blue)
- Design tokens are defined in css/tokens/design-tokens.css

Requirements:
- Use CSS custom properties from design tokens
- Follow BEM naming convention (block__element--modifier)
- Include mobile responsiveness (breakpoint at 768px)
- Ensure accessibility (semantic HTML, ARIA labels)
- Add transitions for interactive elements (var(--transition-base))
- Include clear comments explaining the structure

Component should include:
[List specific requirements for this component]

Style:
- Warm, welcoming, professional
- Rounded corners (var(--border-radius-base) or larger)
- Subtle shadows (var(--shadow-sm) to var(--shadow-lg))
- Smooth transitions and hover effects
```

## Specific Component Prompts

### Hero Section Component
```
Create a hero section component for a daycare website featuring:
- Large headline with gradient overlay
- Background image support
- 2-column layout option (text + image)
- Call-to-action buttons (primary and outline variants)
- Optional feature list with checkmarks
- Centered or left-aligned variants
- Responsive: stacks on mobile

Use:
- CSS custom properties for colors, spacing, typography
- BEM naming: .hero, .hero__title, .hero__overlay, etc.
- Mobile breakpoint at 768px
- Warm, inviting design with var(--color-primary-500) and var(--color-secondary-500)
```

### Card Component
```
Create a content card component with:
- Image at top (aspect ratio 16:9)
- Badge/label overlay
- Title, description
- Meta information (date, reading time)
- Action buttons in footer
- Hover effect with lift and shadow
- Horizontal and vertical variants

Requirements:
- BEM naming: .card, .card__image, .card__content, etc.
- Smooth transitions on hover
- Responsive image sizing
- Optional variants: .card--featured, .card--horizontal
```

### Form Component
```
Create accessible form input components including:
- Text input with label
- Textarea
- Select dropdown with custom styling
- Checkbox with custom styling
- Radio button with custom styling
- Error and success states
- Required field indicators

Requirements:
- Full WCAG 2.1 AA compliance
- Clear focus states
- Error messages with icons
- Proper label associations
- Placeholder text
- BEM naming: .form-input, .form-label, .form-error
```

### Navigation Header
```
Create a sticky navigation header with:
- Logo/brand (left)
- Main navigation menu (center/right)
- CTA button (right)
- Mobile hamburger menu
- Smooth scroll behavior
- Shadow on scroll

Requirements:
- Sticky position (z-index: var(--z-index-sticky))
- Mobile menu overlay at 768px breakpoint
- Smooth transitions for menu toggle
- Active state for current page
- Accessible menu toggle button
```

### Footer Component
```
Create a comprehensive footer with:
- 4-column grid layout
- Company info and description
- Quick links menu
- Services menu
- Contact information
- Social media icons
- Bottom bar with copyright and legal links

Requirements:
- Dark background (var(--color-neutral-900))
- Light text (var(--color-neutral-200))
- Responsive: 1 column on mobile
- Hover effects on links
- Proper spacing using design tokens
```

## Content Generation Prompts

### Homepage Copy
```
Write homepage copy for Valley Daycare Sites that:
- Explains our service (websites for daycare centers)
- Highlights key benefits (mobile responsive, local SEO, easy updates)
- Addresses daycare owner pain points
- Includes strong call-to-action
- Uses warm, professional tone
- Focuses on how we help daycares connect with families

Sections needed:
1. Hero headline and subheadline
2. "Why Choose Us" benefits (6 points)
3. Process overview (4 steps)
4. Call-to-action section

Style:
- Friendly but professional
- Clear and concise
- Benefit-focused, not feature-focused
- Include specific examples
```

### Service Page Copy
```
Write service descriptions for daycare website development:

Services to cover:
1. Custom Website Design
2. WordPress Development
3. Local SEO Optimization
4. Content Creation
5. Online Forms & Enrollment
6. Maintenance & Support

For each service:
- Brief description (2-3 sentences)
- 4-5 key features/benefits
- Who it's for
- Expected outcomes

Tone: Professional, helpful, clear about value
Focus: How it helps daycares attract families and grow
```

### Blog Post Ideas
```
Generate 10 blog post titles for Valley Daycare Sites blog:

Topics should help daycare owners with:
- Website best practices
- Digital marketing
- SEO strategies
- Content creation
- Parent communication
- Enrollment optimization

Requirements:
- Clear, actionable titles
- Include numbers when appropriate
- Focus on practical value
- Appeal to busy daycare owners
- Mix of beginner and advanced topics
```

## Page Generation Prompts

### New Page Template
```
Create a new page template for [page name] following Valley Daycare Sites structure:

Include:
- Standard header navigation (use header.css component)
- Hero section with page title
- Main content sections with proper hierarchy
- Call-to-action section
- Standard footer (use footer.css component)

Requirements:
- Import all necessary CSS files
- Use container class for content width
- Add section spacing (var(--space-16) vertical padding)
- Include mobile menu toggle script
- Semantic HTML5 elements
- Proper meta tags for SEO

Design:
- Warm, welcoming color scheme
- Clear visual hierarchy
- Mobile-responsive layouts
- Consistent with other pages
```

### Landing Page
```
Create a landing page for [specific offer/service]:

Structure:
1. Hero with strong headline and CTA
2. Problem/solution section
3. Features/benefits (3-4 cards)
4. Social proof (testimonials or stats)
5. FAQ section
6. Final CTA

Requirements:
- Single call-to-action focus
- Minimal navigation (logo only)
- Form integrated (not separate page)
- Optimized for conversions
- Fast loading
- Mobile-first design
```

## WordPress Integration Prompts

### Custom WordPress Theme
```
Create WordPress theme structure for Valley Daycare Sites:

Requirements:
- Support for custom post types (services, testimonials, portfolio)
- Widget areas (sidebar, footer columns)
- Custom menu locations (primary, footer)
- Theme options (colors, logo, contact info)
- Page templates for different layouts
- Integration with existing CSS components

Files needed:
- style.css (theme header)
- functions.php (theme setup)
- header.php, footer.php
- index.php, page.php, single.php
- Template parts for reusable sections
```

### Custom Gutenberg Blocks
```
Create custom Gutenberg blocks for common daycare website elements:

Blocks to create:
1. Hero section block (with image, text, CTA)
2. Services grid block
3. Testimonial block
4. Contact form block
5. Staff/team member block
6. Photo gallery block

For each block:
- Use block.json for registration
- Include editor and save functions
- Add inspector controls for customization
- Use design tokens for styling
- Ensure responsive behavior
```

## Usage Tips

1. **Combine prompts**: Mix context from site-context.md with specific component prompts
2. **Reference existing code**: Point AI to existing components as examples
3. **Iterate**: Start with basic structure, then refine with follow-up prompts
4. **Test**: Always test generated code in different browsers and screen sizes
5. **Customize**: Adapt these prompts for your specific needs

## Example Combined Prompt

```
Using the Valley Daycare Sites design system (css/tokens/design-tokens.css):

Create a testimonial carousel component with:
- Parent name and daycare name
- Quote text with quotation marks
- Star rating display
- Photo (optional)
- Navigation arrows
- Automatic rotation every 5 seconds
- Pause on hover

Style using:
- Primary color for accents
- Neutral background
- Rounded corners
- Soft shadow
- Smooth transitions

Code should be:
- Vanilla JavaScript (no dependencies)
- Accessible (keyboard navigation, ARIA labels)
- Mobile responsive
- BEM naming convention
```

This will generate a component that matches the site's design system and standards.
