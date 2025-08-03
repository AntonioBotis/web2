// Initialize clothes array and form elements
let clothes = [];
let filteredClothes = [];
let currentFilters = {
    search: '',
    minPrice: null,
    maxPrice: null,
    category: '',
    size: ''
};

const form = document.getElementById('clothing-form');
const container = document.getElementById('products-container');

// Form submission handler
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(form);
    const item = {
        id: Date.now(),
        name: formData.get('name'),
        price: parseFloat(formData.get('price')),
        category: formData.get('category'),
        image: formData.get('image'),
        sizes: formData.get('sizes').split(',').map(s => s.trim()),
        color: formData.get('color'),
        description: formData.get('description')
    };

    clothes.push(item);
    renderClothes();
    form.reset();
});

// Event listeners for filter inputs
document.getElementById('search').addEventListener('input', applyFilters);
document.getElementById('min-price').addEventListener('input', applyFilters);
document.getElementById('max-price').addEventListener('input', applyFilters);
document.getElementById('filter-size').addEventListener('input', applyFilters);
document.getElementById('filter-category').addEventListener('change', applyFilters);

// Show category filter for clothes
document.getElementById('category-filter').style.display = 'block';

function applyFilters() {
    const search = document.getElementById('search').value.toLowerCase();
    const minPrice = parseFloat(document.getElementById('min-price').value) || 0;
    const maxPrice = parseFloat(document.getElementById('max-price').value) || Infinity;
    const size = document.getElementById('filter-size').value.toLowerCase();
    const category = document.getElementById('filter-category').value;

    currentFilters = { search, minPrice, maxPrice, category, size };

    filteredClothes = clothes.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(search) ||
                            (item.description && item.description.toLowerCase().includes(search));
        const matchesPrice = item.price >= minPrice && item.price <= maxPrice;
        const matchesSize = !size || item.sizes.some(s => s.toLowerCase().includes(size));
        const matchesCategory = !category || item.category === category;

        return matchesSearch && matchesPrice && matchesSize && matchesCategory;
    });

    renderFilteredClothes();
    updateResultsCount();
}

function renderFilteredClothes() {
    const container = document.getElementById('products-container');
    
    if (filteredClothes.length === 0) {
        container.innerHTML = '<div class="no-products"><p>No clothing items match your filters. Try adjusting your search criteria.</p></div>';
        return;
    }

    const grid = document.createElement('div');
    grid.className = 'products-grid';
    
    filteredClothes.forEach(item => {
        const card = createProductCard(item, true); // true = isClothes
        grid.appendChild(card);
    });
    
    container.innerHTML = '';
    container.appendChild(grid);
}

function updateResultsCount() {
    const countElement = document.getElementById('results-count');
    countElement.textContent = `Showing ${filteredClothes.length} of ${clothes.length} clothing items`;
}

function clearFilters() {
    document.getElementById('search').value = '';
    document.getElementById('min-price').value = '';
    document.getElementById('max-price').value = '';
    document.getElementById('filter-size').value = '';
    document.getElementById('filter-category').value = '';
    
    currentFilters = { search: '', minPrice: null, maxPrice: null, category: '', size: '' };
    
    // Reset to show all clothes
    filteredClothes = [...clothes];
    renderFilteredClothes();
    updateResultsCount();
}

function initializeClothesFilters() {
    filteredClothes = [...clothes];
    updateResultsCount();
}

// Main render function that initializes filters
function renderClothes() {
    if (clothes.length === 0) {
        document.getElementById('products-container').innerHTML = '<div class="no-products"><p>No clothing items added yet. Use the form above to add your first item!</p></div>';
        return;
    }
    
    // Initialize filters when clothes are rendered
    filteredClothes = [...clothes];
    renderFilteredClothes();
    updateResultsCount();
}

// Delete function that maintains filters
function deleteClothing(id) {
    if (confirm('Are you sure you want to delete this item?')) {
        clothes = clothes.filter(item => item.id !== id);
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
    
    // Handle category (for clothes only)
    const categoryElement = document.getElementById('modal-category');
    if (product.category) {
        categoryElement.textContent = product.category.charAt(0).toUpperCase() + product.category.slice(1);
        categoryElement.style.display = 'inline-block';
    } else {
        categoryElement.style.display = 'none';
    }
    
    // Handle color (for clothes only)
    const colorElement = document.getElementById('modal-color');
    if (product.color) {
        colorElement.textContent = `Color: ${product.color}`;
        colorElement.style.display = 'block';
    } else {
        colorElement.style.display = 'none';
    }
    
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
clothes = [
    {
        id: 1,
        name: "Premium Cotton T-Shirt",
        price: 29.99,
        category: "shirts",
        image: "",
        sizes: ["S", "M", "L", "XL"],
        color: "Navy Blue",
        description: "Comfortable 100% cotton t-shirt with modern fit"
    },
    {
        id: 2,
        name: "Classic Denim Jeans",
        price: 79.99,
        category: "pants",
        image: "",
        sizes: ["28", "30", "32", "34", "36"],
        color: "Dark Blue",
        description: "Premium denim jeans with classic straight fit"
    },
    {
        id: 3,
        name: "Elegant Summer Dress",
        price: 89.99,
        category: "dresses",
        image: "",
        sizes: ["XS", "S", "M", "L"],
        color: "Floral Print",
        description: "Light and airy summer dress perfect for any occasion"
    }
];

// Initialize the page
renderClothes();