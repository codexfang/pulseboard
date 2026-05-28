export const POLL_INTERVAL = 25000;

export const RETRY_ATTEMPTS = 2;
export const RETRY_DELAY = 1000;

export const HEALTHY_THRESHOLD_MS = 800;
export const DEGRADED_THRESHOLD_MS = 2000;
export const ERROR_RATE_THRESHOLD = 0.15;
export const MOVING_AVERAGE_WINDOW = 10;

export const MAX_HISTORY_PER_SERVICE = 500;
export const CHART_POINTS = 50;

export const STATUS_FILTERS = {
  ALL: 'all',
  HEALTHY: 'healthy',
  DEGRADED: 'degraded',
  FAILING: 'failing',
};

export const SERVICES = [
  {
    id: 'github-api',
    name: 'GitHub API',
    description: 'Repository and user data from GitHub',
    endpoint: 'https://api.github.com',
    checkPath: '/',
    category: 'Developer',
  },
  {
    id: 'coingecko-api',
    name: 'CoinGecko API',
    description: 'Cryptocurrency market data',
    endpoint: 'https://api.coingecko.com/api/v3',
    checkPath: '/ping',
    category: 'Finance',
  },
  {
    id: 'reddit-api',
    name: 'Reddit API',
    description: 'Social content and community data',
    endpoint: 'https://www.reddit.com',
    checkPath: '/api/status.json',
    category: 'Social',
  },
  {
    id: 'open-meteo',
    name: 'Open-Meteo API',
    description: 'Weather forecast and climate data',
    endpoint: 'https://api.open-meteo.com/v1',
    checkPath: '/forecast?latitude=52.52&longitude=13.41&current_weather=true',
    category: 'Weather',
  },
  {
    id: 'httpbin',
    name: 'HTTPBin',
    description: 'HTTP request inspection endpoint',
    endpoint: 'https://httpbin.org',
    checkPath: '/get',
    category: 'Utility',
  },
  {
    id: 'jsonplaceholder',
    name: 'JSONPlaceholder',
    description: 'Fake REST API for testing',
    endpoint: 'https://jsonplaceholder.typicode.com',
    checkPath: '/posts/1',
    category: 'Utility',
  },
];
