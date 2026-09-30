/* =========================================================
   DESISTEPS
   COLLECTION PAGE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =======================================================
     PRELOADER
  ======================================================= */

  const preloader = document.querySelector(".preloader");

  window.addEventListener("load", () => {
    setTimeout(() => {
      preloader.classList.add("hide");
    }, 500);
  });

  /* =======================================================
     NAVBAR SCROLL
  ======================================================= */

  const navbar = document.querySelector(".navbar");

  const handleNavbar = () => {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleNavbar);

  handleNavbar();

  /* =======================================================
     MOBILE MENU
  ======================================================= */

  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");

  menuToggle?.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("active");

    document.body.classList.toggle("menu-open", isOpen);

    menuToggle.setAttribute("aria-expanded", isOpen);
  });

  /* CLOSE MOBILE MENU */

  document.querySelectorAll(".mobile-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active");

      document.body.classList.remove("menu-open");

      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* =======================================================
     SEARCH OVERLAY
  ======================================================= */

  const searchTrigger = document.querySelector(".search-trigger");

  const searchOverlay = document.querySelector(".search-overlay");

  const closeSearch = document.querySelector(".close-search");

  const searchInput = document.querySelector("#searchInput");

  searchTrigger?.addEventListener("click", () => {
    searchOverlay.classList.add("active");

    document.body.classList.add("search-open");

    setTimeout(() => {
      searchInput?.focus();
    }, 400);
  });

  closeSearch?.addEventListener("click", () => {
    searchOverlay.classList.remove("active");

    document.body.classList.remove("search-open");
  });

  /* ESCAPE */

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      searchOverlay?.classList.remove("active");

      document.body.classList.remove("search-open");
    }
  });

  /* =======================================================
     SEARCH PRODUCTS
  ======================================================= */

  const searchButton = document.querySelector("#searchButton");

  const productCards = [...document.querySelectorAll(".product-card")];

  const productCount = document.querySelector("#productCount");

  function searchProducts() {
    const query = searchInput.value.trim().toLowerCase();

    let visibleCount = 0;

    productCards.forEach((card) => {
      const productName = card.dataset.name.toLowerCase();

      const category = card.dataset.category.toLowerCase();

      const matches = productName.includes(query) || category.includes(query);

      if (!query || matches) {
        card.style.display = "";

        visibleCount++;
      } else {
        card.style.display = "none";
      }
    });

    productCount.textContent = visibleCount;

    searchOverlay.classList.remove("active");

    document.body.classList.remove("search-open");

    document.querySelector("#collection")?.scrollIntoView({
      behavior: "smooth",
    });
  }

  searchButton?.addEventListener("click", searchProducts);

  searchInput?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();

      searchProducts();
    }
  });

  /* =======================================================
     CATEGORY FILTER
  ======================================================= */

  const filterButtons = document.querySelectorAll(".filter-btn");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      filterButtons.forEach((btn) => {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      let visibleCount = 0;

      productCards.forEach((card) => {
        const category = card.dataset.category;

        const shouldShow = filter === "all" || category === filter;

        if (shouldShow) {
          card.classList.remove("hide");

          card.style.display = "";

          visibleCount++;
        } else {
          card.classList.add("hide");

          setTimeout(() => {
            if (card.classList.contains("hide")) {
              card.style.display = "none";
            }
          }, 400);
        }
      });

      productCount.textContent = visibleCount;
    });
  });

  /* =======================================================
     WISHLIST
  ======================================================= */

  const wishlistButtons = document.querySelectorAll(".wishlist-product");

  const wishlistCount = document.querySelector(".wishlist-count");

  let wishlistTotal = 0;

  wishlistButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const isActive = button.classList.toggle("active");

      const icon = button.querySelector("i");

      if (isActive) {
        icon.classList.remove("fa-regular");

        icon.classList.add("fa-solid");

        wishlistTotal++;
      } else {
        icon.classList.remove("fa-solid");

        icon.classList.add("fa-regular");

        wishlistTotal--;
      }

      wishlistCount.textContent = wishlistTotal;

      /* SMALL ANIMATION */

      button.animate(
        [
          {
            transform: "scale(1)",
          },
          {
            transform: "scale(1.25)",
          },
          {
            transform: "scale(1)",
          },
        ],
        {
          duration: 350,
        },
      );
    });
  });

  /* =======================================================
     ADD TO BAG
  ======================================================= */

  const quickAddButtons = document.querySelectorAll(".quick-add");

  const bagCount = document.querySelector(".bag-count");

  const cartToast = document.querySelector(".cart-toast");

  const toastProduct = document.querySelector(".toast-product");

  let bagTotal = 0;

  let toastTimer;

  quickAddButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const product = button.dataset.product;

      bagTotal++;

      bagCount.textContent = bagTotal;

      toastProduct.textContent = product;

      cartToast.classList.add("show");

      clearTimeout(toastTimer);

      toastTimer = setTimeout(() => {
        cartToast.classList.remove("show");
      }, 2500);

      /* BUTTON FEEDBACK */

      const originalText = button.textContent;

      button.textContent = "ADDED ✓";

      button.style.background = "#7d1f25";

      setTimeout(() => {
        button.textContent = originalText;

        button.style.background = "";
      }, 1200);
    });
  });

  /* =======================================================
     SCROLL REVEAL
  ======================================================= */

  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");

          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
    },
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });

  /* =======================================================
     STAGGER PRODUCT ANIMATION
  ======================================================= */

  productCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 70}ms`;
  });

  /* =======================================================
     NEWSLETTER
  ======================================================= */

  const newsletterForm = document.querySelector("#newsletterForm");

  const newsletterEmail = document.querySelector("#newsletterEmail");

  newsletterForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = newsletterEmail.value.trim();

    if (!email) {
      return;
    }

    const button = newsletterForm.querySelector("button");

    const original = button.innerHTML;

    button.innerHTML = `SUBSCRIBED <i class="fa-solid fa-check"></i>`;

    newsletterEmail.value = "";

    setTimeout(() => {
      button.innerHTML = original;
    }, 3000);
  });

  /* =======================================================
     SMOOTH INTERNAL LINKS
  ======================================================= */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });

  /* =======================================================
     CUSTOM CURSOR
  ======================================================= */

  const cursorDot = document.querySelector(".cursor-dot");

  const cursorRing = document.querySelector(".cursor-ring");

  if (window.matchMedia("(pointer: fine)").matches) {
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

    function animateCursor() {
      ringX += (mouseX - ringX) * 0.15;

      ringY += (mouseY - ringY) * 0.15;

      cursorRing.style.left = `${ringX}px`;

      cursorRing.style.top = `${ringY}px`;

      requestAnimationFrame(animateCursor);
    }

    animateCursor();

    document.querySelectorAll("a, button").forEach((element) => {
      element.addEventListener("mouseenter", () => {
        cursorRing.style.width = "48px";

        cursorRing.style.height = "48px";
      });

      element.addEventListener("mouseleave", () => {
        cursorRing.style.width = "34px";

        cursorRing.style.height = "34px";
      });
    });
  }

  /* =======================================================
     PARALLAX HERO
  ======================================================= */

  const hero = document.querySelector(".collection-hero");

  if (hero && window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener("scroll", () => {
      const scroll = window.scrollY;

      if (scroll < window.innerHeight) {
        hero.style.backgroundPosition = `center ${scroll * 0.15}px`;
      }
    });
  }

  /* =======================================================
     PRODUCT CARD TILT
  ======================================================= */

  if (window.matchMedia("(pointer: fine)").matches) {
    productCards.forEach((card) => {
      card.addEventListener("mousemove", (event) => {
        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;

        const y = event.clientY - rect.top;

        const rotateY = (x / rect.width - 0.5) * 4;

        const rotateX = (y / rect.height - 0.5) * -4;

        card.style.transform = `perspective(900px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
  }

  /* =======================================================
     IMAGE FALLBACK
  ======================================================= */

  document
    .querySelectorAll(".product-image img, .heritage-image img")
    .forEach((image) => {
      image.addEventListener("error", () => {
        image.style.display = "none";

        image.parentElement.classList.add("image-error");
      });
    });
});
