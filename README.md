# Aura Analytics | Sales Dashboard

A premium, interactive sales dashboard application built using **Next.js 15**, **TypeScript**, **Tailwind CSS**, and **Recharts**. The codebase is architected using the **Atomic Design Pattern** to guarantee reusability, modularity, and scalability.

## 🚀 Features

- **Period Selection:** Switch metrics and graphs between individual years (`2022`, `2023`, `2024`) or examine total performance combined across all periods (`All Years`).
- **Interactive Chart Switcher:** Toggle visual representations instantly between:
  - **Bar Chart**: Excellent for monthly comparisons.
  - **Line Chart**: Perfect for analyzing sales trends and trajectories.
  - **Pie Chart**: Visualizes proportion of sales per month or per-year distribution.
- **Dynamic Sales Threshold Filter:** Slider and manual inputs to dynamically filter out months that did not reach a specified sales target. Adjusting this updates the KPI metrics and charts in real-time.
- **KPI Metrics Overview:** Automatically computes key metrics based on current filters:
  - Total Cumulative Sales.
  - Average Monthly Sales.
  - Peak Performing Month (with maximum revenue).
  - Lowest Performing Month (with minimum revenue).
- **Premium UI Design:** Dark-themed glassmorphism interface styled using Tailwind CSS, complete with custom transitions, hover effects, gradients, and icons.

---

## 🏗️ Atomic Design Directory Structure

The components are organized following the **Atomic Design** hierarchy:

```
src/
├── app/                  # Next.js Page & Layout Routes
│   ├── globals.css       # Core layout styling & custom variables
│   ├── layout.tsx        # HTML document frame and root layout wrapper
│   └── page.tsx          # Main entry page, orchestrates dashboard state
├── components/
│   ├── atoms/            # Smallest self-contained components
│   │   ├── Button.tsx    # Styled buttons with active states and variants
│   │   ├── Card.tsx      # Premium container cards with optional hover effects
│   │   └── Input.tsx     # Custom input box with support for labels and icons
│   ├── molecules/        # Combinations of 2+ atoms
│   │   ├── ChartSwitcher.tsx # Interactive toggles for period and chart style
│   │   ├── FilterBar.tsx     # Slider/numeric selectors for sales thresholds
│   │   └── MetricCard.tsx    # Individual KPI cards styling
│   ├── organisms/        # Complex structural components
│   │   ├── DashboardChartSection.tsx # Recharts visualizations wrapper
│   │   └── MetricsOverview.tsx      # Layout structure orchestrating all metrics
│   └── templates/        # Structural layout templates
│       └── DashboardLayout.tsx      # Overall layout grid, sidebar, and headers
├── data/
│   └── mockSalesData.ts  # Monthly mock sales data for 2022, 2023, and 2024
└── types/
    └── sales.ts          # TypeScript type definitions & interfaces
```

---

## 🛠️ Getting Started & Setup

### Prerequisites
Make sure you have [Node.js](https://nodejs.org) (v18.17.0 or higher recommended) and `npm` installed.

### 1. Install Dependencies
Run the following command in the project root directory:
```bash
npm install
```

### 2. Run the Development Server
Launch the local dev environment:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to interact with the dashboard.

### 3. Build for Production
Verify typescript compilation and create optimized build artifacts:
```bash
npm run build
```

---

## 📦 Deployment

This project is configured to run out-of-the-box and can be easily deployed to **Vercel**:

1. Push your repository to GitHub / GitLab / Bitbucket.
2. Go to [Vercel](https://vercel.com) and click **Add New Project**.
3. Import this repository.
4. Keep the default settings and click **Deploy**.
