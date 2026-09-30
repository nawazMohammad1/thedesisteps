/* =========================================================
   DESISTEPS
   Main JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =======================================================
     ELEMENTS
  ======================================================== */

  const preloader = document.getElementById("preloader");
  const navbar = document.getElementById("navbar");

  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");

  const searchBtn = document.getElementById("searchBtn");
  const searchOverlay = document.getElementById("searchOverlay");
  const searchClose = document.getElementById("searchClose");
  const searchInput = document.getElementById("searchInput");
  const searchSubmit = document.getElementById("searchSubmit");

  const backTop = document.getElementById("backTop");

  const cartCounter = document.querySelector(".cart-counter");
  const wishlistCounter = document.querySelector(".wishlist-counter");

  const toast = document.getElementById("toast");
  const toastTitle = document.getElementById("toastTitle");
  const toastText = document.getElementById("toastText");

  const newsletterForm = document.getElementById("newsletterForm");
  const emailInput = document.getElementById("emailInput");
  const newsletterMessage = document.getElementById("newsletterMessage");

  const heroProduct = document.querySelector(".hero-product");

  /* =======================================================
     STATE
  ======================================================== */

  let cartCount = 0;
  let wishlistCount = 0;

  let toastTimer;

  /* =======================================================
     PRELOADER
  ======================================================== */

  const hidePreloader = () => {
    if (!preloader) return;

    preloader.classList.add("hide");
  };

  window.addEventListener("load", () => {
    setTimeout(hidePreloader, 500);
  });

  /* Fallback in case an image takes too long */

  setTimeout(hidePreloader, 2500);

  /* =======================================================
     NAVBAR SCROLL
  ======================================================== */

  const handleNavbar = () => {
    if (!navbar) return;

    if (window.scrollY > 70) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    if (backTop) {
      if (window.scrollY > 600) {
        backTop.classList.add("show");
      } else {
        backTop.classList.remove("show");
      }
    }
  };

  window.addEventListener("scroll", handleNavbar, {
    passive: true,
  });

  handleNavbar();

  /* =======================================================
     MOBILE MENU
  ======================================================== */

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");

      menuBtn.classList.toggle("active", isOpen);

      menuBtn.setAttribute("aria-expanded", String(isOpen));

      document.body.classList.toggle("no-scroll", isOpen);
    });

    /* Close menu after clicking link */

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");

        menuBtn.classList.remove("active");

        menuBtn.setAttribute("aria-expanded", "false");

        document.body.classList.remove("no-scroll");
      });
    });
  }

  /* =======================================================
     SEARCH
  ======================================================== */

  const openSearch = () => {
    if (!searchOverlay) return;

    searchOverlay.classList.add("active");

    document.body.classList.add("no-scroll");

    setTimeout(() => {
      searchInput?.focus();
    }, 300);
  };

  const closeSearch = () => {
    if (!searchOverlay) return;

    searchOverlay.classList.remove("active");

    document.body.classList.remove("no-scroll");
  };

  searchBtn?.addEventListener("click", openSearch);

  searchClose?.addEventListener("click", closeSearch);

  searchOverlay?.addEventListener("click", (event) => {
    if (event.target === searchOverlay) {
      closeSearch();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeSearch();

      if (navLinks) {
        navLinks.classList.remove("open");
      }

      if (menuBtn) {
        menuBtn.classList.remove("active");

        menuBtn.setAttribute("aria-expanded", "false");
      }

      document.body.classList.remove("no-scroll");
    }
  });

  /* =======================================================
     SEARCH FUNCTION
  ======================================================== */

  const performSearch = () => {
    if (!searchInput) return;

    const query = searchInput.value.trim().toLowerCase();

    if (!query) {
      showToast("Search", "Type a footwear style first.");

      return;
    }

    const cards = document.querySelectorAll(".product-card");

    let found = false;

    cards.forEach((card) => {
      const text = card.textContent.toLowerCase();

      if (text.includes(query)) {
        card.classList.remove("hidden");

        card.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        found = true;
      }
    });

    if (found) {
      closeSearch();
    } else {
      showToast("No results", `No footwear found for "${query}".`);
    }
  };

  searchSubmit?.addEventListener("click", performSearch);

  searchInput?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      performSearch();
    }
  });

  /* =======================================================
     SCROLL REVEAL
  ======================================================== */

  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      },
    );

    revealElements.forEach((element) => {
      observer.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }

  /* =======================================================
     PRODUCT FILTER
  ======================================================== */

  const filterButtons = document.querySelectorAll(".filter-btn");

  const productCards = document.querySelectorAll(".shoes-grid .product-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      filterButtons.forEach((btn) => {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      productCards.forEach((card) => {
        const category = card.dataset.category;

        if (filter === "all" || category === filter) {
          card.classList.remove("hidden");

          requestAnimationFrame(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          });
        } else {
          card.style.opacity = "0";
          card.style.transform = "translateY(15px)";

          setTimeout(() => {
            card.classList.add("hidden");
          }, 250);
        }
      });
    });
  });

  /* =======================================================
     WISHLIST
  ======================================================== */

  const wishlistButtons = document.querySelectorAll(".wishlist-product");

  wishlistButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const icon = button.querySelector("i");

      const isActive = button.classList.toggle("active");

      if (isActive) {
        wishlistCount++;

        if (icon) {
          icon.classList.remove("fa-regular");

          icon.classList.add("fa-solid");
        }

        showToast("Added to wishlist", "We'll keep it here for you.");
      } else {
        wishlistCount = Math.max(0, wishlistCount - 1);

        if (icon) {
          icon.classList.remove("fa-solid");

          icon.classList.add("fa-regular");
        }

        showToast("Removed from wishlist", "The item was removed.");
      }

      if (wishlistCounter) {
        wishlistCounter.textContent = wishlistCount;
      }
    });
  });

  /* =======================================================
     ADD TO CART
  ======================================================== */

  const quickAddButtons = document.querySelectorAll(".quick-add");

  quickAddButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const product = button.dataset.product || "Footwear";

      cartCount++;

      if (cartCounter) {
        cartCounter.textContent = cartCount;
      }

      showToast("Added to bag", `${product} is in your bag.`);

      /* Button feedback */

      const originalText = button.textContent;

      button.textContent = "ADDED ✓";

      button.disabled = true;

      setTimeout(() => {
        button.textContent = originalText;

        button.disabled = false;
      }, 1000);
    });
  });

  /* =======================================================
     TOAST
  ======================================================== */

  function showToast(title, message) {
    if (!toast) return;

    clearTimeout(toastTimer);

    if (toastTitle) {
      toastTitle.textContent = title;
    }

    if (toastText) {
      toastText.textContent = message;
    }

    toast.classList.add("show");

    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 2800);
  }

  /* =======================================================
     NEWSLETTER
  ======================================================== */

  newsletterForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = emailInput?.value.trim();

    if (!email) return;

    if (!email.includes("@")) {
      if (newsletterMessage) {
        newsletterMessage.textContent = "Please enter a valid email address.";
      }

      return;
    }

    if (newsletterMessage) {
      newsletterMessage.textContent =
        "You're officially in. Welcome to DesiSteps!";
    }

    showToast("You're in!", "Welcome to the DesiSteps community.");

    newsletterForm.reset();
  });

  /* =======================================================
     BACK TO TOP
  ======================================================== */

  backTop?.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  /* =======================================================
     SMOOTH ANCHOR LINKS
  ======================================================== */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });

  /* =======================================================
     CUSTOM CURSOR
  ======================================================== */

  const cursorDot = document.querySelector(".cursor-dot");

  const cursorRing = document.querySelector(".cursor-ring");

  const finePointer = window.matchMedia("(pointer: fine)").matches;

  if (finePointer && cursorDot && cursorRing) {
    let mouseX = 0;
    let mouseY = 0;

    let ringX = 0;
    let ringY = 0;

    document.addEventListener("mousemove", (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;

      cursorDot.style.left = `${mouseX}px`;

      cursorDot.style.top = `${mouseY}px`;
    });

    const animateCursor = () => {
      ringX += (mouseX - ringX) * 0.15;

      ringY += (mouseY - ringY) * 0.15;

      cursorRing.style.left = `${ringX}px`;

      cursorRing.style.top = `${ringY}px`;

      requestAnimationFrame(animateCursor);
    };

    animateCursor();

    document
      .querySelectorAll("a, button, .product-card, .collection-card")
      .forEach((element) => {
        element.addEventListener("mouseenter", () => {
          cursorRing.classList.add("hover");
        });

        element.addEventListener("mouseleave", () => {
          cursorRing.classList.remove("hover");
        });
      });
  }

  /* =======================================================
     HERO PARALLAX
  ======================================================== */

  if (finePointer && heroProduct) {
    const hero = document.querySelector(".hero");

    hero?.addEventListener("mousemove", (event) => {
      const rect = hero.getBoundingClientRect();

      const x = (event.clientX - rect.left) / rect.width - 0.5;

      const y = (event.clientY - rect.top) / rect.height - 0.5;

      heroProduct.style.transform = `translate(
            calc(-50% + ${x * 15}px),
            calc(-50% + ${y * 15}px)
          ) rotate(${x * 7 - 7}deg)`;
    });

    hero?.addEventListener("mouseleave", () => {
      heroProduct.style.transform = "translate(-50%, -50%) rotate(-7deg)";
    });
  }

  /* =======================================================
     PRODUCT TILT
  ======================================================== */

  if (finePointer) {
    document.querySelectorAll(".product-card").forEach((card) => {
      card.addEventListener("mousemove", (event) => {
        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;

        const y = event.clientY - rect.top;

        const centerX = rect.width / 2;

        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 35;

        const rotateY = (centerX - x) / 35;

        card.style.transform = `perspective(900px)
               rotateX(${rotateX}deg)
               rotateY(${rotateY}deg)
               translateY(-3px)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
  }

  /* =======================================================
     ACTIVE NAVIGATION
  ======================================================== */

  const sections = document.querySelectorAll("main section[id]");

  const navAnchors = document.querySelectorAll(".nav-link");

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const id = entry.target.id;

          navAnchors.forEach((link) => {
            link.classList.remove("active");

            if (link.getAttribute("href") === `#${id}`) {
              link.classList.add("active");
            }
          });
        });
      },
      {
        rootMargin: "-35% 0px -55% 0px",
      },
    );

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }

  /* =======================================================
     IMAGE ERROR HANDLING
  ======================================================== */

  document.querySelectorAll("img").forEach((image) => {
    image.addEventListener("error", () => {
      image.style.background = "#eadfce";

      image.style.objectFit = "cover";

      image.alt = "DesiSteps footwear";
    });
  });

  /* =======================================================
     INITIAL REVEAL FOR HERO
  ======================================================== */

  setTimeout(() => {
    document.querySelectorAll(".hero .reveal").forEach((element) => {
      element.classList.add("visible");
    });
  }, 300);
});
