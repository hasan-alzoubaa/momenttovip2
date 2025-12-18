// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const menuLinks = document.querySelectorAll('.menu-link');
  const header = document.querySelector('.header');

  // Toggle mobile menu
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
      mobileMenuToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }

  // Close menu when clicking on a link
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenuToggle) {
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  });

  // Active menu item on scroll with throttling for performance
  const sections = document.querySelectorAll('section[id]');
  let ticking = false;
  
  function updateOnScroll() {
    const scrollY = window.pageYOffset;
    
    // Header scroll effect
    if (scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Active menu item
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 150;
      const sectionId = section.getAttribute('id');
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        menuLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
    
    ticking = false;
  }
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateOnScroll);
      ticking = true;
    }
  });

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all items
      faqItems.forEach(faqItem => {
        faqItem.classList.remove('active');
      });
      
      // Open clicked item if it wasn't active
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Add scroll animation with performance optimization
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        // Unobserve after animation to improve performance
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all cards
  document.querySelectorAll('.service-card, .feature-card, .pricing-card, .coverage-card, .testimonial-card, .detailed-category').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });

  // Additional scroll effects (header already handled above)

  // Track button clicks (for analytics)
  document.querySelectorAll('a[href^="tel:"], a[href^="https://wa.me"]').forEach(link => {
    link.addEventListener('click', function() {
      const type = this.href.includes('tel:') ? 'phone' : 'whatsapp';
      console.log(`Contact button clicked: ${type}`);
      // Here you can add Google Analytics tracking
      // gtag('event', 'contact_click', { method: type });
    });
  });

  // Logo click - scroll to top
  const logo = document.querySelector('.logo');
  if (logo) {
    logo.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      // Close mobile menu if open
      if (mobileMenuToggle && navMenu.classList.contains('active')) {
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  }

  // Create animated floating tools in hero
  createFloatingTools();
});

// Create floating animated tools (disabled on mobile for performance)
function createFloatingTools() {
  // Skip on mobile devices for better performance
  if (window.innerWidth < 768) return;
  
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const toolsContainer = document.createElement('div');
  toolsContainer.className = 'floating-tools-container';
  toolsContainer.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    z-index: 1;
    overflow: hidden;
  `;

  // Reduced number of tools for better performance
  const tools = [
    { icon: '🔧', size: 40, duration: 25, delay: 0 },
    { icon: '⚙️', size: 35, duration: 30, delay: 5 },
    { icon: '🛠️', size: 38, duration: 32, delay: 3 },
    { icon: '⚡', size: 32, duration: 26, delay: 8 }
  ];

  tools.forEach((tool, index) => {
    const toolElement = document.createElement('div');
    toolElement.className = 'floating-tool';
    toolElement.textContent = tool.icon;
    
    const startX = Math.random() * 100;
    const startY = Math.random() * 100;
    
    toolElement.style.cssText = `
      position: absolute;
      font-size: ${tool.size}px;
      opacity: 0.15;
      left: ${startX}%;
      top: ${startY}%;
      animation: float-tool-${index} ${tool.duration}s ease-in-out infinite;
      animation-delay: ${tool.delay}s;
      filter: blur(0.5px);
      will-change: transform;
    `;

    // Create unique animation for each tool
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      @keyframes float-tool-${index} {
        0%, 100% {
          transform: translate(0, 0) rotate(0deg);
          opacity: 0.1;
        }
        25% {
          transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(90deg);
          opacity: 0.2;
        }
        50% {
          transform: translate(${Math.random() * 150 - 75}px, ${Math.random() * 150 - 75}px) rotate(180deg);
          opacity: 0.15;
        }
        75% {
          transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(270deg);
          opacity: 0.2;
        }
      }
    `;
    document.head.appendChild(styleSheet);
    
    toolsContainer.appendChild(toolElement);
  });

  hero.insertBefore(toolsContainer, hero.firstChild);
}
