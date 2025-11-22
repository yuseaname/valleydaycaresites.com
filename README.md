# Valley Daycare Sites - Starter Repository

A comprehensive starter repository for building professional websites for daycare centers. This repository includes design tokens, reusable components, page templates, AI prompts, and complete workflows for creating and deploying WordPress-based daycare websites.

## 🎯 Project Overview

Valley Daycare Sites specializes in creating beautiful, functional websites for childcare providers. This repository contains all the resources needed to build consistent, high-quality daycare websites efficiently.

## 📁 Repository Structure

```
valleydaycaresites.com/
├── css/
│   ├── tokens/
│   │   └── design-tokens.css         # Global CSS variables (colors, typography, spacing)
│   └── components/
│       ├── base.css                   # Base styles and utilities
│       ├── header.css                 # Navigation header component
│       ├── footer.css                 # Footer component
│       ├── button.css                 # Button variants
│       ├── card.css                   # Content card component
│       ├── hero.css                   # Hero section component
│       └── form.css                   # Form components
├── templates/
│   ├── home.html                      # Homepage template
│   ├── about.html                     # About page template
│   ├── services.html                  # Services page template
│   └── blog.html                      # Blog listing template
├── forms/
│   └── client-intake.html             # 10-question client intake form
├── ai-prompts/
│   ├── site-context.md                # Project context for AI assistants
│   ├── component-generation.md        # Prompts for generating components
│   └── content-generation.md          # Prompts for writing content
├── docs/
│   └── wordpress-workflow.md          # Complete WordPress workflow guide
└── README.md                          # This file
```

## 🎨 Design System

### Oxygen 6 Component Library

Our design system is built on Oxygen 6 principles with a warm, welcoming aesthetic perfect for daycare websites.

**Key Features:**
- Mobile-first responsive design
- Accessible components (WCAG 2.1 AA)
- CSS custom properties for easy theming
- BEM naming convention
- No JavaScript dependencies for core components

### Color Palette

