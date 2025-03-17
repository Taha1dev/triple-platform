/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      textShadow: {
        default: '2px 2px 4px rgba(0, 0, 0, 0.5)'
      },
      fontFamily: {
        monoScape: ['"Source Code Pro"', "sans-serif"],
        paytone: ['"Paytone One"', "sans-serif"],

      },
      backgroundImage: {
        'hero-pattern': "url('/dark-banner.webp')",
        'blur-pattern': "url('blob-blur.png')"
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      colors: {
        theme: {
          primary: '#09090b ',
          secondary: '#fff',
          variant: '#0056B3'
        },
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        },
        keyframes: {
          'caret-blink': {
            '0%,70%,100%': {
              opacity: '1'
            },
            '20%,50%': {
              opacity: '0'
            }
          }
        },
        animation: {
          'caret-blink': 'caret-blink 1.25s ease-out infinite'
        }
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        },
        meteor: {
          '0%': {
            transform: 'rotate(215deg) translateX(0)',
            opacity: '1'
          },
          '70%': {
            opacity: '1'
          },
          '100%': {
            transform: 'rotate(215deg) translateX(-500px)',
            opacity: '0'
          }
        },
        'background-position-spin': {
          '0%': {
            backgroundPosition: 'top center'
          },
          '100%': {
            backgroundPosition: 'bottom center'
          }
        },
        'shimmer-slide': {
          to: {
            transform: 'translate(calc(100cqw - 100%), 0)'
          }
        },
        'spin-around': {
          '0%': {
            transform: 'translateZ(0) rotate(0)'
          },
          '15%, 35%': {
            transform: 'translateZ(0) rotate(90deg)'
          },
          '65%, 85%': {
            transform: 'translateZ(0) rotate(270deg)'
          },
          '100%': {
            transform: 'translateZ(0) rotate(360deg)'
          }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        meteor: 'meteor 5s linear infinite',
        'background-position-spin': 'background-position-spin 3000ms infinite alternate',
        'shimmer-slide': 'shimmer-slide var(--speed) ease-in-out infinite alternate',
        'spin-around': 'spin-around calc(var(--speed) * 2) infinite linear'
      }
    }
  },
  // eslint-disable-next-line no-undef
  plugins: [require("tailwindcss-animate"),
  function ({ addUtilities }) {
    const newUtilities = {
      '.text-shadow': {
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
      },
      '.text-shadow-md': {
        textShadow: '3px 3px 6px rgba(0, 0, 0, 0.5)',
      },
      '.text-shadow-lg': {
        textShadow: '4px 4px 8px rgba(0, 0, 0, 0.5)',
      },
    };
    addUtilities(newUtilities);
  },
  ],
}

