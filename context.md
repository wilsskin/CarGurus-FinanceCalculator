# CG Finance Calculator — Developer Context

This document gives new developers everything needed to understand the codebase, its design direction, and how to maintain consistency when making changes.

---

## 1. App Overview

### Purpose
A **mobile-first finance calculator** for car buyers. Users enter vehicle info, financing details (credit score, loan term, down payment), taxes/fees, and trade-in to get estimated monthly payments and total cost. The app is designed to **feel like part of the CarGurus mobile experience**—clean, scannable, and trustworthy.

### Core User Flow
1. Select payment type (Dealer Financing / Outside Loan / Cash)
2. Enter credit score, loan term, down payment (when financing)
3. View/edit car cost, taxes, fees, add-ons, trade-in
4. See estimated payment and total cost in a sticky banner
5. Export or save results

### Tech Stack
- **React 18** + **TypeScript**
- **Vite** (build tool)
- **Tailwind CSS** (styling)
- **shadcn/ui** (component primitives, Radix-based)
- **Sonner** (toast notifications only)
- **React Router** (routing)

---

## 2. Design Direction: CarGurus Alignment

The UI is intentionally aligned with the **CarGurus mobile app**:

- **Clean, flat sections** — No heavy cards or shadows. Use alternating `bg-background` and `bg-section-light` for section separation.
- **Scannable hierarchy** — Headings in dark navy, secondary text muted. Prices and key numbers stand out.
- **Minimal chrome** — Back buttons are subtle (circular `bg-muted`, no borders). Sticky banner is compact.
- **Segmented controls** — For credit score, loan term, payment type. Use `SegmentedControl` instead of dropdowns.
- **Trustworthy feel** — Royal blue primary, neutral grays, clear typography. Avoid playful or flashy styling.

---

## 3. Design System

### 3.1 Colors (HSL via CSS Variables)

All colors live in `src/index.css` as HSL values. Use semantic tokens, not raw hex.

