export const environment = {
  baseUrl: import.meta.env['VITE_BASE_URL'] ?? import.meta.env.MODE === 'development' ? 'http://localhost:5173' : 'https://bermell.dev',
  production: import.meta.env.MODE !== 'development',
  apiUrl: import.meta.env['VITE_API_URL'],
  websiteUrl: import.meta.env['VITE_WEBSITE_URL'],
};
