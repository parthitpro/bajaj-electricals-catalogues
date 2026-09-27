// ==========================================
// BAJAJ ELECTRICALS - 2026 CATALOGUES DATA
// ==========================================
const PRODUCTS_DATA = [
  {
    id: "bajaj-wires-catalogue-2026",
    title: "Bajaj Wires Catalogue 2026",
    subtitle: "Flame Retardant (FR/FRLSH) House Wires",
    category: "wires",
    categoryLabel: "Wires & Cables",
    badgeClass: "badge-wires",
    coverClass: "cover-wires",
    graphicIcon: "🔥",
    badgeText: "Wires & Cables",
    pdfPath: "assets/pdfs/bajaj-wires-catalogue-2026.pdf",
    pages: 12,
    fileSize: "1.3 MB",
    version: "2026 Edition",
    description: "Premium 100% electrolytic copper electrical house wires engineered with Flame Retardant (FR & FRLSH) insulation for zero halogen emission, high thermal stability, and maximum power efficiency.",
    specs: [
      "100% High Conductivity Electrolytic Copper",
      "Special Flame Retardant (FR / FRLSH) Insulation",
      "High Thermal Stability & Overload Current Protection",
      "IS:694 & RoHS Certified for Fire Safety"
    ]
  },
  {
    id: "consumer-lighting-catalogue-2026",
    title: "Consumer Lighting Catalogue 2026",
    subtitle: "LED Bulbs, Battens, Downlights & Slim Panels",
    category: "lighting",
    categoryLabel: "Consumer Lighting",
    badgeClass: "badge-lighting",
    coverClass: "cover-lighting",
    graphicIcon: "💡",
    badgeText: "Consumer Lighting",
    pdfPath: "assets/pdfs/consumer-lighting-catalogue-2026.pdf",
    pages: 28,
    fileSize: "3.6 MB",
    version: "2026 Edition",
    description: "Full-line energy-saving LED illumination for modern residential and commercial architectures, equipped with EyeRelax™ glare-reduction optics and high lumen output per watt.",
    specs: [
      "High Lumen Efficacy (Up to 120 Lumens per Watt)",
      "EyeRelax™ Uniform Glare-Free Light Diffusion",
      "Wide Voltage Protection & Surge Resistance (4kV)",
      "25,000+ Rated Operating Hours with 2-Yr Warranty"
    ]
  },
  {
    id: "mcb-catalogue-2026",
    title: "MCB & Modular Switchgear",
    subtitle: "Circuit Protection, Isolators & Distribution",
    category: "switchgear",
    categoryLabel: "MCB & Switchgear",
    badgeClass: "badge-switchgear",
    coverClass: "cover-switchgear",
    graphicIcon: "⚡",
    badgeText: "MCB Switchgear",
    pdfPath: "assets/pdfs/mcb-catalogue-2026.pdf",
    pages: 16,
    fileSize: "2.0 MB",
    version: "2026 Edition",
    description: "High-breaking capacity Miniature Circuit Breakers (MCB), Isolators, RCCBs, and modular distribution enclosures designed for fail-safe overload and short-circuit isolation.",
    specs: [
      "10kA High Breaking Capacity (IEC/IS:60898-1)",
      "B & C Tripping Curves for Resistive & Inductive Loads",
      "True Contact Indicator & Bi-Connect Terminals",
      "IP20 Finger-Safe & Flame-Retardant Modular Build"
    ]
  },
  {
    id: "decorative-lighting-product-deck",
    title: "Decorative Lighting Product Deck",
    subtitle: "Architectural, Chandeliers & Luxury Luminaires",
    category: "decorative",
    categoryLabel: "Decorative Lighting",
    badgeClass: "badge-decorative",
    coverClass: "cover-decorative",
    graphicIcon: "✨",
    badgeText: "Decorative Lighting",
    pdfPath: "assets/pdfs/decorative-lighting-product-deck.pdf",
    pages: 24,
    fileSize: "3.0 MB",
    version: "2026 Edition",
    description: "Exclusive luxury decorative luminaires, architectural pendants, chandeliers, and ambient fixtures designed for boutique hotels, fine dining, and elite residences.",
    specs: [
      "Designer Pendants, Chandeliers & Wall Sconces",
      "Artisanal Glass, Brushed Brass & Matte Finishes",
      "High CRI (>90) True-Color Ambient Illumination",
      "Crafted for Luxury Residences & Hospitality Interiors"
    ]
  }
];

