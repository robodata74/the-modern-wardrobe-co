document.addEventListener("DOMContentLoaded", async () => {
    const productGrid = document.getElementById("product-grid");

    // ✅ Show loading indicator
    productGrid.innerHTML = `<p>⌛ Loading bulk products...</p>`;

    try {
        const response = await fetch("http://localhost:3001/api/products/bulk");

        if (!response.ok) {
            throw new Error(`Server responded with ${response.status}`);
        }
        
        const data = await response.json();

        if (!data.products || data.products.length === 0) {
            productGrid.innerHTML = `<p>🚨 No bulk products available.</p>`;
            return;
        }

        // Generate product HTML
        const productsHTML = data.products.map(product => {
            const imageUrl = `http://localhost:3001${product.image}`;
            return `
                <div class="product-card">
                    <img src="${imageUrl}" 
                         alt="${product.name}" 
                         class="product-image">
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <p class="price">$${product.price}</p>
                        <button class="buy-now">Buy Now</button>
                    </div>
                </div>
            `;
        }).join("");

        productGrid.innerHTML = productsHTML;

    } catch (error) {
        console.error("❌ Error loading bulk products:", error);
        productGrid.innerHTML = `<p>Failed to load bulk products. Please try again later.</p>`;
    }
});

// Fallback for broken images (if necessary)
document.addEventListener("error", (e) => {
    if (e.target.tagName.toLowerCase() === "img" && !e.target.src.includes('placeholder.jpg')) {
        e.target.src = '/assets/images/placeholder.jpg';
    }
});
