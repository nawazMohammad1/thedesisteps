/* =========================================================
   DESISTEPS — OUR STORY JS
   Final Version
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =======================================================
     ELEMENTS
  ======================================================= */

  const preloader =
    document.querySelector(".preloader");

  const navbar =
    document.querySelector(".navbar");

  const menuToggle =
    document.querySelector(".menu-toggle");

  const mobileMenu =
    document.querySelector(".mobile-menu");

  const searchToggle =
    document.querySelector(".search-toggle");

  const searchOverlay =
    document.querySelector(".search-overlay");

  const closeSearch =
    document.querySelector(".close-search");

  const searchInput =
    document.querySelector("#searchInput");

  const searchButton =
    document.querySelector("#searchButton");

  const cartToggle =
    document.querySelector(".cart-toggle");

  const cartPanel =
    document.querySelector(".cart-panel");

  const closeCart =
    document.querySelector(".close-cart");

  const cartBackdrop =
    document.querySelector(".cart-backdrop");

  const continueShopping =
    document.querySelector(".continue-shopping");

  const wishlistToggle =
    document.querySelector(".wishlist-toggle");

  const wishlistCount =
    document.querySelectorAll(".wishlist-count");

  const cartCount =
    document.querySelectorAll(".cart-count");

  const toast =
    document.querySelector(".toast");

  const toastTitle =
    document.querySelector("#toastTitle");

  const toastMessage =
    document.querySelector("#toastMessage");

  /* =======================================================
     PRELOADER
  ======================================================= */

  const hidePreloader = () => {
    if (!preloader) return;

    preloader.classList.add("hide");
  };

  window.addEventListener("load", () => {
    setTimeout(hidePreloader, 700);
  });

  // Fallback in case an image takes too long to load.
  setTimeout(hidePreloader, 2500);

  /* =======================================================
     NAVBAR SCROLL
  ======================================================= */

  function handleNavbar() {
    if (!navbar) return;

    navbar.classList.toggle(
      "scrolled",
      window.scrollY > 50
    );
  }

  window.addEventListener(
    "scroll",
    handleNavbar,
    {
      passive: true,
    }
  );

  handleNavbar();

  /* =======================================================
     MOBILE MENU
  ======================================================= */

  function openMobileMenu() {
    mobileMenu?.classList.add("open");

    menuToggle?.classList.add("active");

    menuToggle?.setAttribute(
      "aria-expanded",
      "true"
    );

    document.body.classList.add(
      "menu-open"
    );
  }

  function closeMobileMenu() {
    mobileMenu?.classList.remove("open");

    menuToggle?.classList.remove("active");

    menuToggle?.setAttribute(
      "aria-expanded",
      "false"
    );

    document.body.classList.remove(
      "menu-open"
    );
  }

  menuToggle?.addEventListener(
    "click",
    () => {
      const isOpen =
        mobileMenu?.classList.contains(
          "open"
        );

      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    }
  );

  document
    .querySelectorAll(".mobile-menu a")
    .forEach((link) => {
      link.addEventListener(
        "click",
        closeMobileMenu
      );
    });

  /* =======================================================
     SEARCH OVERLAY
  ======================================================= */

  function openSearch() {
    searchOverlay?.classList.add(
      "open"
    );

    document.body.classList.add(
      "search-open"
    );

    setTimeout(() => {
      searchInput?.focus();
    }, 300);
  }

  function closeSearchOverlay() {
    searchOverlay?.classList.remove(
      "open"
    );

    document.body.classList.remove(
      "search-open"
    );
  }

  searchToggle?.addEventListener(
    "click",
    openSearch
  );

  closeSearch?.addEventListener(
    "click",
    closeSearchOverlay
  );

  /* =======================================================
     SEARCH
  ======================================================= */

  function performSearch(value) {
    const term =
      value.trim().toLowerCase();

    if (!term) {
      searchInput?.focus();
      return;
    }

    const pages = {
      juttis: "collection.html",
      jutti: "collection.html",

      kolhapuris: "collection.html",
      kolhapuri: "collection.html",

      mojaris: "collection.html",
      mojari: "collection.html",

      sneakers: "shoes.html",
      sneaker: "shoes.html",

      sandals: "collection.html",
      sandal: "collection.html",

      shoes: "shoes.html",
      footwear: "collection.html",

      new: "new-arrivals.html",
      arrivals: "new-arrivals.html",

      collection: "collection.html",

      gift: "gift-cards.html",
      gifts: "gift-cards.html",

      craftsmanship: "craftsmanship.html",
      craft: "craftsmanship.html",

      shipping: "shipping.html",

      returns: "returns.html",
      return: "returns.html",

      size: "size-guide.html",
      sizes: "size-guide.html",

      faq: "faq.html",

      contact: "contact.html",

      journal: "journal.html",
    };

    let destination =
      "collection.html";

    Object.keys(pages).forEach(
      (keyword) => {
        if (term.includes(keyword)) {
          destination =
            pages[keyword];
        }
      }
    );

    closeSearchOverlay();

    window.location.href =
      destination;
  }

  searchButton?.addEventListener(
    "click",
    () => {
      performSearch(
        searchInput?.value || ""
      );
    }
  );

  searchInput?.addEventListener(
    "keydown",
    (event) => {
      if (event.key === "Enter") {
        event.preventDefault();

        performSearch(
          searchInput?.value || ""
        );
      }
    }
  );

  /* =======================================================
     SEARCH SUGGESTIONS
  ======================================================= */

  document
    .querySelectorAll("[data-search]")
    .forEach((button) => {
      button.addEventListener(
        "click",
        () => {
          const searchValue =
            button.dataset.search ||
            "";

          if (searchInput) {
            searchInput.value =
              searchValue;
          }

          performSearch(searchValue);
        }
      );
    });

  /* =======================================================
     WISHLIST
  ======================================================= */

  let wishlistValue = 0;

  wishlistToggle?.addEventListener(
    "click",
    () => {
      wishlistValue =
        wishlistValue === 0 ? 1 : 0;

      const icon =
        wishlistToggle.querySelector(
          "i"
        );

      if (wishlistValue === 1) {
        icon?.classList.remove(
          "fa-regular"
        );

        icon?.classList.add(
          "fa-solid"
        );

        showToast(
          "Wishlist",
          "Your wishlist is ready."
        );
      } else {
        icon?.classList.remove(
          "fa-solid"
        );

        icon?.classList.add(
          "fa-regular"
        );

        showToast(
          "Wishlist",
          "Item removed from wishlist."
        );
      }

      wishlistCount.forEach(
        (element) => {
          element.textContent =
            wishlistValue;
        }
      );

      /* Small button animation */

      if (
        typeof wishlistToggle.animate ===
        "function"
      ) {
        wishlistToggle.animate(
          [
            {
              transform: "scale(1)",
            },
            {
              transform: "scale(1.12)",
            },
            {
              transform: "scale(1)",
            },
          ],
          {
            duration: 260,
            easing: "ease-out",
          }
        );
      }
    }
  );

  /* =======================================================
     CART
  ======================================================= */

  let cartValue = 0;

  function updateCartCount() {
    cartCount.forEach(
      (element) => {
        element.textContent =
          cartValue;
      }
    );
  }

  function openCart() {
    cartPanel?.classList.add(
      "open"
    );

    cartBackdrop?.classList.add(
      "show"
    );

    document.body.classList.add(
      "cart-open"
    );
  }

  function closeCartPanel() {
    cartPanel?.classList.remove(
      "open"
    );

    cartBackdrop?.classList.remove(
      "show"
    );

    document.body.classList.remove(
      "cart-open"
    );
  }

  cartToggle?.addEventListener(
    "click",
    openCart
  );

  closeCart?.addEventListener(
    "click",
    closeCartPanel
  );

  cartBackdrop?.addEventListener(
    "click",
    closeCartPanel
  );

  continueShopping?.addEventListener(
    "click",
    closeCartPanel
  );

  updateCartCount();

  /* =======================================================
     CART BUTTONS
  ======================================================= */

  document
    .querySelectorAll(
      ".add-to-cart, .quick-add"
    )
    .forEach((button) => {
      button.addEventListener(
        "click",
        () => {
          cartValue++;

          updateCartCount();

          const productName =
            button.dataset.product ||
            "Selected footwear";

          showToast(
            "Added to Bag",
            `${productName} has been added to your bag.`
          );

          const originalText =
            button.textContent;

          if (
            button.classList.contains(
              "quick-add"
            )
          ) {
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
        }
      );
    });

  /* =======================================================
     TOAST
  ======================================================= */

  let toastTimer;

  function showToast(
    title,
    message
  ) {
    if (!toast) return;

    clearTimeout(toastTimer);

    if (toastTitle) {
      toastTitle.textContent =
        title;
    }

    if (toastMessage) {
      toastMessage.textContent =
        message;
    }

    toast.classList.add("show");

    toastTimer = setTimeout(() => {
      toast.classList.remove(
        "show"
      );
    }, 3000);
  }

  /* =======================================================
     SCROLL REVEAL
  ======================================================= */

  const revealElements =
    document.querySelectorAll(
      ".reveal"
    );

  if (
    "IntersectionObserver" in
    window
  ) {
    const revealObserver =
      new IntersectionObserver(
        (entries) => {
          entries.forEach(
            (entry) => {
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
            }
          );
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

  /* =======================================================
     HERO PARALLAX
  ======================================================= */

  const heroFrame =
    document.querySelector(
      ".hero-frame"
    );

  function updateHeroParallax() {
    if (
      !heroFrame ||
      window.innerWidth < 900
    ) {
      return;
    }

    const scroll =
      window.scrollY;

    heroFrame.style.transform =
      `rotate(3deg) translateY(${scroll * 0.035}px)`;
  }

  window.addEventListener(
    "scroll",
    updateHeroParallax,
    {
      passive: true,
    }
  );

  updateHeroParallax();

  /* =======================================================
     IMAGE MOUSE MOVEMENT
  ======================================================= */

  const imageCards =
    document.querySelectorAll(
      ".image-story-image, .split-image, .craft-image"
    );

  const finePointer =
    window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    );

  imageCards.forEach((card) => {
    card.addEventListener(
      "mousemove",
      (event) => {
        if (
          window.innerWidth < 900 ||
          !finePointer.matches
        ) {
          return;
        }

        const rect =
          card.getBoundingClientRect();

        if (
          !rect.width ||
          !rect.height
        ) {
          return;
        }

        const x =
          event.clientX -
          rect.left;

        const y =
          event.clientY -
          rect.top;

        const rotateX =
          (y / rect.height - 0.5) *
          -2;

        const rotateY =
          (x / rect.width - 0.5) *
          2;

        card.style.transform =
          `perspective(900px)
           rotateX(${rotateX}deg)
           rotateY(${rotateY}deg)`;
      }
    );

    card.addEventListener(
      "mouseleave",
      () => {
        card.style.transform = "";
      }
    );
  });

  /* =======================================================
     SMOOTH ANCHOR LINKS
  ======================================================= */

  document
    .querySelectorAll(
      'a[href^="#"]'
    )
    .forEach((link) => {
      link.addEventListener(
        "click",
        (event) => {
          const targetId =
            link.getAttribute(
              "href"
            );

          if (
            !targetId ||
            targetId === "#"
          ) {
            event.preventDefault();
            return;
          }

          let target = null;

          try {
            target =
              document.querySelector(
                targetId
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
    });

  /* =======================================================
     ESCAPE KEY
  ======================================================= */

  document.addEventListener(
    "keydown",
    (event) => {
      if (
        event.key !== "Escape"
      ) {
        return;
      }

      closeMobileMenu();

      closeSearchOverlay();

      closeCartPanel();
    }
  );

  /* =======================================================
     RESIZE
  ======================================================= */

  window.addEventListener(
    "resize",
    () => {
      if (window.innerWidth > 900) {
        closeMobileMenu();
      }

      if (
        window.innerWidth < 900 &&
        heroFrame
      ) {
        heroFrame.style.transform =
          "";
      }
    }
  );
});
