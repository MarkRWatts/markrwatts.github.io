document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("contact-form");
  if (!form) return;

  var statusEl = form.querySelector(".form-status");
  var submitBtn = form.querySelector(".contact-submit");

  function showStatus(message, isSuccess) {
    statusEl.textContent = message;
    statusEl.classList.remove("is-success", "is-error");
    statusEl.classList.add("is-visible", isSuccess ? "is-success" : "is-error");
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (form.querySelector("#honeypot").value) return;

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    fetch("https://api.staticforms.dev/submit", {
      method: "POST",
      body: new FormData(form)
    })
      .then(function (res) { return res.json().then(function (data) { return { ok: res.ok, data: data }; }); })
      .then(function (result) {
        if (result.ok && result.data.success) {
          showStatus("Thanks — your message has been sent. I'll be in touch soon.", true);
          form.reset();
        } else {
          showStatus("Something went wrong sending your message. Please try again shortly.", false);
        }
      })
      .catch(function () {
        showStatus("Something went wrong sending your message. Please try again shortly.", false);
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = "Send Message";
      });
  });
});
