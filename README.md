# Abhijeet Pawar - Portfolio Website

A modern, dark-themed portfolio website built with React.js showcasing professional experience, skills, and projects.

## Features

- **Dark Theme Design**: Modern gradient backgrounds with neon accent colors
- **Responsive Layout**: Split-screen design with adaptive mobile layout
- **Interactive Game**: Chrome dinosaur-style game on the right side
- **Professional Sections**:
  - About Me & Education
  - Work Experience with timeline
  - Skills categorized by technology type
  - Featured Projects with tech stacks
  - Positions of Responsibility
  - Achievements & Certifications

## Tech Stack

- React.js
- Styled Components
- React Icons
- Canvas API (for dinosaur game)
- Modern CSS (Grid, Flexbox, Animations)

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd portfolio-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Game Controls

- **Click** or **Spacebar**: Jump over obstacles
- **Game automatically starts** when you click or press space
- Score increases by avoiding obstacles

## Customization

### Personal Information
Update your details in:
- `src/components/Header.js` - Name, contact info, social links
- `src/components/About.js` - Personal description and education
- `src/components/Experience.js` - Work experience and positions
- `src/components/Skills.js` - Technical skills and achievements
- `src/components/Projects.js` - Featured projects

### Styling
- Colors and themes can be modified in each component's styled-components
- Main color scheme uses cyan (`#64ffda`) and blue (`#00bcd4`) accents
- Dark background with gradient from `#0a0a0a` to `#1a1a1a`

## Build & Deploy

```bash
# Build for production
npm run build

# The build folder will contain optimized static files
```

## Project Structure

```
src/
├── components/
│   ├── Portfolio.js     # Main layout component
│   ├── Header.js        # Name and social links
│   ├── About.js         # Personal info and education
│   ├── Experience.js    # Work experience timeline
│   ├── Skills.js        # Technical skills grid
│   ├── Projects.js      # Featured projects
│   ├── DinosaurGame.js  # Interactive game
│   └── Footer.js        # Footer section
├── App.js
├── App.css
└── index.js
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ by Abhijeet Pawar