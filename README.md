# Wedding Invitation Builder

Project React + Tailwind CSS for creating online wedding invitations with live preview.

## Stack

- React (Vite)
- Tailwind CSS v4 (`@tailwindcss/vite`)

## Run locally

```bash
npm install
npm run dev
```

## Build production

```bash
npm run build
npm run preview
```

## Deploy on Vercel

1. Push source code to GitHub.
2. On Vercel, choose **Add New Project** and import the repository.
3. Keep defaults:
   - Framework preset: `Vite`
   - Build command: `npm run build`
   - Output directory: `dist`
4. Click **Deploy**.

## Features included

- Editable wedding invitation form (names, date, time, venue, message).
- Multiple invitation themes (`Sage Garden`, `Rose Dust`, `Moonlight`).
- Real-time invitation preview.
- Responsive layout for desktop and mobile.
