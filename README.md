# Pulseboard

A global API observability dashboard that simulates backend monitoring, latency tracking, and system health analytics. Pulseboard polls multiple public APIs in parallel, measures response times and error rates, and visualizes time-series performance data through interactive charts.

## Features

- **Live API Monitoring** — Periodically fetches data from 6 public CORS-enabled APIs (GitHub, CoinGecko, Reddit, Open-Meteo, HTTPBin, JSONPlaceholder) every 25 seconds
- **Latency Tracking** — Measures response time, payload size, and status code for every request
- **Health Scoring** — Computes a 0–100 health score per service based on latency, error rate, and uptime
- **Incident Detection** — Automatically detects elevated error rates and triggers incident mode
- **Historical Data** — Stores request history in IndexedDB for persistent time-series analysis
- **Interactive Charts** — Line charts for latency trends, bar charts for success/failure ratios, area charts for request volume
- **Service Detail View** — Per-service drill-down with trend chart and last 50 request log
- **Status Filtering** — Filter services by health status (healthy / degraded / failing)
- **Data Export** — Export all dashboard data as a JSON file
- **Dark Theme** — Professional observability dashboard design with responsive grid layout
- **Mobile Responsive** — Fully responsive with stacked charts on small screens

## Architecture

### Monitoring Engine

The `MonitorEngine` class in `src/services/monitor.js` acts as the core scheduler. It:

1. Maintains a registry of monitored services with their endpoints and health check paths
2. Runs a polling cycle every 25 seconds using `setInterval`
3. Fires parallel `fetch()` requests to all services using `Promise.allSettled`
4. Wraps each request in a latency measurement that records response time from `performance.now()`
5. Implements retry logic (2 retries with exponential backoff) for failed requests
6. Publishes state updates to subscribed React components via a listener pattern

### Storage Layer

The `src/storage/db.js` module wraps IndexedDB with a Promise-based API:

- **`saveRecord()`** — Stores each request result with service ID, timestamp, latency, status, and payload size
- **`getHistory()`** — Retrieves the most recent N records for a given service
- **`pruneHistory()`** — Maintains a maximum of 500 records per service to prevent unbounded growth
- **`getHistoryByTimeRange()`** — Supports time-range queries for chart rendering

### Health Scoring

The `src/utils/health.js` module computes observability metrics:

- **Health Score** — Weighted formula: 35% latency, 35% error rate, 30% uptime
- **Moving Average** — Configurable window (default 10 samples) for smoothing latency spikes
- **Categorization** — Services are classified as healthy (≥80), degraded (≥50), or failing (<50)

### Visualization

Recharts renders three chart types:

- **Latency Over Time** — Multi-line chart comparing all services' response times
- **Success / Failure Ratio** — Stacked bar chart per service
- **Request Volume** — Area chart showing aggregate request count per minute

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 |
| Build Tool | Vite 6 |
| Charts | Recharts 2 |
| Styling | Tailwind CSS 3 |
| Storage | IndexedDB |
| APIs | GitHub, CoinGecko, Reddit, Open-Meteo, HTTPBin, JSONPlaceholder |
| Fonts | Inter, JetBrains Mono |
| Deployment | GitHub Pages |

## How It Works

1. **Scheduler** — On page load, `MonitorEngine` starts a 25-second polling interval and immediately runs the first poll cycle
2. **Parallel Fetching** — All 6 services are queried simultaneously using `Promise.allSettled()` to simulate distributed monitoring
3. **Latency Measurement** — Each request is wrapped with `performance.now()` to capture precise response time, including timeouts at 15 seconds
4. **Retry Logic** — Failed requests are retried up to 2 times with a 1-second delay between attempts
5. **Persistence** — Every result is written to IndexedDB via `saveRecord()` and the history is pruned to 500 entries per service
6. **State Update** — After each poll cycle, all subscribed React components receive the latest state with computed health metrics
7. **Visualization** — Charts consume the time-series data from IndexedDB, aggregated into 50 data points for performance

## License

MIT
