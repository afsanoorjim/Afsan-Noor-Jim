document.addEventListener("DOMContentLoaded", () => {
  AOS.init({ duration: 800, once: true, easing: "ease-out-cubic" });

  const savedTheme = localStorage.getItem("theme") || "dark";
  document.body.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);

  document.querySelector(".theme-toggle")?.addEventListener("click", () => {
    const currentTheme = document.body.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.body.setAttribute("data-theme", currentTheme);
    localStorage.setItem("theme", currentTheme);
    updateThemeIcon(currentTheme);
  });

  const navbar = document.querySelector(".navbar");
  const progressBar = document.querySelector(".scroll-progress");
  const backToTop = document.getElementById("backToTop");

  const onScroll = () => {
    const scrollTop = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const progress = height > 0 ? (scrollTop / height) * 100 : 0;
    progressBar.style.width = `${progress}%`;
    navbar.classList.toggle("shrink", scrollTop > 50);
    backToTop.style.display = scrollTop > 600 ? "flex" : "none";
  };

  window.addEventListener("scroll", onScroll);
  onScroll();

  backToTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".navbar .nav-link");

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
          });
        }
      });
    },
    { threshold: 0.45 }
  );

  sections.forEach((section) => sectionObserver.observe(section));

  new Typed("#typed", {
    strings: ["AI Engineer", "Full Stack Developer", "ML Enthusiast", "Freelancer"],
    typeSpeed: 70,
    backSpeed: 50,
    loop: true,
  });

  particlesJS("particles-js", {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: ["#4f46e5", "#06b6d4", "#7c3aed"] },
      shape: { type: "circle" },
      opacity: { value: 0.45, random: true },
      size: { value: 3, random: true },
      line_linked: { enable: true, distance: 120, color: "#94a3b8", opacity: 0.25, width: 1 },
      move: { enable: true, speed: 1.8, direction: "none", random: false, straight: false, out_mode: "out", bounce: false }
    },
    interactivity: {
      detect_on: "canvas",
      events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: true, mode: "push" }, resize: true },
      modes: { grab: { distance: 140, line_linked: { opacity: 0.4 } }, push: { particles_nb: 4 } }
    },
    retina_detect: true
  });

  const progressBars = document.querySelectorAll(".progress-bar");
  const barObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.width = entry.target.style.width || entry.target.getAttribute("style").split("width:")[1];
        }
      });
    },
    { threshold: 0.6 }
  );
  progressBars.forEach((bar) => barObserver.observe(bar));

  const counters = document.querySelectorAll("[data-count]");
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = Number(el.getAttribute("data-count"));
          const suffix = el.getAttribute("data-suffix") || "";
          let start = 0;
          const duration = 1200;
          const startTime = performance.now();

          const tick = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const current = Math.floor(progress * target);
            el.textContent = `${current}${suffix}`;
            if (progress < 1) requestAnimationFrame(tick);
          };

          requestAnimationFrame(tick);
          counterObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.7 }
  );

  counters.forEach((counter) => counterObserver.observe(counter));

  const filterButtons = document.querySelectorAll(".filter-btn");
  const projects = document.querySelectorAll(".project-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      const filter = button.getAttribute("data-filter");

      projects.forEach((project) => {
        const categories = project.getAttribute("data-category") || "";
        const matches = filter === "all" || categories.includes(filter);
        project.classList.toggle("is-hidden", !matches);
      });
    });
  });

  const form = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");
  const publicKey = form?.getAttribute("data-public-key")?.trim();

  if (form && publicKey && !publicKey.includes("YOUR_")) {
    emailjs.init(publicKey);
  }

  form?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();
    const submitButton = form.querySelector("button[type='submit']");
    const originalButtonText = submitButton?.innerHTML || "";

    if (!name || !email || !subject || !message) {
      formMessage.textContent = "Please complete all fields before sending.";
      formMessage.className = "mt-3 text-danger";
      return;
    }

    const serviceId = form.getAttribute("data-service-id")?.trim();
    const templateId = form.getAttribute("data-template-id")?.trim();

    if (!serviceId || !templateId || serviceId.includes("YOUR_") || templateId.includes("YOUR_")) {
      formMessage.textContent = "EmailJS is not configured yet. Add your service ID and template ID to the form.";
      formMessage.className = "mt-3 text-warning";
      return;
    }

    if (typeof window.emailjs === "undefined") {
      formMessage.textContent = "EmailJS failed to load. Please refresh the page and try again.";
      formMessage.className = "mt-3 text-danger";
      return;
    }

    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';

    try {
      await emailjs.sendForm(serviceId, templateId, form, publicKey);
      form.reset();
      formMessage.textContent = "Thanks! Your message has been sent successfully.";
      formMessage.className = "mt-3 text-success";
    } catch (error) {
      console.error("EmailJS submission failed:", error);
      formMessage.textContent = "Sorry, your message could not be sent right now. Please try again later.";
      formMessage.className = "mt-3 text-danger";
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = originalButtonText;
    }
  });

  const glow = document.querySelector(".cursor-glow");
  document.addEventListener("mousemove", (event) => {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
  });
});

function updateThemeIcon(theme) {
  const icon = document.querySelector(".theme-toggle i");
  if (!icon) return;
  icon.className = theme === "dark" ? "fas fa-moon" : "fas fa-sun";
}
