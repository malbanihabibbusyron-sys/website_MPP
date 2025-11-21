// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all functionality
  initializeLoading()
  initializeNavigation()
  initializeMatrixRain() 
  initializeHeroTyping() 
  initializeScrollAnimations()
  initializePortfolioFilter()
  initializeContactForm()
  initializeSmoothScroll()
  initializeAdvancedLightning() 
  initializeGlitchEffect()     
  initializeFlipCard()           
  initializeFooterDataFlow() // NEW: Animasi data flow di footer
})

// Loading Screen
function initializeLoading() {
  const loadingScreen = document.getElementById("loading-screen")

  window.addEventListener("load", () => {
    setTimeout(() => {
      loadingScreen.classList.add("fade-out")
      setTimeout(() => {
        loadingScreen.style.display = "none"
      }, 500)
    }, 1000)
  })
}

// Navigation
function initializeNavigation() {
  const navbar = document.getElementById("navbar")
  const hamburger = document.getElementById("hamburger")
  const navMenu = document.getElementById("nav-menu")
  const navLinks = document.querySelectorAll(".nav-link")

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })

  // Mobile menu toggle
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active")
    navMenu.classList.toggle("active")
  })

  // Close mobile menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active")
      navMenu.classList.remove("active")
    })
  })

  // Active navigation link
  const sections = document.querySelectorAll("section[id]")
  window.addEventListener("scroll", () => {
    let current = ""
    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight
      if (
        pageYOffset >= sectionTop - sectionHeight / 3 &&
        pageYOffset < sectionTop + sectionHeight - sectionHeight / 3
      ) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href").includes(current)) {
        link.classList.add("active")
      }
    })
  })
}

// Matrix Rain Animation
function initializeMatrixRain() {
    const canvas = document.getElementById('matrix-rain-canvas');
    const ctx = canvas.getContext('2d');

    let w, h, columns;
    const characters = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%^&!*+-=~<>{}[]/\\'; 
    let drops = [];

    function resizeCanvas() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
        columns = Math.floor(w / 20); 
        drops = [];
        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'; 
        ctx.fillRect(0, 0, w, h);

        ctx.fillStyle = '#007bff'; 
        ctx.font = '20px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = characters[Math.floor(Math.random() * characters.length)];
            const x = i * 20; 
            const y = drops[i] * 20; 

            ctx.shadowColor = '#007bff';
            ctx.shadowBlur = 5;
            ctx.fillText(text, x, y);
            ctx.shadowBlur = 0; 

            if (y * 20 > h && Math.random() > 0.975) {
                drops[i] = 0;
            }

            drops[i]++;
        }
        
        requestAnimationFrame(draw);
    }

    draw();
}

// Hero Typing Animation
function initializeHeroTyping() {
    const typingTarget = document.getElementById('typing-text-target');
    const cursor = document.querySelector('.typing-cursor');
    const textToType = typingTarget.getAttribute('data-text');

    const subtitle = document.getElementById('hero-subtitle');
    const heroTitleContainer = typingTarget.closest('.hero-title'); 
    const description = document.getElementById('hero-description');
    const ctaButton = document.getElementById('cta-button');
    
    // Pastikan semua hero content awalnya tidak terlihat
    [subtitle, heroTitleContainer, description, ctaButton].forEach(el => {
        if(el) {
            el.classList.remove('visible');
            el.style.opacity = 0; 
        }
    });

    function revealElement(element) {
        if (element) {
             element.classList.add('visible'); 
             element.style.opacity = 1; 
        }
    }

    function typeWriter(text, i, fnCallback) {
        if (i < text.length) {
            // Handle <br> for line break
            if (text.substring(i, i + 4) === '<br>') {
                 typingTarget.innerHTML += '<br>';
                 i += 4; 
            } else {
                typingTarget.innerHTML += text.charAt(i);
                i++;
            }
            setTimeout(() => {
                typeWriter(text, i, fnCallback);
            }, Math.random() * 50 + 50); 
        } else if (typeof fnCallback == 'function') {
            fnCallback();
        }
    }
    
    cursor.classList.add('visible');

    setTimeout(() => {
        revealElement(subtitle);

        setTimeout(() => {
            revealElement(heroTitleContainer); 
            typeWriter(textToType, 0, () => {
                setTimeout(() => {
                    revealElement(description);
                }, 500); 
                
                setTimeout(() => {
                    revealElement(ctaButton);
                    cursor.classList.remove('visible'); 
                }, 1500); 

            });
        }, 800); 

    }, 1000); 
}


