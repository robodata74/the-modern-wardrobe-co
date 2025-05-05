// ✅ Backend API Configuration
const API_URL = "http://localhost:3000/api";
const PRODUCTS_GRID = document.getElementById("productsGrid");
const ORDER_FORM = document.getElementById("orderForm");
const MENU_TOGGLE = document.querySelector(".menu-toggle");
const NAV_MENU = document.querySelector(".nav-menu");

// 🛒 Product Fetching and Display
async function fetchProducts(category = "") {
    try {
        showLoading();
        const endpoint = `${API_URL}/products${category ? `/category/${category}` : ""}`;
        const response = await fetch(endpoint);
        
        if (!response.ok) throw new Error(`HTTP Error ${response.status}`);
        
        const { products } = await response.json();
        renderProducts(products);
    } catch (error) {
        console.error("Product fetching error:", error);
        showError("Failed to load products. Please try again later.");
    }
}

function renderProducts(products) {
    PRODUCTS_GRID.innerHTML = "";
    
    if (!products?.length) {
        showMessage("No products available");
        return;
    }

    products.forEach(product => {
        const productCard = createProductCard(product);
        PRODUCTS_GRID.appendChild(productCard);
    });
}

function createProductCard(product) {
    const card = document.createElement("article");
    card.className = "product-item";
    card.innerHTML = `
        <a href="retail.html?id=${product.id}" class="product-link">
            <img src="${getImageUrl(product.image)}" 
                 alt="${escapeHTML(product.name)}" 
                 loading="lazy"
                 onerror="this.src='assets/images/placeholder.jpg'">
            <div class="product-info">
                <h3>${escapeHTML(product.name)}</h3>
                <p class="price">$${product.price.toFixed(2)}</p>
                <p class="description">${escapeHTML(truncateDescription(product.description))}</p>
                <button class="view-details">View Details</button>
            </div>
        </a>
    `;
    return card;
}

// 🛍️ Product Detail Page Handling
function setupProductDetailPage() {
    const productId = new URLSearchParams(window.location.search).get('id');
    if (!productId) return;

    fetchProductDetails(productId);
}

async function fetchProductDetails(productId) {
    try {
        const response = await fetch(`${API_URL}/products/${productId}`);
        if (!response.ok) throw new Error("Product not found");
        
        const { product } = await response.json();
        renderProductDetail(product);
    } catch (error) {
        renderProductError(error.message);
    }
}

function renderProductDetail(product) {
    const container = document.getElementById("productDetailContainer");
    if (!container) return;

    container.innerHTML = `
        <div class="product-detail">
            <div class="product-images">
                <img src="${getImageUrl(product.image)}" alt="${escapeHTML(product.name)}">
            </div>
            <div class="product-meta">
                <h1>${escapeHTML(product.name)}</h1>
                <p class="price">$${product.price.toFixed(2)}</p>
                <div class="specs">
                    ${product.brand ? `<p><strong>Brand:</strong> ${escapeHTML(product.brand)}</p>` : ''}
                    ${product.category ? `<p><strong>Category:</strong> ${escapeHTML(product.category)}</p>` : ''}
                    ${product.sizes ? `<p><strong>Sizes:</strong> ${escapeHTML(product.sizes)}</p>` : ''}
                </div>
                <p class="full-description">${escapeHTML(product.description)}</p>
                <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        </div>
    `;
}

// 🛒 Order Management
function setupOrderForm() {
    if (!ORDER_FORM) return;
    
    ORDER_FORM.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(ORDER_FORM);
        
        try {
            const response = await fetch(`${API_URL}/orders`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(Object.fromEntries(formData))
            });
            
            if (!response.ok) throw new Error("Order failed");
            
            alert("Order placed successfully!");
            ORDER_FORM.reset();
        } catch (error) {
            alert(`Order error: ${error.message}`);
        }
    });
}

// 🍔 Mobile Navigation
function setupMobileMenu() {
    if (!MENU_TOGGLE || !NAV_MENU) return;

    MENU_TOGGLE.addEventListener("click", () => {
        const isExpanded = MENU_TOGGLE.getAttribute("aria-expanded") === "true";
        MENU_TOGGLE.setAttribute("aria-expanded", !isExpanded);
        NAV_MENU.classList.toggle("active");
    });
}

// 🎯 Utility Functions
function getImageUrl(imagePath) {
    if (!imagePath) return "assets/images/placeholder.jpg";
    return imagePath.startsWith("http") ? imagePath : `${API_URL}${imagePath}`;
}

function escapeHTML(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
}

function truncateDescription(desc, length = 100) {
    return desc?.length > length ? `${desc.substring(0, length)}...` : desc || "No description";
}

function showLoading() {
    PRODUCTS_GRID.innerHTML = '<div class="loading">Loading products...</div>';
}

function showError(message) {
    PRODUCTS_GRID.innerHTML = `<div class="error">${message}</div>`;
}

function showMessage(message) {
    PRODUCTS_GRID.innerHTML = `<div class="message">${message}</div>`;
}

// 🚀 Initialize Application
function init() {
    setupMobileMenu();
    setupOrderForm();
    
    if (document.getElementById("productsGrid")) {
        fetchProducts();
    }
    
    if (window.location.pathname.includes("retail.html")) {
        setupProductDetailPage();
    }
}

document.addEventListener("DOMContentLoaded", init);