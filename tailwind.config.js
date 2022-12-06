/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            keyframes: {
                spanFromLeft: {
                    from: { width: '0%' },
                    to: { width: '100%' },
                },
            },
            animation: {
                'span-from-left': 'spanFromLeft 0.3s ease',
            },
        },
    },
    plugins: [require('daisyui'), require('@headlessui/tailwindcss')({ prefix: 'ui' })],
};