// ==========================================
// STATE MANAGEMENT
// ==========================================
let activeCategory = "all";
let searchQuery = "";

// Admin Configuration
const ADMIN_CONFIG = {
  username: "admin",
  password: "admin123",
  sessionKey: "BAJAJ_ADMIN_AUTH"
};

// DOM References
const productsGrid = document.getElementById("productsGrid");
const productCounter = document.getElementById("productCounter");
const noResults = document.getElementById("noResults");
const searchInput = document.getElementById("productSearch");
const clearSearchBtn = document.getElementById("clearSearch");
const categoryPills = document.querySelectorAll(".nav-pill");

// PDF Modal Elements
const pdfModal = document.getElementById("pdfModal");
const pdfIframe = document.getElementById("pdfIframe");
const modalPdfTitle = document.getElementById("modalPdfTitle");
const modalPdfMeta = document.getElementById("modalPdfMeta");
const modalOpenTabBtn = document.getElementById("modalOpenTabBtn");
const modalDownloadBtn = document.getElementById("modalDownloadBtn");
const modalLoading = document.getElementById("modalLoading");

// Inquiry Modal Elements
const inquiryModal = document.getElementById("inquiryModal");
const inquiryProductName = document.getElementById("inquiryProductName");

// Toast Notification
const toast = document.getElementById("toast");
const toastMsg = document.getElementById("toastMsg");

// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  setupEventListeners();
  updateSubmissionsCount();
  updateAdminUI();
});

