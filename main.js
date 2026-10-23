(function () {
  "use strict";
  var BP = 1024; /* must equal the CSS nav breakpoint (max-width:1024px) */
  var drawer = document.getElementById("drawer");
  var burger = document.getElementById("burger");
  var closeBtn = document.getElementById("drawer-close");
  var bg = document.getElementById("drawer-bg");
  function setOpen(open) {
    if (!drawer) return;
    drawer.classList.toggle("open", open);
    if (burger) burger.setAttribute("aria-expanded", open ? "true" : "false");
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (open && closeBtn) closeBtn.focus();
    if (!open && burger) burger.focus();
  }
  if (burger) burger.addEventListener("click", function () { setOpen(true); });
  if (closeBtn) closeBtn.addEventListener("click", function () { setOpen(false); });
  if (bg) bg.addEventListener("click", function () { setOpen(false); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && drawer && drawer.classList.contains("open")) setOpen(false);
  });
  window.addEventListener("resize", function () {
    if (window.innerWidth > BP && drawer && drawer.classList.contains("open")) {
      drawer.classList.remove("open");
      document.documentElement.style.overflow = "";
      if (burger) burger.setAttribute("aria-expanded", "false");
    }
  });
  var navButtons = document.querySelectorAll(".navlinks > li > button");
  Array.prototype.forEach.call(navButtons, function (b) {
    b.addEventListener("click", function () {
      var open = b.getAttribute("aria-expanded") === "true";
      b.setAttribute("aria-expanded", open ? "false" : "true");
    });
  });
})();
