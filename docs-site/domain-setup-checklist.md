# Domain Setup Checklist: sithe.in

**Domain:** sithe.in  
**Purpose:** Primary website for Zypher SDK  
**Timeline:** This week

---

## 📋 Step-by-Step Setup

### ✅ Step 1: Domain Purchase

**Registrar Options:**
- [ ] **Namecheap** (recommended for .in domains)
- [ ] **GoDaddy**
- [ ] **Porkbun**
- [ ] **Google Domains** (now Squarespace)

**Purchase Details:**
- Domain: `sithe.in`
- Registration period: 1-2 years
- Auto-renewal: Enable
- Privacy protection: Enable (WHOIS privacy)

**Estimated Cost:** $10-15/year

**Action Items:**
- [ ] Create account with registrar
- [ ] Search for sithe.in availability
- [ ] Purchase domain
- [ ] Enable WHOIS privacy
- [ ] Save login credentials securely

---

### ✅ Step 2: DNS Configuration

**DNS Provider Options:**
- [ ] Use registrar's DNS (simplest)
- [ ] **Cloudflare** (recommended - free, fast, DDoS protection)
- [ ] AWS Route 53
- [ ] Vercel DNS (if hosting on Vercel)

**If using Cloudflare:**
1. [ ] Create Cloudflare account
2. [ ] Add sithe.in to Cloudflare
3. [ ] Update nameservers at registrar to Cloudflare's:
   - `ns1.cloudflare.com`
   - `ns2.cloudflare.com`
4. [ ] Wait for DNS propagation (24-48 hours)

**DNS Records to Configure:**

```
Type    Name    Value                   TTL     Priority
A       @       [Your server IP]        Auto    -
A       www     [Your server IP]        Auto    -
CNAME   docs    docs.sithe.in          Auto    -
MX      @       [Email provider]        Auto    10
TXT     @       [SPF record]            Auto    -
```

**Action Items:**
- [ ] Choose DNS provider
- [ ] Update nameservers (if using external DNS)
- [ ] Add A records for root and www
- [ ] Add CNAME for docs subdomain
- [ ] Verify DNS propagation: `nslookup sithe.in`

---

### ✅ Step 3: Email Setup

**Email Provider Options:**
- [ ] **Google Workspace** ($6/user/month - professional)
- [ ] **Zoho Mail** (Free tier available)
- [ ] **Cloudflare Email Routing** (Free forwarding)
- [ ] **Mailgun** (For transactional emails)

**Recommended Setup:**
Use **Cloudflare Email Routing** (free) for initial forwarding

**Email Addresses to Create:**
- `contact@sithe.in` → Forward to personal email
- `support@sithe.in` → Forward to personal email
- `hello@sithe.in` → Forward to personal email
- `beta@sithe.in` → Forward to personal email

**Cloudflare Email Routing Setup:**
1. [ ] Go to Cloudflare dashboard
2. [ ] Navigate to Email → Email Routing
3. [ ] Enable Email Routing
4. [ ] Add destination email (your personal email)
5. [ ] Create routing rules for each address
6. [ ] Verify destination email

**DNS Records (Auto-added by Cloudflare):**
```
MX      @       route1.mx.cloudflare.net    10
MX      @       route2.mx.cloudflare.net    20
MX      @       route3.mx.cloudflare.net    30
TXT     @       v=spf1 include:_spf.mx.cloudflare.net ~all
```

**Action Items:**
- [ ] Choose email provider
- [ ] Set up email forwarding
- [ ] Test email delivery: send to contact@sithe.in
- [ ] Add SPF/DKIM records for deliverability

---

### ✅ Step 4: SSL Certificate

**SSL Provider:**
- [ ] **Cloudflare** (Free, automatic)
- [ ] **Let's Encrypt** (Free, requires setup)
- [ ] **Paid SSL** (Not necessary)

**If using Cloudflare:**
- SSL is automatic and free
- [ ] Go to SSL/TLS settings
- [ ] Set encryption mode to "Full (strict)"
- [ ] Enable "Always Use HTTPS"
- [ ] Enable "Automatic HTTPS Rewrites"

