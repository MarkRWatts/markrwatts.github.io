document.addEventListener("DOMContentLoaded", function () {
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  var mobileNav = document.querySelector(".mobile-nav");
  var mobileClose = document.querySelector(".mobile-close");

  function onScroll() {
    if (!header) return;
    if (window.scrollY > 40) {
      header.classList.add("is-solid");
    } else {
      header.classList.remove("is-solid");
    }
  }

  window.addEventListener("scroll", onScroll);
  onScroll();

  if (toggle && mobileNav) {
    toggle.addEventListener("click", function () {
      mobileNav.classList.add("is-open");
    });
  }
  if (mobileClose && mobileNav) {
    mobileClose.addEventListener("click", function () {
      mobileNav.classList.remove("is-open");
    });
  }
  if (mobileNav) {
    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mobileNav.classList.remove("is-open");
      });
    });
  }
});
