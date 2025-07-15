// Theme Management
class ThemeManager {
  constructor() {
    this.theme = localStorage.getItem("theme") || "dark"
    this.init()
  }

  init() {
    this.applyTheme()
    this.bindEvents()
  }

  applyTheme() {
    document.body.className = `${this.theme}-theme`
    this.updateThemeIcon()
  }

  updateThemeIcon() {
    const sunIcon = document.querySelector(".sun-icon")
    const moonIcon = document.querySelector(".moon-icon")

    if (this.theme === "dark") {
      sunIcon.style.opacity = "0"
      sunIcon.style.transform = "rotate(180deg)"
      moonIcon.style.opacity = "1"
      moonIcon.style.transform = "rotate(0deg)"
    } else {
      sunIcon.style.opacity = "1"
      sunIcon.style.transform = "rotate(0deg)"
      moonIcon.style.opacity = "0"
      moonIcon.style.transform = "rotate(-180deg)"
    }
  }

  toggle() {
    this.theme = this.theme === "dark" ? "light" : "dark"
    localStorage.setItem("theme", this.theme)
    this.applyTheme()
  }

  bindEvents() {
    const themeToggle = document.getElementById("themeToggle")
    if (themeToggle) {
      themeToggle.addEventListener("click", () => this.toggle())
    }
  }
}

// Navigation Management
class NavigationManager {
  constructor() {
    this.header = document.getElementById("header")
    this.mobileMenuBtn = document.getElementById("mobileMenuBtn")
    this.mobileMenu = document.getElementById("mobileMenu")
    this.navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link")
    this.init()
  }

  init() {
    this.bindEvents()
    this.handleScroll()
    this.setActiveLink()
  }

  bindEvents() {
    // Mobile menu toggle
    if (this.mobileMenuBtn) {
      this.mobileMenuBtn.addEventListener("click", () => this.toggleMobileMenu())
    }

    // Smooth scrolling for navigation links
    this.navLinks.forEach((link) => {
      link.addEventListener("click", (e) => this.handleNavClick(e))
    })

    // Scroll event for header styling
    window.addEventListener("scroll", () => this.handleScroll())

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => this.handleOutsideClick(e))
  }

  toggleMobileMenu() {
    this.mobileMenu.classList.toggle("active")
    this.animateMobileMenuButton()
  }

  animateMobileMenuButton() {
    const spans = this.mobileMenuBtn.querySelectorAll("span")
    const isActive = this.mobileMenu.classList.contains("active")

    if (isActive) {
      spans[0].style.transform = "rotate(-45deg) translate(-5px, 6px)"
      spans[1].style.opacity = "0"
      spans[2].style.transform = "rotate(45deg) translate(-5px, -6px)"
    } else {
      spans[0].style.transform = "none"
      spans[1].style.opacity = "1"
      spans[2].style.transform = "none"
    }
  }

  handleNavClick(e) {
    const href = e.target.getAttribute("href")

    if (href && href.startsWith("#")) {
      e.preventDefault()
      const target = document.querySelector(href)

      if (target) {
        const headerHeight = this.header.offsetHeight
        const targetPosition = target.offsetTop - headerHeight - 20

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })

        // Close mobile menu if open
        this.mobileMenu.classList.remove("active")
        this.animateMobileMenuButton()

        // Update active link
        this.setActiveLink(href)
      }
    }
  }

  handleScroll() {
    const scrolled = window.scrollY > 50
    this.header.classList.toggle("scrolled", scrolled)

    // Update active link based on scroll position
    this.updateActiveLinkOnScroll()
  }

  updateActiveLinkOnScroll() {
    const sections = document.querySelectorAll("section[id]")
    const scrollPos = window.scrollY + this.header.offsetHeight + 100

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight
      const sectionId = section.getAttribute("id")

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        this.setActiveLink(`#${sectionId}`)
      }
    })
  }

  setActiveLink(activeHref = null) {
    this.navLinks.forEach((link) => {
      link.classList.remove("active")
      if (activeHref && link.getAttribute("href") === activeHref) {
        link.classList.add("active")
      }
    })
  }

  handleOutsideClick(e) {
    if (!this.header.contains(e.target) && this.mobileMenu.classList.contains("active")) {
      this.mobileMenu.classList.remove("active")
      this.animateMobileMenuButton()
    }
  }
}

