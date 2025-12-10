import { c as createAstro, a as createComponent, m as maybeRenderHead, e as addAttribute, r as renderTemplate } from './astro/server_xhRB2sXi.mjs';
import 'kleur/colors';
import 'clsx';

const $$Astro = createAstro("https://example.com");
const $$Header = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Header;
  const currentPath = Astro2.url.pathname;
  return renderTemplate`${maybeRenderHead()}<header class="header"> <div class="header-content"> <div class="logo-section"> <img src="/resource/emojis.com panda-bear-full-body-scratching.png" alt="Logo" class="logo"> <div> <h1> <a href="/" style="color: inherit; text-decoration: none">S. M. Ahad Ali Chowdhury</a> </h1> </div> </div> <nav class="nav"> <a href="/"${addAttribute(currentPath === "/" ? "active" : "", "class")}>Home</a> <span class="separator">|</span> <a href="/about"${addAttribute(currentPath === "/about" ? "active" : "", "class")}>About</a> <span class="separator">|</span> <a href="/blog"${addAttribute(currentPath.startsWith("/blog") ? "active" : "", "class")}>Blog</a> <button id="font-toggle" class="font-toggle" aria-label="Change font" title="Monospace">
Aa
</button> <button id="theme-toggle" class="theme-toggle" aria-label="Toggle theme">
🌙
</button> </nav> </div> </header>`;
}, "/Users/s.m.ahadalichowdhury/Downloads/portfolio-website/src/components/Header.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  return renderTemplate`${maybeRenderHead()}<footer class="footer"> <p>&copy; ${currentYear} S. M. Ahad Ali Chowdhury. All rights reserved.</p> </footer>`;
}, "/Users/s.m.ahadalichowdhury/Downloads/portfolio-website/src/components/Footer.astro", void 0);

export { $$Header as $, $$Footer as a };
