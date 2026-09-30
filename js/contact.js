/* =========================================================
   DESISTEPS
   CONTACT PAGE JAVASCRIPT
   Walk Your Tradition
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =======================================================
     PAGE LOADER
  ======================================================= */

  const pageLoader = document.getElementById("pageLoader");

  window.addEventListener("load", () => {
    setTimeout(() => {
      pageLoader?.classList.add("hide");
    }, 600);
  });

  /* =======================================================
     NAVBAR SCROLL
  ======================================================= */

  const siteHeader = document.getElementById("siteHeader");

  const updateHeader = () => {
    if (!siteHeader) return;

    if (window.scrollY > 50) {
      siteHeader.classList.add("scrolled");
    } else {
      siteHeader.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", updateHeader, { passive: true });

  updateHeader();

  /* =======================================================
     MOBILE MENU
  ======================================================= */

  const menuToggle = document.getElementById("menuToggle");

  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.classList.toggle("active");

      navLinks.classList.toggle("active", isOpen);

      document.body.classList.toggle("menu-open", isOpen);

      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    /* Close menu after clicking link */

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.classList.remove("active");

        navLinks.classList.remove("active");

        document.body.classList.remove("menu-open");

        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* =======================================================
     ESCAPE CLOSES MENU
  ======================================================= */

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;

    if (menuToggle && navLinks) {
      menuToggle.classList.remove("active");

      navLinks.classList.remove("active");

      document.body.classList.remove("menu-open");

      menuToggle.setAttribute("aria-expanded", "false");
    }
  });

  /* =======================================================
     SCROLL REVEAL
  ======================================================= */

  const revealElements = document.querySelectorAll(".reveal");

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
        rootMargin: "0px 0px -40px 0px",
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

  /* =======================================================
     FAQ ACCORDION
  ======================================================= */

  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    const answer = item.querySelector(".faq-answer");

    if (!question || !answer) return;

    question.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");

      /* Close all */

      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("open");

          const otherQuestion = otherItem.querySelector(".faq-question");

          const otherAnswer = otherItem.querySelector(".faq-answer");

          otherQuestion?.setAttribute("aria-expanded", "false");

          if (otherAnswer) {
            otherAnswer.style.maxHeight = null;
          }
        }
      });

      /* Toggle current */

      if (!isOpen) {
        item.classList.add("open");

        question.setAttribute("aria-expanded", "true");

        answer.style.maxHeight = answer.scrollHeight + "px";
      } else {
        item.classList.remove("open");

        question.setAttribute("aria-expanded", "false");

        answer.style.maxHeight = null;
      }
    });
  });

  /* =======================================================
     CHARACTER COUNTER
  ======================================================= */

  const message = document.getElementById("message");

  const characterCount = document.querySelector(".character-count");

  if (message && characterCount) {
    const updateCharacterCount = () => {
      const length = message.value.length;

      characterCount.textContent = `${length} / 500`;
    };

    message.addEventListener("input", updateCharacterCount);

    updateCharacterCount();
  }

  /* =======================================================
     FORM VALIDATION
  ======================================================= */

  const contactForm = document.getElementById("contactFormElement");

  const formStatus = document.getElementById("formStatus");

  if (contactForm) {
    const showError = (input, messageText) => {
      const group = input.closest(".input-group");

      if (!group) return;

      group.classList.add("invalid");

      const error = group.querySelector(".error-message");

      if (error) {
        error.textContent = messageText;
      }
    };

    const clearError = (input) => {
      const group = input.closest(".input-group");

      if (!group) return;

      group.classList.remove("invalid");

      const error = group.querySelector(".error-message");

      if (error) {
        error.textContent = "";
      }
    };

    const validateEmail = (email) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validateForm = () => {
      let valid = true;

      const name = document.getElementById("name");

      const email = document.getElementById("email");

      const subject = document.getElementById("subject");

      const messageField = document.getElementById("message");

      const consent = document.getElementById("consent");

      /* Name */

      if (!name.value.trim()) {
        showError(name, "Please enter your name.");

        valid = false;
      } else {
        clearError(name);
      }

      /* Email */

      if (!email.value.trim()) {
        showError(email, "Please enter your email.");

        valid = false;
      } else if (!validateEmail(email.value.trim())) {
        showError(email, "Please enter a valid email.");

        valid = false;
      } else {
        clearError(email);
      }

      /* Subject */

      if (!subject.value) {
        showError(subject, "Please select a subject.");

        valid = false;
      } else {
        clearError(subject);
      }

      /* Message */

      if (!messageField.value.trim()) {
        showError(messageField, "Please enter your message.");

        valid = false;
      } else if (messageField.value.trim().length < 10) {
        showError(messageField, "Message should be at least 10 characters.");

        valid = false;
      } else {
        clearError(messageField);
      }

      /* Consent */

      if (!consent.checked) {
        consent.closest(".checkbox-wrap")?.classList.add("consent-error");

        valid = false;
      } else {
        consent.closest(".checkbox-wrap")?.classList.remove("consent-error");
      }

      return valid;
    };

    /* Clear errors while typing */

    contactForm.querySelectorAll("input, textarea, select").forEach((input) => {
      input.addEventListener("input", () => {
        if (input.value.trim()) {
          clearError(input);
        }
      });

      input.addEventListener("change", () => {
        if (input.value) {
          clearError(input);
        }
      });
    });

    /* Submit */

    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!validateForm()) {
        formStatus.textContent = "Please check the highlighted fields.";

        formStatus.classList.remove("success");

        return;
      }

      const submitButton = contactForm.querySelector(".submit-btn");

      submitButton?.classList.add("loading");

      if (submitButton) {
        submitButton.querySelector("span").textContent = "SENDING...";
      }

      formStatus.textContent = "";

      /* Demo submission */

      setTimeout(() => {
        submitButton?.classList.remove("loading");

        if (submitButton) {
          submitButton.querySelector("span").textContent = "MESSAGE SENT";
        }

        formStatus.textContent = "Thank you! Your message has been received.";

        formStatus.classList.add("success");

        contactForm.reset();

        if (characterCount) {
          characterCount.textContent = "0 / 500";
        }

        setTimeout(() => {
          if (submitButton) {
            submitButton.querySelector("span").textContent = "SEND MESSAGE";
          }
        }, 3000);
      }, 1200);
    });
  }

  /* =======================================================
     INPUT FOCUS ANIMATION
  ======================================================= */

  document
    .querySelectorAll(
      ".input-wrap input, .input-wrap select, .textarea-wrap textarea",
    )
    .forEach((input) => {
      input.addEventListener("focus", () => {
        input.closest(".input-wrap, .textarea-wrap")?.classList.add("focused");
      });

      input.addEventListener("blur", () => {
        input
          .closest(".input-wrap, .textarea-wrap")
          ?.classList.remove("focused");
      });
    });

  /* =======================================================
     SMOOTH ANCHOR SCROLL
  ======================================================= */

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const targetId = anchor.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      const headerOffset = 85;

      const targetPosition =
        target.getBoundingClientRect().top + window.scrollY - headerOffset;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    });
  });

  /* =======================================================
     CUSTOM CURSOR
  ======================================================= */

  const cursorDot = document.querySelector(".cursor-dot");

  const cursorRing = document.querySelector(".cursor-ring");

  const finePointer = window.matchMedia("(pointer: fine)").matches;

  if (finePointer && cursorDot && cursorRing) {
    let mouseX = 0;
    let mouseY = 0;

    let ringX = 0;
    let ringY = 0;

    window.addEventListener(
      "mousemove",
      (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;

        cursorDot.style.left = `${mouseX}px`;

        cursorDot.style.top = `${mouseY}px`;
      },
      { passive: true },
    );

    const animateCursor = () => {
      ringX += (mouseX - ringX) * 0.14;

      ringY += (mouseY - ringY) * 0.14;

      cursorRing.style.left = `${ringX}px`;

      cursorRing.style.top = `${ringY}px`;

      requestAnimationFrame(animateCursor);
    };

    animateCursor();

    document
      .querySelectorAll("a, button, input, textarea, select")
      .forEach((element) => {
        element.addEventListener("mouseenter", () => {
          cursorRing.classList.add("active");
        });

        element.addEventListener("mouseleave", () => {
          cursorRing.classList.remove("active");
        });
      });
  }

  /* =======================================================
     PARALLAX HERO IMAGE
  ======================================================= */

  const heroImage = document.querySelector(".hero-image-wrap");

  if (heroImage && window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener(
      "mousemove",
      (event) => {
        const x = (window.innerWidth / 2 - event.clientX) / 70;

        const y = (window.innerHeight / 2 - event.clientY) / 70;

        heroImage.style.transform = `translate(${x}px, ${y}px)`;
      },
      { passive: true },
    );
  }

  /* =======================================================
     IMAGE ERROR FALLBACK
  ======================================================= */

  document.querySelectorAll("img").forEach((image) => {
    image.addEventListener("error", () => {
      image.style.display = "none";

      image.closest(".hero-image")?.classList.add("image-fallback");
    });
  });

  /* =======================================================
     CURRENT YEAR
  ======================================================= */

  const yearElement = document.querySelector(".footer-bottom span:first-child");

  if (yearElement) {
    yearElement.textContent = `© ${new Date().getFullYear()} DESISTEPS. All rights reserved.`;
  }
});
