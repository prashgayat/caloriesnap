# CalorieSnap 🍽️

CalorieSnap is a lightweight, mobile-friendly React app that estimates a food item's calories and macronutrients using an image, Google Cloud Vision, and Supabase.

## 🚀 Features

- Upload or snap a food photo
- Identify the food item with high accuracy
- Retrieve calorie + macronutrient data
- Supabase auth (email/password login with verification)
- Saves last 5 searched food items per user (FIFO)

## 🛠️ Setup

1. Clone the repo:
```bash
git clone <your-repo-url>
cd CalorieSnap
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example` and add your keys.

4. Run locally:
```bash
npm run dev
```

## 🌐 Deployment (Netlify Recommended)

- Connect the GitHub repo to Netlify
- Set build command: `npm run build`
- Set publish directory: `dist`

## 🧠 Tech Stack

- React + Vite + Tailwind
- Google Cloud Vision API
- Supabase (Auth + Database)