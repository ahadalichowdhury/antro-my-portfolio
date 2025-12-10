import { c as createAstro, a as createComponent, r as renderTemplate, b as renderSlot, d as renderHead, e as addAttribute } from './astro/server_xhRB2sXi.mjs';
import 'kleur/colors';
import 'clsx';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://example.com");
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const {
    title,
    description = "S. M. Ahad Ali Chowdhury - Software Engineer. Passionate about building scalable applications and open source projects.",
    ogImage = "/resource/emojis.com panda-bear-full-body-scratching.png",
    ogType = "website",
    canonicalUrl
  } = Astro2.props;
  const siteUrl = Astro2.site?.href || (typeof Astro2.url !== "undefined" ? `${Astro2.url.origin}` : "https://example.com");
  const fullOgImage = ogImage.startsWith("http") ? ogImage : `${siteUrl}${ogImage}`;
  const canonical = canonicalUrl || Astro2.url.pathname;
  const fullCanonical = canonical.startsWith("http") ? canonical : `${siteUrl}${canonical}`;
  return renderTemplate(_a || (_a = __template(['<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><!-- Primary Meta Tags --><title>', '</title><meta name="title"', '><meta name="description"', '><link rel="canonical"', '><!-- Favicon - Order matters for browser compatibility --><link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"><link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"><link rel="shortcut icon" href="/favicon.ico"><link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"><link rel="manifest" href="/site.webmanifest"><!-- Open Graph / Facebook --><meta property="og:type"', '><meta property="og:url"', '><meta property="og:title"', '><meta property="og:description"', '><meta property="og:image"', '><!-- Twitter --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url"', '><meta property="twitter:title"', '><meta property="twitter:description"', '><meta property="twitter:image"', '><link rel="stylesheet" href="/styles.css"><script>\n      // Apply theme immediately to prevent flash\n      (function () {\n        // Ensure document exists\n        if (typeof document === "undefined") return;\n        \n        let theme = localStorage.getItem("theme");\n        if (!theme) {\n          // Check system preference\n          if (\n            window.matchMedia &&\n            window.matchMedia("(prefers-color-scheme: dark)").matches\n          ) {\n            theme = "dark";\n          } else {\n            theme = "light";\n          }\n        }\n        // Apply or remove dark-mode class based on theme\n        // document.documentElement always exists, but body might not yet\n        const html = document.documentElement;\n        if (!html) return;\n        \n        if (theme === "dark") {\n          html.classList.add("dark-mode");\n          // Body might not exist yet when script runs in head\n          if (document.body) {\n            document.body.classList.add("dark-mode");\n          }\n        } else {\n          html.classList.remove("dark-mode");\n          if (document.body) {\n            document.body.classList.remove("dark-mode");\n          }\n        }\n      })();\n    <\/script>', "</head> <body> ", ' <script src="/script.js"><\/script> </body> </html>'])), title, addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(fullCanonical, "href"), addAttribute(ogType, "content"), addAttribute(`${siteUrl}${Astro2.url.pathname}`, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(fullOgImage, "content"), addAttribute(`${siteUrl}${Astro2.url.pathname}`, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(fullOgImage, "content"), renderHead(), renderSlot($$result, $$slots["default"]));
}, "/Users/s.m.ahadalichowdhury/Downloads/portfolio-website/src/layouts/BaseLayout.astro", void 0);

export { $$BaseLayout as $ };
