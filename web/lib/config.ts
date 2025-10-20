export default {
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'),
    lang: 'en',
    defaultTheme: 'dark',
    title: 'Mubi — Streaming Refined. Cinema Redefined.',
    description: 'A multi-platform movies tracker and streaming website for movies, series, tv and much more.',
    navItems: [
        { name: 'Home', path: '/' },
        { name: 'Movies', path: '/movies' },
        { name: 'Series', path: '/series' },
        { name: 'TV', path: '/tv' },
        { name: 'Search', path: '/search' },
        { name: 'Watchlist', path: '/watchlist' },
    ],
}