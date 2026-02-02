# CarGurus Finance Calculator

A mobile-first finance calculator for car buyers. Enter personal financing details and get detailed estimates for monthly payments and total cost.

---

## What It Does

- **Payment type:** Dealer financing, outside loan, or cash
- **Financing inputs:** Credit score, loan term, down payment, APR (auto-suggested from credit score)
- **Cost breakdown:** Base price, taxes, fees, add-ons, trade-in, discounts
- **Output:** Estimated monthly payment and total cost in a sticky banner
- **Export:** Save or share results

---

## How It's Built

| Layer | Tech |
|-------|------|
| **Framework** | React 18 + TypeScript |
| **Build** | Vite |
| **Styling** | Tailwind CSS |
| **UI** | shadcn/ui (Radix primitives) |
| **State** | React Context + useReducer |
| **Routing** | React Router |
| **Deploy** | GitHub Pages |

### Architecture (High-Level)

```
src/
├── components/     → UI primitives, layout, finance feature components
├── context/       → FinanceContext (global state, reducers)
├── pages/         → Index (main app), NotFound
├── utils/         → Finance math, formatters, animations
└── types/         → TypeScript interfaces
```

**State flow:** User actions dispatch to reducers → state updates → `UPDATE_CALCULATIONS` runs → monthly payment and total cost recompute.

**Styling:** Design tokens in `index.css` (HSL variables). CarGurus-aligned typography (Mulish), spacing (16px gutter, 8px rhythm), and components (segmented controls, pill buttons). See `context.md` for full design system.

---

## Project Structure

| Path | Purpose |
|------|---------|
| `src/components/ui/` | Buttons, inputs, selects, segmented controls |
| `src/components/layout/` | FieldGroup, Section |
| `src/components/finance/` | PageHeader, SummaryBanner, VehicleInfo, CarCost, etc. |
| `src/context/finance/` | State, reducers, initial values |
| `context.md` | Design system, conventions, onboarding |

See `context.md` for more information