// Scroll Animations (Optimized)
function initializeScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1, 
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
        // Stop observing once visible to prevent re-triggering
        observer.unobserve(entry.target); 
      }
    })
  }, observerOptions)

  // Menggabungkan semua elemen .fade-in (termasuk .memory-item, dan block container)
  const fadeElements = document.querySelectorAll(".fade-in")
  
  fadeElements.forEach((element, index) => {
      // Abaikan elemen hero karena diurus oleh initializeHeroTyping
      if (element.closest('#home')) {
          element.style.opacity = 0; 
          element.style.transform = 'none'; 
          return; 
      }

      // Berikan transisi delay khusus untuk elemen memory agar muncul berurutan
      if (element.classList.contains('memory-item')) {
          const memoryIndex = Array.from(document.querySelectorAll('.memory-item')).indexOf(element);
          element.style.transitionDelay = `${memoryIndex * 0.1}s`; 
      } 
      
      // Berikan sedikit delay acak untuk elemen lain
      else {
          // Hanya tambahkan delay untuk elemen yang belum memiliki style="transition-delay"
          if (!element.style.transitionDelay) {
              const generalDelay = Math.random() * 0.3; // Hingga 0.3s
              element.style.transitionDelay = `${generalDelay}s`;
          }
      }
      
      observer.observe(element)
  })
}

// Portfolio Filter
function initializePortfolioFilter() {
  const filterBtns = document.querySelectorAll(".filter-btn")
  const portfolioItems = document.querySelectorAll(".portfolio-item")
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"))
      btn.classList.add("active")
      const filterValue = btn.getAttribute("data-filter")
      portfolioItems.forEach((item) => {
        item.style.display = "none"
        if (filterValue === "all") {
          item.style.display = "block"
        } else if (item.classList.contains("portfolio-item-" + filterValue)) {
          item.style.display = "block"
        }
      })
    })
  })
}

// Contact Form
function initializeContactForm() {
  const form = document.querySelector(".contact-form")
  form.addEventListener("submit", (e) => {
    e.preventDefault()
    alert("Pesan Terkirim! (Aksi submit sesungguhnya perlu backend server.)")
    form.reset()
  })
}

// Smooth Scroll 
function initializeSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      // Allow default smooth scroll from CSS
    })
  })
}

