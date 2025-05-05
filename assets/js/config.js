const CONFIG = {
    // **PAYMENT CONFIGURATION**
    PAYPAL_CLIENT_ID: "YOUR_PAYPAL_CLIENT_IDAWwKIG5x8PlUre8XFbRkl_g_UPWX3EoBaWDbzFjh1-nWBifHpC0BAXQGUEkZXdXKCEEKBtYmDt3VbWqo", // Replace with your PayPal Client ID

    // **BACKEND API CONFIGURATION**
    API_BASE_URL: "http://localhost:3001", // Replace with live URL when deployed
    NOTIFICATION_ENDPOINT: "http://localhost:3001/api/notify-transaction", // Backend endpoint for sending transaction alerts

    // **CONTACT DETAILS**
    CONTACT_EMAIL: "TheModernWardrobeCo@outlook.com", // Replace with official customer support email
    WHATSAPP_NUMBER: "+254708557555", // Replace with your business WhatsApp number

    // **TERMS & CONDITIONS**
    TERMS_URL: "/pages/terms.html", // Ensure terms.html is placed correctly inside /pages/

    // **DEFAULT VALUES FOR GLOBAL USE**
    DEFAULT_PRODUCT_IMAGE: "/assets/images/placeholder.jpg", // Default image if product image is missing
    DEFAULT_CURRENCY: "USD", // Standard currency for transactions
};

// **Make this globally accessible for non-module scripts**
window.CONFIG = CONFIG;

// **Export for usage in module-based scripts**
export default CONFIG;