**If using Let's Encrypt:**
```bash
# Install certbot
sudo apt-get install certbot

# Generate certificate
sudo certbot certonly --standalone -d sithe.in -d www.sithe.in

# Auto-renewal (cron job)
sudo certbot renew --dry-run
```

**Action Items:**
- [ ] Choose SSL provider
- [ ] Configure SSL settings
- [ ] Verify HTTPS works: https://sithe.in
- [ ] Test SSL rating: https://www.ssllabs.com/ssltest/

---

### ✅ Step 5: Hosting Setup

**Hosting Options:**
- [ ] **Vercel** (recommended for Next.js/static sites)
- [ ] **Netlify** (great for static sites)
- [ ] **AWS S3 + CloudFront** (scalable)
- [ ] **DigitalOcean** (VPS)
- [ ] **GitHub Pages** (free, limited)

**Recommended: Vercel**

**Vercel Setup:**
1. [ ] Create Vercel account
2. [ ] Connect GitHub repository
3. [ ] Import Zypher landing page project
4. [ ] Configure build settings:
   - Framework: Next.js / Vite / None
   - Build command: `npm run build`
   - Output directory: `dist` or `out`
5. [ ] Add custom domain: sithe.in
6. [ ] Vercel will auto-configure DNS

**DNS Configuration for Vercel:**
```
Type    Name    Value                       TTL
A       @       76.76.21.21                 Auto
CNAME   www     cname.vercel-dns.com        Auto
```

**Action Items:**
- [ ] Choose hosting provider
- [ ] Deploy landing page (even if placeholder)
- [ ] Connect custom domain
- [ ] Verify site loads: https://sithe.in

---

### ✅ Step 6: Subdomain Setup

**Subdomains to Configure:**

#### docs.sithe.in (Documentation)
- [ ] Create CNAME record: `docs` → `sithe.in` or hosting provider
- [ ] Deploy docs site (e.g., Docusaurus, GitBook)
- [ ] Verify: https://docs.sithe.in

#### api.sithe.in (API endpoint)
- [ ] Create A record: `api` → API server IP
- [ ] Or CNAME: `api` → API hosting provider
- [ ] Verify: https://api.sithe.in

#### app.sithe.in (Dashboard - future)
- [ ] Reserve for future use
- [ ] Add placeholder page

**Action Items:**
- [ ] Add DNS records for subdomains
- [ ] Deploy subdomain content
- [ ] Test all subdomains

---

### ✅ Step 7: Security \u0026 Performance

**Cloudflare Settings (Recommended):**

**Security:**
- [ ] Enable "Under Attack Mode" if needed
- [ ] Configure firewall rules
- [ ] Enable Bot Fight Mode
- [ ] Set up rate limiting

**Performance:**
- [ ] Enable Auto Minify (HTML, CSS, JS)
- [ ] Enable Brotli compression
- [ ] Configure caching rules
- [ ] Enable Rocket Loader (optional)

**DNS Settings:**
- [ ] Enable DNSSEC
- [ ] Enable IPv6 compatibility

**Action Items:**
- [ ] Configure Cloudflare security settings
- [ ] Test site performance: https://pagespeed.web.dev
- [ ] Verify security headers: https://securityheaders.com

---

### ✅ Step 8: Analytics \u0026 Monitoring

**Analytics:**
- [ ] **Google Analytics** (free, comprehensive)
- [ ] **PostHog** (privacy-friendly, self-hosted option)
- [ ] **Plausible** (privacy-friendly, paid)

**Setup Google Analytics:**
1. [ ] Create GA4 property
2. [ ] Add tracking code to landing page
3. [ ] Set up conversion goals
4. [ ] Test tracking

**Uptime Monitoring:**
- [ ] **UptimeRobot** (free, 50 monitors)
- [ ] **Pingdom**
- [ ] **StatusCake**

**Setup UptimeRobot:**
1. [ ] Create account
2. [ ] Add monitor for sithe.in
3. [ ] Set alert email
4. [ ] Test alerts

