function productHref(p) {
  return `product-detail.html?id=${encodeURIComponent(p.id)}`;
}

function productCardHTML(p) {
  const wish = isWishlisted(p.id);
  const isAvailable = p.stockStatus === "Tersedia" && p.stock > 0;
  return `
    <article class="product-card reveal" data-id="${p.id}">
      <div class="product-media is-loading">
        ${p.badge ? `<span class="badge ${p.stockStatus !== "Tersedia" ? "badge-muted" : p.newArrival && p.badge === "BARU" ? "badge-new" : ""}">${p.badge === "BARU" ? "BARU" : p.badge === "TERLARIS" ? "TERLARIS" : p.badge}</span>` : ""}
        <button class="icon-wish ${wish ? "is-active" : ""}" type="button" data-wish-toggle="${p.id}" aria-label="Tambahkan ${p.name} ke daftar keinginan" aria-pressed="${wish}">
          ${ICONS.heart}
        </button>
        <a href="${productHref(p)}">
          <img src="${p.images[0]}" alt="${p.name}" loading="lazy" onload="this.closest('.product-card').classList.add('is-loaded'); this.parentElement.parentElement.classList.add('is-loaded')" onerror="this.closest('.product-card').classList.add('is-loaded'); this.parentElement.parentElement.classList.add('is-loaded'); imgFallback(this)">
        </a>
        <button class="card-cart" type="button" data-add="${p.id}" aria-label="${isAvailable ? `Tambah ${p.name} ke keranjang` : `${p.name} sedang habis`}" ${isAvailable ? "" : "disabled"}>${ICONS.cart}</button>
      </div>
      <div class="product-meta">
        <p class="muted tiny">${p.category} · ${p.brand}</p>
        <h3><a href="${productHref(p)}">${p.name}</a></h3>
        ${p.reviewCount ? `<div class="rating-row">${starsHtml(p.rating)} <span class="muted tiny">${p.rating} (${p.reviewCount})</span></div>` : `<p class="muted tiny">Belum ada ulasan</p>`}
        <div class="price-row">
          <strong>${formatRupiah(p.price)}</strong>
          ${p.oldPrice ? `<s>${formatRupiah(p.oldPrice)}</s>` : ""}
        </div>
      </div>
    </article>`;
}

function renderProductGrid(target, list) {
  const el = typeof target === "string" ? qs(target) : target;
  if (!el) return;
  if (!list.length) {
    el.innerHTML = `<div class="product-wireframe-grid" aria-label="Kerangka katalog produk">
      ${Array.from({ length: 4 }, (_, index) => `<article class="product-wireframe" aria-label="Slot produk ${index + 1} — menunggu konten baru">
        <div class="product-wireframe-media" aria-hidden="true"></div>
        <div class="product-wireframe-copy" aria-hidden="true"><span></span><strong></strong><span></span></div>
      </article>`).join("")}
    </div>`;
    return;
  }
  el.innerHTML = list.map(productCardHTML).join("");
}

function sortProducts(list, sort) {
  const arr = [...list];
  switch (sort) {
    case "newest":
      return arr.sort((a, b) => Number(b.newArrival) - Number(a.newArrival) || b.reviewCount - a.reviewCount);
    case "price-asc":
      return arr.sort((a, b) => a.price - b.price);
    case "price-desc":
      return arr.sort((a, b) => b.price - a.price);
    case "rating":
      return arr.sort((a, b) => b.rating - a.rating);
    default:
      return arr.sort((a, b) => Number(b.featured) - Number(a.featured) || b.rating - a.rating);
  }
}

function filterProducts(opts = {}) {
  const {
    category,
    brand,
    minPrice,
    maxPrice,
    minRating,
    availability,
    q,
    bestSeller,
    newArrival
  } = opts;
  const query = (q || "").trim().toLowerCase();
  return PRODUCTS.filter((p) => {
    if (p.catalogVisible === false) return false;
    if (category && category !== "All" && p.category !== category) return false;
    if (brand) {
      const brands = Array.isArray(brand) ? brand : [brand];
      if (brands.filter(Boolean).length && !brands.includes(p.brand)) return false;
    }
    if (minPrice != null && p.price < minPrice) return false;
    if (maxPrice != null && p.price > maxPrice) return false;
    if (minRating && p.rating < minRating) return false;
    if (availability === "in") {
      if (p.stockStatus !== "Tersedia") return false;
    }
    if (bestSeller && !p.bestSeller) return false;
    if (newArrival && !p.newArrival) return false;
    if (query) {
      const hay = `${p.name} ${p.category} ${p.brand} ${p.description}`.toLowerCase();
      if (!hay.includes(query)) return false;
    }
    return true;
  });
}

function uniqueJaringans() {
  return [...new Set(PRODUCTS.filter((p) => p.catalogVisible !== false).map((p) => p.brand))].sort();
}

function relatedProducts(product, n = 4) {
  const candidates = PRODUCTS.filter((p) => p.catalogVisible !== false && p.id !== product.id);
  const sameCategory = candidates.filter((p) => p.category === product.category);
  const otherCategories = candidates.filter((p) => p.category !== product.category);
  const selected = [];
  const categories = new Set();

  // Start with one close match, then favor products from different categories.
  const first = sameCategory.shift() || otherCategories.shift();
  if (first) {
    selected.push(first);
    categories.add(first.category);
  }

  for (const candidate of [...otherCategories, ...sameCategory]) {
    if (selected.length >= n) break;
    if (categories.has(candidate.category)) continue;
    selected.push(candidate);
    categories.add(candidate.category);
  }

  // If the catalog has fewer than n categories, fill the remaining slots.
  for (const candidate of [...sameCategory, ...otherCategories]) {
    if (selected.length >= n) break;
    if (!selected.some((p) => p.id === candidate.id)) selected.push(candidate);
  }

  return selected;
}
