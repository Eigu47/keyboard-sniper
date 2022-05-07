module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        key_: {
          "0%, 59%": { opacity: 0 },
          "60%": { opacity: 1 },
        },
      },
      animation: {
        key: "key_ 1.2s linear infinite",
      },
    },
  },
  plugins: [],
};