// ==========================================
// RENDER CATALOGUE CARDS
// ==========================================
function renderProducts() {
  const filtered = PRODUCTS_DATA.filter(product => {
    const matchesCategory = activeCategory === "all" || product.category === activeCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      product.title.toLowerCase().includes(query) ||
      product.subtitle.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.categoryLabel.toLowerCase().includes(query) ||
      product.specs.some(s => s.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  productsGrid.innerHTML = "";

  if (filtered.length === 0) {
    noResults.style.display = "block";
    productCounter.textContent = `Showing 0 of ${PRODUCTS_DATA.length} catalogues`;
    return;
  }

  noResults.style.display = "none";
  productCounter.textContent = `Showing ${filtered.length} of ${PRODUCTS_DATA.length} official catalogues`;

  filtered.forEach(product => {
    const card = document.createElement("article");
    card.className = "catalog-card";
    card.setAttribute("data-id", product.id);

    const specsHtml = product.specs.map(spec => `<li>${spec}</li>`).join("");

    card.innerHTML = `
      <div class="card-upper">
        <!-- 3D Booklet Visual Cover -->
        <div class="booklet-cover ${product.coverClass}" onclick="openPdfPreview('${product.id}')" title="Click to preview '${product.title}' in browser">
          <div class="booklet-brand-tag">
            <span class="brand-mini">BAJAJ</span>
            <span class="format-pill">PDF</span>
          </div>
          <div class="booklet-graphic">
            ${product.graphicIcon}
          </div>
          <div class="booklet-title-area">
            <div class="booklet-title-text">${product.title.replace('Catalogue', '').replace('Product Deck', '')}</div>
            <div class="booklet-year">${product.version} • ${product.pages}P</div>
          </div>
        </div>

        <!-- Details Info -->
        <div class="card-details">
          <div class="card-badge-row">
            <span class="cat-badge ${product.badgeClass}">${product.badgeText}</span>
            <span class="doc-size-badge">${product.pages} Pages • ${product.fileSize}</span>
          </div>
          <h3 class="catalog-title">${product.title}</h3>
          <div class="catalog-subtitle">${product.subtitle}</div>
          <p class="catalog-desc">${product.description}</p>
        </div>
      </div>

      <!-- Key Specifications List -->
      <div class="specs-block">
        <div class="specs-label">Key Specifications & Certifications</div>
        <ul class="specs-grid-items">
          ${specsHtml}
        </ul>
      </div>

      <!-- Action Buttons -->
      <div class="card-actions-group">
        <button class="btn btn-primary btn-sm" onclick="openPdfPreview('${product.id}')">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
          Quick Preview
        </button>

        <a href="${product.pdfPath}" download="${product.id}.pdf" class="btn btn-secondary btn-sm" onclick="trackDownload('${product.title}')">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          Download PDF
        </a>

        <button class="btn btn-secondary btn-sm" onclick="openInquiry('${product.title}')" title="Request quotation or trade assistance">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          Inquire / Quote
        </button>
      </div>
    `;

    productsGrid.appendChild(card);
  });
}

// ==========================================
// EVENT LISTENERS & SEARCH
// ==========================================
function setupEventListeners() {
  // Real-time Search Input
  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value;
    clearSearchBtn.style.display = searchQuery ? "block" : "none";
    renderProducts();
  });

  clearSearchBtn.addEventListener("click", () => {
    searchInput.value = "";
    searchQuery = "";
    clearSearchBtn.style.display = "none";
    renderProducts();
  });

  // Category Pills
  categoryPills.forEach(pill => {
    pill.addEventListener("click", () => {
      categoryPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      activeCategory = pill.getAttribute("data-category");
      renderProducts();
    });
  });

  // Modal Backdrop Click
  const modals = [
    { el: pdfModal, close: closePdfModal },
    { el: inquiryModal, close: closeInquiryModal },
    { el: document.getElementById("adminLoginModal"), close: closeAdminLoginModal },
    { el: document.getElementById("submissionsModal"), close: closeSubmissionsModal },
    { el: document.getElementById("leadDetailModal"), close: closeLeadDetailModal }
  ];

  modals.forEach(m => {
    if (m.el) {
      m.el.addEventListener("click", (e) => {
        if (e.target === m.el) m.close();
      });
    }
  });

  // Keyboard Navigation (Esc to close all modals)
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closePdfModal();
      closeInquiryModal();
      closeAdminLoginModal();
      closeSubmissionsModal();
      closeLeadDetailModal();
    }
  });

  // Iframe Load Handler
  pdfIframe.addEventListener("load", () => {
    modalLoading.style.display = "none";
  });
}

// ==========================================
// PDF MODAL VIEWER CONTROLLER
// ==========================================
function openPdfPreview(productId) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  modalPdfTitle.textContent = product.title;
  modalPdfMeta.textContent = `${product.subtitle} • ${product.pages} Pages • ${product.fileSize}`;
  modalOpenTabBtn.href = product.pdfPath;
  modalDownloadBtn.href = product.pdfPath;
  modalDownloadBtn.setAttribute("download", `${product.id}.pdf`);

  modalLoading.style.display = "flex";
  pdfIframe.src = `${product.pdfPath}#view=FitH&toolbar=1`;

  pdfModal.classList.add("active");
  pdfModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closePdfModal() {
  pdfModal.classList.remove("active");
  pdfModal.setAttribute("aria-hidden", "true");
  pdfIframe.src = "";
  document.body.style.overflow = "";
}

