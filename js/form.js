/* "Request my free pilot" form.
   Sends each request straight to your email using FormSubmit (free, no sign-up).
   The email address comes from js/config.js.
   FIRST TIME ONLY: after the first test submission, FormSubmit emails you an
   activation link. Open it and click "Activate Form". Check Spam too. */
$("f").addEventListener("submit", function (e) {
  e.preventDefault();
  var form = e.target, btn = form.querySelector("button[type=submit]"), msg = $("thanks");
  var d = new FormData(form);
  btn.disabled = true;
  btn.textContent = "Sending...";
  msg.style.display = "none";

  fetch("https://formsubmit.co/ajax/" + RECEPTLY.email, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Accept": "application/json" },
    body: JSON.stringify({
      _subject: "Evolvia Receptly free pilot request",
      _template: "table",
      "Business name": d.get("biz"),
      "Phone or WhatsApp": d.get("phone"),
      "Business type": d.get("type")
    })
  })
    .then(function (r) { return r.json(); })
    .then(function (data) {
      if (data.success === false || data.success === "false") throw new Error("failed");
      msg.textContent = "Thanks! We received your request and will contact you soon.";
      msg.style.display = "block";
      form.reset();
    })
    .catch(function () {
      msg.innerHTML = 'Sorry, we could not send that. Please message us on WhatsApp: <a href="https://wa.me/916235196263">+91 62351 96263</a>';
      msg.style.display = "block";
    })
    .then(function () {
      btn.disabled = false;
      btn.textContent = "Request my free pilot";
    });
});