**Action Items:**
- [ ] Set up analytics
- [ ] Configure uptime monitoring
- [ ] Test tracking and alerts

---

### ✅ Step 9: SEO Setup

**Meta Tags:**
```html
<title>Zypher - Prove Your AI. Protect Your Trust.</title>
<meta name="description" content="Cryptographically verify AI-generated content using zero-knowledge proofs. Built for developers.">
<meta name="keywords" content="AI verification, zero-knowledge proofs, ZK proofs, AI compliance, AI trust">

<!-- Open Graph -->
<meta property="og:title" content="Zypher - Prove Your AI">
<meta property="og:description" content="Cryptographically verify AI-generated content using zero-knowledge proofs.">
<meta property="og:image" content="https://sithe.in/og-image.png">
<meta property="og:url" content="https://sithe.in">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Zypher - Prove Your AI">
<meta name="twitter:description" content="Cryptographically verify AI-generated content using zero-knowledge proofs.">
<meta name="twitter:image" content="https://sithe.in/twitter-card.png">
```

**Sitemap:**
- [ ] Generate sitemap.xml
- [ ] Submit to Google Search Console
- [ ] Submit to Bing Webmaster Tools

**robots.txt:**
```
User-agent: *
Allow: /
Sitemap: https://sithe.in/sitemap.xml
```

**Action Items:**
- [ ] Add meta tags to landing page
- [ ] Create OG image (1200x630px)
- [ ] Generate sitemap
- [ ] Submit to search engines
- [ ] Verify with Google Search Console

---

### ✅ Step 10: Final Verification

**Pre-Launch Checklist:**
- [ ] Domain resolves correctly: `ping sithe.in`
- [ ] HTTPS works: https://sithe.in
- [ ] www redirects to root: https://www.sithe.in → https://sithe.in
- [ ] Email forwarding works: test contact@sithe.in
- [ ] SSL certificate is valid (A+ rating)
- [ ] Site loads in <3 seconds
- [ ] Mobile responsive
- [ ] Analytics tracking works
- [ ] Uptime monitoring active
- [ ] All subdomains work

**Testing Tools:**
- [ ] DNS: https://dnschecker.org
- [ ] SSL: https://www.ssllabs.com/ssltest/
- [ ] Performance: https://pagespeed.web.dev
- [ ] Security: https://securityheaders.com
- [ ] Mobile: https://search.google.com/test/mobile-friendly

---

## 📊 Domain Setup Summary

| Item | Provider | Cost | Status |
|------|----------|------|--------|
| Domain | Namecheap | $12/year | [ ] |
| DNS | Cloudflare | Free | [ ] |
| Email | Cloudflare Routing | Free | [ ] |
| SSL | Cloudflare | Free | [ ] |
| Hosting | Vercel | Free | [ ] |
| Analytics | Google Analytics | Free | [ ] |
| Monitoring | UptimeRobot | Free | [ ] |

**Total Cost:** ~$12/year (just the domain!)

---

## 🚀 Quick Start (Minimal Setup)

If you want to get up and running quickly:

1. **Buy domain** on Namecheap (~10 min)
2. **Add to Cloudflare** for DNS + SSL (~15 min)
3. **Deploy to Vercel** with custom domain (~10 min)
4. **Set up email forwarding** on Cloudflare (~5 min)

**Total time:** ~40 minutes

---

## 📞 Support Contacts

- **Namecheap Support:** https://www.namecheap.com/support/
- **Cloudflare Support:** https://support.cloudflare.com
- **Vercel Support:** https://vercel.com/support

---

## ✅ Completion Checklist

- [ ] Domain purchased
- [ ] DNS configured
- [ ] Email forwarding set up
- [ ] SSL certificate active
- [ ] Landing page deployed
- [ ] Subdomains configured
- [ ] Analytics installed
- [ ] Uptime monitoring active
- [ ] SEO optimized
- [ ] All tests passing

**Status:** Ready for launch! 🚀
