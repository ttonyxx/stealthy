# 🏥 Stealthy - Healthcare Transparency Platform

A beautiful, modern landing page for crowdsourcing medical procedure costs across different institutions and insurance plans. Inspired by levels.fyi's design aesthetic with a pink-themed color scheme.

![Stealthy Preview](https://img.shields.io/badge/Status-Ready%20to%20Deploy-brightgreen?style=for-the-badge)

## ✨ Features

- **Pink-themed Modern Design** - Beautiful gradient animations and smooth transitions
- **Fully Responsive** - Works perfectly on desktop, tablet, and mobile devices
- **Interactive Elements** - Smooth scrolling, animated stats, and engaging hover effects
- **Waitlist Modal** - Beautiful modal for collecting early user signups
- **Real Cost Examples** - Showcase actual savings from different healthcare providers
- **Procedure Browser** - Tabbed interface for exploring different medical procedures
- **Scroll Animations** - Elements fade in as you scroll for a dynamic experience
- **Keyboard Shortcuts** - Cmd/Ctrl + K for search, Escape to close modals
- **Easter Eggs** - Hidden surprises for engaged users
- **SEO Optimized** - Proper meta tags and semantic HTML

## 🚀 Quick Start

### View Locally

1. Simply open `index.html` in your web browser
2. That's it! No build process or dependencies required

### Deploy to GitHub Pages

1. **Create a new GitHub repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Stealthy landing page"
   ```

2. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/yourusername/stealthy-healthcare.git
   git branch -M main
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to your repository settings
   - Navigate to "Pages" in the left sidebar
   - Under "Source", select the `main` branch
   - Click "Save"
   - Your site will be live at `https://yourusername.github.io/stealthy-healthcare/`

## 📁 Project Structure

```
stealthy/
├── index.html      # Main HTML file with page structure
├── styles.css      # All styling, animations, and responsive design
├── script.js       # Interactive features and animations
└── README.md       # This file
```

## 🎨 Design Features

### Color Palette
- **Primary Pink**: `#FF6B9D` - Main brand color
- **Light Pink**: `#FFB3D9` - Accents and gradients
- **Pale Pink**: `#FFF0F7` - Backgrounds
- **White**: `#FFFFFF` - Main background
- **Success Green**: `#10B981` - Savings badges

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 400, 500, 600, 700, 800

### Animations
- **Fade In Up** - Cards and sections slide up on scroll
- **Float** - Subtle floating animation for badges
- **Pulse** - Attention-grabbing effect for CTAs
- **Ripple** - Material Design-inspired button clicks
- **Parallax** - Hero section moves with scroll

## 🛠️ Customization

### Change Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --pink-primary: #FF6B9D;
    --pink-light: #FFB3D9;
    --pink-lighter: #FEC5E5;
    --pink-pale: #FFF0F7;
}
```

### Update Content
- **Company Name**: Search for "stealthy" in `index.html` and replace
- **Stats**: Update numbers in the stats-row section
- **Savings Examples**: Modify the saving-card sections
- **Procedures**: Edit the procedure-card sections

### Add Your Logo
Replace the SVG logo in the navbar with your own:
```html
<div class="logo">
    <img src="your-logo.png" alt="Your Logo">
    <span class="logo-text">your-name</span>
</div>
```

## 📧 Waitlist Integration

The waitlist form currently logs emails to the console. To integrate with a backend:

### Option 1: Use a Form Service (Recommended)
Replace the form action in `script.js` with services like:
- **Formspree**: https://formspree.io
- **Netlify Forms**: Built-in form handling
- **Google Forms**: Embed your form
- **ConvertKit**: Email marketing platform

Example with Formspree:
```javascript
function submitWaitlist(e) {
    e.preventDefault();
    const form = e.target;
    const email = form.querySelector('input[type="email"]').value;

    fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email })
    }).then(response => {
        // Show success message
    });
}
```

### Option 2: Use Google Sheets
Use a service like SheetDB or Google Apps Script to save emails directly to a spreadsheet.

### Option 3: Build Your Own Backend
Create an API endpoint that saves emails to your database.

## 🎯 Use Cases

This landing page is perfect for:
- **Healthcare Price Transparency Platforms**
- **Medical Cost Comparison Tools**
- **Patient Advocacy Organizations**
- **Healthcare Startups**
- **Insurance Comparison Services**
- **Medical Tourism Platforms**

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px

## 🔧 Browser Support

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Opera

## 🚀 Performance

- **Zero Dependencies** - Pure HTML, CSS, and JavaScript
- **Optimized Animations** - GPU-accelerated transforms
- **Lazy Loading** - Images load as needed (when added)
- **Minimal Bundle Size** - Under 50KB total

## 📈 Next Steps

### Phase 1: Launch
- [x] Create beautiful landing page
- [ ] Deploy to GitHub Pages
- [ ] Set up waitlist collection
- [ ] Share on social media

### Phase 2: Enhance
- [ ] Add more procedure examples
- [ ] Create blog section
- [ ] Add testimonials
- [ ] Integrate analytics (Google Analytics, Plausible, etc.)

### Phase 3: Build
- [ ] Create actual search functionality
- [ ] Build database of procedures
- [ ] User submission form
- [ ] Data visualization

## 🤝 Contributing

This is a template project. Feel free to fork and customize for your own healthcare transparency platform!

## 📄 License

This project is open source and available for anyone building healthcare transparency tools.

## 🎉 Credits

- Inspired by the clean design of levels.fyi
- Built with ❤️ for healthcare transparency
- Icons: Unicode emojis
- Fonts: Google Fonts (Inter)

## 📞 Support

If you need help deploying or customizing:
1. Check the GitHub Pages documentation
2. Review the code comments
3. Test locally first before deploying

---

**Made with 💗 to bring transparency to healthcare**

Remember: Healthcare costs should be transparent, not a mystery!