// 3D Effects Manager
class EffectsManager {
  constructor() {
    this.heroTitle = document.getElementById("heroTitle")
    this.init()
  }

  init() {
    this.bind3DEffects()
    this.bindScrollAnimations()
  }

  bind3DEffects() {
    // 3D mouse movement effect for hero title
    document.addEventListener("mousemove", (e) => {
      if (this.heroTitle) {
        const mouseX = (e.clientX / window.innerWidth - 0.5) * 20
        const mouseY = (e.clientY / window.innerHeight - 0.5) * 20

        this.heroTitle.style.transform = `perspective(1000px) rotateY(${mouseX}deg) rotateX(${-mouseY}deg)`
      }
    })

    // Reset 3D effect when mouse leaves
    document.addEventListener("mouseleave", () => {
      if (this.heroTitle) {
        this.heroTitle.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg)"
      }
    })
  }

  bindScrollAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fadeIn")
        }
      })
    }, observerOptions)

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
      ".feature-card, .stat-item, .sponsor-card, .partner-card, .contact-card, .info-item",
    )

    animateElements.forEach((el) => observer.observe(el))
  }
}

// Form Management
class FormManager {
  constructor() {
    this.contactForm = document.getElementById("contactForm")
    this.emailInput = document.getElementById("emailInput")
    this.init()
  }

  init() {
    this.bindEvents()
  }

  bindEvents() {
    if (this.contactForm) {
      this.contactForm.addEventListener("submit", (e) => this.handleSubmit(e))
    }
  }

  handleSubmit(e) {
    e.preventDefault()

    const email = this.emailInput.value.trim()
    if (email) {
      const subject = encodeURIComponent("Conference Inquiry")
      const body = encodeURIComponent(`Email: ${email}`)
      const mailtoLink = `mailto:cvmuconference.sdstd2025@cvmu.edu.in?subject=${subject}&body=${body}`

      window.open(mailtoLink)
      this.emailInput.value = ""

      // Show success feedback
      this.showFeedback("Email client opened successfully!", "success")
    }
  }

