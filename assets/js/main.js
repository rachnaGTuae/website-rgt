// Mobile: allow only one submenu open at a time
(function () {
  document.addEventListener("DOMContentLoaded", function () {

    const menu = document.getElementById("mMenu");
    if (!menu) return; // safety check

    const collapses = menu.querySelectorAll(".collapse");

    collapses.forEach((current) => {
      current.addEventListener("show.bs.collapse", function () {
        collapses.forEach((other) => {
          if (other !== current) {
            const instance = bootstrap.Collapse.getOrCreateInstance(other, {
              toggle: false
            });
            instance.hide();
          }
        });
      });
    });

  });
})();


