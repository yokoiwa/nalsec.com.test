const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./src/app/**/*.{jsx,tsx}",
    "./src/pages/**/*.{jsx,tsx}",
    "./src/components/**/*.{jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      keyframes: {
        fadein: { "0%": { opacity: 0 }, "100%": { opacity: 1 } },
        slidein: {
          "0%": {
            transform:
              "translate(var(--tw-translate-x), 4rem) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))",
          },
          "100%": {
            transform:
              "translate(var(--tw-translate-x), 0) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))",
          },
        },
        "slidein-from-left": {
          "0%": {
            transform:
              "translate(-4rem, var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))",
          },
          "100%": {
            transform:
              "translate(0, var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))",
          },
        },
      },
      animation: {
        fadein: ".5s linear 0s 1 normal both running fadein",
        slidein: ".5s linear 0s 1 normal both running slidein",
        "slidein-from-left":
          ".5s linear 0s 1 normal both running slidein-from-left",
        "fade-slidein":
          ".5s linear 0s 1 normal both running fadein, .5s ease-out 0s 1 normal both running slidein",
        "fade-slidein-from-left":
          ".5s linear 0s 1 normal both running fadein, .5s ease-out 0s 1 normal both running slidein-from-left",
      },
      height: {
        screen: ["100vh", "100dvh"],
        "screen-small": ["100vh", "100svh"],
        "screen-large": ["100vh", "100lvh"],
      },
      minHeight: {
        screen: ["100vh", "100dvh"],
        "screen-small": ["100vh", "100svh"],
        "screen-large": ["100vh", "100lvh"],
      },
      maxHeight: {
        screen: ["100vh", "100dvh"],
        "screen-small": ["100vh", "100svh"],
        "screen-large": ["100vh", "100lvh"],
      },
      margin: {
        screen: ["100vh", "100dvh"],
        "-screen": ["-100vh", "-100dvh"],
        "screen-small": ["100vh", "100svh"],
        "-screen-small": ["-100vh", "-100svh"],
        "screen-large": ["100vh", "100lvh"],
        "-screen-large": ["-100vh", "-100lvh"],
      },
      padding: {
        screen: ["100vh", "100dvh"],
        "screen-small": ["100vh", "100svh"],
        "screen-large": ["100vh", "100lvh"],
      },
    },
  },
  plugins: [
    plugin(({ matchUtilities, theme }) => {
      // addUtilities({
      //   // ".paused":    {animationPlayState: "paused"},
      //   // ".running":   {animationPlayState: "running"},
      //   // ".js-appear": {animationPlayState: "paused"},
      // });
      matchUtilities(
        {
          "animate-duration": (value) => ({ animationDuration: value }),
          "animate-delay": (value) => ({ animationDelay: value }),
        },
        { values: theme("transitionDuration") }
      );
      matchUtilities(
        {
          size: (value) => ({
            height: value,
            width: value,
          }),
        },
        {
          values: {
            ...theme("width"),
            "screen-min": ["100vmin", "100dvmin"],
            "screen-max": ["100vmax", "100dvmax"],
            "screen-min-small": ["100vmin", "100svmin"],
            "screen-max-small": ["100vmax", "100svmax"],
            "screen-min-large": ["100vmin", "100lvmin"],
            "screen-max-large": ["100vmax", "100lvmax"],
          },
        }
      );
    }),
  ],
};
