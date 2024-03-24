module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        '67': '268px', // Custom width for StatBox
      },
      minHeight: {
        '49': '196px', // Custom height for StatBox
      },
      // Add other customizations or extend existing ones here
      colors: {
        // Example of adding a custom color
        'custom-blue': '#007bff',
      },
      borderRadius: {
        // Example of extending borderRadius
        'xl': '1rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};