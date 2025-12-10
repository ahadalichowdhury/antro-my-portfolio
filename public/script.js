// Get system theme preference
function getSystemThemePreference() {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return "dark"
  }
  return "light"
}

// Theme Toggle Functionality
function initTheme() {
  // Check if user has a saved preference, otherwise use system preference
  let theme = localStorage.getItem("theme")
  
  // If no saved preference, detect system preference
  if (!theme) {
    theme = getSystemThemePreference()
    // Save system preference to localStorage so it persists
    localStorage.setItem("theme", theme)
    // User hasn't manually changed it yet
    userHasChangedTheme = false
  } else {
    // User has a saved preference, so they've manually changed it
    userHasChangedTheme = true
  }
  
  const body = document.body
  const html = document.documentElement
  const themeToggle = document.getElementById("theme-toggle")
  
  // Ensure elements exist before accessing classList
  if (!body || !html) return
  
  if (theme === "dark") {
    body.classList.add("dark-mode")
    html.classList.add("dark-mode")
    if (themeToggle) {
      themeToggle.textContent = "☀️"
    }
  } else {
    body.classList.remove("dark-mode")
    html.classList.remove("dark-mode")
    if (themeToggle) {
      themeToggle.textContent = "🌙"
    }
  }
}

// Track if user has manually changed theme
let userHasChangedTheme = false

// Listen for system theme changes
function watchSystemThemeChanges() {
  if (window.matchMedia) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    // Only auto-update if user hasn't manually changed the theme
    mediaQuery.addEventListener('change', (e) => {
      if (!userHasChangedTheme) {
        const systemTheme = e.matches ? "dark" : "light"
        const body = document.body
        const html = document.documentElement
        const themeToggle = document.getElementById("theme-toggle")
        
        // Ensure elements exist
        if (!body || !html) return
        
        if (systemTheme === "dark") {
          body.classList.add("dark-mode")
          html.classList.add("dark-mode")
          localStorage.setItem("theme", "dark")
          if (themeToggle) {
            themeToggle.textContent = "☀️"
          }
        } else {
          body.classList.remove("dark-mode")
          html.classList.remove("dark-mode")
          localStorage.setItem("theme", "light")
          if (themeToggle) {
            themeToggle.textContent = "🌙"
          }
        }
      }
    })
  }
}

function toggleTheme() {
  const body = document.body
  const html = document.documentElement
  const themeToggle = document.getElementById("theme-toggle")
  
  // Ensure elements exist
  if (!body || !html) return
  
  // Mark that user has manually changed theme
  userHasChangedTheme = true
  
  if (body.classList.contains("dark-mode")) {
    body.classList.remove("dark-mode")
    html.classList.remove("dark-mode")
    localStorage.setItem("theme", "light")
    if (themeToggle) {
      themeToggle.textContent = "🌙"
    }
  } else {
    body.classList.add("dark-mode")
    html.classList.add("dark-mode")
    localStorage.setItem("theme", "dark")
    if (themeToggle) {
      themeToggle.textContent = "☀️"
    }
  }
}

// Font Family Toggle Functionality
const fontOptions = [
  { class: "font-monospace", label: "Aa" },
  { class: "font-serif", label: "Aa" },
  { class: "font-sans-serif", label: "Aa" },
  { class: "font-mono-modern", label: "Aa" }
]

// Get system font preference (if available)
function getSystemFontPreference() {
  // Check for prefers-font-family (not widely supported yet)
  if (window.matchMedia && window.matchMedia('(prefers-font-family: monospace)').matches) {
    return "font-monospace"
  }
  
  // Default to sans-serif (common, familiar font)
  return "font-sans-serif"
}

function initFont() {
  // Check if user has a saved preference, otherwise use system preference
  let savedFont = localStorage.getItem("fontFamily")
  
  // If no saved preference, use system preference or default
  if (!savedFont) {
    savedFont = getSystemFontPreference()
    // Save system preference to localStorage
    localStorage.setItem("fontFamily", savedFont)
  }
  
  const body = document.body
  const fontToggle = document.getElementById("font-toggle")
  
  // Ensure body exists
  if (!body) return
  
  // Remove all font classes
  fontOptions.forEach(option => {
    body.classList.remove(option.class)
  })
  
  // Add saved font class
  body.classList.add(savedFont)
  
  // Update button label
  if (fontToggle) {
    const currentIndex = fontOptions.findIndex(opt => opt.class === savedFont)
    updateFontButtonLabel(currentIndex)
  }
}

function toggleFont() {
  const body = document.body
  const fontToggle = document.getElementById("font-toggle")
  
  // Ensure body exists
  if (!body) return
  
  // Find current font index
  let currentIndex = 0
  fontOptions.forEach((option, index) => {
    if (body.classList.contains(option.class)) {
      currentIndex = index
    }
  })
  
  // Remove all font classes
  fontOptions.forEach(option => {
    body.classList.remove(option.class)
  })
  
  // Get next font (cycle)
  const nextIndex = (currentIndex + 1) % fontOptions.length
  const nextFont = fontOptions[nextIndex]
  
  // Apply next font
  body.classList.add(nextFont.class)
  localStorage.setItem("fontFamily", nextFont.class)
  
  // Update button label
  updateFontButtonLabel(nextIndex)
}

