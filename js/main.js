/* ==========================================================================
   Kalakari Designs — main.js
   Needs products.js loaded first. Vanilla JS, no build step.
   ========================================================================== */

(function () {
  "use strict";

  const rupee = (n) => "₹" + new Intl.NumberFormat("en-IN").format(n);
  const catById = (id) => CATEGORIES.find((c) => c.id === id);
  const prodById = (id) => PRODUCTS.find((p) => p.id === id);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------- product card ---------- */
  function priceHTML(p) {
    if (p.min) return `<span>${rupee(p.min)} – ${rupee(p.max)}</span>`;
    if (p.was) return `<span>${rupee(p.price)}</span><span class="pcard__was">${rupee(p.was)}</span>`;
    return `<span>${rupee(p.price)}</span>`;
  }

  function cardHTML(p, i, extraClass) {
    const cat = catById(p.cat);
    const off = p.was ? Math.round((1 - p.price / p.was) * 100) : 0;
    const badge = off ? `<span class="pcard__badge">${off}% off</span>` : p.min ? `<span class="pcard__badge">On sale</span>` : "";
    return `
      <a class="pcard ${extraClass || ""}" href="${esc(p.url)}" aria-label="${esc(p.name)}">
        <div class="pcard__media tint-${i % 5}">
          ${badge}
          <span class="pcard__emoji" aria-hidden="true">${p.emoji}</span>
          <img src="assets/images/${p.id}.jpg" alt="${esc(p.name)}" loading="lazy" onerror="this.remove()">
        </div>
        <div>
          <h3 class="pcard__name">${esc(p.name)}</h3>
          <p class="pcard__cat">${cat ? esc(cat.name) : ""}</p>
        </div>
        <div class="pcard__price">${priceHTML(p)}</div>
      </a>`;
  }

  /* ---------- homepage sections ---------- */
  function renderList(selector, ids, extraClass) {
    const el = document.querySelector(selector);
    if (!el) return;
    el.innerHTML = ids.map(prodById).filter(Boolean).map((p, i) => cardHTML(p, i, extraClass)).join("");
  }
  renderList("#recommended-grid", HOME_RECOMMENDED);
  renderList("#new-rail", HOME_NEW, "pcard--rail");

  const catRail = document.querySelector("#category-rail");
  if (catRail) {
    const feature = catById("candles");
    const featureCard = `
      <article class="cat-card cat-card--feature">
        <div>
          <span class="cat-card__chip">Candles</span>
          <h3>${esc(feature.blurb)}</h3>
          <a class="btn btn--sm" href="${esc(feature.url)}">Buy now</a>
        </div>
        <span class="cat-card__art" aria-hidden="true">${feature.emoji}</span>
      </article>`;
    const others = CATEGORIES.filter((c) => c.id !== "candles").map((c) => `
      <a class="cat-card ${c.tint}" href="shop.html?cat=${c.id}">
        <div>
          <span class="cat-card__chip">${esc(c.name)}</span>
          <h3>${esc(c.blurb)}</h3>
        </div>
        <span class="cat-card__art" aria-hidden="true">${c.emoji}</span>
      </a>`).join("");
    catRail.innerHTML = featureCard + others;
  }

  /* ---------- rail arrows ---------- */
  document.querySelectorAll("[data-rail]").forEach((group) => {
    const rail = document.querySelector(group.dataset.rail);
    if (!rail) return;
    group.querySelectorAll("[data-dir]").forEach((btn) =>
      btn.addEventListener("click", () => rail.scrollBy({ left: Number(btn.dataset.dir) * 340, behavior: "smooth" }))
    );
  });

  /* ---------- shop page: filter, search, sort ---------- */
  const shopGrid = document.querySelector("#shop-grid");
  if (shopGrid) {
    const chipsEl = document.querySelector("#chips");
    const search = document.querySelector("#search");
    const sort = document.querySelector("#sort");
    const count = document.querySelector("#count");
    let active = new URLSearchParams(location.search).get("cat") || "all";

    chipsEl.innerHTML =
      `<button class="chip" data-cat="all">All products</button>` +
      CATEGORIES.map((c) => `<button class="chip" data-cat="${c.id}">${esc(c.name)}</button>`).join("");

    const low = (p) => (p.min ? p.min : p.price);

    function draw() {
      const q = search.value.trim().toLowerCase();
      let list = PRODUCTS.filter((p) => (active === "all" || p.cat === active) && (!q || p.name.toLowerCase().includes(q)));
      if (sort.value === "low") list.sort((a, b) => low(a) - low(b));
      if (sort.value === "high") list.sort((a, b) => low(b) - low(a));
      chipsEl.querySelectorAll(".chip").forEach((c) => {
        const on = c.dataset.cat === active;
        c.classList.toggle("is-active", on);
        c.setAttribute("aria-pressed", on);
      });
      count.textContent = `${list.length} ${list.length === 1 ? "product" : "products"}`;
      shopGrid.innerHTML = list.length
        ? list.map((p, i) => cardHTML(p, i)).join("")
        : `<div class="empty" style="grid-column:1/-1"><h3>Nothing matches yet</h3><p>Clear the search or pick another category.</p></div>`;
    }

    chipsEl.addEventListener("click", (e) => {
      const b = e.target.closest(".chip");
      if (!b) return;
      active = b.dataset.cat;
      draw();
    });
    search.addEventListener("input", draw);
    sort.addEventListener("change", draw);
    draw();
  }

  /* ---------- header: mobile menu + products dropdown ---------- */
  const header = document.querySelector(".site-header");
  const burger = document.querySelector(".nav__burger");
  if (burger) {
    burger.addEventListener("click", () => {
      const open = header.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", open);
    });
  }
  const drop = document.querySelector(".nav__drop");
  if (drop) {
    const btn = drop.querySelector(".nav__dropbtn");
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const open = drop.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open);
    });
    document.addEventListener("click", (e) => { if (!drop.contains(e.target)) { drop.classList.remove("is-open"); btn.setAttribute("aria-expanded", false); } });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") { drop.classList.remove("is-open"); btn.setAttribute("aria-expanded", false); btn.focus(); } });
  }

  /* ---------- forms (front-end only: connect to your backend / form service) ---------- */
  document.querySelectorAll("form[data-form]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const note = form.querySelector(".form-note");
      if (!form.checkValidity()) { note.textContent = "Check the highlighted fields and try again."; form.reportValidity(); return; }
      // TODO: send new FormData(form) to your endpoint (Formspree, Netlify Forms, your API...)
      note.textContent = form.dataset.form === "newsletter"
        ? "Done! Watch your inbox for the Kill Dill sale."
        : "Message sent. We reply within 24 hours.";
      form.reset();
    });
  });

  /* ---------- footer year ---------- */
  document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
})();