// ==========================================
// INQUIRY & QUOTATION MODAL
// ==========================================
function openInquiry(productName) {
  inquiryProductName.value = productName;
  inquiryModal.classList.add("active");
  inquiryModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function openGeneralInquiry() {
  openInquiry("Complete 4-Catalogue Suite (Wires, Lighting, Switchgear & Decorative)");
}

function closeInquiryModal() {
  inquiryModal.classList.remove("active");
  inquiryModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

// Form Submission Handler (Netlify + LocalStorage)
async function handleInquirySubmit(event) {
  event.preventDefault();
  const form = document.getElementById("inquiryForm");
  const formData = new FormData(form);

  const submissionEntry = {
    timestamp: new Date().toLocaleString(),
    name: formData.get("user_name") || "",
    email: formData.get("user_email") || "",
    phone: formData.get("user_phone") || "",
    company: formData.get("user_company") || "",
    city: formData.get("user_city") || "",
    product: formData.get("product_name") || "",
    message: formData.get("user_message") || ""
  };

  saveSubmission(submissionEntry);

  // If live on Netlify, submit async POST
  try {
    if (window.location.hostname !== "localhost" && window.location.protocol !== "file:") {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString()
      });
    }
  } catch (err) {
    console.log("Netlify submission post:", err);
  }

  closeInquiryModal();
  showToast(`Thank you, ${submissionEntry.name}! Your request for "${submissionEntry.product}" is received.`);
  form.reset();
}

// ==========================================
// ADMIN AUTHENTICATION & DASHBOARD
// ==========================================
function isAdminLoggedIn() {
  return sessionStorage.getItem(ADMIN_CONFIG.sessionKey) === "authenticated";
}

function handleAdminButtonClick() {
  if (isAdminLoggedIn()) {
    openSubmissionsModal();
  } else {
    openAdminLoginModal();
  }
}

function openAdminLoginModal() {
  const modal = document.getElementById("adminLoginModal");
  const errorMsg = document.getElementById("loginErrorMsg");
  if (errorMsg) errorMsg.style.display = "none";
  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  setTimeout(() => {
    document.getElementById("adminUsername").focus();
  }, 100);
}

function closeAdminLoginModal() {
  const modal = document.getElementById("adminLoginModal");
  if (modal) {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    document.getElementById("adminLoginForm").reset();
  }
}

function handleAdminLogin(event) {
  event.preventDefault();
  const user = document.getElementById("adminUsername").value.trim();
  const pass = document.getElementById("adminPassword").value.trim();
  const errorMsg = document.getElementById("loginErrorMsg");

  if (user === ADMIN_CONFIG.username && pass === ADMIN_CONFIG.password) {
    sessionStorage.setItem(ADMIN_CONFIG.sessionKey, "authenticated");
    closeAdminLoginModal();
    updateAdminUI();
    showToast("Signed in as Administrator");
    openSubmissionsModal();
  } else {
    errorMsg.style.display = "block";
  }
}

function handleAdminLogout() {
  sessionStorage.removeItem(ADMIN_CONFIG.sessionKey);
  closeSubmissionsModal();
  updateAdminUI();
  showToast("Logged out of Admin Portal");
}

function updateAdminUI() {
  const adminBtnLabel = document.getElementById("adminBtnLabel");
  if (isAdminLoggedIn()) {
    if (adminBtnLabel) adminBtnLabel.textContent = "Admin Portal";
  } else {
    if (adminBtnLabel) adminBtnLabel.textContent = "Admin Login";
  }
}

function togglePasswordVisibility() {
  const passInput = document.getElementById("adminPassword");
  const btn = event.target;
  if (passInput.type === "password") {
    passInput.type = "text";
    btn.textContent = "Hide";
  } else {
    passInput.type = "password";
    btn.textContent = "Show";
  }
}

// ==========================================
// SUBMISSIONS & LEADS STORAGE
// ==========================================
function getStoredSubmissions() {
  try {
    return JSON.parse(localStorage.getItem("BAJAJ_SUBMISSIONS") || "[]");
  } catch (e) {
    return [];
  }
}

function saveSubmission(entry) {
  const list = getStoredSubmissions();
  list.unshift(entry);
  localStorage.setItem("BAJAJ_SUBMISSIONS", JSON.stringify(list));
  updateSubmissionsCount();
}

function updateSubmissionsCount() {
  const countEl = document.getElementById("submissionsCount");
  if (countEl) {
    const list = getStoredSubmissions();
    countEl.textContent = list.length;
  }
}

