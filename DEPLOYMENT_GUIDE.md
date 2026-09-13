# UMBRA Template — Deployment Guide

## Pre-Deployment Checklist

### Content
- [ ] All product images replaced (no temp.jpg placeholders)
- [ ] Hero video URLs updated in catalog.html
- [ ] Product descriptions reviewed for typos
- [ ] Contact email verified in contact.html
- [ ] Links to privacy policy/terms added to footer
- [ ] Team member bios and photos added (if applicable)

### Functionality
- [ ] All links tested and working
- [ ] Forms tested in browser (contact, checkout, customize)
- [ ] Mobile navigation tested on actual devices
- [ ] Image gallery tested with actual product images
- [ ] Slideshow timing verified
- [ ] FAQ accordion works on mobile

### Technical
- [ ] Payment gateway integration completed (Stripe/Razorpay)
- [ ] Email notifications set up (FormSubmit.co verified)
- [ ] Analytics configured (Google Analytics, etc.)
- [ ] Error tracking enabled (Sentry, LogRocket, etc.)
- [ ] SSL/HTTPS enabled
- [ ] sitemap.xml generated
- [ ] robots.txt configured

### Performance
- [ ] Images optimized and compressed
- [ ] Lighthouse score > 90
- [ ] Page load time < 3 seconds
- [ ] Mobile performance tested
- [ ] CDN configured for static assets

### Security
- [ ] No hardcoded API keys or secrets
- [ ] .env files added to .gitignore
- [ ] CSRF protection enabled on forms
- [ ] Input validation on all forms
- [ ] XSS protection headers configured
- [ ] Security headers set (CSP, X-Frame-Options, etc.)

---

## Deployment Options

### Option 1: GitHub Pages (Recommended for static site)

1. **Ensure main branch is updated**:
   ```bash
   git add .
   git commit -m "Update deployment files"
   git push origin main
   ```

2. **GitHub Actions will auto-deploy**:
   - Check `.github/workflows/jekyll-docker.yml`
   - Site available at: `https://anshikapandey-small.github.io/Template/`

3. **Custom domain** (optional):
   - Add CNAME file with your domain
   - Configure DNS to point to GitHub Pages

---

### Option 2: Traditional Web Host

1. **Prepare files**:
   ```bash
   # Remove any development files
   rm -rf .git .github .gitignore
   # Or just deploy the files, keep .git for version history
   ```

2. **FTP/Upload to server**:
   - Use FileZilla, WinSCP, or hosting provider's dashboard
   - Upload all files to public_html or www folder

3. **Verify deployment**:
   - Check all links work
   - Test forms
   - Verify media loads correctly

---

### Option 3: Modern Cloud Platform (Vercel, Netlify, etc.)

**Vercel** (recommended):
```bash
npm install -g vercel
vercel
# Follow prompts, select project root
# Automatic deployment on git push
```

**Netlify**:
- Connect GitHub repository
- Set build command: (leave empty for static site)
- Publish directory: `/` (root)
- Deploy button will appear in repo

---

## Post-Deployment Tasks

1. **Test on production**:
   - Open all pages in browser
   - Fill out forms and verify submissions
   - Check console for errors

2. **Analytics setup**:
   - Add Google Analytics to all pages:
     ```html
     <!-- Add to <head> of index.html, catalog.html, etc. -->
     <script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
     <script>
       window.dataLayer = window.dataLayer || [];
       function gtag(){dataLayer.push(arguments);}
       gtag('js', new Date());
       gtag('config', 'GA_ID');
     </script>
     ```

3. **Set up email notifications**:
   - Verify FormSubmit.co integration working
   - Test by submitting contact form
   - Confirm email received at configured address

4. **Monitor for errors**:
   - Set up error tracking service
   - Check logs regularly first week

5. **SEO optimization**:
   - Submit sitemap to Google Search Console
   - Submit to Bing Webmaster Tools
   - Monitor for indexing issues

---

## Domain Configuration

### DNS Records

Replace `yourdomain.com` with your actual domain:

| Record Type | Name | Value |
|-------------|------|-------|
| CNAME | www | anshikapandey-small.github.io |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

*(If using GitHub Pages; adjust for other hosts)*