// ADVANCED LIGHTNING GENERATOR (Diperkuat)
function initializeAdvancedLightning() {
    const container = document.getElementById('lightning-container');
    const lightningSound = document.getElementById('lightning-sound');
    if (!container) return;

    // Fungsi untuk membuat satu sambaran petir
    function createLightningBolt(startX, startY) {
        const segments = [];
        let currentX = startX;
        let currentY = startY;
        const maxSegments = Math.floor(Math.random() * 20) + 10; // Lebih banyak segmen
        const segmentLength = Math.random() * 20 + 20; // Lebih panjang

        for (let i = 0; i < maxSegments; i++) {
            let nextX = currentX + (Math.random() - 0.5) * 60; // Deviasi lebih besar
            let nextY = currentY + segmentLength;

            nextX = Math.max(0, Math.min(window.innerWidth, nextX));

            segments.push({ x1: currentX, y1: currentY, x2: nextX, y2: nextY });

            currentX = nextX;
            currentY = nextY;

            if (currentY > window.innerHeight) break;
        }

        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute('class', 'lightning-bolt');
        svg.setAttribute('viewBox', `0 0 ${window.innerWidth} ${window.innerHeight}`);
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        svg.setAttribute('preserveAspectRatio', 'none');
        svg.style.position = 'absolute';
        svg.style.top = '0';
        svg.style.left = '0';

        const polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
        let points = segments.map(s => `${s.x1},${s.y1}`).join(' ') + ` ${segments[segments.length - 1].x2},${segments[segments.length - 1].y2}`;
        polyline.setAttribute('points', points);
        polyline.setAttribute('stroke', '#70D6FF');
        polyline.setAttribute('stroke-width', '4'); // Petir lebih tebal
        polyline.setAttribute('fill', 'none');
        polyline.setAttribute('filter', 'url(#lightning-glow)'); 
        
        // Buat definisi filter glow SVG
        const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
        const filter = document.createElementNS("http://www.w3.org/2000/svg", "filter");
        filter.setAttribute('id', 'lightning-glow');
        const feGaussianBlur = document.createElementNS("http://www.w3.org/2000/svg", "feGaussianBlur");
        feGaussianBlur.setAttribute('in', 'SourceGraphic');
        feGaussianBlur.setAttribute('stdDeviation', '6'); // Glow lebih besar
        feGaussianBlur.setAttribute('result', 'blur');
        const feFlood = document.createElementNS("http://www.w3.org/2000/svg", "feFlood");
        feFlood.setAttribute('flood-color', '#70D6FF');
        feFlood.setAttribute('result', 'color');
        const feComposite = document.createElementNS("http://www.w3.org/2000/svg", "feComposite");
        feComposite.setAttribute('in', 'color');
        feComposite.setAttribute('in2', 'blur');
        feComposite.setAttribute('operator', 'in');
        feComposite.setAttribute('result', 'glow');
        const feMerge = document.createElementNS("http://www.w3.org/2000/svg", "feMerge");
        const feMergeNode1 = document.createElementNS("http://www.w3.org/2000/svg", "feMergeNode");
        feMergeNode1.setAttribute('in', 'glow');
        const feMergeNode2 = document.createElementNS("http://www.w3.org/2000/svg", "feMergeNode");
        feMergeNode2.setAttribute('in', 'SourceGraphic');
        
        feMerge.appendChild(feMergeNode1);
        feMerge.appendChild(feMergeNode2);
        filter.appendChild(feGaussianBlur);
        filter.appendChild(feFlood);
        filter.appendChild(feComposite);
        filter.appendChild(feMerge);
        defs.appendChild(filter);
        svg.appendChild(defs);

        svg.appendChild(polyline);
        container.appendChild(svg);

        // Animasi flash background yang lebih kuat
        document.body.classList.add('lightning-flash-strong');

        // Hapus petir setelah animasi
        setTimeout(() => {
            svg.remove();
            document.body.classList.remove('lightning-flash-strong');
        }, 150); 
    }

    function triggerLightning() {
        const startX = Math.random() * window.innerWidth;
        const startY = 0; 
        
        // Main petir
        createLightningBolt(startX, startY);

        // Petir kedua (anak petir) di dekat petir utama - lebih sering
        if (Math.random() > 0.1) { 
            setTimeout(() => {
                createLightningBolt(startX + (Math.random() - 0.5) * 80, startY);
            }, 30);
        }

        // Putar suara (jika ada)
        if (lightningSound) {
            lightningSound.currentTime = 0;
            lightningSound.play().catch(e => console.log('Audio playback blocked:', e));
        }
    }

    // Picu petir setiap 2-5 detik (JAUH LEBIH SERING)
    setInterval(() => {
        if (Math.random() > 0.05) { // 95% kemungkinan menyambar
             triggerLightning();
        }
    }, Math.random() * 3000 + 2000); // 2 sampai 5 detik
}


// GLITCH EFFECT INITIATOR
function initializeGlitchEffect() {
    const glitchElements = document.querySelectorAll('.glitch-effect');
    if (glitchElements.length === 0) return;

    // Aktifkan glitch secara acak untuk judul
    glitchElements.forEach(el => {
        // Glitch saat mouse hover
        el.addEventListener('mouseover', () => {
            el.classList.add('active');
        });
        el.addEventListener('mouseout', () => {
            // Beri jeda agar terlihat seperti error yang 'sembuh'
            setTimeout(() => {
                el.classList.remove('active');
            }, 300); 
        });

        // Glitch otomatis saat masuk tampilan (initial effect)
        new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Hanya glitch saat muncul
                    el.classList.add('active');
                    setTimeout(() => {
                        el.classList.remove('active');
                    }, 500); 
                    // Stop observing once glitch is shown
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.5 }).observe(el);

    });
}


// FLIP CARD INTERACTIVITY (Click Only)
function initializeFlipCard() {
    const flipCards = document.querySelectorAll('.memory-item.flip-card');

    flipCards.forEach(card => {
        // Pastikan hanya terjadi saat di-klik
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });
}

