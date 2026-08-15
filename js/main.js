document.addEventListener("DOMContentLoaded", () => {
  /* ---------------------------------------------------------
     Theme Toggle (Light / Dark Mode with LocalStorage)
     --------------------------------------------------------- */
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  const themeLabel = document.getElementById("themeLabel");

  // Check user preference or saved localStorage
  const savedTheme = localStorage.getItem("portfolio-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = savedTheme || (prefersDark ? "dark" : "light");

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("portfolio-theme", theme);

    if (themeIcon && themeLabel) {
      if (theme === "dark") {
        themeIcon.className = "bi bi-sun-fill";
        themeLabel.textContent = "Light Mode";
      } else {
        themeIcon.className = "bi bi-moon-stars-fill";
        themeLabel.textContent = "Dark Mode";
      }
    }
  }

  applyTheme(initialTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const currentTheme =
        document.documentElement.getAttribute("data-theme") || "light";
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      applyTheme(newTheme);
    });
  }

  /* ---------------------------------------------------------
     Back to Top Button (Smooth Scroll & Visibility Detector)
     --------------------------------------------------------- */
  const backToTopBtn = document.getElementById("backToTopBtn");

  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add("show");
      } else {
        backToTopBtn.classList.remove("show");
      }
    });

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  const mobileToggle = document.getElementById("mobileToggle");
  const sidebarCloseBtn = document.getElementById("sidebarCloseBtn");
  const sidebar = document.getElementById("sidebar");
  const navLinks = document.querySelectorAll(".nav-menu .nav-link");

  function closeSidebar() {
    if (sidebar && sidebar.classList.contains("active")) {
      sidebar.classList.remove("active");
    }
  }

  if (mobileToggle && sidebar) {
    mobileToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      sidebar.classList.add("active");
    });
  }

  if (sidebarCloseBtn) {
    sidebarCloseBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      closeSidebar();
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");

      if (targetId && targetId.startsWith("#")) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault(); // Stop native jump that triggers horizontal shifts

          if (window.innerWidth <= 991) {
            closeSidebar();
          }

          // Smoothly scroll only on the vertical axis
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });

          // Keep active state styling in sync
          navLinks.forEach((l) => l.classList.remove("active"));
          link.classList.add("active");
        }
      }
    });
  });

  document.addEventListener("click", (e) => {
    if (
      window.innerWidth <= 991 &&
      sidebar &&
      sidebar.classList.contains("active")
    ) {
      if (!sidebar.contains(e.target) && !mobileToggle.contains(e.target)) {
        closeSidebar();
      }
    }
  });

  const sections = document.querySelectorAll("section");
  window.addEventListener("scroll", () => {
    let currentId = "";
    sections.forEach((section) => {
      const top = section.offsetTop - 150;
      if (window.pageYOffset >= top) {
        currentId = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentId}`) {
        link.classList.add("active");
      }
    });
  });

  if (document.getElementById("typed-text")) {
    new Typed("#typed-text", {
      strings: [
        "Clean & Modern Interfaces",
        "MERN Stack Applications",
        "Django Web Applications",
        "Java Full-stack Applications",
      ],
      typeSpeed: 55,
      backSpeed: 35,
      backDelay: 1800,
      loop: true,
    });
  }

  const canvas = document.getElementById("canvas3d");
  if (canvas) {
    const scene = new THREE.Scene();

    // Helper: reads actual CSS bounding size of the canvas element
    function getCanvasSize() {
      const isDesktop = window.innerWidth > 991;
      const width = isDesktop ? window.innerWidth - 300 : window.innerWidth;
      const height = window.innerHeight;
      return { width, height };
    }

    const { width: w, height: h } = getCanvasSize();

    // Setup Camera & WebGL Renderer
    const camera = new THREE.PerspectiveCamera(70, w / h, 0.1, 1000);
    camera.position.set(0, 0, 24); // Looking straight at origin (0, 0, 0)

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(w, h, false); // false avoids overriding CSS percentage dimensions
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 3D Geometry: Torus Knot placed at exact (0, 0, 0)
    const geometry = new THREE.TorusKnotGeometry(8.5, 2.2, 120, 16);
    const material = new THREE.MeshStandardMaterial({
      color: 0xc87d55, // Warm Terracotta
      wireframe: true,
      transparent: true,
      opacity: 0.9,
      roughness: 0.4,
      metalness: 0.1,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, 0); // Exact center between sidebar and right edge
    scene.add(mesh);

    // Warm Lighting
    const ambientLight = new THREE.AmbientLight(0xf0ece1, 2.0);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.0);
    dirLight.position.set(20, 30, 20);
    scene.add(dirLight);

    // Animation Loop
    function animate() {
      requestAnimationFrame(animate);
      mesh.rotation.x += 0.0025;
      mesh.rotation.y += 0.0035;
      renderer.render(scene, camera);
    }
    animate();

    // Handle Window Resize Dynamically
    window.addEventListener("resize", () => {
      const { width: newW, height: newH } = getCanvasSize();
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH, false);
    });
  }

  if (typeof VanillaTilt !== "undefined") {
    VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
      max: 18,
      speed: 400,
      glare: true,
      "max-glare": 0.15,
      scale: 1.03,
    });
  }

  const cylinder = document.getElementById("helixCylinder");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const viewport = document.getElementById("helixViewport");

  if (cylinder && prevBtn && nextBtn && viewport) {
    let currentAngle = 0;
    const angleStep = 60; // 360 / 6 cards
    let autoPlayTimer = null;
    const autoPlayInterval = 2000;

    // Apply rotation only (never inject scale() in JS transforms)
    function rotateCylinder(deg) {
      currentAngle += deg;
      cylinder.style.transform = `rotateY(${currentAngle}deg)`;
    }

    // Auto-Play
    function startAutoPlay() {
      if (!autoPlayTimer) {
        autoPlayTimer = setInterval(() => {
          rotateCylinder(-angleStep);
        }, autoPlayInterval);
      }
    }

    function stopAutoPlay() {
      if (autoPlayTimer) {
        clearInterval(autoPlayTimer);
        autoPlayTimer = null;
      }
    }

    startAutoPlay();

    // Pause on Hover
    viewport.addEventListener("mouseenter", stopAutoPlay);
    viewport.addEventListener("mouseleave", startAutoPlay);
    prevBtn.addEventListener("mouseenter", stopAutoPlay);
    prevBtn.addEventListener("mouseleave", startAutoPlay);
    nextBtn.addEventListener("mouseenter", stopAutoPlay);
    nextBtn.addEventListener("mouseleave", startAutoPlay);

    // Button Clicks
    prevBtn.addEventListener("click", () => {
      stopAutoPlay();
      rotateCylinder(angleStep);
      startAutoPlay();
    });

    nextBtn.addEventListener("click", () => {
      stopAutoPlay();
      rotateCylinder(-angleStep);
      startAutoPlay();
    });

    // Touch & Drag Support
    let isDragging = false;
    let startX = 0;

    viewport.addEventListener("mousedown", (e) => {
      stopAutoPlay();
      isDragging = true;
      startX = e.clientX;
    });

    window.addEventListener("mouseup", () => {
      if (isDragging) {
        isDragging = false;
        startAutoPlay();
      }
    });

    viewport.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - startX;
      if (Math.abs(deltaX) > 40) {
        rotateCylinder(deltaX > 0 ? angleStep : -angleStep);
        startX = e.clientX;
      }
    });

    viewport.addEventListener(
      "touchstart",
      (e) => {
        stopAutoPlay();
        startX = e.touches[0].clientX;
      },
      { passive: true },
    );

    viewport.addEventListener("touchend", (e) => {
      const endX = e.changedTouches[0].clientX;
      const deltaX = endX - startX;
      if (Math.abs(deltaX) > 40) {
        rotateCylinder(deltaX > 0 ? angleStep : -angleStep);
      }
      startAutoPlay();
    });

    // Clean resize: re-apply rotation without raster downscaling
    window.addEventListener("resize", () => {
      cylinder.style.transform = `rotateY(${currentAngle}deg)`;
    });
  }

  /* Pause auto-rotation when any modal opens, resume when closed */
  document.querySelectorAll(".modal").forEach((modal) => {
    modal.addEventListener("show.bs.modal", () => {
      if (typeof stopAutoPlay === "function") stopAutoPlay();
    });
    modal.addEventListener("hidden.bs.modal", () => {
      if (typeof startAutoPlay === "function") startAutoPlay();
    });
  });

  const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbyrWd0jZBWjjjS7_qhAjZft4lQzYfUJT-UGY-iQMqGWlpaPnkkNSPgyCnMu_xfnAm4RaQ/exec";
  const contactForm = document.getElementById("contactForm");
  const formAlert = document.getElementById("formAlert");
  const submitBtn = document.getElementById("submitBtn");

  if (contactForm && formAlert && submitBtn) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Show loading indicator on button
      const originalBtnHtml = submitBtn.innerHTML;
      submitBtn.innerHTML = `<span>Saving...</span> <div class="spinner-border spinner-border-sm text-light ms-1" role="status"></div>`;
      submitBtn.disabled = true;

      const formData = new FormData(contactForm);

      fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: formData,
        mode: "no-cors", // Allows cross-origin posting to Google Script without CORS errors
      })
        .then(() => {
          // Success state
          formAlert.className = "alert alert-warm mb-4";
          formAlert.innerHTML =
            '<i class="bi bi-check-circle-fill me-2"></i><span>Thank you! Your message has been saved successfully.</span>';
          formAlert.classList.remove("d-none");
          contactForm.reset();
        })
        .catch(() => {
          // Error state
          formAlert.className = "alert alert-danger mb-4";
          formAlert.innerHTML =
            '<i class="bi bi-exclamation-triangle-fill me-2"></i><span>Failed to send. Please check your connection and try again.</span>';
          formAlert.classList.remove("d-none");
        })
        .finally(() => {
          submitBtn.innerHTML = originalBtnHtml;
          submitBtn.disabled = false;

          // Auto-dismiss notification after 5 seconds
          setTimeout(() => {
            formAlert.classList.add("d-none");
          }, 5000);
        });
    });
  }

  /* ---------------------------------------------------------
     Subtle Scroll Reveal Observer
     --------------------------------------------------------- */
  const animatedElements = document.querySelectorAll(
    ".line-mask, .reveal, .card-warm, #contactForm, .helix-viewport",
  );

  const scrollObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // Trigger once smoothly
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  animatedElements.forEach((el, index) => {
    // Add reveal class if it's not already a line-mask
    if (!el.classList.contains("line-mask")) {
      el.classList.add("reveal");
    }

    // Auto-stagger sibling cards in grids
    const parentRow = el.closest(".row");
    if (parentRow) {
      const siblings = Array.from(parentRow.querySelectorAll(".card-warm"));
      const siblingIndex = siblings.indexOf(el);
      if (siblingIndex > 0) {
        el.classList.add(`stagger-${Math.min(siblingIndex, 4)}`);
      }
    }

    scrollObserver.observe(el);
  });
});
