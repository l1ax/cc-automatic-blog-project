import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Background colors
        bg: {
          primary: "#1a1a1a",
          secondary: "#242424",
          tertiary: "#2d2d2d",
        },
        // Text colors
        text: {
          primary: "#e5e5e5",
          secondary: "#a3a3a3",
          muted: "#737373",
        },
        // Accent colors (orange)
        accent: {
          primary: "#f97316",
          hover: "#ea580c",
          subtle: "#c2410c",
        },
        // Border & Divider
        border: "#404040",
        divider: "#262626",
      },
      typography: ({ theme }: any) => ({
        DEFAULT: {
          css: {
            color: theme("colors.text.primary"),
            maxWidth: "65ch",
            h1: {
              color: theme("colors.text.primary"),
              fontSize: "2.25rem",
              fontWeight: "700",
              marginTop: "0",
              marginBottom: "1rem",
              lineHeight: "1.2",
            },
            h2: {
              color: theme("colors.text.primary"),
              fontSize: "1.875rem",
              fontWeight: "600",
              marginTop: "2rem",
              marginBottom: "1rem",
              lineHeight: "1.3",
            },
            h3: {
              color: theme("colors.text.primary"),
              fontSize: "1.5rem",
              fontWeight: "600",
              marginTop: "1.5rem",
              marginBottom: "0.75rem",
              lineHeight: "1.4",
            },
            h4: {
              color: theme("colors.text.primary"),
              fontSize: "1.25rem",
              fontWeight: "600",
              marginTop: "1rem",
              marginBottom: "0.5rem",
            },
            p: {
              marginTop: "1rem",
              marginBottom: "1rem",
              lineHeight: "1.75",
            },
            a: {
              color: theme("colors.accent.primary"),
              textDecoration: "underline",
              fontWeight: "500",
              "&:hover": {
                color: theme("colors.accent.hover"),
              },
            },
            strong: {
              color: theme("colors.text.primary"),
              fontWeight: "600",
            },
            code: {
              color: theme("colors.accent.primary"),
              fontWeight: "400",
              fontSize: "0.875em",
            },
            pre: {
              backgroundColor: theme("colors.bg.tertiary"),
              borderRadius: "0.5rem",
              padding: "1rem",
              marginTop: "1.5rem",
              marginBottom: "1.5rem",
              overflowX: "auto",
              code: {
                color: theme("colors.text.primary"),
                backgroundColor: "transparent",
                padding: "0",
                fontSize: "0.875rem",
              },
            },
            ul: {
              paddingLeft: "1.5rem",
              marginTop: "1rem",
              marginBottom: "1rem",
            },
            ol: {
              paddingLeft: "1.5rem",
              marginTop: "1rem",
              marginBottom: "1rem",
            },
            li: {
              marginTop: "0.5rem",
              marginBottom: "0.5rem",
            },
            blockquote: {
              borderLeftColor: theme("colors.accent.primary"),
              borderLeftWidth: "4px",
              paddingLeft: "1rem",
              fontStyle: "italic",
              color: theme("colors.text.secondary"),
            },
            hr: {
              borderColor: theme("colors.divider"),
              marginTop: "2rem",
              marginBottom: "2rem",
            },
          },
        },
      }),
    },
  },
  plugins: [],
};
export default config;
