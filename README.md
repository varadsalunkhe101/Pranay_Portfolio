# Pranay Portfolio

A civil engineering student portfolio built with Vite, HTML, custom CSS, and vanilla JavaScript. Personal content is kept in `src/data/portfolio.js`.

## Requirements

Install Node.js 20.19+ or 22.12+ from [nodejs.org](https://nodejs.org/). This also installs npm.

## Run on Windows

Open Command Prompt and run:

```cmd
cd /d E:\Pranay_Portfolio
npm install
npm run dev
```

Open the local URL printed in the terminal, usually `http://localhost:5173`.

To make a production build:

```cmd
npm run build
```

The finished site is written to the `dist` folder. To preview that build locally:

```cmd
npm run preview
```

## Update your content

Edit `src/data/portfolio.js`. Replace placeholders with true information. Leave optional lists empty if you do not want to publish those sections. Do not add projects, qualifications, skills, awards, or experience that you cannot verify.

The site hides optional Skills, Education, and Certifications sections when their lists are empty. The Civil Engineering Focus section uses `interests` as areas of interest and features the practical experience entry selected by `featuredExperienceIndex` (default `0`). Change the index to feature another entry, or set it to `null` to hide the experience highlight. Fieldwork images and visual documentation belong in the My Work Gallery. Project cards appear when a project has a title or description. The résumé link appears when a résumé path is configured.

## My Work Gallery

The site includes a separate page at `gallery.html` and a branded `public/404.html` not-found page, linked as **Gallery** in the main navigation. Add only real work to the `gallery` array in `src/data/portfolio.js`. The page supports a title, category, date, local image, alt text, description, and an optional link to documentation. Leave the array empty to show the designed getting-started state.

To add a piece, place its image in `public/assets/images/` and add an object like this to `gallery`:

```js
{
  title: "Your real work title",
  category: "Drawing / Study / Fieldwork",
  date: "[YEAR_OR_DATE]",
  image: "/assets/images/your-image.jpg",
  alt: "A concise description of the image",
  description: "A short, factual description of this work.",
  link: "", // Optional report, drawing, or documentation URL.
}
```

The gallery page is included in the Vite production build and works with the existing GitHub Pages and Vercel deployment setup. After adding work, run `npm run build` and redeploy the updated `dist` output.
## Add your own images and résumé

- Put your real portrait and project images in `public/assets/images/`.
- Recommended portrait size: about 1000 × 1250 px.
- Recommended landscape project image: about 1600 × 1100 px.
- Optimized WebP derivatives used by the site are in `public/assets/optimized/`. Unused logo exports and the original unoptimized source images are preserved in `Not required or extra/`; restore a source image from there if you want to edit or re-export it. Put new images in `public/assets/images/` and update the configured image path and dimensions together.
- Use optimized JPG or WebP images where possible.
- Set image paths in `src/data/portfolio.js`, for example: `/assets/images/portrait.jpg`.
- Set a project's `imageType` to `"drawing"` for plans or technical drawings; those stay still when a project card is hovered or focused.
- The current résumé is `public/resume.pdf`; the config points to `/resume.pdf`. Replace that file with your latest actual PDF to update the download.

The contact form stays visible while you prepare deployment. Create a form with [Formspree](https://formspree.io/), verify the destination email, then set `contactFormEndpoint` in `src/data/portfolio.js` to your real endpoint (for example, `https://formspree.io/f/your-real-id`). Until then, submitting the form explains that delivery is not connected; no message is claimed as sent. After configuration, success appears only after Formspree returns a successful response, and network or service failures show an error. The direct email link remains available.

## Deploy free with GitHub Pages

1. Create a GitHub repository and upload or push the contents of `E:\Pranay_Portfolio`.
2. If the repository is a project repository (for example, `Pranay_Portfolio`), edit `vite.config.js` and set `base` to the repository path, including both slashes:

   ```js
   base: "/Pranay_Portfolio/";
   ```

   For a repository named `YOUR-USERNAME.github.io`, keep `base: '/'`.

3. On GitHub, open the repository's **Settings → Pages** and set the build source to **GitHub Actions**.
4. Push to the `main` branch. The workflow at `.github/workflows/deploy.yml` builds and publishes the site.
5. GitHub shows the published URL in **Settings → Pages**. Future pushes to `main` publish updates.

GitHub Pages is free for public repositories. Since this is a static website, it has no server-side contact form or database.

## Deploy free with Vercel

1. Push the project to GitHub.
2. Sign in to Vercel and import the repository.
3. Use build command `npm run build` and output directory `dist`.
4. Deploy. Vercel can rebuild the site when you push later changes.

## Before publishing

Review all personal content in `src/data/portfolio.js` and replace or remove anything that is no longer accurate. Update the page title and description in `index.html`. Add a canonical URL, absolute sitemap, and absolute Open Graph image only after choosing the deployed domain; none is fabricated in this project. Set the Vite `base` value correctly for the hosting URL.



## Motion and drawings

Section content and gallery cards reveal once as they enter view. Project and gallery images use restrained hover transitions, and the site respects `prefers-reduced-motion`.

For technical plans or drawings in Project Studies, set a project's `imageType` to `"drawing"` in `src/data/portfolio.js` to keep its image still on hover or focus.