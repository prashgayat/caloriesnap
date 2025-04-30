# ðŸ“± CalorieSnap

**CalorieSnap** is a smart, privacy-conscious web app that helps users identify foods from photos and understand their nutritional impact instantly.

---

## ðŸš€ Features

### ðŸ” Food Identification
Upload or capture a food photo â€” our AI instantly labels it.

### ðŸ§® Nutrition Breakdown
Displays per 100g values for:
- âœ… Calories
- âœ… Protein, Carbs, Fat
- âœ… Visual macronutrient bars

### ðŸƒâ€â™‚ï¸ Burn Time Estimator
Shows time needed to burn the calories via:
- Running ðŸƒ
- Cycling ðŸš´â€â™€ï¸
- Swimming ðŸŠâ€â™‚ï¸

### ðŸ¥¦ Healthy Substitutes
If the food is processed, CalorieSnap suggests:
- Healthier ingredients
- Cooking alternatives (e.g., bake instead of fry)

### âš ï¸ Consumption Risk Warning
Categorizes food as:
- âœ… Safe (low risk)
- âš ï¸ Moderate (watch frequency)
- ðŸš¨ High Risk (high calories/fat or processed)

---

## ðŸ›  Tech Stack

- **Frontend**: React + TypeScript + Tailwind CSS
- **Auth/Backend**: Supabase (email login, DB)
- **AI API**: Vision + Nutrition APIs (serverless)
- **Deployment**: GitHub Codespaces

---

## ðŸ“¦ Run Locally

```bash
npm install
npm run dev
```

Add `.env`:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

---

## âœ… Status

**MVP Complete** â€” Production-ready for demo, testing, and future feature scaling.

---

## ðŸ§  Made with purpose
> Food choices made simpler, healthier, smarter.
