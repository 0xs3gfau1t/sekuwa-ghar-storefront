(function() {
  const dataScript = document.getElementById('storefront-data');
  const data = JSON.parse(dataScript.textContent);

  function formatPrice(cents) {
    return '$' + (cents / 100).toFixed(2);
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function render() {
    const app = document.getElementById('app');
    const { config, products } = data;

    let html = '<div class="container">';

    // Header
    html += '<header>';
    if (config.photoUrl) {
      html += '<img class="site-photo" src="' + escapeHtml(config.photoUrl) + '" alt="' + escapeHtml(config.siteName || '') + '">';
    }
    if (config.siteName) {
      html += '<h1 class="site-name">' + escapeHtml(config.siteName) + '</h1>';
    }
    if (config.bio) {
      html += '<p class="site-bio">' + escapeHtml(config.bio) + '</p>';
    }
    html += '</header>';

    // Products
    if (products.length > 0) {
      html += '<section class="products-grid">';
      products.forEach(function(product) {
        html += '<article class="product-card">';
        if (product.photoUrl) {
          html += '<img class="product-image" src="' + escapeHtml(product.photoUrl) + '" alt="' + escapeHtml(product.title) + '">';
        } else {
          html += '<div class="product-image-placeholder">No Image</div>';
        }
        html += '<div class="product-content">';
        html += '<h2 class="product-title">' + escapeHtml(product.title) + '</h2>';
        html += '<p class="product-price">' + formatPrice(product.price) + '</p>';
        html += '<p class="product-description">' + escapeHtml(product.description) + '</p>';
        html += '</div>';
        html += '</article>';
      });
      html += '</section>';
    }

    // Footer
    html += '<footer>Powered by weblit</footer>';
    html += '</div>';

    app.innerHTML = html;
  }

  render();
})();