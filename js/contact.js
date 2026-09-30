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

  function hidePageLoader() {
    if (!pageLoader) return;

    pageLoader.classList.add("hide");

    setTimeout(() => {
      pageLoader.style.display = "none";
    }, 700);
  }

  window.addEventListener("load", () => {
    setTimeout(hidePageLoader, 600);
  });

  /* Fallback in case the load event is delayed */
  setTimeout(hidePageLoader, 3000);


  /* =======================================================
     NAVBAR SCROLL
  ======================================================= */

  const siteHeader =
    document.getElementById("siteHeader");

  function updateHeader() {

    if (!siteHeader) return;

    if (window.scrollY > 50) {
      siteHeader.classList.add("scrolled");
    } else {
      siteHeader.classList.remove("scrolled");
    }
  }

  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );

  updateHeader();


  /* =======================================================
     MOBILE MENU
  ======================================================= */

  const menuToggle =
    document.getElementById("menuToggle");

  const navLinks =
    document.getElementById("navLinks");


  function openMenu() {

    if (!menuToggle || !navLinks) return;

    menuToggle.classList.add("active");

    navLinks.classList.add("active");

    document.body.classList.add("menu-open");

    menuToggle.setAttribute(
      "aria-expanded",
      "true"
    );
  }


  function closeMenu() {

    if (!menuToggle || !navLinks) return;

    menuToggle.classList.remove("active");

    navLinks.classList.remove("active");

    document.body.classList.remove("menu-open");

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );
  }


  menuToggle?.addEventListener("click", () => {

    const isOpen =
      navLinks?.classList.contains("active");

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }

  });


  navLinks?.querySelectorAll("a").forEach((link) => {

    link.addEventListener("click", () => {
      closeMenu();
    });

  });


  /* =======================================================
     ESCAPE KEY
  ======================================================= */

  document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
      closeMenu();
    }

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
              Contact CSS uses .reveal.active
            */

            entry.target.classList.add("active");

            observer.unobserve(entry.target);

          });

        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -40px 0px"
        }
      );


    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });

  } else {

    revealElements.forEach((element) => {
      element.classList.add("active");
    });

  }


  /* =======================================================
     FAQ ACCORDION
  ======================================================= */

  const faqItems =
    document.querySelectorAll(".faq-item");


  faqItems.forEach((item) => {

    const question =
      item.querySelector(".faq-question");

    const answer =
      item.querySelector(".faq-answer");


    if (!question || !answer) return;


    question.addEventListener("click", () => {

      const isOpen =
        item.classList.contains("open");


      /* Close all other FAQ items */

      faqItems.forEach((otherItem) => {

        if (otherItem === item) return;

        otherItem.classList.remove("open");

        const otherQuestion =
          otherItem.querySelector(".faq-question");

        const otherAnswer =
          otherItem.querySelector(".faq-answer");


        otherQuestion?.setAttribute(
          "aria-expanded",
          "false"
        );


        if (otherAnswer) {
          otherAnswer.style.maxHeight = null;
        }

      });


      /* Open current item */

      if (!isOpen) {

        item.classList.add("open");

        question.setAttribute(
          "aria-expanded",
          "true"
        );

        answer.style.maxHeight =
          `${answer.scrollHeight}px`;

      } else {

        item.classList.remove("open");

        question.setAttribute(
          "aria-expanded",
          "false"
        );

        answer.style.maxHeight = null;

      }

    });

  });


  /* =======================================================
     CHARACTER COUNTER
  ======================================================= */

  const message =
    document.getElementById("message");

  const characterCount =
    document.querySelector(".character-count");


  function updateCharacterCount() {

    if (!message || !characterCount) return;

    const length =
      message.value.length;

    characterCount.textContent =
      `${length} / 500`;
  }


  if (message && characterCount) {

    message.addEventListener(
      "input",
      updateCharacterCount
    );

    updateCharacterCount();

  }


  /* =======================================================
     FORM VALIDATION
  ======================================================= */

  const contactForm =
    document.getElementById("contactFormElement");

  const formStatus =
    document.getElementById("formStatus");


  if (contactForm) {

    const showError = (input, messageText) => {

      if (!input) return;

      const group =
        input.closest(".input-group");

      if (!group) return;

      group.classList.add("invalid");

      const error =
        group.querySelector(".error-message");

      if (error) {
        error.textContent = messageText;
      }
    };


    const clearError = (input) => {

      if (!input) return;

      const group =
        input.closest(".input-group");

      if (!group) return;

      group.classList.remove("invalid");

      const error =
        group.querySelector(".error-message");

      if (error) {
        error.textContent = "";
      }
    };


    const validateEmail = (email) => {

      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(email);

    };


    const validateForm = () => {

      let valid = true;


      const name =
        document.getElementById("name");

      const email =
        document.getElementById("email");

      const subject =
        document.getElementById("subject");

      const messageField =
        document.getElementById("message");

      const consent =
        document.getElementById("consent");


      /* -----------------------------------------------
         NAME
      ----------------------------------------------- */

      if (!name) {
        valid = false;
      } else if (!name.value.trim()) {

        showError(
          name,
          "Please enter your name."
        );

        valid = false;

      } else {

        clearError(name);

      }


      /* -----------------------------------------------
         EMAIL
      ----------------------------------------------- */

      if (!email) {

        valid = false;

      } else if (!email.value.trim()) {

        showError(
          email,
          "Please enter your email."
        );

        valid = false;

      } else if (
        !validateEmail(email.value.trim())
      ) {

        showError(
          email,
          "Please enter a valid email."
        );

        valid = false;

      } else {

        clearError(email);

      }


      /* -----------------------------------------------
         SUBJECT
      ----------------------------------------------- */

      if (!subject) {

        valid = false;

      } else if (!subject.value) {

        showError(
          subject,
          "Please select a subject."
        );

        valid = false;

      } else {

        clearError(subject);

      }


      /* -----------------------------------------------
         MESSAGE
      ----------------------------------------------- */

      if (!messageField) {

        valid = false;

      } else if (!messageField.value.trim()) {

        showError(
          messageField,
          "Please enter your message."
        );

        valid = false;

      } else if (
        messageField.value.trim().length < 10
      ) {

        showError(
          messageField,
          "Message should be at least 10 characters."
        );

        valid = false;

      } else if (
        messageField.value.length > 500
      ) {

        showError(
          messageField,
          "Message cannot exceed 500 characters."
        );

        valid = false;

      } else {

        clearError(messageField);

      }


      /* -----------------------------------------------
         CONSENT
      ----------------------------------------------- */

      if (consent) {

        const checkboxWrap =
          consent.closest(".checkbox-wrap");


        if (!consent.checked) {

          checkboxWrap?.classList.add(
            "consent-error"
          );

          valid = false;

        } else {

          checkboxWrap?.classList.remove(
            "consent-error"
          );

        }

      }


      return valid;

    };


    /* ===================================================
       CLEAR ERRORS WHILE TYPING
    =================================================== */

    contactForm
      .querySelectorAll(
        "input, textarea, select"
      )
      .forEach((input) => {

        input.addEventListener(
          "input",
          () => {

            if (
              input.value.trim()
            ) {

              clearError(input);

            }

          }
        );


        input.addEventListener(
          "change",
          () => {

            if (input.value) {

              clearError(input);

            }

          }
        );

      });


    /* ===================================================
       CONSENT CHANGE
    =================================================== */

    const consent =
      document.getElementById("consent");


    consent?.addEventListener(
      "change",
      () => {

        const wrapper =
          consent.closest(".checkbox-wrap");

        if (consent.checked) {

          wrapper?.classList.remove(
            "consent-error"
          );

        }

      }
    );


    /* ===================================================
       FORM SUBMIT
    =================================================== */

    contactForm.addEventListener(
      "submit",
      (event) => {

        event.preventDefault();


        if (!validateForm()) {

          if (formStatus) {

            formStatus.textContent =
              "Please check the highlighted fields.";

            formStatus.classList.remove(
              "success"
            );

          }

          return;

        }


        const submitButton =
          contactForm.querySelector(".submit-btn");


        submitButton?.classList.add(
          "loading"
        );


        const buttonText =
          submitButton?.querySelector("span");


        if (buttonText) {
          buttonText.textContent =
            "SENDING...";
        }


        if (formStatus) {

          formStatus.textContent = "";

          formStatus.classList.remove(
            "success"
          );

        }


        /* ---------------------------------------------
           DEMO SUBMISSION
           Replace this with your backend/email
           service when ready.
        --------------------------------------------- */

        setTimeout(() => {

          submitButton?.classList.remove(
            "loading"
          );


          if (buttonText) {

            buttonText.textContent =
              "MESSAGE SENT";

          }


          if (formStatus) {

            formStatus.textContent =
              "Thank you! Your message has been received.";

            formStatus.classList.add(
              "success"
            );

          }


          contactForm.reset();


          if (characterCount) {

            characterCount.textContent =
              "0 / 500";

          }


          setTimeout(() => {

            if (buttonText) {

              buttonText.textContent =
                "SEND MESSAGE";

            }

          }, 3000);

        }, 1200);

      }
    );

  }


  /* =======================================================
     INPUT FOCUS ANIMATION
  ======================================================= */

  document
    .querySelectorAll(
      ".input-wrap input, " +
      ".input-wrap select, " +
      ".textarea-wrap textarea"
    )
    .forEach((input) => {

      input.addEventListener(
        "focus",
        () => {

          input
            .closest(
              ".input-wrap, .textarea-wrap"
            )
            ?.classList.add("focused");

        }
      );


      input.addEventListener(
        "blur",
        () => {

          input
            .closest(
              ".input-wrap, .textarea-wrap"
            )
            ?.classList.remove("focused");

        }
      );

    });


  /* =======================================================
     SMOOTH ANCHOR SCROLL
  ======================================================= */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach((anchor) => {

      anchor.addEventListener(
        "click",
        (event) => {

          const targetId =
            anchor.getAttribute("href");


          if (
            !targetId ||
            targetId === "#"
          ) {

            event.preventDefault();

            return;

          }


          const target =
            document.querySelector(targetId);


          if (!target) return;


          event.preventDefault();


          const headerOffset = 85;


          const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            headerOffset;


          window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
          });

        }
      );

    });


  /* =======================================================
     HERO IMAGE PARALLAX
  ======================================================= */

  const heroImage =
    document.querySelector(".hero-image-wrap");


  const finePointer =
    window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;


  if (heroImage && finePointer) {

    let ticking = false;


    window.addEventListener(
      "mousemove",
      (event) => {

        if (ticking) return;

        ticking = true;


        requestAnimationFrame(() => {

          const x =
            (window.innerWidth / 2 -
              event.clientX) / 70;

          const y =
            (window.innerHeight / 2 -
              event.clientY) / 70;


          heroImage.style.transform =
            `translate(${x}px, ${y}px)`;


          ticking = false;

        });

      },
      { passive: true }
    );


    /* Reset parallax */

    window.addEventListener(
      "mouseleave",
      () => {

        heroImage.style.transform =
          "translate(0, 0)";

      }
    );

  }


  /* =======================================================
     IMAGE ERROR FALLBACK
  ======================================================= */

  document
    .querySelectorAll("img")
    .forEach((image) => {

      image.addEventListener(
        "error",
        () => {

          image.style.display = "none";

          image
            .closest(".hero-image")
            ?.classList.add(
              "image-fallback"
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
        closeMenu();
      }


      /* Recalculate opened FAQ */

      document
        .querySelectorAll(".faq-item.open")
        .forEach((item) => {

          const answer =
            item.querySelector(".faq-answer");

          if (answer) {

            answer.style.maxHeight =
              `${answer.scrollHeight}px`;

          }

        });

    }
  );


  /* =======================================================
     CURRENT YEAR
  ======================================================= */

  const yearElement =
    document.querySelector(
      ".footer-bottom span:first-child"
    );


  if (yearElement) {

    yearElement.textContent =
      `© ${new Date().getFullYear()} DESISTEPS. All rights reserved.`;

  }

});
