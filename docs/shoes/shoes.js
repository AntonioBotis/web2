// Initialize shoes array and form elements
let shoes = [];
let filteredShoes = [];
let currentFilters = {
    search: '',
    minPrice: null,
    maxPrice: null,
    size: ''
};

const form = document.getElementById('shoe-form');
const container = document.getElementById('products-container');

// Form submission handler
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(form);
    const shoe = {
        id: Date.now(),
        name: formData.get('name'),
        price: parseFloat(formData.get('price')),
        image: formData.get('image'),
        sizes: formData.get('sizes').split(',').map(s => s.trim()),
        description: formData.get('description')
    };

    shoes.push(shoe);
    renderShoes();
    form.reset();
});

// Event listeners for filter inputs
document.getElementById('search').addEventListener('input', applyFilters);
document.getElementById('min-price').addEventListener('input', applyFilters);
document.getElementById('max-price').addEventListener('input', applyFilters);
document.getElementById('filter-size').addEventListener('input', applyFilters);

function applyFilters() {
    const search = document.getElementById('search').value.toLowerCase();
    const minPrice = parseFloat(document.getElementById('min-price').value) || 0;
    const maxPrice = parseFloat(document.getElementById('max-price').value) || Infinity;
    const size = document.getElementById('filter-size').value.toLowerCase();

    currentFilters = { search, minPrice, maxPrice, size };

    filteredShoes = shoes.filter(shoe => {
        const matchesSearch = shoe.name.toLowerCase().includes(search) ||
                            (shoe.description && shoe.description.toLowerCase().includes(search));
        const matchesPrice = shoe.price >= minPrice && shoe.price <= maxPrice;
        const matchesSize = !size || shoe.sizes.some(s => s.toLowerCase().includes(size));

        return matchesSearch && matchesPrice && matchesSize;
    });

    renderFilteredShoes();
    updateResultsCount();
}

function renderFilteredShoes() {
    const container = document.getElementById('products-container');
    
    if (filteredShoes.length === 0) {
        container.innerHTML = '<div class="no-products"><p>No shoes match your filters. Try adjusting your search criteria.</p></div>';
        return;
    }

    const grid = document.createElement('div');
    grid.className = 'products-grid';
    
    filteredShoes.forEach(shoe => {
        const card = createProductCard(shoe, false); // false = isShoes
        grid.appendChild(card);
    });
    
    container.innerHTML = '';
    container.appendChild(grid);
}

function updateResultsCount() {
    const countElement = document.getElementById('results-count');
    countElement.textContent = `Showing ${filteredShoes.length} of ${shoes.length} shoes`;
}

function clearFilters() {
    document.getElementById('search').value = '';
    document.getElementById('min-price').value = '';
    document.getElementById('max-price').value = '';
    document.getElementById('filter-size').value = '';
    
    currentFilters = { search: '', minPrice: null, maxPrice: null, size: '' };
    
    // Reset to show all shoes
    filteredShoes = [...shoes];
    renderFilteredShoes();
    updateResultsCount();
}

function initializeShoesFilters() {
    filteredShoes = [...shoes];
    updateResultsCount();
}

// Main render function that initializes filters
function renderShoes() {
    if (shoes.length === 0) {
        document.getElementById('products-container').innerHTML = '<div class="no-products"><p>No shoes added yet. Use the form above to add your first shoe!</p></div>';
        return;
    }
    
    // Initialize filters when shoes are rendered
    filteredShoes = [...shoes];
    renderFilteredShoes();
    updateResultsCount();
}

// Delete function that maintains filters
function deleteShoe(id) {
    if (confirm('Are you sure you want to delete this shoe?')) {
        shoes = shoes.filter(shoe => shoe.id !== id);
        // Reapply current filters after deletion
        applyFilters();
    }
}

