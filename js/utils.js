const KEYS = {
  users: "tk_users",
  session: "tk_session",
  cart: "tk_cart",
  wishlist: "tk_wishlist",
  coupon: "tk_coupon",
  profile: "tk_profile",
  addresses: "tk_addresses",
  payments: "tk_payments",
  notifications: "tk_notifications",
  settings: "tk_settings",
  orders: "tk_orders",
  viewed: "tk_viewed",
  checkout: "tk_checkout_draft",
  checkoutReturn: "tk_checkout_return"
};

const PENDING_AUTH_KEY = "tk_pending_auth_action";

function getPendingAuthAction() {
  try {
    const raw = sessionStorage.getItem(PENDING_AUTH_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function setPendingAuthAction(action) {
  if (!action) return;
  sessionStorage.setItem(PENDING_AUTH_KEY, JSON.stringify(action));
}

function clearPendingAuthAction() {
  sessionStorage.removeItem(PENDING_AUTH_KEY);
}

function consumePendingAuthAction() {
  const action = getPendingAuthAction();
  clearPendingAuthAction();
  return action;
}

function queueAuthAction(actionType, details = {}) {
  if (isAuthenticated()) return true;
  const action = {
    type: actionType,
    redirect: details.redirect || `${location.pathname.split("/").pop() || "index.html"}${location.search}`,
    ...details
  };
  setPendingAuthAction(action);
  return false;
}

function executePendingAuthAction() {
  const pending = consumePendingAuthAction();
  if (!pending || !isAuthenticated()) return false;

  if (pending.type === "wishlist" && pending.productId) {
    if (!isWishlisted(pending.productId)) toggleWishlist(pending.productId);
    return true;
  }

  if (pending.type === "cart" && pending.productId) {
    addToCart(pending.productId, Number(pending.qty) || 1, pending.extras || {});
    return true;
  }

  if (pending.type === "buyNow" && pending.productId) {
    buyNow(pending.productId, Number(pending.qty) || 1, pending.extras || {});
    return true;
  }

  return false;
}

function storageGet(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw == null) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function storageSet(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function formatRupiah(n) {
  const num = Math.max(0, Math.round(Number(n) || 0));
  return "Rp " + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function qs(sel, root = document) {
  return root.querySelector(sel);
}

function qsa(sel, root = document) {
  return [...root.querySelectorAll(sel)];
}

function param(name) {
  return new URLSearchParams(location.search).get(name);
}

function getProduct(id) {
  return PRODUCTS.find((p) => p.id === id || p.slug === id);
}

function starsHtml(rating) {
  const full = Math.round(rating);
  let s = "";
  for (let i = 1; i <= 5; i++) {
    s += `<span class="star ${i <= full ? "is-on" : ""}" aria-hidden="true">★</span>`;
  }
  return `<span class="stars" aria-label="Penilaian ${rating} dari 5">${s}</span>`;
}

function imgFallback(el) {
  el.onerror = null;
  el.style.visibility = "hidden";
}

const ICONS = {
  moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6.5 6.5 0 0 0 8.268 8.268c.344-.215.825-.003.803.401"/></svg>',
  sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>',
  heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z"/></svg>',
  cart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 7h15l-1.5 9h-12z"/><path d="M6 7L5 4H2"/><circle cx="9" cy="20" r="1.3"/><circle cx="18" cy="20" r="1.3"/></svg>',
  user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="3.2"/><path d="M5 19c1.5-3.2 4-4.8 7-4.8s5.5 1.6 7 4.8"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 9l6 6 6-6"/></svg>',
  filter: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 6h16M7 12h10M10 18h4"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 7h14M10 7V5h4v2M8 7l1 12h6l1-12"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12l5 5L20 7"/></svg>',
  truck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 7h11v10H3zM14 10h4l3 3v4h-7"/><circle cx="7" cy="18" r="1.5"/><circle cx="18" cy="18" r="1.5"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 5v14M5 12h14"/></svg>',
  minus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 12h14"/></svg>',
  arrowUp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 19V5M5 12l7-7 7 7"/></svg>'
};

function showToast(message, type = "ok") {
  let host = qs("#toast-host");
  if (!host) {
    host = document.createElement("div");
    host.id = "toast-host";
    host.className = "toast-host";
    host.setAttribute("aria-live", "polite");
    document.body.appendChild(host);
  }
  const el = document.createElement("div");
  el.className = `toast toast-${type}`;
  const icon = document.createElement("span");
  icon.className = "toast-icon";
  icon.setAttribute("aria-hidden", "true");
  icon.textContent = type === "err" ? "!" : "✓";
  const copy = document.createElement("span");
  copy.className = "toast-message";
  copy.textContent = message;
  const close = document.createElement("button");
  close.className = "toast-close";
  close.type = "button";
  close.setAttribute("aria-label", "Tutup notifikasi");
  close.textContent = "×";
  const progress = document.createElement("span");
  progress.className = "toast-progress";
  el.append(icon, copy, close, progress);
  host.appendChild(el);
  requestAnimationFrame(() => el.classList.add("is-in"));
  let timer = setTimeout(dismiss, 3600);
  function dismiss() {
    clearTimeout(timer);
    el.classList.remove("is-in");
    setTimeout(() => el.remove(), 260);
  }
  close.addEventListener("click", dismiss);
  el.addEventListener("mouseenter", () => { clearTimeout(timer); progress.style.animationPlayState = "paused"; });
  el.addEventListener("mouseleave", () => { progress.style.animationPlayState = "running"; timer = setTimeout(dismiss, 1200); });
}

function showToastAfterNavigation(message, type = "ok") {
  try { sessionStorage.setItem("tk:toast", JSON.stringify({ message, type })); } catch {}
}

function consumeNavigationToast() {
  try {
    const queued = sessionStorage.getItem("tk:toast");
    if (!queued) return;
    sessionStorage.removeItem("tk:toast");
    const { message, type } = JSON.parse(queued);
    if (message) showToast(message, type || "ok");
  } catch {
    try { sessionStorage.removeItem("tk:toast"); } catch {}
  }
}

function addRecentlyViewed(id) {
  const list = storageGet(KEYS.viewed, []).filter((x) => x !== id);
  list.unshift(id);
  storageSet(KEYS.viewed, list.slice(0, 8));
}

function getRecentlyViewed() {
  return storageGet(KEYS.viewed, []).map(getProduct).filter(Boolean);
}

function openModal(html, labelledBy) {
  closeModal();
  const wrap = document.createElement("div");
  wrap.className = "modal-backdrop";
  wrap.id = "modal-root";
  wrap.innerHTML = `<div class="modal" role="dialog" aria-modal="true" ${labelledBy ? `aria-labelledby="${labelledBy}"` : ""}>${html}</div>`;
  document.body.appendChild(wrap);
  document.body.classList.add("no-scroll");
  wrap.addEventListener("click", (e) => {
    if (e.target === wrap) closeModal();
  });
  const first = wrap.querySelector("input, button, select, textarea");
  if (first) first.focus();
}

function closeModal() {
  const el = qs("#modal-root");
  if (el) el.remove();
  document.body.classList.remove("no-scroll");
}

function validateEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function validatePhone(v) {
  return /^[0-9+\s()-]{8,18}$/.test(v);
}

function uid(prefix) {
  return prefix + "-" + Math.random().toString(36).slice(2, 8).toUpperCase();
}

function pageName() {
  return document.body.dataset.page || "";
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
    document.body.classList.remove("nav-open", "filters-open");
  }
});
