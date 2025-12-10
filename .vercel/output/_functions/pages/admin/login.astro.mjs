import { c as createAstro, a as createComponent, f as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_xhRB2sXi.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_BK6VYfps.mjs';
export { renderers } from '../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://example.com");
const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Login;
  const session = await import('../../chunks/session_CvEO55jf.mjs').then((m) => m.requireAuth(Astro2.cookies));
  if (session) {
    return Astro2.redirect("/admin");
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Admin Login - S. M. Ahad Ali Chowdhury" }, { "default": async ($$result2) => renderTemplate(_a || (_a = __template([" ", `<div class="container" style="max-width: 400px; margin: 100px auto;"> <h1 style="margin-bottom: 30px; text-align: center;">Admin Login</h1> <div id="error-message" style="display: none; color: #dc3545; margin-bottom: 20px; padding: 12px; background-color: #f8d7da; border-radius: 6px;"></div> <form id="login-form" style="display: flex; flex-direction: column; gap: 20px;"> <div> <label for="email" style="display: block; margin-bottom: 8px; font-weight: 500;">Email</label> <input type="email" id="email" name="email" required style="
            width: 100%;
            padding: 12px;
            border: 1px solid var(--border-color);
            border-radius: 6px;
            font-family: var(--font-family);
            background-color: var(--bg-color);
            color: var(--text-color);
          "> </div> <div> <label for="password" style="display: block; margin-bottom: 8px; font-weight: 500;">Password</label> <input type="password" id="password" name="password" required style="
            width: 100%;
            padding: 12px;
            border: 1px solid var(--border-color);
            border-radius: 6px;
            font-family: var(--font-family);
            background-color: var(--bg-color);
            color: var(--text-color);
          "> </div> <button type="submit" id="login-button" style="
          padding: 12px 24px;
          background-color: var(--accent-color);
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 16px;
          font-weight: 500;
        ">
Login
</button> </form> </div> <script>
    console.log('[Frontend] Login script loaded');
    
    // Prevent form submission and handle with fetch
    document.getElementById('login-form')?.addEventListener('submit', async function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      console.log('[Frontend] Form submit intercepted');
      
      const emailInput = document.getElementById('email');
      const passwordInput = document.getElementById('password');
      const errorDiv = document.getElementById('error-message');
      
      if (!emailInput || !passwordInput) {
        console.error('[Frontend] Form inputs not found');
        return false;
      }
      
      const email = emailInput.value.trim();
      const password = passwordInput.value;
      
      if (!email || !password) {
        console.log('[Frontend] Validation failed - empty fields');
        if (errorDiv) {
          errorDiv.textContent = 'Please enter both email and password';
          errorDiv.style.display = 'block';
        }
        return false;
      }
      
      // Clear any previous errors
      if (errorDiv) {
        errorDiv.style.display = 'none';
      }
      
      console.log('[Frontend] Submitting login request for:', email);
      
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      
      try {
        const response = await fetch('/admin/login-api', {
          method: 'POST',
          body: formData,
          credentials: 'same-origin'
        });
        
        console.log('[Frontend] Response received');
        console.log('[Frontend] Status:', response.status);
        
        if (!response.ok) {
          // Handle error response
          const text = await response.text();
          console.log('[Frontend] Error response text:', text);
          
          let errorText = 'Login failed';
          try {
            const data = JSON.parse(text);
            errorText = data.error || errorText;
          } catch (e) {
            errorText = text || 'Login failed (Status: ' + response.status + ')';
          }
          
          if (errorDiv) {
            errorDiv.textContent = errorText;
            errorDiv.style.display = 'block';
          }
          console.error('[Frontend] Login failed:', errorText);
          return false;
        }
        
        // Handle success response
        const data = await response.json();
        console.log('[Frontend] Login successful, response:', data);
        
        if (data.success && data.redirect) {
          console.log('[Frontend] Redirecting to:', data.redirect);
          window.location.href = data.redirect;
          return false;
        }
        
        // Fallback redirect
        console.log('[Frontend] Redirecting to /admin');
        window.location.href = '/admin';
        return false;
      } catch (error) {
        console.error('[Frontend] Fetch error:', error);
        if (errorDiv) {
          errorDiv.textContent = 'An error occurred. Please try again.';
          errorDiv.style.display = 'block';
        }
      }
      
      return false;
    });
    
    console.log('[Frontend] Submit handler attached');
  <\/script> `])), maybeRenderHead()) })}`;
}, "/Users/s.m.ahadalichowdhury/Downloads/portfolio-website/src/pages/admin/login.astro", void 0);

const $$file = "/Users/s.m.ahadalichowdhury/Downloads/portfolio-website/src/pages/admin/login.astro";
const $$url = "/admin/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
