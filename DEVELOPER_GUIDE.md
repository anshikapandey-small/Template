# UMBRA Template — Developer Guide

## Quick Start

1. **Clone the repository**:
   ```bash
   git clone https://github.com/anshikapandey-small/Template.git
   cd Template
   ```

2. **Open in browser**:
   - Local file: Open `index.html` directly in your browser, or
   - Local server: `python -m http.server 8000` then visit `http://localhost:8000`

3. **Deploy to GitHub Pages**:
   - Push to `main` branch
   - GitHub Actions will auto-deploy using Jekyll
   - Site available at: `https://anshikapandey-small.github.io/Template/`

---

## File Structure & Responsibilities

### Pages

| File | Purpose | Key Features |
|------|---------|--------------|
| `index.html` | Homepage | Hero slideshow, FAQ accordion, features section |
| `catalog.html` | Product catalog | Expandable categories, filters, FLIP animations |
| `product.html` | Product detail | Image gallery (auto-detect), quantity stepper |
| `checkout.html` | Order checkout | Form + order summary, GST calculation |
| `contact.html` | Contact page | FormSubmit.co integration |
| `customize.html` | Custom orders | Multi-step form, image upload |
| `login.html` | User login | Email/password, Google OAuth ready |
| `signup.html` | User registration | Account creation form |

### Styles

| File | Target Pages | Key Styles |
|------|--------------|-----------|
| `CSS/homepage.css` | index.html, catalog.html | Navigation, hero, collections, catalog, FAQs, features, footer |
| `CSS/product.css` | product.html | Gallery, info panel, responsive layout |
| `CSS/checkout.css` | checkout.html | Form layout, order summary, responsive two-column |
| `CSS/contact.css` | contact.html | Hero section, contact form |
| `CSS/customize.css` | customize.html | Multi-step form, upload zone, timeline picker |
| `CSS/login.css` | login.html, signup.html | Split panel layout, form styling |

### JavaScript

| File | Purpose | Functions |
|------|---------|-----------|
| `JS/homepage.js` | index.html | Hero slideshow, mobile nav toggle, smooth scroll to catalog, FAQ accordion |
| `JS/catalog.js` | catalog.html | Section expand/collapse, FLIP animations, subcategory filtering, show-more pagination |
| `JS/product.js` | product.html | Auto-detect gallery images, mobile pagination pill, quantity stepper |
| `JS/checkout.js` | checkout.html | Order summary population, currency formatting, GST calculation |
| `JS/contact.js` | contact.html | Contact form handling (basic) |
| `JS/customize.js` | customize.html | Multi-step form logic, file upload preview |
| `JS/login.js` | login.html, signup.html | Form validation, submission handling |

---

## Common Tasks

### 1. Add a New Product

**In `catalog.html`**:

Find the appropriate section (Shirts, Lamps, Figurines, or Daily Essentials) and add a new `.card` element:

```html
<div class="card">
  <div class="card-img">
    <img src="media/images/shirts/your-product.jpg" alt="Product Name">
  </div>
  <div class="card-info">
    <span class="card-tag">Tag</span>
    <span class="card-name">Product Name</span>
    <span class="card-price">₹1,499</span>
  </div>
</div>
```

**Update the product count**:
```html
<span class="cat-count">7 pieces</span> <!-- increment this -->
```

**For "Show More" section**:
If adding to Shirts and want it hidden initially, add `class="card extra"` to the new card.

Update the count in the "Show More" button:
```html
<span class="show-more-count">+4</span> <!-- increment from +3 -->
```

---

### 2. Change Hero Slideshow Images

**In `index.html`** (lines 45-49):

```html
<div class="hero-slideshow" id="heroSlideshow">
  <img src="media/images/hero/slide1.png" class="hero-slide active" alt="">
  <img src="media/images/hero/slide2.png" class="hero-slide" alt="">
  <img src="media/images/hero/slide3.png" class="hero-slide" alt="">
  <img src="media/images/hero/slide4.png" class="hero-slide" alt="">
</div>
```

Replace image paths. The slideshow auto-rotates every 3 seconds (see `JS/homepage.js`).

---

### 3. Update Product Detail Page

**In `product.html`**:

Change the product info in the `.info-panel`:

```html
<h1 class="info-title">New Product Name</h1>
<div class="info-price">₹1,499 <span class="compare">₹1,899</span></div>
<p class="info-desc">Your product description...</p>
```

**For images**:
1. Create a folder in `media/product/[category]/[product-name]/`
2. Add images as `image0.jpg`, `image1.jpg`, etc.
3. Update `JS/product.js`:
   ```javascript
   const IMAGE_FOLDER_PATH = "../media/product/[category]/[product-name]/";
   ```

