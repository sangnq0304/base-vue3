/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                brand: {
                    DEFAULT: '#2563eb',
                    light: '#3b82f6',
                    dark: '#1d4ed8',
                },
                sidebar: {
                    DEFAULT: '#0f172a',
                    hover: '#1e293b',
                    active: '#334155',
                    text: '#cbd5e1',
                    muted: '#94a3b8',
                },
                header: {
                    DEFAULT: '#ffffff',
                    border: '#e2e8f0',
                    text: '#0f172a',
                },
                content: {
                    DEFAULT: '#f8fafc',
                },
            },
        },
    },
    plugins: [],
};

