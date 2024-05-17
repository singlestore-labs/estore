import plugin from "tailwindcss/plugin";

import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./features/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 8px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "puslating-dot": {
          "0%": {
            transform: "translate(-50%, -50%) scale(0.1, 0.1)",
            opacity: "0",
          },
          "50%": {
            opacity: "1",
          },
          "100%": {
            transform: "translate(-50%, -50%) scale(1.2, 1.2)",
            opacity: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      flexGrow: {
        full: "9999",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("tailwind-gradient-mask-image"),

    plugin(
      ({ matchUtilities, theme }) => {
        matchUtilities(
          {
            "grid-auto-fill": (value) => {
              const [min, max = "1fr"] = value.split(",");
              return { gridTemplateColumns: `repeat(auto-fill, minmax(${min}, ${max}))` };
            },
          },
          { values: theme("gridAutoFill") },
        );
      },
      {
        theme: {
          gridAutoFit: {
            DEFAULT: "[16rem,1fr]",
          },
        },
      },
    ),

    plugin(
      ({ matchUtilities, theme }) => {
        matchUtilities(
          {
            "grid-auto-fit": (value) => {
              const [min, max = "1fr"] = value.split(",");
              return { gridTemplateColumns: `repeat(auto-fit, minmax(${min}, ${max}))` };
            },
          },
          { values: theme("gridAutoFit") },
        );
      },
      {
        theme: {
          gridAutoFit: {
            DEFAULT: "[16rem,1fr]",
          },
        },
      },
    ),
  ],
} satisfies Config;

export default config;