---

## SSL/HTTPS Setup

### For GitHub Pages:
- Automatically handled; HTTPS enabled by default

### For other hosts:
1. Use Let's Encrypt (free):
   ```bash
   # If using Certbot
   sudo certbot certonly --webroot -w /var/www/yourdomain
   ```

2. Force HTTPS redirect:
   - Add to .htaccess (Apache):
     ```apache
     RewriteEngine On
     RewriteCond %{HTTPS} off
     RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
     ```

---

## Environment Variables (if using backend)

Create `.env` file (never commit to git):

```env
# Contact form
CONTACT_EMAIL=hello@yourdomain.com

# Payment gateway
STRIPE_PUBLIC_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...

# Email service
SENDGRID_API_KEY=SG.xxx

# Analytics
GOOGLE_ANALYTICS_ID=G-xxx
```

Add to .gitignore:
```
.env
.env.local
.env.*.local
```

---

## Rollback Plan

If deployment causes issues:

1. **For GitHub Pages**:
   ```bash
   git revert <commit-hash>
   git push origin main
   ```

2. **For traditional host**:
   - Keep backup of previous version
   - FTP upload previous files back

3. **For cloud platforms**:
   - Use built-in rollback feature
   - Or redeploy from previous git commit

---

## Monitoring & Maintenance

### Weekly
- [ ] Check for form submissions (contact, checkout, etc.)
- [ ] Verify no JavaScript errors in console
- [ ] Test on 2-3 different browsers

### Monthly
- [ ] Review analytics for traffic patterns
- [ ] Check for broken images/links (404 errors)
- [ ] Update product inventory if applicable
- [ ] Review and respond to customer inquiries

### Quarterly
- [ ] Audit security headers
- [ ] Run Lighthouse performance audit
- [ ] Review and update SEO metadata
- [ ] Update project dependencies if applicable

---

## Common Deployment Issues

### Issue: Images not loading on production
**Solution**: 
- Check file paths (use relative paths, not absolute)
- Verify CORS headers if images on CDN
- Check image file extensions match exactly

### Issue: Forms not submitting
**Solution**:
- Verify FormSubmit.co email in HTML
- Check CORS headers if backend on different domain
- Test with browser DevTools Network tab

### Issue: CSS/JavaScript not loading
**Solution**:
- Verify file paths in HTML
- Check file permissions (644 for files, 755 for directories)
- Clear browser cache (Ctrl+Shift+Delete)

### Issue: Mobile menu not working on production
**Solution**:
- Verify JavaScript file is loaded (check Network tab)
- Check for console errors
- Test in different mobile browser

---

## Analytics to Track

Set up event tracking for:
- Page views
- Product clicks
- Form submissions (contact, customize, checkout)
- Add to cart actions
- Checkout completions
- Errors and page load times

---

## Backup Strategy

1. **Automated backups**:
   - GitHub automatically backs up your repo
   - Cloud platforms (Vercel, Netlify) keep deployment history

2. **Manual backups**:
   ```bash
   # Backup entire project
   tar -czf umbra-backup-$(date +%Y%m%d).tar.gz .
   ```

3. **Database backups** (if using backend):
   - Set up daily automated backups
   - Store in secure location

---

## Scaling & Performance

When traffic grows:

1. **Optimize images**:
   - Use WebP format with fallbacks
   - Compress with TinyPNG/ImageOptim
   - Lazy-load images below fold

2. **Enable caching**:
   - Browser caching headers
   - CDN caching
   - Server-side caching

3. **Upgrade hosting**:
   - If on shared hosting, move to VPS
   - Use Vercel/Netlify edge functions for dynamic content

4. **Database optimization** (if applicable):
   - Add indexes
   - Cache frequently accessed data
   - Use connection pooling

---

## Support Contacts

- **Hosting Support**: [Your hosting provider]
- **Domain Registrar**: [Your domain provider]
- **Email Service**: [FormSubmit.co, SendGrid, etc.]
- **Payment Processor**: [Stripe, Razorpay, etc.]

---

**Last Updated**: September 13, 2026  
**Version**: 1.0  
**Status**: ✅ Ready for Deployment