| Token | Usage |
|-------|--------|
| `--foreground` | Headings, primary text (#0D1F4A dark navy) |
| `--muted-foreground` | Secondary text, labels, hints |
| `--primary` | CTAs, active states, links (#4169E1 royal blue) |
| `--background` | Page background (white) |
| `--muted` | Subtle backgrounds (buttons, inactive areas) |
| `--accent` | Hover states, light blue tint |
| `--border` | Borders, dividers (#E5E7EB) |
| `--section-light` | Alternating section background |
| `--section-dark` | Slightly darker section (when needed) |

**Rule:** Use `text-foreground`, `bg-primary`, `text-muted-foreground`, etc. Never hardcode hex colors in components.

### 3.2 Typography

**Font:** Mulish (Google Fonts). Loaded in `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=Mulish:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

**Scale (Tailwind + `index.css`):**

| Class | Size | Weight | Use |
|-------|------|--------|-----|
| `h1` | 32px | 700 | Page titles |
| `h2` | 24px | 800 | Section titles |
| `h3` | 20px | 600 | Subsection titles |
| `h4` | 18px | 600 | Smaller headings |
| `text-price-lg` | 36px | 700 | Hero prices |
| `text-price-md` | 24px | 700 | Key prices |
| `text-price-sm` | 18px | 600 | Receipt-style prices |
| `text-body-lg` | 18px | 400 | Large body |
| `text-body` | 16px | 400 | Default body |
| `text-body-sm` | 14px | 400 | Small body |
| `text-label` | 14px | 500 | Form labels |
| `text-caption` | 12px | 500 | Captions, hints |

**Rule:** Headings always use `text-foreground`. Never use primary/accent for headings.

### 3.3 Spacing

- **Mobile gutter:** 16px (`px-4`) on all page content. Use `mx-auto max-w-md px-4` for content containers.
- **8px rhythm:** Major blocks use `space-y-4`, `space-y-5`, `space-y-6`, `py-6`, `py-8`. Avoid fractional values like `gap-1.5` or `py-2.5` for layout.
- **Section padding:** `py-8` between major sections.

### 3.4 Border Radius

| Class | Value | Use |
|-------|-------|-----|
| `rounded-cg` | 8px | Inputs, segmented controls, cards |
| `rounded-cg-lg` | 12px | Larger containers |
| `rounded-pill` | 24px | Buttons (primary CTAs) |

### 3.5 Inputs & Buttons

- **Inputs:** `h-12`, `rounded-cg`, `border border-input`. Focus: `focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary/15`.
- **Buttons (default):** `h-12`, `rounded-pill`, `font-semibold`. Primary: `bg-primary text-primary-foreground`.
- **Segmented control items:** `py-4 px-3`, `text-sm font-medium`. Active: `bg-primary text-primary-foreground`.

---

## 4. File Structure

```
src/
├── components/
│   ├── ui/              # shadcn primitives (button, input, select, segmented-control, etc.)
│   ├── layout/           # FieldGroup, Section, AppShell, StickyBanner
│   └── finance/          # Feature components
│       ├── sections/     # VehicleInfo, MyFinanceInfo, CarCost, etc.
│       └── addons/       # CustomAddonForm
├── context/
│   └── finance/          # FinanceContext, reducers, initialState, types
├── pages/                # Index, NotFound
├── utils/                # financeCalculator, animateValue
├── types/                # financeTypes
├── lib/                  # cn() utility
└── index.css             # Global styles, CSS variables, typography
```

**Import aliases:** `@/` maps to `src/` (e.g. `@/components/ui/button`, `@/context/finance`).

---

## 5. Component Patterns

### 5.1 UI Primitives (`src/components/ui/`)

Use shadcn components. They wrap Radix primitives and use `cn()` for styling. Examples:

- `Button`, `Input`, `Select`, `Label`
- `SegmentedControl` + `SegmentedControlItem` — custom CarGurus-style toggle
- `Sonner` — toast system (mounted in App, use `toast()` from `@/components/ui/sonner`)

**Rule:** Prefer existing UI components. Only add new ones when shadcn doesn’t provide an equivalent.

### 5.2 Layout Primitives (`src/components/layout/`)

- **FieldGroup** — Wraps label + input + helper. Use `FieldLabel`, `FieldHelper`, `FieldError`.
- **Section** — `variant="light" | "dark" | "white"`. Applies `bg-section-light`, `bg-section-dark`, or `bg-background` with `py-6` and `max-w-md px-4`.

### 5.3 Finance Components (`src/components/finance/`)

- **PageHeader** — Top header with back button + "Finance Calculator" title. Scrolls away.
- **SummaryBanner** — Shows "Estimated Payment" / "Estimated Total" + cost. Becomes sticky on scroll; back button appears when sticky.
- **FinanceCalculator** — Main orchestrator. Renders sections in order: VehicleInfo, PaymentTypeSelector, MyFinanceInfo, CarCost, SummaryAndSave, SaveAndExport, CostBreakdown.

### 5.4 Styling Approach

- Use **Tailwind** for layout and styling.
- Use **`cn()`** from `@/lib/utils` to merge classes: `cn("base-classes", className)`.
- Use **CVA** (class-variance-authority) for components with variants (e.g. Button).

---

## 6. Creating New Components

### Step 1: Choose the right layer

- **UI primitive** (reusable, no business logic) → `src/components/ui/`
- **Layout** (structure, spacing) → `src/components/layout/`
- **Finance feature** (calculator-specific) → `src/components/finance/` or `sections/`

### Step 2: Use design tokens

```tsx
// Good
<h2 className="text-foreground">Section Title</h2>
<span className="text-body-sm text-muted-foreground">Helper text</span>
<Button className="rounded-pill">Submit</Button>

// Bad
<h2 className="text-blue-900">Section Title</h2>
<span className="text-sm text-gray-500">Helper text</span>
<Button className="rounded-full">Submit</Button>
```

### Step 3: Respect spacing rules

```tsx
// Content container
<div className="mx-auto max-w-md px-4 py-8">

// Section spacing
<div className="space-y-5">  // or space-y-4, space-y-6

// Form field
<FieldGroup>
  <FieldLabel>Label</FieldLabel>
  <Input />
  <FieldHelper>Hint</FieldHelper>
</FieldGroup>
```

### Step 4: Use existing primitives

- Form fields → `FieldGroup`, `FieldLabel`, `FieldHelper`, `Input`
- Toggle options → `SegmentedControl` + `SegmentedControlItem`
- Buttons → `Button` (default `rounded-pill`, `h-12`)
- Toasts → `toast()` from `@/components/ui/sonner`

### Step 5: Icons

Use **lucide-react** (e.g. `ChevronLeft`, `Pencil`, `Info`). Keep size consistent: `w-5 h-5` for inline icons.

---

## 7. State Management

### FinanceContext

All calculator state lives in `FinanceContext` (`src/context/finance/`). Access via `useFinance()`:

```tsx
const { state, dispatch } = useFinance();
```

### State Shape

- `carPrice`, `paymentType`, `creditScore`
- `loanDetails`: `downPayment`, `termMonths`, `interestRate`
- `tradeIn`, `taxesAndFees`, `addonsTotal`, `discounts`, `selectedAddons`
- `monthlyPayment`, `totalCost`, `estimateAccuracy` (computed)

### Actions

- `SET_CAR_PRICE`, `SET_PAYMENT_TYPE`, `SET_CREDIT_SCORE`, `SET_LOAN_DETAILS`, `SET_TRADE_IN`, `SET_TAXES_AND_FEES`, `SET_ZIP_CODE`
- `UPDATE_ADDONS_TOTAL`, `UPDATE_DISCOUNTS`, `UPDATE_SELECTED_ADDONS`
- `UPDATE_CALCULATIONS` (triggered automatically on relevant state changes)
- `RESET_FORM`

### Reducers

Each action has a reducer in `src/context/finance/reducers/`. `creditScoreReducer` and `paymentTypeReducer` also update `loanDetails.interestRate` based on credit score.

---

## 8. Toast System

**Use Sonner only.** Import:

```tsx
import { toast } from "@/components/ui/sonner";

toast.success("Saved!");
toast.error("Something went wrong");
toast.info("Tip: ...");
```

`Toaster` is mounted once in `App.tsx`. Do not add other toast systems.

---

## 9. Key Conventions Checklist

When adding or editing components:

- [ ] Use semantic color tokens (`text-foreground`, `bg-primary`, etc.)
- [ ] Use Mulish via `font-sans` or default body
- [ ] Use `px-4` (16px) for horizontal content padding
- [ ] Use 8px increments for spacing (`space-y-4`, `py-8`, etc.)
- [ ] Headings use `text-foreground`, never accent/primary
- [ ] Inputs: `h-12`, `rounded-cg`, CarGurus-style focus ring
- [ ] Buttons: `rounded-pill`, `h-12` for default size
- [ ] Use `SegmentedControl` for multi-option toggles (credit score, loan term, payment type)
- [ ] Use `FieldGroup` + `FieldLabel` + `FieldHelper` for form fields
- [ ] Use `cn()` for conditional/merged classes
- [ ] Use `toast()` from Sonner for notifications
- [ ] Icons from lucide-react, `w-5 h-5` for standard size

---

## 10. Quick Reference: Common Patterns

### Page content wrapper
```tsx
<div className="mx-auto max-w-md px-4 py-8">
  {children}
</div>
```

### Alternating sections
```tsx
<div className="bg-background py-8">...</div>
<div className="bg-section-light py-8 border-y border-border">...</div>
```

### Receipt-style row
```tsx
<div className="flex justify-between items-center py-3 border-b border-border">
  <span className="text-label font-medium text-foreground">Label</span>
  <span className="text-price-sm text-foreground">{formatCurrency(value)}</span>
</div>
```

### Segmented control usage
```tsx
<SegmentedControl value={value} onValueChange={handleChange}>
  <SegmentedControlItem value="720">
    <div className="flex flex-col items-center leading-tight">
      <span className="text-sm font-semibold">Excellent</span>
      <span className="text-xs opacity-80">720+</span>
    </div>
  </SegmentedControlItem>
  {/* ... */}
</SegmentedControl>
```

### Back button (subtle, CarGurus-style)
```tsx
<button className="w-9 h-9 flex items-center justify-center rounded-full bg-muted hover:bg-muted/80 transition-colors duration-200" aria-label="Go back">
  <ChevronLeft className="w-5 h-5 text-foreground" />
</button>
```

---

## 11. Running the App

```sh
npm install
npm run dev
```

Build: `npm run build`

---

*Last updated: February 2025*
