export default defineNuxtConfig({
  devServer: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || "0.0.0.0",
  },

  app: {
    head: {
      title: "Koshelek",
      titleTemplate: "%s | Koshelek",
      htmlAttrs: {
        lang: "ru",
      },
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1.0, user-scalable=0" },
        { charset: "utf-8" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
        { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
        { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
        { rel: "manifest", href: "/site.webmanifest" },
      ],
    },
  },

  nitro: {
    compressPublicAssets: true,
  },

  modules: ["@nuxtjs/robots"],

  robots: {
    UserAgent: "*",
    Disallow: "",
  },

  runtimeConfig: {
    public: {
      serverUrl: process.env.SERVER_URL || "http://localhost:3000",
    },
  },

  css: ["@/assets/scss/global.scss"],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
              @import "@/assets/scss/_vars.scss";
            `,
        },
      },
    },
  },
});
