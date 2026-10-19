const API_URL = 'http://localhost:3000/api/products';

// Load products when page loads
document.addEventListener('DOMContentLoaded', getProducts);

const form = document.getElementById('productForm');
const tableBody = document.getElementById('productTableBody');

// Handle Form Submit (Create or Update)
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const id = document.getElementById('productId').value;
    const productData = {
        product_name: document.getElementById('product_name').value,
        brand: document.getElementById('brand').value,
        category: document.getElementById('category').value,
        price: parseFloat(document.getElementById('price').value),
        stock: parseInt(document.getElementById('stock').value),
        description: document.getElementById('description').value
    };

    if (id) {
        // Update (PUT)
        await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData)
        });
    } else {
        // Create (POST)
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData)
        });
    }

    form.reset();
    document.getElementById('productId').value = '';
    document.getElementById('submitBtn').textContent = 'Add Product';
    getProducts();
});

// READ (GET all)
async function getProducts() {
    const response = await fetch(API_URL);
    const products = await response.json();
    
    tableBody.innerHTML = '';
    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.product_name}</td>
            <td>${product.brand}</td>
            <td>$${product.price}</td>
            <td>${product.stock}</td>
            <td class="actions">
                <button class="edit-btn" onclick="editProduct(${product.id})">Edit</button>
                <button class="delete-btn" onclick="deleteProduct(${product.id})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// DELETE
async function deleteProduct(id) {
    if (confirm('Are you sure you want to delete this product?')) {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        getProducts();
    }
}

// EDIT (Pre-fill form for Update)
async function editProduct(id) {
    const response = await fetch(`${API_URL}/${id}`);
    const product = await response.json();

    document.getElementById('productId').value = product.id;
    document.getElementById('product_name').value = product.product_name;
    document.getElementById('brand').value = product.brand;
    document.getElementById('category').value = product.category;
    document.getElementById('price').value = product.price;
    document.getElementById('stock').value = product.stock;
    document.getElementById('description').value = product.description;

    document.getElementById('submitBtn').textContent = 'Update Product';
}