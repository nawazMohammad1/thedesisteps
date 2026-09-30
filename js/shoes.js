/* =====================================================
   DESISTEPS — SHOES PAGE JAVASCRIPT
   Final Version
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  /* =====================================================
     HELPERS
  ===================================================== */

  const $ = (selector, parent = document) =>
    parent.querySelector(selector);

  const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];

  /* =====================================================
     PRELOADER
  ===================================================== */

  const preloader = $(".preloader");

  const hidePreloader = () => {
    preloader?.classList.add("hide");
  };

  window.addEventListener("load", hidePreloader);

  // Fallback so the page never remains stuck on the loader.
  setTimeout(hidePreloader, 2500);

  /* =====================================================
     NAVBAR
  ===================================================== */

  const navbar = $(".navbar");

  const updateNavbar = () => {
    navbar?.classList.toggle(
      "scrolled",
      window.scrollY > 30
    );
  };

  window.addEventListener(
    "scroll",
    updateNavbar,
    { passive: true }
  );

  updateNavbar();

  /* =====================================================
     MOBILE MENU
  ===================================================== */

  const menuToggle = $(".menu-toggle");
  const mobileMenu = $(".mobile-menu");

  function closeMobileMenu() {
    mobileMenu?.classList.remove("active");

    menuToggle?.setAttribute(
      "aria-expanded",
      "false"
    );

    document.body.classList.remove("menu-open");
  }

  function openMobileMenu() {
    mobileMenu?.classList.add("active");

    menuToggle?.setAttribute(
      "aria-expanded",
      "true"
    );

    document.body.classList.add("menu-open");
  }

  menuToggle?.addEventListener("click", () => {
    const isOpen =
      mobileMenu?.classList.contains("active");

    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  $$(".mobile-menu a").forEach((link) => {
    link.addEventListener(
      "click",
      closeMobileMenu
    );
  });

  /* =====================================================
     SEARCH OVERLAY
  ===================================================== */

  const searchOverlay = $(".search-overlay");
  const searchInput = $("#shoeSearch");
  const searchTrigger = $(".search-trigger");
  const closeSearch = $(".close-search");
  const searchButton = $("#searchButton");

  function openSearch() {
    searchOverlay?.classList.add("active");

    document.body.classList.add("search-open");

    setTimeout(() => {
      searchInput?.focus();
    }, 200);
  }

  function hideSearch() {
    searchOverlay?.classList.remove("active");

    document.body.classList.remove("search-open");
  }

  searchTrigger?.addEventListener(
    "click",
    openSearch
  );

  closeSearch?.addEventListener(
    "click",
    hideSearch
  );

  /* =====================================================
     ESCAPE KEY
  ===================================================== */

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      hideSearch();
      closeMobileMenu();
    }
  });

  /* =====================================================
     PRODUCT FILTERING + SEARCH
  ===================================================== */

  const productCards = $$(".product-card");
  const filterButtons = $$(".filter-btn");

  const productCount = $("#productCount");
  const noResults = $(".no-results");

  let activeCategory = "all";
  let searchTerm = "";

  function updateProducts() {
    let visibleCount = 0;

    productCards.forEach((card) => {
      const category =
        (
          card.dataset.category || ""
        ).toLowerCase();

      const name =
        (
          card.dataset.name || ""
        ).toLowerCase();

      const matchesCategory =
        activeCategory === "all" ||
        category === activeCategory;

      const matchesSearch =
        name.includes(searchTerm) ||
        category.includes(searchTerm);

      const visible =
        matchesCategory && matchesSearch;

      card.hidden = !visible;

      if (visible) {
        visibleCount++;
      }
    });

    /* PRODUCT COUNT */

    if (productCount) {
      productCount.textContent =
        visibleCount;
    }

    /* NO RESULTS */

    if (noResults) {
      noResults.hidden =
        visibleCount !== 0;
    }
  }

  /* FILTER BUTTONS */

  filterButtons.forEach((button) => {
    button.addEventListener(
      "click",
      () => {
        activeCategory =
          (
            button.dataset.filter ||
            "all"
          ).toLowerCase();

        filterButtons.forEach((item) => {
          item.classList.toggle(
            "active",
            item === button
          );
        });

        updateProducts();
      }
    );
  });

  /* =====================================================
     SEARCH
  ===================================================== */

  function runSearch() {
    if (!searchInput) return;

    searchTerm =
      searchInput.value
        .trim()
        .toLowerCase();

    updateProducts();

    hideSearch();

    $("#all-shoes")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  searchButton?.addEventListener(
    "click",
    runSearch
  );

  searchInput?.addEventListener(
    "keydown",
    (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        runSearch();
      }
    }
  );

  /* =====================================================
     CATEGORY SHORTCUTS
  ===================================================== */

  $$("[data-category-link]").forEach(
    (link) => {
      link.addEventListener(
        "click",
        () => {
          const category =
            (
              link.dataset.categoryLink ||
              "all"
            ).toLowerCase();

          activeCategory = category;
          searchTerm = "";

          if (searchInput) {
            searchInput.value = "";
          }

          filterButtons.forEach(
            (button) => {
              button.classList.toggle(
                "active",
                (
                  button.dataset.filter ||
                  "all"
                ).toLowerCase() === category
              );
            }
          );

          updateProducts();
        }
      );
    }
  );

  /* =====================================================
     WISHLIST
  ===================================================== */

  const wishlistCount =
    $(".wishlist-count");

  const wishlistButtons =
    $$(".wishlist-product");

  const wishlist = new Set();

  wishlistButtons.forEach((button) => {
    button.addEventListener(
      "click",
      () => {
        const card =
          button.closest(".product-card");

        const productName =
          card?.dataset.name;

        if (!productName) return;

        const icon = $("i", button);

        if (wishlist.has(productName)) {
          /* REMOVE */

          wishlist.delete(productName);

          button.classList.remove(
            "active"
          );

          icon?.classList.remove(
            "fa-solid"
          );

          icon?.classList.add(
            "fa-regular"
          );
        } else {
          /* ADD */

          wishlist.add(productName);

          button.classList.add(
            "active"
          );

          icon?.classList.remove(
            "fa-regular"
          );

          icon?.classList.add(
            "fa-solid"
          );
        }

        /* UPDATE COUNT */

        if (wishlistCount) {
          wishlistCount.textContent =
            wishlist.size;
        }

        /* BUTTON ANIMATION */

        if (typeof button.animate === "function") {
          button.animate(
            [
              {
                transform: "scale(1)",
              },
              {
                transform: "scale(1.18)",
              },
              {
                transform: "scale(1)",
              },
            ],
            {
              duration: 250,
              easing: "ease-out",
            }
          );
        }
      }
    );
  });

  /* =====================================================
     BAG / ADD TO BAG
  ===================================================== */

  let bagTotal = 0;

  const bagCount = $(".bag-count");
  const cartToast = $(".cart-toast");
  const toastProduct =
    $(".toast-product");

  let toastTimer;

  function showCartToast(message) {
    if (toastProduct) {
      toastProduct.textContent =
        message;
    }

    cartToast?.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
      cartToast?.classList.remove(
        "show"
      );
    }, 2600);
  }

  $$(".quick-add").forEach((button) => {
    button.addEventListener(
      "click",
      () => {
        const productName =
          button.dataset.product ||
          button.closest(".product-card")
            ?.dataset.name ||
          "Selected shoes";

        bagTotal++;

        /* UPDATE BAG COUNT */

        if (bagCount) {
          bagCount.textContent =
            bagTotal;
        }

        /* SHOW TOAST */

        showCartToast(
          `${productName} added to your bag`
        );

        /* BUTTON FEEDBACK */

        const originalText =
          button.textContent;

        button.textContent =
          "ADDED ✓";

        button.classList.add(
          "added"
        );

        setTimeout(() => {
          button.textContent =
            originalText;

          button.classList.remove(
            "added"
          );
        }, 1200);
      }
    );
  });

  /* =====================================================
     BAG LINK
  ===================================================== */

  $("#bagLink")?.addEventListener(
    "click",
    (event) => {
      event.preventDefault();

      if (bagTotal === 0) {
        showCartToast(
          "Your bag is currently empty"
        );
      } else {
        showCartToast(
          `${bagTotal} item(s) added to your bag`
        );
      }
    }
  );

  /* =====================================================
     WISHLIST LINK
  ===================================================== */

  $("#wishlistLink")?.addEventListener(
    "click",
    (event) => {
      event.preventDefault();

      const firstWishlisted =
        productCards.find((card) =>
          wishlist.has(
            card.dataset.name
          )
        );

      if (firstWishlisted) {
        firstWishlisted.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        firstWishlisted.classList.add(
          "wishlist-highlight"
        );

        setTimeout(() => {
          firstWishlisted.classList.remove(
            "wishlist-highlight"
          );
        }, 1000);
      } else {
        $("#all-shoes")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  );

  /* =====================================================
     SCROLL REVEAL
  ===================================================== */

  const revealElements =
    $$(".reveal");

  if (
    "IntersectionObserver" in window
  ) {
    const revealObserver =
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (
              entry.isIntersecting
            ) {
              entry.target.classList.add(
                "visible"
              );

              revealObserver.unobserve(
                entry.target
              );
            }
          });
        },
        {
          threshold: 0.12,
          rootMargin:
            "0px 0px -40px 0px",
        }
      );

    revealElements.forEach(
      (element) => {
        revealObserver.observe(
          element
        );
      }
    );
  } else {
    revealElements.forEach(
      (element) => {
        element.classList.add(
          "visible"
        );
      }
    );
  }

  /* =====================================================
     NEWSLETTER
  ===================================================== */

  const newsletterForm =
    $("#newsletterForm");

  const newsletterEmail =
    $("#newsletterEmail");

  const newsletterMessage =
    $(".newsletter-message");

  newsletterForm?.addEventListener(
    "submit",
    (event) => {
      event.preventDefault();

      if (
        !newsletterEmail?.checkValidity()
      ) {
        newsletterEmail?.reportValidity();
        return;
      }

      if (newsletterMessage) {
        newsletterMessage.textContent =
          "Thank you for joining the DesiSteps list!";

        newsletterMessage.classList.add(
          "show"
        );
      }

      newsletterForm.reset();
    }
  );

  /* =====================================================
     IMAGE FALLBACK
  ===================================================== */

  $$("img").forEach((image) => {
    image.addEventListener(
      "error",
      () => {
        image.classList.add(
          "image-unavailable"
        );

        image.alt =
          "Product image unavailable";
      }
    );
  });

  /* =====================================================
     SMOOTH ANCHOR LINKS
  ===================================================== */

  $$('a[href^="#"]').forEach(
    (link) => {
      link.addEventListener(
        "click",
        (event) => {
          const href =
            link.getAttribute(
              "href"
            );

          if (
            !href ||
            href === "#"
          ) {
            event.preventDefault();
            return;
          }

          let target = null;

          try {
            target =
              document.querySelector(
                href
              );
          } catch {
            return;
          }

          if (!target) return;

          event.preventDefault();

          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      );
    }
  );

  /* =====================================================
     CLOSE MENU / SEARCH ON RESIZE
  ===================================================== */

  window.addEventListener(
    "resize",
    () => {
      if (window.innerWidth > 900) {
        closeMobileMenu();
      }
    }
  );

  /* =====================================================
     INITIAL PRODUCT STATE
  ===================================================== */

  updateProducts();
});
