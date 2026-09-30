/* =========================================================
   DESISTEPS — OUR STORY JS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =======================================================
     ELEMENTS
  ======================================================= */

  const preloader = document.querySelector(".preloader");

  const navbar = document.querySelector(".navbar");

  const menuToggle = document.querySelector(".menu-toggle");

  const mobileMenu = document.querySelector(".mobile-menu");

  const searchToggle = document.querySelector(".search-toggle");

  const searchOverlay = document.querySelector(".search-overlay");

  const closeSearch = document.querySelector(".close-search");

  const searchInput = document.querySelector("#searchInput");

  const searchButton = document.querySelector("#searchButton");

  const cartToggle = document.querySelector(".cart-toggle");

  const cartPanel = document.querySelector(".cart-panel");

  const closeCart = document.querySelector(".close-cart");

  const cartBackdrop = document.querySelector(".cart-backdrop");

  const continueShopping = document.querySelector(".continue-shopping");

  const wishlistToggle = document.querySelector(".wishlist-toggle");

  const wishlistCount = document.querySelectorAll(".wishlist-count");

  const cartCount = document.querySelectorAll(".cart-count");

  const toast = document.querySelector(".toast");

  const toastTitle = document.querySelector("#toastTitle");

  const toastMessage = document.querySelector("#toastMessage");

  /* =======================================================
     PRELOADER
  ======================================================= */

  window.addEventListener("load", () => {
    setTimeout(() => {
      preloader?.classList.add("hide");
    }, 900);
  });

  /* =======================================================
     NAVBAR SCROLL
  ======================================================= */

  function handleNavbar() {
    if (!navbar) return;

    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", handleNavbar, {
    passive: true,
  });

  handleNavbar();

  /* =======================================================
     MOBILE MENU
  ======================================================= */

  function openMobileMenu() {
    menuToggle?.classList.add("active");

    mobileMenu?.classList.add("open");

    menuToggle?.setAttribute("aria-expanded", "true");

    document.body.classList.add("menu-open");
  }

  function closeMobileMenu() {
    menuToggle?.classList.remove("active");

    mobileMenu?.classList.remove("open");

    menuToggle?.setAttribute("aria-expanded", "false");

    document.body.classList.remove("menu-open");
  }

  menuToggle?.addEventListener("click", () => {
    const open = mobileMenu?.classList.contains("open");

    if (open) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  document.querySelectorAll(".mobile-menu a").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  /* =======================================================
     SEARCH
  ======================================================= */

  function openSearch() {
    searchOverlay?.classList.add("open");

    document.body.classList.add("search-open");

    setTimeout(() => {
      searchInput?.focus();
    }, 400);
  }

  function closeSearchOverlay() {
    searchOverlay?.classList.remove("open");

    document.body.classList.remove("search-open");
  }

  searchToggle?.addEventListener("click", openSearch);

  closeSearch?.addEventListener("click", closeSearchOverlay);

  /* =======================================================
     SEARCH
  ======================================================= */

  function performSearch(value) {
    const term = value.trim().toLowerCase();

    if (!term) return;

    const pages = {
      juttis: "collection.html",

      kolhapuris: "collection.html",

      sneakers: "shoes.html",

      sandals: "collection.html",

      new: "new-arrivals.html",

      arrivals: "new-arrivals.html",
    };

    let destination = "collection.html";

    Object.keys(pages).forEach((keyword) => {
      if (term.includes(keyword)) {
        destination = pages[keyword];
      }
    });

    closeSearchOverlay();

    window.location.href = destination;
  }

  searchButton?.addEventListener("click", () => {
    performSearch(searchInput?.value || "");
  });

  searchInput?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      performSearch(searchInput?.value || "");
    }
  });

  /* =======================================================
     SEARCH SUGGESTIONS
  ======================================================= */

  document.querySelectorAll("[data-search]").forEach((button) => {
    button.addEventListener("click", () => {
      const searchValue = button.dataset.search;

      if (searchInput) {
        searchInput.value = searchValue;
      }

      performSearch(searchValue);
    });
  });

  /* =======================================================
     WISHLIST
  ======================================================= */

  let wishlistValue = 0;

  wishlistToggle?.addEventListener("click", () => {
    wishlistValue = wishlistValue === 0 ? 1 : 0;

    const icon = wishlistToggle.querySelector("i");

    if (wishlistValue === 1) {
      icon?.classList.remove("fa-regular");

      icon?.classList.add("fa-solid");

      showToast("Wishlist", "Your wishlist is ready.");
    } else {
      icon?.classList.remove("fa-solid");

      icon?.classList.add("fa-regular");
    }

    wishlistCount.forEach((element) => {
      element.textContent = wishlistValue;
    });
  });

  /* =======================================================
     CART
  ======================================================= */

  let cartValue = 0;

  function openCart() {
    cartPanel?.classList.add("open");

    cartBackdrop?.classList.add("show");

    document.body.classList.add("cart-open");
  }

  function closeCartPanel() {
    cartPanel?.classList.remove("open");

    cartBackdrop?.classList.remove("show");

    document.body.classList.remove("cart-open");
  }

  cartToggle?.addEventListener("click", openCart);

  closeCart?.addEventListener("click", closeCartPanel);

  cartBackdrop?.addEventListener("click", closeCartPanel);

  continueShopping?.addEventListener("click", closeCartPanel);

  /* =======================================================
     TOAST
  ======================================================= */

  let toastTimer;

  function showToast(title, message) {
    if (!toast) return;

    clearTimeout(toastTimer);

    toastTitle.textContent = title;

    toastMessage.textContent = message;

    toast.classList.add("show");

    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }

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
     CUSTOM CURSOR
  ======================================================= */

  const cursor = document.querySelector(".cursor");

  const follower = document.querySelector(".cursor-follower");

  if (
    cursor &&
    follower &&
    window.matchMedia("(hover:hover) and (pointer:fine)").matches
  ) {
    let mouseX = 0;
    let mouseY = 0;

    let followerX = 0;
    let followerY = 0;

    document.addEventListener("mousemove", (event) => {
      mouseX = event.clientX;

      mouseY = event.clientY;

      cursor.style.left = `${mouseX}px`;

      cursor.style.top = `${mouseY}px`;
    });

    function animateCursor() {
      followerX += (mouseX - followerX) * 0.12;

      followerY += (mouseY - followerY) * 0.12;

      follower.style.left = `${followerX}px`;

      follower.style.top = `${followerY}px`;

      requestAnimationFrame(animateCursor);
    }

    animateCursor();

    document.querySelectorAll("a, button, input, img").forEach((element) => {
      element.addEventListener("mouseenter", () => {
        follower.style.width = "55px";

        follower.style.height = "55px";
      });

      element.addEventListener("mouseleave", () => {
        follower.style.width = "34px";

        follower.style.height = "34px";
      });
    });
  }

  /* =======================================================
     HERO PARALLAX
  ======================================================= */

  const heroFrame = document.querySelector(".hero-frame");

  window.addEventListener(
    "scroll",
    () => {
      if (!heroFrame || window.innerWidth < 900) {
        return;
      }

      const scroll = window.scrollY;

      heroFrame.style.transform = `rotate(3deg) translateY(${scroll * 0.035}px)`;
    },
    {
      passive: true,
    },
  );

  /* =======================================================
     IMAGE MOUSE MOVEMENT
  ======================================================= */

  const imageCards = document.querySelectorAll(
    ".image-story-image, .split-image, .craft-image",
  );

  imageCards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      if (window.innerWidth < 900) {
        return;
      }

      const rect = card.getBoundingClientRect();

      const x = event.clientX - rect.left;

      const y = event.clientY - rect.top;

      const rotateX = (y / rect.height - 0.5) * -2;

      const rotateY = (x / rect.width - 0.5) * 2;

      card.style.transform = `perspective(900px)
           rotateX(${rotateX}deg)
           rotateY(${rotateY}deg)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });

  /* =======================================================
     SMOOTH ANCHOR LINKS
  ======================================================= */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") {
        event.preventDefault();

        return;
      }

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  /* =======================================================
     ESCAPE KEY
  ======================================================= */

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
      return;
    }

    closeMobileMenu();

    closeSearchOverlay();

    closeCartPanel();
  });

  /* =======================================================
     RESIZE
  ======================================================= */

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      closeMobileMenu();
    }
  });
});
