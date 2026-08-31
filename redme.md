# Abhishek Kewat — Portfolio (v2)

## Files
- `index.html` — structure/content
- `style.css` — GitHub-dark themed design system (+ light mode)
- `script.js` — theme toggle, typing effect, cursor, scroll reveals, tilt, project filter, contact form

## Before you deploy

1. **Project images** — `index.html` references your existing images by filename
   (`news ki asli photo.png`, `hospital based img.png`, `shoping clone img for somthing.png`,
   `game hub.png`). Put those image files in the same folder as `index.html` (rename if you'd like,
   just update the `src` attributes to match).

2. **Contact form** — the old `cyclic.app` API endpoint is dead (Cyclic shut down in 2023), so I
   rebuilt the form to use **EmailJS** (free tier, no backend needed):
   1. Create a free account at https://www.emailjs.com
   2. Add an Email Service + Email Template
   3. In `script.js`, replace `YOUR_SERVICE_ID`, `YOUR_TEMPLATE_ID`, and `YOUR_PUBLIC_KEY` with your
      real values (top of the "Contact form" section).
   - Until you do that, the form still works — it falls back to opening the visitor's email app
     with the message pre-filled, so nothing is ever broken for a recruiter testing it.

3. **GitHub stats** — pointed at `github.com/Abhishekke277` (matching your GitHub link). Update the
   `username=` params in `index.html` if that's not your current handle.

4. **Resume link** — still points to `https://akresumeinknow.netlify.app/`. Swap it if you get a
   new resume URL.

## Deploy
Drag the folder into Netlify, or push to GitHub Pages / Vercel — it's a static site, no build step.