- **Primary**: Golden Yellow (#f9ad00) - Warmth and optimism
- **Secondary**: Trust Blue (#0080c8) - Reliability and professionalism
- **Accent Colors**: Soft pink, green, purple, orange - Playful and child-friendly
- **Neutrals**: Comprehensive gray scale for text and backgrounds

### Typography

- **Headings**: Poppins (bold, friendly, modern)
- **Body Text**: Inter (clean, readable, professional)
- **Monospace**: Fira Code (for code examples)

## 🚀 Getting Started

### 1. View the Templates

Open any HTML template in your browser to see the design system in action:

```bash
# Navigate to the repository
cd valleydaycaresites.com

# Open homepage template (Mac)
open templates/home.html

# Or (Linux)
xdg-open templates/home.html

# Or (Windows)
start templates/home.html
```

### 2. Collect Client Information

Have clients complete the intake form to gather essential information:

1. Open `forms/client-intake.html` in a browser
2. Client completes the 10 questions
3. Form data is logged to console (in production, integrate with backend)

### 3. Use AI Prompts

Leverage the AI prompts to speed up development:

**For component generation:**
```
See: ai-prompts/component-generation.md
```

**For content writing:**
```
See: ai-prompts/content-generation.md
```

**For project context:**
```
See: ai-prompts/site-context.md
```

### 4. Follow WordPress Workflow

Complete step-by-step instructions for WordPress implementation:

```
See: docs/wordpress-workflow.md
```

## 📦 Components

### Header Component
Sticky navigation with logo, menu, and CTA button. Responsive mobile menu included.

```html
<header class="header">
  <div class="container header__container">
    <a href="/" class="header__logo">Valley Daycare Sites</a>
    <nav class="header__nav">
      <!-- Navigation menu -->
    </nav>
  </div>
</header>
```

### Footer Component
Multi-column footer with company info, links, and contact details.

```html
<footer class="footer">
  <div class="container">
    <div class="footer__main">
      <!-- Footer sections -->
    </div>
  </div>
</footer>
```

### Button Component
Multiple variants and sizes available.

```html
<button class="btn btn--primary">Primary Button</button>
<button class="btn btn--outline">Outline Button</button>
<button class="btn btn--lg">Large Button</button>
```

### Card Component
Flexible content card with image, text, and actions.

```html
<div class="card">
  <img src="image.jpg" class="card__image">
  <div class="card__content">
    <h3 class="card__title">Card Title</h3>
    <p class="card__description">Description text...</p>
  </div>
</div>
```

### Hero Section
Large banner section for page headers.

```html
<section class="hero">
  <div class="hero__container">
    <div class="hero__content">
      <h1 class="hero__title">Welcome</h1>
      <p class="hero__subtitle">Subtitle text</p>
    </div>
  </div>
</section>
```

### Form Components
Accessible form inputs with multiple states.

```html
<div class="form-group">
  <label for="name" class="form-label">Name</label>
  <input type="text" id="name" class="form-input">
</div>
```

## 🤖 AI Assistant Integration

### VS Code Integration

1. **GitHub Copilot**
   - Use prompts from `ai-prompts/component-generation.md`
   - Reference `ai-prompts/site-context.md` for project context

2. **Cursor AI**
   - Load context files when starting new components
   - Use content generation prompts for writing copy

3. **Other AI Tools**
   - Prompts are tool-agnostic
   - Adapt as needed for your preferred AI assistant

### Example Usage

```
# In your AI assistant:
"Using the Valley Daycare Sites design system (see ai-prompts/site-context.md), 
create a testimonial carousel component following the patterns in 
ai-prompts/component-generation.md"
```

## 📝 Client Intake Form

The 10-question intake form collects essential information:

1. Business name
2. Location
3. Age groups served
4. Current website status
5. Current website URL (if applicable)
6. Primary goals
7. Key features needed
8. Content availability
9. Timeline
10. Additional information

Plus contact information (name, email, phone).

## 🔗 Internal Linking Strategy

### Navigation Structure
- **Primary Menu**: Home, About, Services, Blog
- **Footer Menu**: Quick Links, Services, Resources, Legal
- **Contextual Links**: Related pages within content
- **Breadcrumbs**: Clear hierarchy navigation

### Best Practices
- Link to 3-5 related pages per page
- Use descriptive anchor text
- Ensure all pages accessible within 3 clicks
- Include "Related Content" sections

## 🎓 Learning Resources

### Design Tokens
Learn about the design system:
```
File: css/tokens/design-tokens.css
Contains: Colors, typography, spacing, shadows, transitions
```

### Component Patterns
Study component architecture:
```
Directory: css/components/
Pattern: BEM naming convention
Mobile: Mobile-first responsive design
```

### WordPress Integration
Complete workflow documentation:
```
File: docs/wordpress-workflow.md
Topics: Setup, page generation, SEO, testing, launch
```

## 🛠️ Development Workflow

### 1. Planning Phase
- [ ] Review client intake form responses
- [ ] Identify required pages and features
- [ ] Plan content structure
- [ ] Choose WordPress theme/approach

### 2. Design Phase
- [ ] Customize design tokens if needed
- [ ] Create page mockups using templates
- [ ] Gather/create images and media
- [ ] Write initial content

### 3. Development Phase
- [ ] Set up WordPress installation
- [ ] Install required plugins
- [ ] Create page structure
- [ ] Integrate components
- [ ] Add content and media

### 4. Testing Phase
- [ ] Test all functionality
- [ ] Check mobile responsiveness
- [ ] Validate forms
- [ ] Test across browsers
- [ ] Run accessibility audit

### 5. Launch Phase
- [ ] Final content review
- [ ] Set up analytics
- [ ] Configure SEO
- [ ] Launch website
- [ ] Monitor for issues

## 🔒 Security Best Practices

- Keep WordPress core and plugins updated
- Use strong passwords
- Install SSL certificate (HTTPS)
- Configure firewall (Wordfence or similar)
- Regular backups (UpdraftPlus or similar)
- Limit login attempts
- Remove unused plugins/themes

## ⚡ Performance Optimization

- Optimize images (compress, correct size)
- Enable caching (WP Rocket or similar)
- Use lazy loading for images
- Minify CSS/JavaScript
- Use CDN for static assets
- Monitor with PageSpeed Insights

## ♿ Accessibility Guidelines

All components follow WCAG 2.1 AA standards:
- Semantic HTML5 elements
- Proper heading hierarchy
- Alt text for all images
- Keyboard navigation support
- Sufficient color contrast
- Form labels and error messages
- Screen reader friendly

## 📱 Browser & Device Support

### Browsers
- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

### Devices
- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px+

## 🤝 Contributing

This is a starter repository template. To use it for your projects:

1. Clone the repository
2. Customize design tokens for your brand
3. Adapt components as needed
4. Use AI prompts to generate new content
5. Follow WordPress workflow for deployment

## 📄 License

This starter repository is provided for use by Valley Daycare Sites and its clients.

## 📞 Support

For questions or support:
- Email: info@valleydaycaresites.com
- Documentation: See `docs/` directory
- AI Prompts: See `ai-prompts/` directory

## 🎯 Quick Reference

### Import Order for CSS
```html
<link rel="stylesheet" href="css/tokens/design-tokens.css">
<link rel="stylesheet" href="css/components/base.css">
<link rel="stylesheet" href="css/components/[component].css">
```

### Common CSS Custom Properties
```css
/* Colors */
--color-primary-500
--color-secondary-500
--color-text-primary

/* Spacing */
--space-4
--space-8
--space-16

/* Typography */
--font-size-base
--font-weight-semibold
--line-height-normal
```

### Component Class Patterns
```
Block: .component
Element: .component__element
Modifier: .component--modifier
State: .component--is-active
```

## 🚢 Version History

- **v1.0** (March 2024): Initial release with complete design system, components, templates, AI prompts, and workflow documentation

---

**Built with ❤️ by Valley Daycare Sites**

*Helping daycare centers connect with families through professional websites.*
