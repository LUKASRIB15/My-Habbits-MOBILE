/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./src/**/*.tsx"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        "inter-normal": "Inter_400Regular",
        "inter-bold": "Inter_700Bold",
        
        "rajdhani-medium": "Rajdhani_500Medium",
        "rajdhani-bold": "Rajdhani_700Bold",
      },
      colors: {
        "slate-950": "#020617",
        "slate-300": "#CBD5E1",
        "slate-100": "#F1F5F9",

        "blue-600": "#2563EB",

        "red-950": "#4C0519",
        "red-500": "#F43F5E"
      }
    },
  },
  plugins: [],
}