function openSubmissionsModal() {
  if (!isAdminLoggedIn()) {
    openAdminLoginModal();
    return;
  }

  updateDashboardStats();
  renderAdminLeadsTable();

  const modal = document.getElementById("submissionsModal");
  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeSubmissionsModal() {
  const modal = document.getElementById("submissionsModal");
  if (modal) {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
}

function updateDashboardStats() {
  const list = getStoredSubmissions();
  const statTotal = document.getElementById("statTotalLeads");
  const statTop = document.getElementById("statTopProduct");
  const statLatest = document.getElementById("statLatestTime");

  if (statTotal) statTotal.textContent = list.length;

  if (list.length === 0) {
    if (statTop) statTop.textContent = "-";
    if (statLatest) statLatest.textContent = "No inquiries yet";
    return;
  }

  if (statLatest) statLatest.textContent = list[0].timestamp;

  const counts = {};
  list.forEach(item => {
    const p = item.product || "General";
    counts[p] = (counts[p] || 0) + 1;
  });

  let topP = "-";
  let max = 0;
  for (const [prod, count] of Object.entries(counts)) {
    if (count > max) {
      max = count;
      topP = prod.length > 25 ? prod.substring(0, 23) + "..." : prod;
    }
  }
  if (statTop) statTop.textContent = topP;
}

function renderAdminLeadsTable(filterText = "") {
  const tableBody = document.getElementById("submissionsTableBody");
  const noSubMsg = document.getElementById("noSubmissionsMsg");
  let list = getStoredSubmissions();

  if (filterText) {
    const q = filterText.toLowerCase();
    list = list.filter(i => 
      (i.name && i.name.toLowerCase().includes(q)) ||
      (i.email && i.email.toLowerCase().includes(q)) ||
      (i.company && i.company.toLowerCase().includes(q)) ||
      (i.city && i.city.toLowerCase().includes(q)) ||
      (i.product && i.product.toLowerCase().includes(q)) ||
      (i.message && i.message.toLowerCase().includes(q))
    );
  }

  tableBody.innerHTML = "";

  if (list.length === 0) {
    noSubMsg.style.display = "block";
  } else {
    noSubMsg.style.display = "none";
    list.forEach((item, index) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${item.timestamp}</td>
        <td><strong>${escapeHtml(item.name)}</strong></td>
        <td><a href="mailto:${escapeHtml(item.email)}" style="color:var(--bajaj-cyan); text-decoration:none;">${escapeHtml(item.email)}</a></td>
        <td>${escapeHtml(item.phone || "-")}</td>
        <td>${escapeHtml(item.company || item.city || "-")}</td>
        <td><span class="cat-badge badge-wires" style="font-size:0.7rem;">${escapeHtml(item.product)}</span></td>
        <td>
          <div class="table-actions-cell">
            <button class="btn-tbl-view" onclick="viewLeadDetail(${index})">View Dossier</button>
            <button class="btn-tbl-del" onclick="deleteLead(${index})" title="Delete record">✕</button>
          </div>
        </td>
      `;
      tableBody.appendChild(tr);
    });
  }
}

function filterAdminLeads() {
  const searchVal = document.getElementById("adminLeadSearch").value.trim();
  renderAdminLeadsTable(searchVal);
}

function viewLeadDetail(index) {
  const list = getStoredSubmissions();
  const lead = list[index];
  if (!lead) return;

  document.getElementById("leadDetailName").textContent = lead.name;
  document.getElementById("leadDetailTime").textContent = `Logged on ${lead.timestamp}`;

  const content = document.getElementById("leadDetailContent");
  content.innerHTML = `
    <div class="dossier-row">
      <div class="dossier-tag">Requested Product Catalogue</div>
      <div class="dossier-val"><span class="cat-badge badge-lighting">${escapeHtml(lead.product)}</span></div>
    </div>
    <div class="dossier-row">
      <div class="dossier-tag">Full Name</div>
      <div class="dossier-val"><strong>${escapeHtml(lead.name)}</strong></div>
    </div>
    <div class="dossier-row">
      <div class="dossier-tag">Business Email</div>
      <div class="dossier-val"><a href="mailto:${escapeHtml(lead.email)}" style="color:var(--bajaj-cyan);">${escapeHtml(lead.email)}</a></div>
    </div>
    <div class="dossier-row">
      <div class="dossier-tag">Phone / WhatsApp Number</div>
      <div class="dossier-val">${escapeHtml(lead.phone || "Not provided")}</div>
    </div>
    <div class="dossier-row">
      <div class="dossier-tag">Company & City</div>
      <div class="dossier-val">${escapeHtml(lead.company || "Not provided")} ${lead.city ? `(${escapeHtml(lead.city)})` : ''}</div>
    </div>
    <div class="dossier-row">
      <div class="dossier-tag">Project Requirements / Notes</div>
      <div class="dossier-message-card">${escapeHtml(lead.message || "No special notes specified.")}</div>
    </div>
    <div class="dossier-buttons">
      <a href="mailto:${escapeHtml(lead.email)}?subject=Bajaj Electricals Catalogue Request - ${encodeURIComponent(lead.product)}" class="btn btn-primary btn-sm btn-block">
        ✉ Reply via Email
      </a>
      ${lead.phone ? `<a href="https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}" target="_blank" rel="noopener" class="btn btn-secondary btn-sm">💬 WhatsApp</a>` : ''}
    </div>
  `;

  const modal = document.getElementById("leadDetailModal");
  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
}

function closeLeadDetailModal() {
  const modal = document.getElementById("leadDetailModal");
  if (modal) {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
  }
}

function deleteLead(index) {
  if (confirm("Are you sure you want to delete this customer lead record?")) {
    const list = getStoredSubmissions();
    list.splice(index, 1);
    localStorage.setItem("BAJAJ_SUBMISSIONS", JSON.stringify(list));
    updateSubmissionsCount();
    updateDashboardStats();
    renderAdminLeadsTable(document.getElementById("adminLeadSearch").value);
    showToast("Lead record removed.");
  }
}

function clearAllSubmissions() {
  if (confirm("Are you sure you want to clear all local customer records?")) {
    localStorage.removeItem("BAJAJ_SUBMISSIONS");
    updateSubmissionsCount();
    updateDashboardStats();
    renderAdminLeadsTable();
    showToast("All records cleared.");
  }
}

function exportSubmissionsCSV() {
  const list = getStoredSubmissions();
  if (list.length === 0) {
    alert("No lead submissions recorded yet.");
    return;
  }

  const headers = ["Timestamp", "Name", "Email", "Phone", "Company", "City", "Product", "Message"];
  const rows = list.map(i => [
    `"${i.timestamp}"`,
    `"${(i.name || "").replace(/"/g, '""')}"`,
    `"${(i.email || "").replace(/"/g, '""')}"`,
    `"${(i.phone || "").replace(/"/g, '""')}"`,
    `"${(i.company || "").replace(/"/g, '""')}"`,
    `"${(i.city || "").replace(/"/g, '""')}"`,
    `"${(i.product || "").replace(/"/g, '""')}"`,
    `"${(i.message || "").replace(/"/g, '""')}"`
  ]);

  const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `bajaj-leads-${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast("Exported all leads to CSV!");
}

function downloadAllCataloguesBatch() {
  showToast("Initiating batch download of all 4 Bajaj catalogues...");
  PRODUCTS_DATA.forEach((prod, index) => {
    setTimeout(() => {
      const link = document.createElement("a");
      link.href = prod.pdfPath;
      link.download = `${prod.id}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, index * 400);
  });
}

function trackDownload(title) {
  showToast(`Downloading "${title}" PDF...`);
}

function resetFilters() {
  searchInput.value = "";
  searchQuery = "";
  clearSearchBtn.style.display = "none";
  activeCategory = "all";
  categoryPills.forEach(p => {
    if (p.getAttribute("data-category") === "all") p.classList.add("active");
    else p.classList.remove("active");
  });
  renderProducts();
}

function escapeHtml(text) {
  if (!text) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function showToast(message) {
  toastMsg.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3500);
}
