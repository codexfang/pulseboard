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
  { id: 'github-api', name: 'GitHub API', description: 'Repository and user data from GitHub', endpoint: 'https://api.github.com', checkPath: '/', category: 'Developer' },
  { id: 'github-gists', name: 'GitHub Gists', description: 'Public gist snippets and collections', endpoint: 'https://api.github.com', checkPath: '/gists', category: 'Developer' },
  { id: 'github-repos', name: 'GitHub Repos', description: 'Public repository listing endpoint', endpoint: 'https://api.github.com', checkPath: '/repositories', category: 'Developer' },
  { id: 'github-issues', name: 'GitHub Issues', description: 'Issue tracking and project management', endpoint: 'https://api.github.com', checkPath: '/issues', category: 'Developer' },
  { id: 'github-orgs', name: 'GitHub Orgs', description: 'Organization profiles and teams', endpoint: 'https://api.github.com', checkPath: '/organizations', category: 'Developer' },
  { id: 'github-emojis', name: 'GitHub Emojis', description: 'Emoji rendering reference data', endpoint: 'https://api.github.com', checkPath: '/emojis', category: 'Developer' },
  { id: 'coingecko-ping', name: 'CoinGecko Ping', description: 'Cryptocurrency API health check', endpoint: 'https://api.coingecko.com/api/v3', checkPath: '/ping', category: 'Finance' },
  { id: 'coingecko-price', name: 'CoinGecko Prices', description: 'Live cryptocurrency price data', endpoint: 'https://api.coingecko.com/api/v3', checkPath: '/simple/price?ids=bitcoin&vs_currencies=usd', category: 'Finance' },
  { id: 'coingecko-list', name: 'CoinGecko Coins', description: 'Cryptocurrency listing and metadata', endpoint: 'https://api.coingecko.com/api/v3', checkPath: '/coins/list', category: 'Finance' },
  { id: 'coingecko-markets', name: 'CoinGecko Markets', description: 'Market data for top cryptocurrencies', endpoint: 'https://api.coingecko.com/api/v3', checkPath: '/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10', category: 'Finance' },
  { id: 'coingecko-exchanges', name: 'CoinGecko Exchanges', description: 'Cryptocurrency exchange listings', endpoint: 'https://api.coingecko.com/api/v3', checkPath: '/exchanges', category: 'Finance' },
  { id: 'coingecko-trending', name: 'CoinGecko Trending', description: 'Trending cryptocurrency searches', endpoint: 'https://api.coingecko.com/api/v3', checkPath: '/search/trending', category: 'Finance' },
  { id: 'reddit-status', name: 'Reddit Status', description: 'Reddit platform health endpoint', endpoint: 'https://www.reddit.com', checkPath: '/api/status.json', category: 'Social' },
  { id: 'reddit-hot', name: 'Reddit Hot Posts', description: 'Trending hot posts from front page', endpoint: 'https://www.reddit.com', checkPath: '/hot.json', category: 'Social' },
  { id: 'reddit-r-all', name: 'Reddit r/all', description: 'All subreddit content feed', endpoint: 'https://www.reddit.com', checkPath: '/r/all/hot.json', category: 'Social' },
  { id: 'reddit-r-programming', name: 'Reddit Programming', description: 'Programming subreddit feed', endpoint: 'https://www.reddit.com', checkPath: '/r/programming/hot.json', category: 'Social' },
  { id: 'open-meteo-weather', name: 'Open-Meteo Weather', description: 'Current weather forecast data', endpoint: 'https://api.open-meteo.com/v1', checkPath: '/forecast?latitude=52.52&longitude=13.41&current_weather=true', category: 'Weather' },
  { id: 'open-meteo-marine', name: 'Open-Meteo Marine', description: 'Ocean weather and wave data', endpoint: 'https://api.open-meteo.com/v1', checkPath: '/marine?latitude=52.52&longitude=13.41&daily=wave_height_max', category: 'Weather' },
  { id: 'open-meteo-air', name: 'Open-Meteo Air Quality', description: 'Air quality index measurements', endpoint: 'https://api.open-meteo.com/v1', checkPath: '/air-quality?latitude=52.52&longitude=13.41&current=european_aqi', category: 'Weather' },
  { id: 'open-meteo-geo', name: 'Open-Meteo Geocoding', description: 'Location search and geocoding', endpoint: 'https://geocoding-api.open-meteo.com/v1', checkPath: '/search?name=Berlin&count=1', category: 'Weather' },
  { id: 'httpbin-get', name: 'HTTPBin GET', description: 'HTTP GET request inspection', endpoint: 'https://httpbin.org', checkPath: '/get', category: 'Utility' },
  { id: 'httpbin-ip', name: 'HTTPBin IP', description: 'Request IP address detection', endpoint: 'https://httpbin.org', checkPath: '/ip', category: 'Utility' },
  { id: 'httpbin-uuid', name: 'HTTPBin UUID', description: 'Random UUID generation endpoint', endpoint: 'https://httpbin.org', checkPath: '/uuid', category: 'Utility' },
  { id: 'httpbin-headers', name: 'HTTPBin Headers', description: 'Request header inspection', endpoint: 'https://httpbin.org', checkPath: '/headers', category: 'Utility' },
  { id: 'httpbin-status', name: 'HTTPBin Status', description: 'HTTP status code testing', endpoint: 'https://httpbin.org', checkPath: '/status/200', category: 'Utility' },
  { id: 'httpbin-delay', name: 'HTTPBin Delay', description: 'Simulated latency endpoint', endpoint: 'https://httpbin.org', checkPath: '/delay/0.1', category: 'Utility' },
  { id: 'jsonplaceholder-posts', name: 'JSONPlaceholder Posts', description: 'Fake blog post data for testing', endpoint: 'https://jsonplaceholder.typicode.com', checkPath: '/posts', category: 'Utility' },
  { id: 'jsonplaceholder-comments', name: 'JSONPlaceholder Comments', description: 'Fake comment data for testing', endpoint: 'https://jsonplaceholder.typicode.com', checkPath: '/comments', category: 'Utility' },
  { id: 'jsonplaceholder-users', name: 'JSONPlaceholder Users', description: 'Fake user profile data', endpoint: 'https://jsonplaceholder.typicode.com', checkPath: '/users', category: 'Utility' },
  { id: 'jsonplaceholder-albums', name: 'JSONPlaceholder Albums', description: 'Fake photo album metadata', endpoint: 'https://jsonplaceholder.typicode.com', checkPath: '/albums', category: 'Utility' },
  { id: 'jsonplaceholder-todos', name: 'JSONPlaceholder Todos', description: 'Fake todo list data', endpoint: 'https://jsonplaceholder.typicode.com', checkPath: '/todos', category: 'Utility' },
  { id: 'pokeapi-pokemon', name: 'PokeAPI Pokemon', description: 'Pokemon species and type data', endpoint: 'https://pokeapi.co/api/v2', checkPath: '/pokemon/ditto', category: 'Entertainment' },
  { id: 'pokeapi-berries', name: 'PokeAPI Berries', description: 'Pokemon berry item data', endpoint: 'https://pokeapi.co/api/v2', checkPath: '/berry', category: 'Entertainment' },
  { id: 'pokeapi-games', name: 'PokeAPI Games', description: 'Pokemon game version data', endpoint: 'https://pokeapi.co/api/v2', checkPath: '/version', category: 'Entertainment' },
  { id: 'pokeapi-locations', name: 'PokeAPI Locations', description: 'Pokemon location region data', endpoint: 'https://pokeapi.co/api/v2', checkPath: '/region', category: 'Entertainment' },
  { id: 'pokeapi-moves', name: 'PokeAPI Moves', description: 'Pokemon battle move data', endpoint: 'https://pokeapi.co/api/v2', checkPath: '/move', category: 'Entertainment' },
  { id: 'swapi-people', name: 'SWAPI People', description: 'Star Wars character profiles', endpoint: 'https://swapi.dev/api', checkPath: '/people/1', category: 'Entertainment' },
  { id: 'swapi-planets', name: 'SWAPI Planets', description: 'Star Wars planet data', endpoint: 'https://swapi.dev/api', checkPath: '/planets/1', category: 'Entertainment' },
  { id: 'swapi-starships', name: 'SWAPI Starships', description: 'Star Wars spacecraft data', endpoint: 'https://swapi.dev/api', checkPath: '/starships/9', category: 'Entertainment' },
  { id: 'swapi-films', name: 'SWAPI Films', description: 'Star Wars film metadata', endpoint: 'https://swapi.dev/api', checkPath: '/films/1', category: 'Entertainment' },
  { id: 'rickandmorty-char', name: 'Rick & Morty Characters', description: 'Character profiles from the show', endpoint: 'https://rickandmortyapi.com/api', checkPath: '/character', category: 'Entertainment' },
  { id: 'rickandmorty-loc', name: 'Rick & Morty Locations', description: 'Location data from the show', endpoint: 'https://rickandmortyapi.com/api', checkPath: '/location', category: 'Entertainment' },
  { id: 'rickandmorty-ep', name: 'Rick & Morty Episodes', description: 'Episode listings and metadata', endpoint: 'https://rickandmortyapi.com/api', checkPath: '/episode', category: 'Entertainment' },
  { id: 'dog-ceo', name: 'Dog CEO', description: 'Random dog breed images', endpoint: 'https://dog.ceo/api', checkPath: '/breeds/image/random', category: 'Entertainment' },
  { id: 'dog-breeds', name: 'Dog Breeds List', description: 'All dog breed names and types', endpoint: 'https://dog.ceo/api', checkPath: '/breeds/list/all', category: 'Entertainment' },
  { id: 'cat-facts', name: 'Cat Facts', description: 'Random cat fact generator', endpoint: 'https://catfact.ninja', checkPath: '/fact', category: 'Entertainment' },
  { id: 'cat-breeds', name: 'Cat Breeds', description: 'Cat breed directory listing', endpoint: 'https://catfact.ninja', checkPath: '/breeds', category: 'Entertainment' },
  { id: 'ipify', name: 'IPify', description: 'Public IP address detection', endpoint: 'https://api.ipify.org', checkPath: '/?format=json', category: 'Utility' },
  { id: 'random-user', name: 'Random User', description: 'Generated random user profiles', endpoint: 'https://randomuser.me/api', checkPath: '/', category: 'Utility' },
  { id: 'restcountries-all', name: 'RestCountries', description: 'All country data and information', endpoint: 'https://restcountries.com/v3.1', checkPath: '/all', category: 'Reference' },
  { id: 'restcountries-eu', name: 'RestCountries EU', description: 'European Union country data', endpoint: 'https://restcountries.com/v3.1', checkPath: '/region/europe', category: 'Reference' },
  { id: 'openlibrary-search', name: 'Open Library', description: 'Public book search and metadata', endpoint: 'https://openlibrary.org', checkPath: '/search.json?q=the+lord+of+the+rings', category: 'Reference' },
  { id: 'openlibrary-trending', name: 'Open Library Trending', description: 'Trending books and popular reads', endpoint: 'https://openlibrary.org', checkPath: '/trending/now.json', category: 'Reference' },
  { id: 'openlibrary-subjects', name: 'Open Library Subjects', description: 'Book subject category listings', endpoint: 'https://openlibrary.org', checkPath: '/subjects/love.json', category: 'Reference' },
  { id: 'coincap-assets', name: 'CoinCap Assets', description: 'Cryptocurrency asset market data', endpoint: 'https://api.coincap.io/v2', checkPath: '/assets', category: 'Finance' },
  { id: 'coincap-rates', name: 'CoinCap Rates', description: 'Cryptocurrency exchange rates', endpoint: 'https://api.coincap.io/v2', checkPath: '/rates', category: 'Finance' },
  { id: 'coindesk-price', name: 'CoinDesk Bitcoin', description: 'Bitcoin price index data', endpoint: 'https://api.coindesk.com/v1/bpi', checkPath: '/currentprice.json', category: 'Finance' },
  { id: 'coindesk-historical', name: 'CoinDesk Historical', description: 'Bitcoin historical price data', endpoint: 'https://api.coindesk.com/v1/bpi', checkPath: '/historicalclose.json', category: 'Finance' },
  { id: 'bored-activity', name: 'Bored API', description: 'Random activity suggestion generator', endpoint: 'https://www.boredapi.com/api', checkPath: '/activity', category: 'Entertainment' },
  { id: 'jokeapi', name: 'JokeAPI', description: 'Random joke from multiple categories', endpoint: 'https://v2.jokeapi.dev/joke', checkPath: '/Any?type=single', category: 'Entertainment' },
  { id: 'jokeapi-programming', name: 'JokeAPI Programming', description: 'Programming-themed jokes', endpoint: 'https://v2.jokeapi.dev/joke', checkPath: '/Programming?type=single', category: 'Entertainment' },
  { id: 'spacex-launches', name: 'SpaceX Launches', description: 'SpaceX mission launch data', endpoint: 'https://api.spacexdata.com/v4', checkPath: '/launches/latest', category: 'Science' },
  { id: 'spacex-rockets', name: 'SpaceX Rockets', description: 'Falcon rocket specifications', endpoint: 'https://api.spacexdata.com/v4', checkPath: '/rockets', category: 'Science' },
  { id: 'spacex-crew', name: 'SpaceX Crew', description: 'Crew member roster and details', endpoint: 'https://api.spacexdata.com/v4', checkPath: '/crew', category: 'Science' },
  { id: 'spacex-starlink', name: 'SpaceX Starlink', description: 'Starlink satellite data', endpoint: 'https://api.spacexdata.com/v4', checkPath: '/starlink', category: 'Science' },
  { id: 'spacex-ships', name: 'SpaceX Ships', description: 'Drone ship and recovery vessel data', endpoint: 'https://api.spacexdata.com/v4', checkPath: '/ships', category: 'Science' },
  { id: 'numbers-math', name: 'Numbers API Math', description: 'Interesting math number facts', endpoint: 'http://numbersapi.com', checkPath: '/42/math', category: 'Reference' },
  { id: 'numbers-trivia', name: 'Numbers API Trivia', description: 'Random number trivia facts', endpoint: 'http://numbersapi.com', checkPath: '/random/trivia', category: 'Reference' },
  { id: 'numbers-year', name: 'Numbers API Year', description: 'Historical year number facts', endpoint: 'http://numbersapi.com', checkPath: '/2024/year', category: 'Reference' },
  { id: 'agify', name: 'Agify', description: 'Name age prediction API', endpoint: 'https://api.agify.io', checkPath: '/?name=michael', category: 'Utility' },
  { id: 'genderize', name: 'Genderize', description: 'Name gender prediction API', endpoint: 'https://api.genderize.io', checkPath: '/?name=alex', category: 'Utility' },
  { id: 'nationalize', name: 'Nationalize', description: 'Name nationality prediction API', endpoint: 'https://api.nationalize.io', checkPath: '/?name=john', category: 'Utility' },
];
