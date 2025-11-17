# Quick Start Guide - Valley Daycare Sites

Get up and running with the Valley Daycare Sites starter repository in minutes.

## 🚀 5-Minute Quick Start

### 1. View the Demo Pages

Open any template in your browser to see the design system in action:

```bash
# Open homepage
open templates/home.html
```

**What you'll see:**
- Professional header with navigation
- Hero section with CTA buttons
- Feature cards showcasing benefits
- Full-featured footer
- Mobile-responsive design

### 2. Test the Intake Form

```bash
# Open client intake form
open forms/client-intake.html
```

**Try it out:**
- Fill in the 10 questions
- See conditional fields in action
- Submit the form (logs to console)

### 3. Explore the Components

All components are in `css/components/`:
- `header.css` - Sticky navigation
- `footer.css` - Multi-column footer
- `button.css` - Button variants
- `card.css` - Content cards
- `hero.css` - Hero sections
- `form.css` - Form inputs

### 4. Check Design Tokens

Open `css/tokens/design-tokens.css` to see:
- Color palette (primary, secondary, accents)
- Typography system
- Spacing scale
- Shadows and transitions
- Breakpoints

### 5. Use AI Prompts

Open `ai-prompts/` directory:
- `site-context.md` - Project overview for AI
- `component-generation.md` - Generate new components
- `content-generation.md` - Write content

## 📋 Common Tasks

### Create a New Page

1. Copy an existing template from `templates/`
2. Update the title and content
3. Import the same CSS files
4. Keep header and footer consistent

### Customize Colors

1. Open `css/tokens/design-tokens.css`
2. Modify the color values in `:root`
3. Changes apply to all components automatically

### Add a New Component

1. Create new CSS file in `css/components/`
2. Follow BEM naming convention
3. Use CSS custom properties from tokens
4. Add mobile breakpoint at 768px
5. Import in your HTML

### Generate Content with AI

1. Open `ai-prompts/content-generation.md`
2. Choose appropriate prompt template
3. Copy prompt to your AI assistant
4. Customize with specific details
5. Review and edit output

## 🛠️ WordPress Integration

### Option 1: Manual Integration

1. Set up WordPress installation
2. Install required plugins (see `docs/wordpress-workflow.md`)
3. Create pages based on templates
4. Copy HTML content into WordPress editor
5. Add CSS to theme or custom CSS plugin

### Option 2: Custom Theme

1. Convert templates to WordPress theme structure
2. Create `functions.php`, `header.php`, `footer.php`
3. Break components into template parts
4. Enqueue CSS files properly
5. Test and deploy

**Full instructions:** See `docs/wordpress-workflow.md`

## 🎨 Customization Guide

### Change Brand Colors

```css
/* In css/tokens/design-tokens.css */
:root {
  --color-primary-500: #YOUR_COLOR;    /* Main brand color */
  --color-secondary-500: #YOUR_COLOR;  /* Secondary color */
}
```

### Update Typography

```css
/* In css/tokens/design-tokens.css */
:root {
  --font-family-heading: 'Your Font', sans-serif;
  --font-family-primary: 'Your Font', sans-serif;
}
```

### Adjust Spacing

```css
/* In css/tokens/design-tokens.css */
:root {
  --space-4: 1rem;   /* Base spacing unit */
  --space-8: 2rem;   /* Double */
  --space-16: 4rem;  /* Large sections */
}
```

## 📱 Testing Checklist

Before deploying, test:

- [ ] All page templates render correctly
- [ ] Mobile menu works (toggle hamburger icon)
- [ ] Forms submit successfully
- [ ] All links work
- [ ] Images load (replace placeholders)
- [ ] Colors match brand
- [ ] Mobile responsive (test at 320px, 768px, 1024px)
- [ ] Browser compatibility (Chrome, Firefox, Safari, Edge)

## 🔍 File Reference

