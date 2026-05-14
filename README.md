# Anjana Rajagopal — AI/ML Portfolio

A minimal, dark-themed AI/ML portfolio built with Jekyll for GitHub Pages.

## Quick Start

### Local Development

```bash
# Install Ruby gems
bundle install

# Serve locally
bundle exec jekyll serve

# Open http://localhost:4000
```

### GitHub Pages Deployment

1. Create a new GitHub repository named `your-username.github.io`
2. Push all files to the `main` branch
3. Go to **Settings → Pages → Source → Deploy from branch → main**
4. Your site will be live at `https://your-username.github.io`

## Customization Checklist

### Required edits before publishing:

- [ ] `_config.yml` — update `url`, `author.github`, `author.linkedin`, `author.email`
- [ ] `index.html` — update GitHub/LinkedIn/email links in Hero and Contact sections
- [ ] `index.html` — update Resume link (href="#" → your actual resume URL)
- [ ] `_data/projects.yml` — update GitHub links and descriptions
- [ ] `_data/publications.yml` — update paper titles, descriptions, and links
- [ ] `_layouts/default.html` — update Resume link in nav

### Optional:
- Add a `favicon.ico` to root
- Add a `assets/images/` folder for any project screenshots
- Customize colors via CSS variables in `assets/css/style.css`

## Structure

```
portfolio/
├── _layouts/
│   └── default.html        # Base HTML layout
├── _data/
│   ├── projects.yml         # Project cards data
│   ├── publications.yml     # Research papers
│   └── skills.yml           # Skills by category
├── assets/
│   ├── css/style.css        # All styles
│   └── js/
│       ├── main.js          # Nav, scroll, animations
│       └── ascii.js         # ASCII art converter
├── index.html               # Main page
├── _config.yml              # Jekyll config
└── Gemfile
```

## ASCII Art Lab

The Image → ASCII converter is built entirely in vanilla JS using the Canvas API.
- Zero server uploads — everything runs in the browser
- Supports drag & drop or click-to-browse
- 4 character sets: Dense, Simple, Unicode Blocks, Hatching
- Adjustable width (40–200 cols) and invert toggle
- One-click copy to clipboard
