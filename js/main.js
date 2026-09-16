(function () {
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  var form = document.getElementById("quote-form");
  if (!form) return;

  var success = document.getElementById("form-success");

  function markInvalid(el, invalid) {
    if (!el) return;
    el.classList.toggle("is-invalid", invalid);
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var name = form.elements.namedItem("name");
    var phone = form.elements.namedItem("phone");
    var email = form.elements.namedItem("email");
    var vehicles = form.elements.namedItem("vehicles");

    var ok = true;

    markInvalid(name, !(name && name.value.trim()));
    if (!(name && name.value.trim())) ok = false;

    markInvalid(phone, !(phone && phone.value.trim().length >= 7));
    if (!(phone && phone.value.trim().length >= 7)) ok = false;

    var emailOk = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
    markInvalid(email, !emailOk);
    if (!emailOk) ok = false;

    markInvalid(vehicles, !(vehicles && vehicles.value));
    if (!(vehicles && vehicles.value)) ok = false;

    if (!ok) {
      var firstBad = form.querySelector(".is-invalid");
      if (firstBad) firstBad.focus();
      return;
    }

    if (success) {
      success.hidden = false;
    }

    form.reset();

    // Ready for Formspree / WordPress form endpoint later:
    // fetch(endpoint, { method: "POST", body: new FormData(form) })
  });

  form.addEventListener("input", function (event) {
    var target = event.target;
    if (target && target.classList.contains("is-invalid")) {
      target.classList.remove("is-invalid");
    }
  });
})();