// Modal functionality
function openProductModal(product) {
    const modal = document.getElementById('productModal');
    const imageContainer = document.getElementById('modal-image-container');
    
    // Set product details
    document.getElementById('modal-name').textContent = product.name;
    document.getElementById('modal-description').textContent = product.description || 'No description available';
    document.getElementById('modal-price').textContent = `$${product.price.toFixed(2)}`;
    
    // Handle category (for clothes only) - hide for shoes
    const categoryElement = document.getElementById('modal-category');
    categoryElement.style.display = 'none';
    
    // Handle color (for clothes only) - hide for shoes
    const colorElement = document.getElementById('modal-color');
    colorElement.style.display = 'none';
    
    // Handle image
    if (product.image) {
        imageContainer.innerHTML = `<img src="${product.image}" alt="${product.name}" class="modal-image" onerror="showFallbackIcon(this, '${getFallbackIcon(product)}')">`;
    } else {
        imageContainer.innerHTML = `<div class="modal-fallback-icon">${getFallbackIcon(product)}</div>`;
    }
    
    // Handle sizes
    const sizesContainer = document.getElementById('modal-sizes');
    sizesContainer.innerHTML = product.sizes.map(size => 
        `<span class="modal-size-tag">${size}</span>`
    ).join('');
    
    // Show modal
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeModal() {
    const modal = document.getElementById('productModal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto'; // Restore scrolling
}

function getFallbackIcon(product) {
    if (product.category) {
        // For clothes
        const categoryEmoji = {
            'shirts': '👔',
            'pants': '👖', 
            'dresses': '👗',
            'jackets': '🧥',
            'accessories': '👜',
            'other': '👕'
        };
        return categoryEmoji[product.category] || '👕';
    } else {
        // For shoes
        return '👟';
    }
}

function showFallbackIcon(img, icon) {
    img.style.display = 'none';
    img.parentElement.innerHTML = `<div class="modal-fallback-icon">${icon}</div>`;
}

function createProductCard(product, isClothes = false) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.onclick = () => openProductModal(product);
    
    if (isClothes) {
        const categoryEmoji = {
            'shirts': '👔', 'pants': '👖', 'dresses': '👗',
            'jackets': '🧥', 'accessories': '👜', 'other': '👕'
        };
        
        card.innerHTML = `
            <button class="delete-btn" onclick="event.stopPropagation(); deleteClothing(${product.id})">×</button>
            <div class="product-image">
                ${product.image ? `<img src="${product.image}" alt="${product.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div style="display:none; align-items:center; justify-content:center; font-size:4rem;">${categoryEmoji[product.category] || '👕'}</div>` : (categoryEmoji[product.category] || '👕')}
            </div>
            <div class="product-info">
                <div class="product-category">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</div>
                <div class="product-name">${product.name}</div>
                ${product.color ? `<div style="opacity: 0.8; margin-bottom: 0.5rem;">Color: ${product.color}</div>` : ''}
                <div class="product-description">${product.description || 'No description available'}</div>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div class="product-sizes">
                    ${product.sizes.map(size => `<span class="size-tag">${size}</span>`).join('')}
                </div>
            </div>
        `;
    } else {
        // For shoes
        card.innerHTML = `
            <button class="delete-btn" onclick="event.stopPropagation(); deleteShoe(${product.id})">×</button>
            <div class="product-image">
                ${product.image ? `<img src="${product.image}" alt="${product.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div style="display:none; align-items:center; justify-content:center; font-size:4rem;">👟</div>` : '👟'}
            </div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-description">${product.description || 'No description available'}</div>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div class="product-sizes">
                    ${product.sizes.map(size => `<span class="size-tag">${size}</span>`).join('')}
                </div>
            </div>
        `;
    }
    
    return card;
}

// Close modal when clicking outside content
document.getElementById('productModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Add some sample data
shoes = [
    {
        id: 1,
        name: "Premium Sneakers",
        price: 129.99,
        image: "",
        sizes: ["8", "9", "10", "11"],
        description: "Comfortable and stylish sneakers perfect for everyday wear"
    },
    {
        id: 2,
        name: "Classic Leather Boots",
        price: 199.99,
        image: "",
        sizes: ["7", "8", "9", "10", "11", "12"],
        description: "Durable leather boots with timeless style"
    }
];

// Initialize the page
renderShoes();