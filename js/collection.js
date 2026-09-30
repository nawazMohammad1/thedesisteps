/* =========================================================
   DESISTEPS
   COLLECTION PAGE JAVASCRIPT
   Walk Your Tradition
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     PRELOADER
  ======================================================= */

  const preloader =
    document.querySelector(".preloader");


  function hidePreloader() {

    if (!preloader) return;

    preloader.classList.add("hide");

    setTimeout(() => {
      preloader.style.display = "none";
    }, 700);

  }


  window.addEventListener("load", () => {

    setTimeout(hidePreloader, 500);

  });


  /* Fallback */

  setTimeout(hidePreloader, 3000);


  /* =======================================================
     NAVBAR SCROLL
  ======================================================= */

  const navbar =
    document.querySelector(".navbar");


  function handleNavbar() {

    if (!navbar) return;

    if (window.scrollY > 40) {

      navbar.classList.add("scrolled");

    } else {

      navbar.classList.remove("scrolled");

    }

  }


  window.addEventListener(
    "scroll",
    handleNavbar,
    { passive: true }
  );


  handleNavbar();


  /* =======================================================
     MOBILE MENU
  ======================================================= */

  const menuToggle =
    document.querySelector(".menu-toggle");

  const mobileMenu =
    document.querySelector(".mobile-menu");


  function openMobileMenu() {

    if (!menuToggle || !mobileMenu) return;

    menuToggle.classList.add("active");

    mobileMenu.classList.add("active");

    document.body.classList.add("menu-open");

    menuToggle.setAttribute(
      "aria-expanded",
      "true"
    );

  }


  function closeMobileMenu() {

    if (!menuToggle || !mobileMenu) return;

    menuToggle.classList.remove("active");

    mobileMenu.classList.remove("active");

    document.body.classList.remove("menu-open");

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

  }


  menuToggle?.addEventListener(
    "click",
    () => {

      const isOpen =
        mobileMenu?.classList.contains("active");

      if (isOpen) {

        closeMobileMenu();

      } else {

        openMobileMenu();

      }

    }
  );


  /* Close mobile menu after navigation */

  document
    .querySelectorAll(".mobile-menu a")
    .forEach((link) => {

      link.addEventListener(
        "click",
        () => {

          closeMobileMenu();

        }
      );

    });


  /* =======================================================
     SEARCH OVERLAY
  ======================================================= */

  const searchTrigger =
    document.querySelector(".search-trigger");

  const searchOverlay =
    document.querySelector(".search-overlay");

  const closeSearch =
    document.querySelector(".close-search");

  const searchInput =
    document.querySelector("#searchInput");

  const searchButton =
    document.querySelector("#searchButton");


  function openSearch() {

    if (!searchOverlay) return;

    searchOverlay.classList.add("active");

    document.body.classList.add("search-open");

    setTimeout(() => {

      searchInput?.focus();

    }, 350);

  }


  function closeSearchOverlay() {

    if (!searchOverlay) return;

    searchOverlay.classList.remove("active");

    document.body.classList.remove("search-open");

  }


  searchTrigger?.addEventListener(
    "click",
    openSearch
  );


  closeSearch?.addEventListener(
    "click",
    closeSearchOverlay
  );


  /* =======================================================
     ESCAPE KEY
  ======================================================= */

  document.addEventListener(
    "keydown",
    (event) => {

      if (event.key !== "Escape") return;

      closeSearchOverlay();

      closeMobileMenu();

    }
  );


  /* =======================================================
     PRODUCT ELEMENTS
  ======================================================= */

  const productCards = [
    ...document.querySelectorAll(".product-card")
  ];

  const productCount =
    document.querySelector("#productCount");

  const emptyState =
    document.querySelector("#emptyState");


  function updateProductCount(count) {

    if (!productCount) return;

    productCount.textContent =
      String(count).padStart(2, "0");

  }


  function updateEmptyState(count) {

    if (!emptyState) return;

    if (count === 0) {

      emptyState.classList.add("show");

    } else {

      emptyState.classList.remove("show");

    }

  }


  /* =======================================================
     SEARCH PRODUCTS
  ======================================================= */

  function searchProducts() {

    if (!searchInput) return;

    const query =
      searchInput.value
        .trim()
        .toLowerCase();


    let visibleCount = 0;


    productCards.forEach((card) => {

      const productName =
        card.dataset.name?.toLowerCase() || "";

      const category =
        card.dataset.category?.toLowerCase() || "";

      const cardText =
        card.textContent.toLowerCase();


      const matches =
        !query ||
        productName.includes(query) ||
        category.includes(query) ||
        cardText.includes(query);


      if (matches) {

        card.classList.remove("hide");

        card.style.display = "";

        visibleCount++;

      } else {

        card.classList.add("hide");

        card.style.display = "none";

      }

    });


    updateProductCount(visibleCount);

    updateEmptyState(visibleCount);

    closeSearchOverlay();


    document
      .querySelector("#collection")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

  }


  searchButton?.addEventListener(
    "click",
    searchProducts
  );


  searchInput?.addEventListener(
    "keydown",
    (event) => {

      if (event.key !== "Enter") return;

      event.preventDefault();

      searchProducts();

    }
  );


  /* =======================================================
     CATEGORY FILTER
  ======================================================= */

  const filterButtons =
    document.querySelectorAll(".filter-btn");


  function filterProducts(filter = "all") {

    let visibleCount = 0;


    productCards.forEach((card) => {

      const category =
        card.dataset.category || "";


      const shouldShow =
        filter === "all" ||
        category === filter;


      if (shouldShow) {

        card.classList.remove("hide");

        card.style.display = "";

        visibleCount++;

      } else {

        card.classList.add("hide");

        card.style.display = "none";

      }

    });


    updateProductCount(visibleCount);

    updateEmptyState(visibleCount);

  }


  filterButtons.forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const filter =
          button.dataset.filter || "all";


        filterButtons.forEach((btn) => {

          btn.classList.remove("active");

        });


        button.classList.add("active");


        filterProducts(filter);

      }
    );

  });


  /* =======================================================
     WISHLIST
  ======================================================= */

  const wishlistButtons =
    document.querySelectorAll(
      ".wishlist-product"
    );


  const wishlistCountElements =
    document.querySelectorAll(
      ".wishlist-count"
    );


  let wishlistTotal = 0;


  function updateWishlistCount() {

    wishlistCountElements.forEach(
      (element) => {

        element.textContent =
          wishlistTotal;

      }
    );

  }


  wishlistButtons.forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const isActive =
          button.classList.toggle("active");


        const icon =
          button.querySelector("i");


        if (isActive) {

          icon?.classList.remove(
            "fa-regular"
          );

          icon?.classList.add(
            "fa-solid"
          );

          wishlistTotal++;

        } else {

          icon?.classList.remove(
            "fa-solid"
          );

          icon?.classList.add(
            "fa-regular"
          );

          wishlistTotal =
            Math.max(
              0,
              wishlistTotal - 1
            );

        }


        updateWishlistCount();


        /* Small wishlist animation */

        if (button.animate) {

          button.animate(
            [
              {
                transform: "scale(1)"
              },
              {
                transform: "scale(1.25)"
              },
              {
                transform: "scale(1)"
              }
            ],
            {
              duration: 350,
              easing: "ease-out"
            }
          );

        }

      }
    );

  });


  /* =======================================================
     ADD TO BAG
  ======================================================= */

  const quickAddButtons =
    document.querySelectorAll(
      ".quick-add"
    );


  const bagCountElements =
    document.querySelectorAll(
      ".bag-count, .cart-count"
    );


  const cartToast =
    document.querySelector(".cart-toast");


  const toastProduct =
    document.querySelector(".toast-product");


  let bagTotal = 0;

  let toastTimer;


  function updateBagCount() {

    bagCountElements.forEach(
      (element) => {

        element.textContent =
          bagTotal;

      }
    );

  }


  quickAddButtons.forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const product =
          button.dataset.product ||
          "Product";


        bagTotal++;

        updateBagCount();


        if (toastProduct) {

          toastProduct.textContent =
            product;

        }


        cartToast?.classList.add(
          "show"
        );


        clearTimeout(toastTimer);


        toastTimer =
          setTimeout(() => {

            cartToast?.classList.remove(
              "show"
            );

          }, 2500);


        /* Button feedback */

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


  /* =======================================================
     SCROLL REVEAL
  ======================================================= */

  const revealElements =
    document.querySelectorAll(".reveal");


  if ("IntersectionObserver" in window) {

    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach((entry) => {

            if (!entry.isIntersecting) return;


            /*
              IMPORTANT:
              DESISTEPS collection CSS
              uses .reveal.active
            */

            entry.target.classList.add(
              "active"
            );


            observer.unobserve(
              entry.target
            );

          });

        },
        {
          threshold: 0.12,
          rootMargin:
            "0px 0px -40px 0px"
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
          "active"
        );

      }
    );

  }


  /* =======================================================
     STAGGER PRODUCT ANIMATION
  ======================================================= */

  productCards.forEach(
    (card, index) => {

      card.style.transitionDelay =
        `${index * 70}ms`;

    }
  );


  /* =======================================================
     NEWSLETTER
  ======================================================= */

  const newsletterForm =
    document.querySelector(
      "#newsletterForm"
    );


  const newsletterEmail =
    document.querySelector(
      "#newsletterEmail"
    );


  newsletterForm?.addEventListener(
    "submit",
    (event) => {

      event.preventDefault();


      const email =
        newsletterEmail?.value
          .trim() || "";


      if (!email) {

        newsletterEmail?.focus();

        return;

      }


      const button =
        newsletterForm.querySelector(
          "button"
        );


      if (!button) return;


      const original =
        button.innerHTML;


      button.innerHTML =
        `SUBSCRIBED <i class="fa-solid fa-check"></i>`;


      if (newsletterEmail) {
        newsletterEmail.value = "";
      }


      setTimeout(() => {

        button.innerHTML =
          original;

      }, 3000);

    }
  );


  /* =======================================================
     SMOOTH INTERNAL LINKS
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
            link.getAttribute("href");


          if (
            !targetId ||
            targetId === "#"
          ) {

            event.preventDefault();

            return;

          }


          const target =
            document.querySelector(
              targetId
            );


          if (!target) return;


          event.preventDefault();


          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }
      );

    });


  /* =======================================================
     HERO PARALLAX
  ======================================================= */

  const hero =
    document.querySelector(
      ".collection-hero"
    );


  const finePointer =
    window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;


  function updateHeroParallax() {

    if (!hero || !finePointer) return;


    if (window.innerWidth < 900) {

      hero.style.backgroundPosition =
        "";

      return;

    }


    const scroll =
      window.scrollY;


    if (scroll < window.innerHeight) {

      hero.style.backgroundPosition =
        `center ${scroll * 0.15}px`;

    }

  }


  if (hero && finePointer) {

    window.addEventListener(
      "scroll",
      updateHeroParallax,
      { passive: true }
    );


    updateHeroParallax();

  }


  /* =======================================================
     PRODUCT CARD TILT
  ======================================================= */

  if (finePointer) {

    productCards.forEach((card) => {

      let rafId = null;


      card.addEventListener(
        "mousemove",
        (event) => {

          if (rafId) return;


          rafId =
            requestAnimationFrame(() => {

              const rect =
                card.getBoundingClientRect();


              const x =
                event.clientX -
                rect.left;


              const y =
                event.clientY -
                rect.top;


              const rotateY =
                (x / rect.width - 0.5) * 4;


              const rotateX =
                (y / rect.height - 0.5) * -4;


              card.style.transform =
                `perspective(900px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)`;


              rafId = null;

            });

        }
      );


      card.addEventListener(
        "mouseleave",
        () => {

          if (rafId) {

            cancelAnimationFrame(
              rafId
            );

            rafId = null;

          }


          card.style.transform = "";

        }
      );

    });

  }


  /* =======================================================
     IMAGE FALLBACK
  ======================================================= */

  document
    .querySelectorAll(
      ".product-image img, .heritage-image img"
    )
    .forEach((image) => {

      image.addEventListener(
        "error",
        () => {

          image.style.display =
            "none";


          image.parentElement
            ?.classList.add(
              "image-error"
            );

        }
      );

    });


  /* =======================================================
     RESIZE HANDLING
  ======================================================= */

  window.addEventListener(
    "resize",
    () => {

      /* Close mobile menu on desktop */

      if (window.innerWidth > 900) {

        closeMobileMenu();

      }


      /* Disable tilt transform on smaller screens */

      if (window.innerWidth <= 900) {

        productCards.forEach(
          (card) => {

            card.style.transform = "";

          }
        );

      }


      updateHeroParallax();

    }
  );


  /* =======================================================
     INITIAL PRODUCT COUNT
  ======================================================= */

  filterProducts("all");

});