// NEW FUNCTION: FOOTER DATA FLOW
function initializeFooterDataFlow() {
    const footer = document.querySelector('.footer');
    if (!footer) return;

    const dataIcons = [
        '<i class="fas fa-microchip"></i>', // Microchip/Processor
        '<i class="fas fa-database"></i>', // Database
        '<i class="fas fa-terminal"></i>', // Terminal/Code
        '<i class="fas fa-cloud"></i>', // Cloud
        '<i class="fas fa-wifi"></i>' // Wifi
    ];

    function createFloatingIcon() {
        const icon = document.createElement('div');
        icon.innerHTML = dataIcons[Math.floor(Math.random() * dataIcons.length)];
        icon.style.position = 'absolute';
        icon.style.left = `-${Math.random() * 50 + 50}px`; // Mulai dari luar kiri
        icon.style.bottom = `${Math.random() * 100}%`;
        icon.style.fontSize = `${Math.random() * 0.8 + 0.8}rem`; // Ukuran 0.8rem - 1.6rem
        icon.style.color = Math.random() > 0.5 ? '#70D6FF' : '#007bff';
        icon.style.opacity = Math.random() * 0.4 + 0.2; // Opacity 0.2 - 0.6
        icon.style.transition = 'none'; // Transisi diatur di sini
        icon.style.pointerEvents = 'none';

        footer.appendChild(icon);

        // Animasi ikon bergerak ke kanan
        const duration = Math.random() * 8 + 10; // Durasi 10s - 18s

        // Menggunakan CSS Animation untuk performa yang lebih baik
        icon.style.animation = `floatRight ${duration}s linear infinite`;

        // Aturan keyframes baru (dibuat via JS untuk memastikan unik per ikon)
        const styleSheet = document.styleSheets[0];
        const keyframesName = `floatRight`;
        
        let keyframesExists = false;
        try {
             // Cek apakah keyframes sudah ada
            for(let i = 0; i < styleSheet.cssRules.length; i++) {
                if(styleSheet.cssRules[i].name === keyframesName) {
                    keyframesExists = true;
                    break;
                }
            }
        } catch(e) { /* Error access stylesheet rules */ }

        if (!keyframesExists) {
            const rule = `@keyframes ${keyframesName} {
                0% { transform: translateX(0) rotate(0deg); opacity: 0.2;}
                50% { opacity: 0.6; }
                100% { transform: translateX(${window.innerWidth + 200}px) rotate(360deg); opacity: 0.2; }
            }`;
            styleSheet.insertRule(rule, styleSheet.cssRules.length);
        }

        // Hapus setelah selesai (optional, tapi lebih bersih)
        // setTimeout(() => icon.remove(), duration * 1000); 
    }

    // Buat beberapa ikon secara berkala
    for(let i = 0; i < 15; i++) {
        setTimeout(createFloatingIcon, Math.random() * 3000); // Munculkan secara acak dalam 3 detik pertama
    }

    // Terus buat ikon baru setiap 5 detik untuk menjaga alur
    // setInterval(() => createFloatingIcon(), 5000);
}


// THROTTLING FOR PERFORMANCE
function throttle(func, wait) {
  let timeout
  let lastArgs = null
  let lastThis = null

  return function executedFunction(...args) {
    lastArgs = args
    lastThis = this

    const later = () => {
      timeout = null
      if (lastArgs) {
        func.apply(lastThis, lastArgs)
        lastArgs = null
        lastThis = null
      }
    }

    if (!timeout) {
      timeout = setTimeout(later, wait)
    }
  }
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
  // Scroll-dependent functions can be called here 
}, 16) 

window.addEventListener("scroll", throttledScrollHandler)

// Keyboard navigation support 
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const hamburger = document.getElementById("hamburger")
    const navMenu = document.getElementById("nav-menu")

    if (navMenu && navMenu.classList.contains("active")) {
      hamburger.classList.remove("active")
      navMenu.classList.remove("active")
    }
  }
})

// Focus management for accessibility
document.addEventListener("DOMContentLoaded", () => {
  const focusableElements = document.querySelectorAll(
    'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])',
  )

  focusableElements.forEach((element) => {
    element.addEventListener("focus", function () {
      this.style.outline = "2px solid #007BFF"
      this.style.outlineOffset = "2px"
    })
    element.addEventListener("blur", function () {
      this.style.outline = "none"
      this.style.outlineOffset = "0px"
    })
  })
})