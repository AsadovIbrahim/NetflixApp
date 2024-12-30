/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./src/**/*.{js,jsx,ts,tsx}","./App.tsx"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily:{
        manrope:"Manrope-Regular",
        manropeLight:"Manrope-Light",
        manropeBold:"Manrope-Bold",
        manropeMedium:"Manrope-Medium",
        manropeSemibold:"Manrope-SemiBold",
      }
    },
  },
  plugins: [],
}