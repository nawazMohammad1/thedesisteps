/* =====================================================
   DESISTEPS — SHOES PAGE JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const $ = (selector, parent = document) => parent.querySelector(selector);

  const $$ = (selector, parent = document) => [
    ...parent.querySelectorAll(selector),
  ];

  /* PRELOADER */

  const preloader = $(".preloader");

  const hidePreloader = () => {
    preloader?.classList.add("hide");
  };

  window.addEventListener("load", hidePreloader);

  // Fallback in case an image takes too long to load.
  setTimeout(hidePreloader, 2500);

  /* NAVBAR */

  const navbar = $(".navbar");

  const updateNavbar = () => {
    navbar?.classList.toggle("scrolled", window.scrollY > 30);
  };

  window.addEventListener("scroll", updateNavbar, {
    passive: true,
  });

  updateNavbar();

  /* MOBILE MENU */

  const menuToggle = $(".menu-toggle");
  const mobileMenu = $(".mobile-menu");

  function closeMobileMenu() {
    mobileMenu?.classList.remove("active");
    menuToggle?.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  }

  menuToggle?.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen);
  });

  $$(".mobile-menu a").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  /* SEARCH OVERLAY */

  const searchOverlay = $(".search-overlay");
  const searchInput = $("#shoeSearch");
  const searchTrigger = $(".search-trigger");
  const closeSearch = $(".close-search");

  function openSearch() {
    searchOverlay?.classList.add("active");
    document.body.classList.add("search-open");

    setTimeout(() => searchInput?.focus(), 200);
  }

  function hideSearch() {
    searchOverlay?.classList.remove("active");
    document.body.classList.remove("search-open");
  }

  searchTrigger?.addEventListener("click", openSearch);
  closeSearch?.addEventListener("click", hideSearch);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      hideSearch();
      closeMobileMenu();
    }
  });

  /* PRODUCT FILTERING + SEARCH */

  const productCards = $$(".product-card");
  const filterButtons = $$(".filter-btn");
  const productCount = $("#productCount");
  const noResults = $(".no-results");
  const searchButton = $("#searchButton");

  let activeCategory = "all";
  let searchTerm = "";

  function updateProducts() {
    let visibleCount = 0;

    productCards.forEach((card) => {
      const category = card.dataset.category || "";
      const name = card.dataset.name || "";

      const matchesCategory =
        activeCategory === "all" || category === activeCategory;

      const matchesSearch =
        name.toLowerCase().includes(searchTerm) ||
        category.toLowerCase().includes(searchTerm);

      const visible = matchesCategory && matchesSearch;

      card.hidden = !visible;

      if (visible) {
        visibleCount++;
      }
    });

    if (productCount) {
      productCount.textContent = visibleCount;
    }

    if (noResults) {
      noResults.hidden = visibleCount !== 0;
    }
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeCategory = button.dataset.filter || "all";

      filterButtons.forEach((item) => {
        item.classList.toggle("active", item === button);
      });

      updateProducts();
    });
  });

  function runSearch() {
    searchTerm = searchInput.value.trim().toLowerCase();
    updateProducts();
    hideSearch();

    $("#all-shoes")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  searchButton?.addEventListener("click", runSearch);

  searchInput?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      runSearch();
    }
  });

  /* CATEGORY SHORTCUTS */

  $$("[data-category-link]").forEach((link) => {
    link.addEventListener("click", () => {
      const category = link.dataset.categoryLink;

      activeCategory = category;
      searchTerm = "";

      if (searchInput) {
        searchInput.value = "";
      }

      filterButtons.forEach((button) => {
        button.classList.toggle("active", button.dataset.filter === category);
      });

      updateProducts();
    });
  });

  /* WISHLIST */

  const wishlistCount = $(".wishlist-count");
  const wishlistButtons = $$(".wishlist-product");

  const wishlist = new Set();

  wishlistButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".product-card");
      const productName = card?.dataset.name;

      if (!productName) return;

      const icon = $("i", button);

      if (wishlist.has(productName)) {
        wishlist.delete(productName);
        button.classList.remove("active");
        icon?.classList.remove("fa-solid");
        icon?.classList.add("fa-regular");
      } else {
        wishlist.add(productName);
        button.classList.add("active");
        icon?.classList.remove("fa-regular");
        icon?.classList.add("fa-solid");
      }

      if (wishlistCount) {
        wishlistCount.textContent = wishlist.size;
      }

      button.animate(
        [
          { transform: "scale(1)" },
          { transform: "scale(1.18)" },
          { transform: "scale(1)" },
        ],
        { duration: 250 },
      );
    });
  });

  /* BAG / ADD TO BAG */

  let bagTotal = 0;

  const bagCount = $(".bag-count");
  const cartToast = $(".cart-toast");
  const toastProduct = $(".toast-product");

  let toastTimer;

  $$(".quick-add").forEach((button) => {
    button.addEventListener("click", () => {
      const productName = button.dataset.product || "Selected shoes";

      bagTotal++;

      if (bagCount) {
        bagCount.textContent = bagTotal;
      }

      if (toastProduct) {
        toastProduct.textContent = productName;
      }

      cartToast?.classList.add("show");

      clearTimeout(toastTimer);

      toastTimer = setTimeout(() => {
        cartToast?.classList.remove("show");
      }, 2600);

      const originalText = button.textContent;

      button.textContent = "ADDED ✓";
      button.classList.add("added");

      setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove("added");
      }, 1200);
    });
  });

  /* CART / WISHLIST BUTTON FEEDBACK */

  $("#bagLink")?.addEventListener("click", () => {
    cartToast?.classList.add("show");

    if (toastProduct) {
      toastProduct.textContent =
        bagTotal === 0
          ? "Your bag is currently empty"
          : `${bagTotal} item(s) added`;
    }

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
      cartToast?.classList.remove("show");
    }, 2500);
  });

  $("#wishlistLink")?.addEventListener("click", () => {
    const firstWishlisted = productCards.find((card) =>
      wishlist.has(card.dataset.name),
    );

    if (firstWishlisted) {
      firstWishlisted.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    } else {
      $("#all-shoes")?.scrollIntoView({
        behavior: "smooth",
      });
    }
  });

  /* SCROLL REVEAL */

  const revealElements = $$(".reveal");

  if ("IntersectionObserver" in window) {
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
  } else {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }

  /* NEWSLETTER DEMO */

  const newsletterForm = $("#newsletterForm");
  const newsletterEmail = $("#newsletterEmail");
  const newsletterMessage = $(".newsletter-message");

  newsletterForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!newsletterEmail?.checkValidity()) {
      newsletterEmail?.reportValidity();
      return;
    }

    if (newsletterMessage) {
      newsletterMessage.textContent =
        "Thank you for joining the DesiSteps list!";
    }

    newsletterForm.reset();
  });

  /* IMAGE FALLBACK */

  $$("img").forEach((image) => {
    image.addEventListener("error", () => {
      image.classList.add("image-unavailable");
      image.alt = "Product image unavailable";
    });
  });

  /* SMOOTH ANCHOR LINKS */

  $$('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");

      if (!href || href === "#") {
        event.preventDefault();
        return;
      }

      const target = document.querySelector(href);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });
});
