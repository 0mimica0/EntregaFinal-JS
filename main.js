document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.getElementById('productContainer');
    const cartItemsContainer = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');
    const billingForm = document.getElementById('billingForm');
    const messageContainer = document.getElementById('messageContainer');
    const checkoutButton = document.getElementById('checkout');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    fetch('./productos.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la red');
            }
            return response.json();
        })
        .then(products => renderProducts(products))
        .catch(error => console.error('Error al cargar productos:', error));

    function renderProducts(products) {
        productContainer.innerHTML = '';

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'col-12 col-sm-6 col-lg-3';
            productCard.innerHTML = `
                <div class="card mb-4">
                    <img src="${product.img}" class="card-img-top" alt="${product.title}">
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text">${product.description}</p>
                        <p class="card-text">Precio: $${product.price}</p>
                        <button class="btn btn-primary add-to-cart" data-id="${product.id}" data-title="${product.title}" data-price="${product.price}">Agregar al carrito</button>
                    </div>
                </div>
            `;
            productContainer.appendChild(productCard);
        });
    }

    function updateCart() {
        cartItemsContainer.innerHTML = '';
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = total.toFixed(2);

        cart.forEach(item => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
            listItem.innerHTML = `
                ${item.title} - $${item.price} (Cantidad: ${item.quantity})
                <div class="quantity-controls">
                    <button type="button" class="btn btn-secondary btn-sm decrease" data-id="${item.id}">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button type="button" class="btn btn-secondary btn-sm increase" data-id="${item.id}">+</button>
                </div>
                <button type="button" class="btn-close" aria-label="Close" data-id="${item.id}"></button>
            `;
            cartItemsContainer.appendChild(listItem);
        });

        localStorage.setItem('cart', JSON.stringify(cart));
    }

    productContainer.addEventListener('click', event => {
        if (event.target.classList.contains('add-to-cart')) {
            const id = event.target.getAttribute('data-id');
            const title = event.target.getAttribute('data-title');
            const price = parseFloat(event.target.getAttribute('data-price'));

            const existingItem = cart.find(item => item.id === id);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ id, title, price, quantity: 1 });
            }

            updateCart();
        }
    });

    cartItemsContainer.addEventListener('click', event => {
        const id = event.target.getAttribute('data-id');

        if (event.target.classList.contains('btn-close')) {
            cart = cart.filter(item => item.id !== id);
            updateCart();
        }

        if (event.target.classList.contains('increase')) {
            const item = cart.find(item => item.id === id);
            item.quantity++;
            updateCart();
        }

        if (event.target.classList.contains('decrease')) {
            const item = cart.find(item => item.id === id);
            if (item.quantity > 1) {
                item.quantity--;
            } else {
                cart = cart.filter(item => item.id !== id);
            }
            updateCart();
        }
    });

    checkoutButton.addEventListener('click', () => {
        billingForm.classList.remove('d-none');
    });

    billingForm.addEventListener('submit', event => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        const paymentMethod = document.getElementById('paymentMethod').value;

        messageContainer.innerHTML = `
            <div class="alert alert-success">Gracias, ${name}. Tu pedido ha sido recibido y el total es $${cartTotal.textContent}. Estás pagando con ${paymentMethod}. Tu pedido será enviado a ${address}.</div>
        `;

        cart = [];
        updateCart();
        billingForm.classList.add('d-none');
    });

    updateCart();
});
