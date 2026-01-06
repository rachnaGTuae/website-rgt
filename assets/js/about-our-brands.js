document.addEventListener("DOMContentLoaded", () => {
  /* =========================================
     1) DESKTOP DROPDOWN: open on hover
     Works for class: .giii-hover-dd (your About HTML)
     ========================================= */
  const dropdowns = document.querySelectorAll(".dropdown.giii-hover-dd");

  dropdowns.forEach((dd) => {
    const toggle = dd.querySelector(".dropdown-toggle");
    if (!toggle) return;

    const instance = bootstrap.Dropdown.getOrCreateInstance(toggle, {
      autoClose: true,
      popperConfig(defaultBsPopperConfig) {
        return defaultBsPopperConfig;
      }
    });

    dd.addEventListener("mouseenter", () => {
      if (window.matchMedia("(min-width: 992px)").matches) instance.show();
    });

    dd.addEventListener("mouseleave", () => {
      if (window.matchMedia("(min-width: 992px)").matches) instance.hide();
    });
  });

  /* =========================================
     2) MOBILE OFFCANVAS "DROPDOWN" (accordion style)
     Uses data-giii-acc="who" etc
     Panels must be: id="giii-sub-who"
     ========================================= */
  const accButtons = document.querySelectorAll("[data-giii-acc]");

  function closeAllSubs(exceptId) {
    document.querySelectorAll(".giii-m-sub").forEach((el) => {
      if (el.id !== exceptId) el.classList.remove("is-open");
    });

    document.querySelectorAll("[data-giii-acc] .giii-chev").forEach((c) => {
      c.style.transform = "rotate(0deg)";
    });

    document.querySelectorAll("[data-giii-acc]").forEach((b) => {
      b.setAttribute("aria-expanded", "false");
    });
  }

  accButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-giii-acc"); // e.g. "who"
      const panel = document.getElementById(`giii-sub-${key}`);
      if (!panel) return;

      const isOpen = panel.classList.contains("is-open");
      closeAllSubs(panel.id);

      panel.classList.toggle("is-open", !isOpen);

      btn.setAttribute("aria-expanded", (!isOpen).toString());
      const chev = btn.querySelector(".giii-chev");
      if (chev) chev.style.transform = !isOpen ? "rotate(90deg)" : "rotate(0deg)";
    });
  });

  /* =========================================
     3) Reset mobile dropdowns when offcanvas closes
     Offcanvas must have id="giiiMobile"
     ========================================= */
  const offcanvasEl = document.getElementById("giiiMobile");
  if (offcanvasEl) {
    offcanvasEl.addEventListener("hidden.bs.offcanvas", () => {
      closeAllSubs("");
    });
  }
});

/* =========================================
   DISABLE CLICK DROPDOWN ON DESKTOP
   KEEP CLICK ON MOBILE
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth >= 992) {
    document.querySelectorAll(".dropdown-toggle").forEach(el => {
      el.addEventListener("click", e => e.preventDefault());
    });
  }
});
