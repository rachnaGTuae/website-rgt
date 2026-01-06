document.addEventListener("DOMContentLoaded", () => {
  // 1) Desktop hover dropdowns (Bootstrap dropdown, but open on hover)
  const hoverDropdowns = document.querySelectorAll(".giii-hover-dd");

  hoverDropdowns.forEach((dd) => {
    const toggle = dd.querySelector('[data-bs-toggle="dropdown"]');
    if (!toggle) return;

    const instance = bootstrap.Dropdown.getOrCreateInstance(toggle, {
      autoClose: "outside"
    });

    dd.addEventListener("mouseenter", () => {
      if (window.matchMedia("(min-width: 992px)").matches) instance.show();
    });

    dd.addEventListener("mouseleave", () => {
      if (window.matchMedia("(min-width: 992px)").matches) instance.hide();
    });
  });

  // 2) Mobile accordion “dropdown like desktop”
  const accButtons = document.querySelectorAll("[data-giii-acc]");

  function closeAllSubs(exceptId) {
    document.querySelectorAll(".giii-m-sub").forEach((el) => {
      if (el.id !== exceptId) el.classList.remove("is-open");
    });
    document.querySelectorAll("[data-giii-acc] .giii-chev").forEach((c) => {
      c.style.transform = "rotate(0deg)";
    });
  }

  accButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-giii-acc");
      const panel = document.getElementById(`giii-sub-${key}`);
      if (!panel) return;

      const isOpen = panel.classList.contains("is-open");
      closeAllSubs(panel.id);

      panel.classList.toggle("is-open", !isOpen);

      const chev = btn.querySelector(".giii-chev");
      if (chev) chev.style.transform = !isOpen ? "rotate(90deg)" : "rotate(0deg)";
    });
  });

  // 3) When offcanvas closes, reset
  const offcanvasEl = document.getElementById("giiiMobile");
  if (offcanvasEl) {
    offcanvasEl.addEventListener("hidden.bs.offcanvas", () => {
      closeAllSubs("");
      document.querySelectorAll(".giii-m-sub").forEach((el) => el.classList.remove("is-open"));
    });
  }
});
