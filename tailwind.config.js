/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Custom colors as variables (you can reference these in components like bg-primary)
                primary: 'hsl(var(--primary) / <alpha-value>)',  // <alpha-value> allows opacity
                secondary: 'hsl(var(--secondary) / <alpha-value>)',
                background: 'hsl(var(--background) / <alpha-value>)',
                foreground: 'hsl(var(--foreground) / <alpha-value>)',
                accent: 'hsl(var(--accent) / <alpha-value>)',
                muted: 'hsl(var(--muted) / <alpha-value>)',
                border: 'hsl(var(--border) / <alpha-value>)',
                success: 'hsl(var(--success) / <alpha-value>)',
                warning: 'hsl(var(--warning) / <alpha-value>)',
                error: 'hsl(var(--error) / <alpha-value>)',
            },
        },
    },
    plugins: [],
};