  showFeedback(message, type) {
    const feedback = document.createElement("div")
    feedback.className = `feedback ${type}`
    feedback.textContent = message
    feedback.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 2rem;
            background: ${type === "success" ? "#10b981" : "#ef4444"};
            color: white;
            border-radius: 0.5rem;
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
        `

    document.body.appendChild(feedback)

    setTimeout(() => {
      feedback.style.animation = "slideOut 0.3s ease-in"
      setTimeout(() => feedback.remove(), 300)
    }, 3000)
  }
}

// Utility Functions
class Utils {
  static debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }

  static throttle(func, limit) {
    let inThrottle
    return function () {
      const args = arguments
      
      if (!inThrottle) {
        func.apply(this, args)
        inThrottle = true
        setTimeout(() => (inThrottle = false), limit)
      }
    }
  }

  static isInViewport(element) {
    const rect = element.getBoundingClientRect()
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  }
}

// Performance Optimizations
class PerformanceManager {
  constructor() {
    this.init()
  }

  init() {
    this.optimizeScrollEvents()
    this.lazyLoadImages()
    this.preloadCriticalResources()
  }

  optimizeScrollEvents() {
    // Throttle scroll events for better performance
    const throttledScroll = Utils.throttle(() => {
      // Scroll-dependent operations
      this.updateScrollProgress()
    }, 16) // ~60fps

    window.addEventListener("scroll", throttledScroll, { passive: true })
  }

  updateScrollProgress() {
    const scrolled = window.scrollY
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    const progress = (scrolled / maxScroll) * 100

    // Update any scroll-dependent UI elements
    document.documentElement.style.setProperty("--scroll-progress", `${progress}%`)
  }

  lazyLoadImages() {
    // Implement lazy loading for images if needed
    const images = document.querySelectorAll("img[data-src]")

    if ("IntersectionObserver" in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target
            img.src = img.dataset.src
            img.classList.remove("lazy")
            imageObserver.unobserve(img)
          }
        })
      })

      images.forEach((img) => imageObserver.observe(img))
    }
  }

  preloadCriticalResources() {
    // Preload critical fonts and resources
    const criticalResources = [
      "https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap",
    ]

    criticalResources.forEach((resource) => {
      const link = document.createElement("link")
      link.rel = "preload"
      link.href = resource
      link.as = "style"
      document.head.appendChild(link)
    })
  }
}

// Error Handling
class ErrorHandler {
  constructor() {
    this.init()
  }

  init() {
    window.addEventListener("error", (e) => this.handleError(e))
    window.addEventListener("unhandledrejection", (e) => this.handlePromiseRejection(e))
  }

  handleError(error) {
    console.error("JavaScript Error:", error)
    // Could send to analytics or error reporting service
  }

  handlePromiseRejection(event) {
    console.error("Unhandled Promise Rejection:", event.reason)
    event.preventDefault()
  }
}

// Enhanced Conference Website with Flyer Functionality
class ConferenceApp {
  constructor() {
    this.currentFlyerSize = "medium"
    this.init()
  }

  init() {
    this.bindEvents()
    this.initializeNavigation()
    this.initializeFlyerSystem()
    console.log("🚀 NIIS 2026 Conference Website Initialized!")
  }

  bindEvents() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
    const navigation = document.querySelector(".navigation")

    if (mobileMenuToggle) {
      mobileMenuToggle.addEventListener("click", () => {
        navigation.classList.toggle("active")
        mobileMenuToggle.classList.toggle("active")
      })
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault()
        const target = document.querySelector(anchor.getAttribute("href"))
        if (target) {
          const headerHeight = document.querySelector(".header").offsetHeight
          const targetPosition = target.offsetTop - headerHeight - 20

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          })
        }
      })
    })

    // Header scroll effect
    window.addEventListener("scroll", () => {
      const header = document.querySelector(".header")
      if (window.scrollY > 100) {
        header.classList.add("scrolled")
      } else {
        header.classList.remove("scrolled")
      }
    })

    // Close popup when clicking outside
    document.addEventListener("click", (e) => {
      const flyerPopup = document.getElementById("flyerPopup")
      if (e.target === flyerPopup) {
        this.closeFlyerPopup()
      }
    })

    // Close popup with Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeFlyerPopup()
      }
    })
  }

  initializeNavigation() {
    // Update active navigation link based on scroll position
    const sections = document.querySelectorAll("section[id]")
    const navLinks = document.querySelectorAll(".nav-link")

    window.addEventListener("scroll", () => {
      const scrollPos = window.scrollY + 150

      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.offsetHeight
        const sectionId = section.getAttribute("id")

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          navLinks.forEach((link) => {
            link.classList.remove("active")
            if (link.getAttribute("href") === `#${sectionId}`) {
              link.classList.add("active")
            }
          })
        }
      })
    })
  }

  initializeFlyerSystem() {
    // Make flyer functions globally available
    window.openFlyerPopup = () => this.openFlyerPopup()
    window.closeFlyerPopup = () => this.closeFlyerPopup()
    window.adjustFlyerSize = (size) => this.adjustFlyerSize(size)
    window.downloadFlyer = () => this.downloadFlyer()

    // Set initial flyer size
    this.adjustFlyerSize(this.currentFlyerSize)
  }

  openFlyerPopup() {
    const popup = document.getElementById("flyerPopup")
    popup.classList.add("active")
    document.body.style.overflow = "hidden"

    // Add entrance animation
    setTimeout(() => {
      popup.querySelector(".flyer-popup").style.transform = "scale(1) translateY(0)"
    }, 10)
  }

  closeFlyerPopup() {
    const popup = document.getElementById("flyerPopup")
    const flyerPopup = popup.querySelector(".flyer-popup")

    // Add exit animation
    flyerPopup.style.transform = "scale(0.8) translateY(20px)"

    setTimeout(() => {
      popup.classList.remove("active")
      document.body.style.overflow = "auto"
    }, 300)
  }

  adjustFlyerSize(size) {
    const flyerPopup = document.querySelector(".flyer-popup")
    const sizeButtons = document.querySelectorAll(".size-btn")

    // Remove existing size classes
    flyerPopup.classList.remove("size-small", "size-medium", "size-large")

    // Add new size class
    flyerPopup.classList.add(`size-${size}`)

    // Update current size
    this.currentFlyerSize = size

    // Update button states (visual feedback)
    sizeButtons.forEach((btn, index) => {
      btn.style.background = "rgba(255, 255, 255, 0.95)"
      btn.style.color = "#4b5563"
    })

    // Highlight active size button
    const sizeIndex = ["small", "medium", "large"].indexOf(size)
    if (sizeButtons[sizeIndex]) {
      sizeButtons[sizeIndex].style.background = "rgba(59, 130, 246, 0.9)"
      sizeButtons[sizeIndex].style.color = "white"
    }

    // Show feedback
    this.showNotification(`Flyer size changed to ${size}`, "success")
  }

  downloadFlyer() {
    const flyerImage = document.getElementById("flyerImage")
    const link = document.createElement("a")
    link.href = flyerImage.src
    link.download = "NIIS_2026_Conference_Flyer.jpg"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    this.showNotification("Flyer download started!", "success")
  }

  showNotification(message, type = "info") {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll(".notification")
    existingNotifications.forEach((notification) => notification.remove())

    const notification = document.createElement("div")
    notification.className = `notification notification-${type}`
    notification.textContent = message

    // Styling
    notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            background: ${type === "success" ? "#10b981" : type === "error" ? "#ef4444" : "#3b82f6"};
            color: white;
            border-radius: 8px;
            z-index: 10002;
            font-weight: 500;
            font-size: 14px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `

    document.body.appendChild(notification)

    // Animate in
    setTimeout(() => {
      notification.style.transform = "translateX(0)"
    }, 10)

    // Auto remove after 3 seconds
    setTimeout(() => {
      notification.style.transform = "translateX(100%)"
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove()
        }
      }, 300)
    }, 3000)
  }

  // Utility method for responsive adjustments
  handleResize() {
    const popup = document.querySelector(".flyer-popup")
    if (window.innerWidth <= 768) {
      popup.classList.add("mobile-view")
    } else {
      popup.classList.remove("mobile-view")
    }
  }
}

// Performance optimizations
class PerformanceOptimizer {
  constructor() {
    this.init()
  }

  init() {
    this.optimizeImages()
    this.addIntersectionObserver()
  }

  optimizeImages() {
    // Lazy load images when they come into view
    const images = document.querySelectorAll("img")

    if ("IntersectionObserver" in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target
            if (img.dataset.src) {
              img.src = img.dataset.src
              img.classList.remove("lazy")
              imageObserver.unobserve(img)
            }
          }
        })
      })

      images.forEach((img) => {
        if (img.dataset.src) {
          imageObserver.observe(img)
        }
      })
    }
  }

  addIntersectionObserver() {
    // Animate elements when they come into view
    const animateElements = document.querySelectorAll(
      ".feature-card, .topic-card, .date-card, .contact-card, .stat-item",
    )

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.style.opacity = "1"
              entry.target.style.transform = "translateY(0)"
            }
          })
        },
        {
          threshold: 0.1,
          rootMargin: "0px 0px -50px 0px",
        },
      )

      animateElements.forEach((el) => {
        el.style.opacity = "0"
        el.style.transform = "translateY(20px)"
        el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
        observer.observe(el)
      })
    }
  }
}

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  new ConferenceApp()
  new PerformanceOptimizer()

  // Handle window resize for responsive flyer
  window.addEventListener("resize", () => {
    if (window.conferenceApp) {
      window.conferenceApp.handleResize()
    }
  })
})

// Error handling
window.addEventListener("error", (e) => {
  console.error("Application Error:", e.error)
})

window.addEventListener("unhandledrejection", (e) => {
  console.error("Unhandled Promise Rejection:", e.reason)
  e.preventDefault()
})
