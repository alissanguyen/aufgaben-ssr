module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: [
    "./components/**/*.tsx",
    "./pages/**/*.tsx",
    "./pages/**/*.js",
    "./pages/**/*.jsx",
  ],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
};