### CSS Files (Import Order)
```html
<!-- Always import in this order -->
<link rel="stylesheet" href="../css/tokens/design-tokens.css">
<link rel="stylesheet" href="../css/components/base.css">
<link rel="stylesheet" href="../css/components/header.css">
<link rel="stylesheet" href="../css/components/footer.css">
<link rel="stylesheet" href="../css/components/button.css">
<link rel="stylesheet" href="../css/components/card.css">
<link rel="stylesheet" href="../css/components/hero.css">
<link rel="stylesheet" href="../css/components/form.css">
```

### Page Templates
- `templates/home.html` - Homepage with hero and features
- `templates/about.html` - About page with mission and values
- `templates/services.html` - Services with pricing cards
- `templates/blog.html` - Blog listing with pagination

### Forms
- `forms/client-intake.html` - 10-question intake form

### Documentation
- `README.md` - Full project documentation
- `docs/wordpress-workflow.md` - WordPress integration guide
- `ai-prompts/site-context.md` - Project context for AI
- `ai-prompts/component-generation.md` - AI prompts for components
- `ai-prompts/content-generation.md` - AI prompts for content

## 💡 Tips & Tricks

### Use AI Assistants Effectively

**For components:**
```
"Using Valley Daycare Sites design tokens, create a [component name] 
with [features]. Follow BEM naming and use CSS custom properties."
```

**For content:**
```
"Write [content type] for Valley Daycare Sites. Target audience: 
[audience]. Tone: friendly and professional. Include [specific points]."
```

### Component Patterns

**BEM Structure:**
```html
<div class="block">
  <div class="block__element">
    <div class="block__element--modifier">
  </div>
</div>
```

**Responsive Pattern:**
```css
.component {
  /* Mobile-first styles */
}

@media (min-width: 768px) {
  .component {
    /* Tablet and desktop styles */
  }
}
```

### Color Usage

- **Primary**: Call-to-action buttons, important elements
- **Secondary**: Links, secondary buttons
- **Accent Colors**: Playful elements, icons, badges
- **Neutrals**: Text, backgrounds, borders

## 🐛 Troubleshooting

### Images Not Loading
- Check file paths (use relative paths)
- Replace placeholder URLs with real images
- Ensure images are in correct directory

### CSS Not Applying
- Check import order (tokens first, then components)
- Verify file paths in link tags
- Check for typos in class names

### Mobile Menu Not Working
- Ensure JavaScript is included at bottom of page
- Check browser console for errors
- Verify menu toggle button has correct ID

### Forms Not Submitting
- Check form handler (currently logs to console)
- In production, connect to backend or service
- Verify all required fields have `required` attribute

## 📚 Learning Path

### Beginner
1. Explore page templates
2. Try the intake form
3. Customize colors in design tokens
4. Read the README

### Intermediate
1. Create a new page using existing templates
2. Customize components
3. Use AI prompts to generate content
4. Set up WordPress locally

### Advanced
1. Build custom WordPress theme
2. Create new components from scratch
3. Develop custom Gutenberg blocks
4. Integrate with headless CMS

## 🎯 Next Steps

1. **Customize for Your Brand**
   - Update colors and fonts
   - Add your logo
   - Replace placeholder content

2. **Add Real Content**
   - Write page copy
   - Add real images
   - Create actual service offerings

3. **Set Up WordPress**
   - Follow `docs/wordpress-workflow.md`
   - Install required plugins
   - Create page structure

4. **Deploy**
   - Test thoroughly
   - Set up hosting
   - Configure domain
   - Launch!

## 🆘 Need Help?

- **Documentation**: Check `README.md` and `docs/wordpress-workflow.md`
- **AI Prompts**: Use templates in `ai-prompts/` directory
- **Support**: info@valleydaycaresites.com

## ✅ Success Checklist

When you're ready to launch:

- [ ] All pages created and tested
- [ ] Content is accurate and proofread
- [ ] Images optimized and uploaded
- [ ] Forms work correctly
- [ ] Mobile responsive verified
- [ ] Browser compatibility tested
- [ ] SEO settings configured
- [ ] Analytics installed
- [ ] Performance optimized
- [ ] Backups configured

---

**Ready to build amazing daycare websites!** 🚀

*For detailed instructions, see the full [README.md](README.md) and [WordPress Workflow Guide](docs/wordpress-workflow.md).*