function updateFontButtonLabel(index) {
  const fontToggle = document.getElementById("font-toggle")
  if (fontToggle) {
    const labels = ["Aa", "Aa", "Aa", "Aa"]
    const tooltips = ["Monospace", "Serif", "Sans-serif", "Modern Mono"]
    fontToggle.textContent = labels[index]
    fontToggle.title = tooltips[index]
  }
}

// SPA Navigation
let isLoading = false

async function loadPage(url) {
  if (isLoading) return
  isLoading = true

  try {
    // Get header and container
    const header = document.querySelector('.header')
    const container = document.querySelector('.container')
    
    // Get all content sections (everything except header)
    const contentSections = Array.from(container.children).filter(
      el => !el.classList.contains('header')
    )

    // Apply fade transition only to content sections, not header
    contentSections.forEach(section => {
      section.style.transition = 'opacity 0.2s ease-in-out'
      section.style.opacity = '0.3'
    })

    // Fetch the new page
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Failed to load page')
    }
    const html = await response.text()
    
    // Parse the HTML
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    
    // Extract the main content
    const newContainer = doc.querySelector('.container')
    
    if (newContainer && container && header) {
      // Wait for fade out
      await new Promise(resolve => setTimeout(resolve, 200))
      
      // Get all elements from new page
      const newAllChildren = Array.from(newContainer.children)
      
      // Remove all current content sections (keep header)
      contentSections.forEach(section => {
        section.remove()
      })
      
      // Add new content sections (skip header from new page)
      newAllChildren.forEach(el => {
        if (!el.classList.contains('header')) {
          container.appendChild(el.cloneNode(true))
        }
      })
      
      // Update page title
      document.title = doc.title
      
      // Update URL without reload
      window.history.pushState({}, '', url)
      
      // Reinitialize scripts
      reinitializePage()
      
      // Update active nav link
      updateActiveNavLink()
      
      // Get new content sections and restore opacity
      const newContentSections = Array.from(container.children).filter(
        el => !el.classList.contains('header')
      )
      newContentSections.forEach(section => {
        section.style.transition = 'opacity 0.3s ease-in-out'
        section.style.opacity = '1'
      })
      
      // Scroll to top smoothly
      window.scrollTo({ top: 0, behavior: 'smooth' })
      
      isLoading = false
    } else {
      // Fallback to normal navigation if parsing fails
      window.location.href = url
      isLoading = false
    }
  } catch (error) {
    console.error('Error loading page:', error)
    // Fallback to normal navigation
    window.location.href = url
    isLoading = false
  }
}

function updateActiveNavLink() {
  // Get current page path
  const currentPath = window.location.pathname
  
  // Remove active class from all nav links
  document.querySelectorAll('.nav a').forEach(link => {
    link.classList.remove('active')
  })
  
  // Add active class to current page link
  document.querySelectorAll('.nav a').forEach(link => {
    const href = link.getAttribute('href')
    if (href) {
      // Normalize paths (remove trailing slashes for comparison)
      const normalizedHref = href === '/' ? '/' : href.replace(/\/$/, '')
      const normalizedPath = currentPath === '/' ? '/' : currentPath.replace(/\/$/, '')
      
      // Exact match for home page
      if (normalizedHref === '/' && normalizedPath === '/') {
        link.classList.add('active')
      }
      // Exact match for about page
      else if (normalizedHref === '/about' && normalizedPath === '/about') {
        link.classList.add('active')
      }
      // Match for blog - check if path starts with /blog
      else if (normalizedHref === '/blog' && normalizedPath.startsWith('/blog')) {
        link.classList.add('active')
      }
    }
  })
}

function reinitializePage() {
  // Reinitialize theme and font
  initTheme()
  initFont()
  
  // Update active navigation link
  updateActiveNavLink()
  
  // Reattach event listeners
  const themeToggle = document.getElementById("theme-toggle")
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme)
  }
  
  const fontToggle = document.getElementById("font-toggle")
  if (fontToggle) {
    fontToggle.addEventListener("click", toggleFont)
  }
  
  // Reinitialize blog post tracking if on blog post page
  // Check if we're on a blog post page (Astro route: /blog/[slug])
  const pathname = window.location.pathname
  if (pathname.startsWith('/blog/') && pathname !== '/blog') {
    // Reset tracking flag to allow re-initialization
    if (window.blogTrackingInitialized) {
      window.blogTrackingInitialized = false
    }
    // Wait a bit for DOM to be ready
    setTimeout(() => {
      initializeBlogTracking()
    }, 400)
  }
  
  // Reattach smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
}

