/* =============================================
   MAIN.JS — Vanilla JS for portfolio interactions
   ============================================= */

document.addEventListener("DOMContentLoaded", () => {
    // ----- Theme Toggle -----
    const themeToggleBtns = document.querySelectorAll(".theme-toggle");
    const html = document.documentElement;

    const updateToggleIcons = (theme) => {
        themeToggleBtns.forEach((btn) => {
            const sunIcon = btn.querySelector(".icon-sun");
            const moonIcon = btn.querySelector(".icon-moon");
            if (sunIcon && moonIcon) {
                sunIcon.style.display = theme === "light" ? "none" : "block";
                moonIcon.style.display = theme === "light" ? "block" : "none";
            }
        });
    };

    // Apply saved theme
    const savedTheme = localStorage.getItem("theme") || "dark";
    if (savedTheme === "light") {
        html.setAttribute("data-theme", "light");
    }
    updateToggleIcons(savedTheme);

    themeToggleBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const current = html.getAttribute("data-theme");
            const next = current === "light" ? "dark" : "light";
            if (next === "light") {
                html.setAttribute("data-theme", "light");
            } else {
                html.removeAttribute("data-theme");
            }
            localStorage.setItem("theme", next);
            updateToggleIcons(next);
        });
    });


    // ----- Mobile Menu Toggle -----
    const menuBtn = document.getElementById("menu-toggle");
    const mobileNav = document.getElementById("mobile-nav");
    const menuIcon = document.getElementById("menu-icon");
    const closeIcon = document.getElementById("close-icon");

    if (menuBtn && mobileNav) {
        menuBtn.addEventListener("click", () => {
            const isOpen = mobileNav.classList.toggle("active");
            menuIcon.style.display = isOpen ? "none" : "block";
            closeIcon.style.display = isOpen ? "block" : "none";
        });

        // Close mobile nav when a link is clicked
        mobileNav.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                mobileNav.classList.remove("active");
                menuIcon.style.display = "block";
                closeIcon.style.display = "none";
            });
        });
    }

    // ----- Smooth Scroll for Anchor Links -----
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", (e) => {
            const targetId = anchor.getAttribute("href");
            if (targetId === "#") return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    });

    // ----- Scroll-triggered Fade-in Animations -----
    const fadeElements = document.querySelectorAll(".fade-in-section");

    if (fadeElements.length > 0) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
        );

        fadeElements.forEach((el) => observer.observe(el));
    }

    // ----- Active Nav Highlighting -----
    const navLinks = document.querySelectorAll("nav a[href^='#']");
    const sections = document.querySelectorAll("section[id]");

    if (sections.length > 0 && navLinks.length > 0) {
        const highlightNav = () => {
            const scrollY = window.scrollY + 100;

            sections.forEach((section) => {
                const top = section.offsetTop;
                const height = section.offsetHeight;
                const id = section.getAttribute("id");

                if (scrollY >= top && scrollY < top + height) {
                    navLinks.forEach((link) => {
                        link.classList.remove("text-foreground");
                        if (link.getAttribute("href") === `#${id}`) {
                            link.classList.add("text-foreground");
                        }
                    });
                }
            });
        };

        window.addEventListener("scroll", highlightNav, { passive: true });
    }

    // ----- Contact Form Handling -----
    const contactForm = document.getElementById("contact-form");

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            // Basic validation
            if (!data.name || !data.email || !data.message) {
                alert("Please fill in all required fields.");
                return;
            }

            // Show success feedback
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = "Message Sent ✓";
            submitBtn.disabled = true;
            submitBtn.style.opacity = "0.7";

            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.opacity = "1";
                contactForm.reset();
            }, 3000);
        });
    }

    // ----- Scroll-down Arrow Bounce -----
    const scrollArrow = document.getElementById("scroll-arrow");
    if (scrollArrow) {
        let direction = 1;
        let pos = 0;
        const animate = () => {
            pos += 0.15 * direction;
            if (pos > 4 || pos < 0) direction *= -1;
            scrollArrow.style.transform = `translateY(${pos}px)`;
            requestAnimationFrame(animate);
        };
        animate();
    }
    // ----- Lightbox Gallery -----
    const galleryItems = document.querySelectorAll('.gallery-item img, .project-gallery img');
    if (galleryItems.length > 0) {
        // Create lightbox elements
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox-overlay';
        lightbox.innerHTML = `
            <div class="lightbox-close">&times;</div>
            <img class="lightbox-img" src="" alt="Gallery Preview">
        `;
        document.body.appendChild(lightbox);

        // Add minimal inline styles for the lightbox
        Object.assign(lightbox.style, {
            display: 'none',
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            zIndex: 9999,
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'zoom-out',
            opacity: 0,
            transition: 'opacity 0.3s ease'
        });

        const lightboxImg = lightbox.querySelector('.lightbox-img');
        Object.assign(lightboxImg.style, {
            maxWidth: '90%',
            maxHeight: '90vh',
            objectFit: 'contain',
            borderRadius: '8px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
        });

        const closeBtn = lightbox.querySelector('.lightbox-close');
        Object.assign(closeBtn.style, {
            position: 'absolute',
            top: '20px',
            right: '30px',
            color: 'white',
            fontSize: '40px',
            fontWeight: 'bold',
            cursor: 'pointer'
        });

        // Add click events to gallery images
        galleryItems.forEach(img => {
            img.style.cursor = 'zoom-in';
            img.addEventListener('click', (e) => {
                e.preventDefault();
                lightboxImg.src = img.src;
                lightbox.style.display = 'flex';
                setTimeout(() => lightbox.style.opacity = '1', 10);
            });
        });

        // Close logic
        const closeLightbox = () => {
            lightbox.style.opacity = '0';
            setTimeout(() => lightbox.style.display = 'none', 300);
        };
        
        lightbox.addEventListener('click', closeLightbox);
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.style.display === 'flex') {
                closeLightbox();
            }
        });
    }
});
