/* =========================================================
   DESISTEPS — NEW ARRIVALS JS
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

  const filterButtons = document.querySelectorAll(".filter-btn");
  const productCards = document.querySelectorAll(".arrival-card");

  const productCount = document.querySelector("#productCount");

  const emptyState = document.querySelector("#emptyState");
  const showAllButton = document.querySelector("#showAll");

  const wishlistButtons = document.querySelectorAll(".wishlist-product");

  const cartToggle = document.querySelector(".cart-toggle");

  const cartPanel = document.querySelector(".cart-panel");

  const cartBackdrop = document.querySelector(".cart-backdrop");

  const closeCart = document.querySelector(".close-cart");

  const continueShopping = document.querySelector(".continue-shopping");

  const quickAddButtons = document.querySelectorAll(".quick-add");

  const newsletterForm = document.querySelector("#newsletterForm");

  const toast = document.querySelector("#toast");

  const toastTitle = document.querySelector("#toastTitle");

  const toastMessage = document.querySelector("#toastMessage");

  const wishlistCountElements = document.querySelectorAll(".wishlist-count");

  const cartCountElements = document.querySelectorAll(".cart-count");

  /* =======================================================
     PRELOADER
  ======================================================= */

  window.addEventListener("load", () => {
    setTimeout(() => {
      if (preloader) {
        preloader.classList.add("hide");
      }
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

  window.addEventListener("scroll", handleNavbar);

  handleNavbar();

  /* =======================================================
     MOBILE MENU
  ======================================================= */

  function openMobileMenu() {
    if (!menuToggle || !mobileMenu) return;

    menuToggle.classList.add("active");
    mobileMenu.classList.add("open");

    menuToggle.setAttribute("aria-expanded", "true");

    document.body.classList.add("menu-open");
  }

  function closeMobileMenu() {
    if (!menuToggle || !mobileMenu) return;

    menuToggle.classList.remove("active");
    mobileMenu.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");

    document.body.classList.remove("menu-open");
  }

  menuToggle?.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.contains("open");

    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  document.querySelectorAll(".mobile-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      closeMobileMenu();
    });
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
     SEARCH PRODUCTS
  ======================================================= */

  function searchProducts(term) {
    const searchTerm = term.trim().toLowerCase();

    if (!searchTerm) {
      filterProducts("all");

      return;
    }

    let found = 0;

    productCards.forEach((card) => {
      const name = card.dataset.name?.toLowerCase() || "";

      const category = card.dataset.category?.toLowerCase() || "";

      const content = card.textContent.toLowerCase();

      const match =
        name.includes(searchTerm) ||
        category.includes(searchTerm) ||
        content.includes(searchTerm);

      if (match) {
        card.classList.remove("hidden");

        found++;
      } else {
        card.classList.add("hidden");
      }
    });

    productCount.textContent = String(found).padStart(2, "0");

    if (found === 0) {
      emptyState?.classList.add("show");
    } else {
      emptyState?.classList.remove("show");
    }
  }

  searchButton?.addEventListener("click", () => {
    searchProducts(searchInput.value);

    closeSearchOverlay();

    document.querySelector("#new-products")?.scrollIntoView({
      behavior: "smooth",
    });
  });

  searchInput?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      searchProducts(searchInput.value);

      closeSearchOverlay();

      document.querySelector("#new-products")?.scrollIntoView({
        behavior: "smooth",
      });
    }
  });

  /* =======================================================
     SEARCH SUGGESTIONS
  ======================================================= */

  document.querySelectorAll("[data-search]").forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.dataset.search;

      searchInput.value = value;

      searchProducts(value);

      closeSearchOverlay();

      document.querySelector("#new-products")?.scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  /* =======================================================
     PRODUCT FILTER
  ======================================================= */

  function filterProducts(filter) {
    let visible = 0;

    productCards.forEach((card) => {
      const category = card.dataset.category;

      const shouldShow = filter === "all" || category === filter;

      if (shouldShow) {
        card.classList.remove("hidden");

        visible++;
      } else {
        card.classList.add("hidden");
      }
    });

    productCount.textContent = String(visible).padStart(2, "0");

    if (visible === 0) {
      emptyState?.classList.add("show");
    } else {
      emptyState?.classList.remove("show");
    }
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      const filter = button.dataset.filter;

      filterProducts(filter);
    });
  });

  showAllButton?.addEventListener("click", () => {
    filterButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    document.querySelector('[data-filter="all"]')?.classList.add("active");

    filterProducts("all");
  });

  /* =======================================================
     WISHLIST
  ======================================================= */

  let wishlistCount = 0;

  wishlistButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const icon = button.querySelector("i");

      const isActive = button.classList.toggle("active");

      if (isActive) {
        icon?.classList.remove("fa-regular");
        icon?.classList.add("fa-solid");

        wishlistCount++;

        showToast("Added to wishlist", "This pair is now on your wishlist.");
      } else {
        icon?.classList.remove("fa-solid");
        icon?.classList.add("fa-regular");

        wishlistCount--;

        showToast(
          "Removed from wishlist",
          "The pair was removed from your wishlist.",
        );
      }

      wishlistCountElements.forEach((element) => {
        element.textContent = wishlistCount;
      });
    });
  });

  /* =======================================================
     CART
  ======================================================= */

  let cartCount = 0;

  let cartTotal = 0;

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
     QUICK ADD
  ======================================================= */

  quickAddButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productName = button.dataset.product || "Product";

      const card = button.closest(".arrival-card");

      const priceElement = card?.querySelector(".product-bottom strong");

      let price = priceElement?.textContent.replace(/[₹,]/g, "") || "0";

      price = Number(price);

      cartCount++;

      cartTotal += price;

      cartCountElements.forEach((element) => {
        element.textContent = cartCount;
      });

      const totalElement = document.querySelector(".cart-total strong");

      if (totalElement) {
        totalElement.textContent = `₹${cartTotal.toLocaleString("en-IN")}`;
      }

      showToast("Added to bag", `${productName} has been added.`);

      openCart();
    });
  });

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
     NEWSLETTER
  ======================================================= */

  newsletterForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.querySelector("#newsletterEmail")?.value.trim();

    if (!email) return;

    showToast(
      "You're on the list!",
      "Watch your inbox for new DesiSteps drops.",
    );

    newsletterForm.reset();
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
     CUSTOM CURSOR
  ======================================================= */

  const cursor = document.querySelector(".cursor");

  const cursorFollower = document.querySelector(".cursor-follower");

  if (
    cursor &&
    cursorFollower &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches
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

      cursorFollower.style.left = `${followerX}px`;

      cursorFollower.style.top = `${followerY}px`;

      requestAnimationFrame(animateCursor);
    }

    animateCursor();

    document
      .querySelectorAll("a, button, input, .arrival-image")
      .forEach((element) => {
        element.addEventListener("mouseenter", () => {
          cursorFollower.style.width = "55px";

          cursorFollower.style.height = "55px";
        });

        element.addEventListener("mouseleave", () => {
          cursorFollower.style.width = "34px";

          cursorFollower.style.height = "34px";
        });
      });
  }

  /* =======================================================
     PARALLAX HERO
  ======================================================= */

  const heroImage = document.querySelector(".hero-image-card");

  window.addEventListener(
    "scroll",
    () => {
      if (!heroImage || window.innerWidth < 900) {
        return;
      }

      const scroll = window.scrollY;

      heroImage.style.transform = `rotate(3deg) translateY(${scroll * 0.05}px)`;
    },
    {
      passive: true,
    },
  );

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
     PREVENT BROKEN # LINKS FROM JUMPING
  ======================================================= */

  document.querySelectorAll('a[href="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
    });
  });

  /* =======================================================
     INITIAL PRODUCT COUNT
  ======================================================= */

  filterProducts("all");
});