The gallery auto-detects all images in the folder.

---

### 4. Customize Colors & Branding

**In `CSS/homepage.css`** (top of file):

```css
:root {
  --ink: #0a0a0a;        /* Text color */
  --paper: #ffffff;      /* Background color */
  --line: #e2e2de;       /* Border/divider color */
  --grey: #767671;       /* Secondary text */
  --grey-dark: #4a4a46;  /* Darker secondary text */
}
```

Change these values to match your brand.

**Typography**:
- Serif (headings): Fraunces (Google Fonts)
- Sans-serif (body): Inter (Google Fonts)

To change, update the font-family in CSS.

---

### 5. Update Contact Form Email

**In `contact.html`** (line 82):

```html
<form
  action="https://formsubmit.co/your-email@example.com"
  method="POST"
>
```

Replace `your-email@example.com` with your actual email.

Also update the redirect URL (line 96):
```html
<input type="hidden" name="_next" value="https://yourdomain.com/contact.html">
```

---

### 6. Add Subcategory Filters

**In `catalog.html`** (Figurines section, around line 115):

```html
<div class="subcats" data-subcats>
  <span class="subcat-pill active" data-filter="all">All</span>
  <span class="subcat-pill" data-filter="anime">Anime</span>
  <span class="subcat-pill" data-filter="new-category">New Category</span>
</div>
```

Then, on cards, add the filter attribute:
```html
<div class="card" data-sub="new-category">
```

The JavaScript in `JS/catalog.js` handles the filtering automatically.

---

### 7. Update GST Rate for Checkout

**In `JS/checkout.js`** (line 6):

```javascript
const order = {
  productName: "Shirt Name",
  variant: "Size: M",
  price: 1499,
  shippingCost: 99,
  gstRate: 0.05        // Change this (0.05 = 5%)
};
```

---

## Responsive Design Breakpoints

The template is mobile-first with these breakpoints:

- **980px**: Switch from 4-column to 2-column product grids
- **760px**: Activate mobile navigation menu, adjust spacing
- **520px**: Switch to single-column grid, stack layouts

Test changes across these breakpoints.

---

## Animations & Transitions

### FLIP Animation (Product Filtering)
Located in `JS/catalog.js`. When filter changes or "Show More" is clicked, cards smoothly animate into their new positions.

### Hero Slideshow
3-second interval rotation with 1-second fade transition (see `JS/homepage.js`).

### FAQ Accordion
Smooth max-height expansion/collapse with 0.5s timing (see `CSS/homepage.css`).

### Smooth Scroll
Enabled globally with `scroll-behavior: smooth` in HTML element.

---

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (iOS & macOS)
- Mobile browsers: Full support (tested on iOS Safari, Android Chrome)

---

## Performance Optimization Checklist

- [ ] Compress all images (use TinyPNG, ImageOptim)
- [ ] Use WebP format where supported (with jpg fallback)
- [ ] Lazy-load images below the fold
- [ ] Minify CSS and JavaScript
- [ ] Use CDN for images (Cloudflare, AWS CloudFront)
- [ ] Enable gzip compression on server
- [ ] Test with Lighthouse

---

## Accessibility Features

- ✅ Semantic HTML (`<nav>`, `<main>`, `<section>`, `<footer>`)
- ✅ ARIA labels on buttons (`aria-label`, `aria-expanded`, `aria-current`)
- ✅ Keyboard navigation support
- ✅ Color contrast meets WCAG AA standard
- ✅ Form labels properly associated with inputs

**To improve**:
- Add skip-to-content link
- Test with screen readers (NVDA, JAWS)
- Ensure all interactive elements keyboard-accessible

---

## Troubleshooting

### Images not loading
- Check file paths are relative to the HTML file location
- Ensure image files exist in the media folder
- Check browser console for 404 errors

### Animations not smooth
- Check if JavaScript is enabled
- Verify CSS transitions are not overridden by other styles
- Test in a different browser

### Mobile menu not working
- Check if `navToggle` and `navLinks` IDs exist in HTML
- Verify `JS/homepage.js` is loaded

### Form submission not working
- Verify FormSubmit.co email is correct (contact.html)
- Check backend endpoint is configured (checkout.html, customize.html)
- Test form with browser DevTools Network tab

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Sept 13, 2026 | Initial release: 9 pages, 7 categories, complete catalog |

---

## Support & Contributions

For issues or suggestions, please create a GitHub issue or contact: **hello@umbra.studio**

---

**Last Updated**: September 13, 2026  
**Template Version**: 1.0  
**Status**: ✅ Production Ready