// Initialize blog post tracking (can be called from inline script or SPA navigation)
function initializeBlogTracking() {
  // Prevent double initialization
  if (window.blogTrackingInitialized) {
    console.log('[SPA Tracking] Already initialized, skipping...')
    return
  }
  
  console.log('[SPA Tracking] Initializing blog post tracking...')
  
  // Get postId from data attribute
  const article = document.querySelector('.blog-post')
  const postId = article ? article.getAttribute('data-post-id') : null
  
  if (!postId) {
    console.error('[SPA Tracking] Post ID not found')
    // Retry once after a delay
    setTimeout(() => {
      const retryArticle = document.querySelector('.blog-post')
      const retryPostId = retryArticle ? retryArticle.getAttribute('data-post-id') : null
      if (retryPostId) {
        console.log('[SPA Tracking] Post ID found on retry:', retryPostId)
        startBlogTracking(retryPostId)
      }
    }, 500)
    return
  }
  
  startBlogTracking(postId)
}

function startBlogTracking(postId) {
  if (window.blogTrackingInitialized) return
  window.blogTrackingInitialized = true
  
  console.log('[SPA Tracking] Starting tracking for postId:', postId)
  
  let readingTime = 0
  let isActive = true
  let lastActiveTime = Date.now()
  const INACTIVE_THRESHOLD = 30000 // 30 seconds
  const MIN_READING_TIME = 5 // Minimum 5 seconds
  let viewTracked = false
  
  // Track initial view
  function trackView() {
    if (viewTracked) {
      console.log('[SPA Tracking] View already tracked, skipping...')
      return
    }
    
    console.log('[SPA Tracking] Tracking view for postId:', postId)
    viewTracked = true
    
    fetch('/api/track-view', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId }),
    })
    .then(response => {
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      return response.json()
    })
    .then(data => {
      console.log('[SPA Tracking] View tracked:', data)
    })
    .catch(err => {
      console.error('[SPA Tracking] Failed to track view:', err)
      viewTracked = false // Allow retry
    })
  }
  
  // Track reading time
  function trackReadingTime() {
    if (!isActive) return
    
    const activeTime = (Date.now() - lastActiveTime) / 1000
    if (activeTime >= MIN_READING_TIME) {
      readingTime = Math.floor(activeTime)
      console.log('[SPA Tracking] Tracking reading time:', readingTime, 'seconds')
      
      const data = JSON.stringify({ postId, readingTime })
      if (navigator.sendBeacon) {
        const blob = new Blob([data], { type: 'application/json' })
        navigator.sendBeacon('/api/track-view', blob)
      } else {
        fetch('/api/track-view', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: data,
          keepalive: true,
        }).catch(err => console.error('[SPA Tracking] Failed to track reading time:', err))
      }
    }
  }
  
  // Update activity
  function updateActivity() {
    if (!isActive) {
      isActive = true
      lastActiveTime = Date.now()
    } else {
      lastActiveTime = Date.now()
    }
  }
  
  // Check inactivity
  function checkInactivity() {
    if (isActive && (Date.now() - lastActiveTime) > INACTIVE_THRESHOLD) {
      isActive = false
    }
  }
  
  // Event listeners
  ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
    document.addEventListener(event, updateActivity, { passive: true })
  })
  
  // Track initial view
  trackView()
  
  // Check inactivity
  setInterval(checkInactivity, 10000)
  
  // Track on page unload
  window.addEventListener('beforeunload', trackReadingTime)
  window.addEventListener('pagehide', trackReadingTime)
  
  // Periodic tracking
  setInterval(() => {
    if (isActive) {
      const activeTime = (Date.now() - lastActiveTime) / 1000
      if (activeTime >= 30) {
        readingTime = Math.floor(activeTime)
        fetch('/api/track-view', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ postId, readingTime }),
        })
        .then(response => response.json())
        .then(data => {
          if (data.success) lastActiveTime = Date.now()
        })
        .catch(err => console.error('[SPA Tracking] Failed:', err))
      }
    }
  }, 30000)
}


// Intercept all internal link clicks
function setupSPANavigation() {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a')
    if (!link) return
    
    const href = link.getAttribute('href')
    
    // Skip if it's an external link, anchor link, or special link
    if (!href || 
        href.startsWith('#') || 
        href.startsWith('mailto:') || 
        href.startsWith('http') ||
        link.hasAttribute('download') ||
        link.target === '_blank') {
      return
    }
    
    // Skip if it's the same page
    if (href === window.location.pathname || href === window.location.href) {
      e.preventDefault()
      return
    }
    
    // Intercept the click
    e.preventDefault()
    loadPage(href)
  })
}

// Handle browser back/forward buttons
window.addEventListener('popstate', (e) => {
  loadPage(window.location.pathname)
  updateActiveNavLink()
})

// Initialize theme and font on page load
document.addEventListener("DOMContentLoaded", () => {
  initTheme()
  initFont()
  watchSystemThemeChanges()
  setupSPANavigation()
  updateActiveNavLink()
  
  const themeToggle = document.getElementById("theme-toggle")
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme)
  }
  
  const fontToggle = document.getElementById("font-toggle")
  if (fontToggle) {
    fontToggle.addEventListener("click", toggleFont)
  }
})

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Removed scroll-based active nav link logic as it was interfering with page-based navigation
// Active state is now determined by the current page path, not scroll position
