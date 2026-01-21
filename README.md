# Beini W - Personal Portfolio Website

A modern, responsive portfolio website showcasing full-stack development, SRE/DevOps expertise, AWS cloud skills, and language teaching services.

## 🌟 Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Multi-Service Portfolio**: Tech consulting, language teaching, and content creation
- **Interactive Elements**: Contact forms, project filtering, and smooth scrolling
- **SEO Optimized**: Proper meta tags and semantic HTML structure
- **Performance Focused**: Optimized images, CSS, and JavaScript

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Tailwind CSS, Custom CSS animations
- **Icons**: Font Awesome
- **Deployment**: Ready for AWS S3 + CloudFront

## 📁 Project Structure

```
beiniw20-portfolio/
├── index.html          # Homepage with hero and about sections
├── portfolio.html      # Projects showcase with filtering
├── services.html       # Service offerings and pricing
├── contact.html        # Contact form and information
├── styles.css          # Custom CSS and animations
├── script.js           # Interactive functionality
├── package.json        # Project dependencies and scripts
└── README.md          # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js (for development server)
- Modern web browser

### Installation

1. Clone or download the project files
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Open your browser to `http://localhost:3000`

## 📄 Pages Overview

### 1. Homepage (`index.html`)
- Hero section with professional introduction
- About section with skills and experience
- Call-to-action buttons for portfolio and contact

### 2. Portfolio (`portfolio.html`)
- Project showcase with filtering by category
- Interactive project cards with hover effects
- Links to live demos and source code

### 3. Services (`services.html`)
- Detailed service offerings:
  - Full Stack Development
  - DevOps & SRE
  - AWS Cloud Solutions
  - Mandarin Language Teaching
  - Technical Consulting
  - Content Creation
- Pricing information and process overview

### 4. Contact (`contact.html`)
- Contact form with validation
- Contact information and availability
- Social media links
- Response time expectations

## 🎨 Customization

### Colors
The website uses a blue-purple gradient theme. Main colors:
- Primary: `#667eea` (Blue)
- Secondary: `#764ba2` (Purple)
- Accent colors for different services

### Content Updates
1. **Personal Information**: Update name, bio, and contact details in HTML files
2. **Projects**: Modify project cards in `portfolio.html`
3. **Services**: Update pricing and service descriptions in `services.html`
4. **Skills**: Adjust skill percentages and technologies in the about section

### Styling
- Custom animations in `styles.css`
- Tailwind classes for responsive design
- Font Awesome icons for visual elements

## 🚀 Deployment

### AWS S3 + CloudFront (Recommended)

1. Create an S3 bucket for static website hosting
2. Upload all files to the bucket
3. Configure bucket for static website hosting
4. Set up CloudFront distribution for CDN
5. Configure custom domain (beiniw20.com)

### Quick Deploy Script
```bash
npm run deploy
```

### Other Deployment Options
- Netlify: Drag and drop the files
- Vercel: Connect GitHub repository
- GitHub Pages: Push to gh-pages branch

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- Mobile: 320px - 768px
- Tablet: 768px - 1024px
- Desktop: 1024px+

## ⚡ Performance Features

- Optimized images with proper alt tags
- Minified CSS and JavaScript (in production)
- Lazy loading for images
- Efficient animations with CSS transforms
- Debounced scroll and resize events

## 🔧 Development

### Available Scripts
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run deploy`: Deploy to AWS S3

### Code Structure
- Modular JavaScript with clear function separation
- CSS organized by components and utilities
- HTML semantic structure for accessibility

## 📈 SEO & Analytics

- Proper meta tags and descriptions
- Structured data markup
- Open Graph tags for social sharing
- Google Analytics ready (add tracking ID)

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 📞 Contact & Support

For questions about this portfolio website:
- Email: hello@beiniw20.com
- LinkedIn: linkedin.com/in/beiniw
- GitHub: github.com/beiniw20

## 📄 License

This project is for personal use. Feel free to use as inspiration for your own portfolio!

---

**Built with ❤️ by Beini W**