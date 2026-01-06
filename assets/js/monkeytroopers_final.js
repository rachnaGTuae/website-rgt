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

    // 4) Brand Highlights accordion (right panel)
  const highlights = document.getElementById("brandHighlights");
  if (highlights) {
    const items = highlights.querySelectorAll(".brand-hi-item.is-accordion");

    function closeItem(item) {
      item.classList.remove("is-open");
      const btn = item.querySelector(".brand-hi-toggle");
      const panel = item.querySelector(".brand-hi-panel");
      if (btn) btn.setAttribute("aria-expanded", "false");
      if (panel) panel.style.height = "0px";
    }

    function openItem(item) {
      const btn = item.querySelector(".brand-hi-toggle");
      const panel = item.querySelector(".brand-hi-panel");
      if (!panel) return;

      // measure inner content height
      const inner = panel.querySelector(".brand-hi-panel-inner");
      const targetH = inner ? inner.scrollHeight : panel.scrollHeight;

      item.classList.add("is-open");
      if (btn) btn.setAttribute("aria-expanded", "true");
      panel.style.height = targetH + "px";
    }

    function closeOthers(current) {
      items.forEach((it) => {
        if (it !== current) closeItem(it);
      });
    }

    items.forEach((item) => {
      const btn = item.querySelector(".brand-hi-toggle");
      const panel = item.querySelector(".brand-hi-panel");
      if (!btn || !panel) return;

      // start closed
      panel.style.height = "0px";
      btn.setAttribute("aria-expanded", "false");

      btn.addEventListener("click", () => {
        const isOpen = item.classList.contains("is-open");

        // Keep page clean: open one at a time
        closeOthers(item);

        if (isOpen) {
          closeItem(item);
        } else {
          openItem(item);
        }
      });
    });

    // Recalculate open panel height on resize (prevents clipping)
    window.addEventListener("resize", () => {
      const open = highlights.querySelector(".brand-hi-item.is-open");
      if (!open) return;
      const panel = open.querySelector(".brand-hi-panel");
      const inner = panel ? panel.querySelector(".brand-hi-panel-inner") : null;
      if (panel && inner) panel.style.height = inner.scrollHeight + "px";
    });
  }

});


// 5) FO Blueprint tabs (non-bulky PDF section)
(function(){
  const pills = document.querySelectorAll(".fo-pill");
  if(!pills.length) return;

  const panels = {
    vision: document.getElementById("tab-vision"),
    whyfo: document.getElementById("tab-whyfo"),
    control: document.getElementById("tab-control"),
    distribution: document.getElementById("tab-distribution"),
    expansion: document.getElementById("tab-expansion"),
    nonnegotiables: document.getElementById("tab-nonnegotiables"),
    digital: document.getElementById("tab-digital"),
  };

  function activate(key){
    pills.forEach(p => p.classList.toggle("is-active", p.dataset.foTab === key));
    Object.keys(panels).forEach(k => {
      if(panels[k]) panels[k].classList.toggle("is-active", k === key);
    });
  }

  pills.forEach(pill => pill.addEventListener("click", () => activate(pill.dataset.foTab)));

  // default
  activate("vision");
})();
