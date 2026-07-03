# InsurAI — Frontend

AI-powered health insurance analytics dashboard. Next.js 15 (App Router) +
TypeScript + Tailwind CSS + ShadCN-style UI + Recharts + Framer Motion.

This is the **frontend only**. It expects the FastAPI backend to already be
running at `http://127.0.0.1:8000` with the following endpoints:

- `GET  /`
- `POST /predict`
- `POST /risk-score`
- `POST /segment`
- `POST /underwriting`

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Make sure your FastAPI backend is running separately on
`http://127.0.0.1:8000` (with CORS enabled for `http://localhost:3000`) —
the `/predict` page will not work without it.

## Project structure

```
app/
  layout.tsx        Root layout (fonts, navbar, metadata)
  page.tsx           Landing page
  predict/page.tsx    Prediction dashboard
components/
  Navbar.tsx, Hero.tsx, FeatureCard.tsx, Footer.tsx
  PredictionForm.tsx, PredictionCard.tsx, RiskCard.tsx,
  SegmentCard.tsx, UnderwritingCard.tsx, StatsChart.tsx
  Loading.tsx, ErrorToast.tsx, AnimatedCounter.tsx
  ui/                ShadCN-style primitives (button, card, input, label, select)
lib/
  api.ts             Axios client + sequential prediction pipeline
  utils.ts           cn(), formatINR(), clamp()
types/
  index.ts           Shared TypeScript types
```

## Notes

- The backend base URL is hardcoded to `http://127.0.0.1:8000` in
  `lib/api.ts`, per the API contract. Change `API_BASE_URL` there if your
  backend runs elsewhere.
- `claim_probability` is hardcoded to `60` when calling `/underwriting`, as
  specified.
- Prediction history on the `/predict` page is seeded with dummy rows and
  appended to (in memory only) after each successful prediction.
- Charts on the landing page use illustrative dummy data.
