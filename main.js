document.addEventListener('DOMContentLoaded', function() {
    let cart = [];

    const cartItemsContainer = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');
    const checkoutButton = document.getElementById('checkout');
    const billingForm = document.getElementById('billingForm');
    const checkoutForm = document.getElementById('checkoutForm');
    const messageContainer = document.getElementById('messageContainer');

    function updateCart() {
        cartItemsContainer.innerHTML = '';

        cart.forEach(item => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
            listItem.innerHTML = `
                ${item.title} - $${item.price}
                <button type="button" class="btn-close" aria-label="Close" data-id="${item.id}"></button>
            `;
            cartItemsContainer.appendChild(listItem);
        });

        cartCount.textContent = cart.length;

        const total = cart.reduce((sum, item) => sum + item.price, 0);
        cartTotal.textContent = total.toFixed(2);
    }

    function displayMessage(message, type) {
        messageContainer.innerHTML = `<div class="${type}">${message}</div>`;
    }

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            const title = this.getAttribute('data-title');
            const price = parseFloat(this.getAttribute('data-price'));

            const existingProduct = cart.find(item => item.id === id);
            if (!existingProduct) {
                cart.push({ id, title, price });
                updateCart();
            }
        });
    });

    cartItemsContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('btn-close')) {
            const id = event.target.getAttribute('data-id');
            cart = cart.filter(item => item.id !== id);
            updateCart();
        }
    });

    checkoutButton.addEventListener('click', function() {
        if (cart.length === 0) {
            displayMessage('El carrito está vacío.', 'message-warning');
            return;
        }
        billingForm.classList.remove('d-none');
        messageContainer.innerHTML = '';
    });

    checkoutForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        const paymentMethod = document.getElementById('paymentMethod').value;

        if (!name || !address || !paymentMethod) {
            displayMessage('Por favor, complete todos los campos.', 'message-warning');
            return;
        }

        displayMessage('¡Gracias por su compra!', 'message-success');
        cart = [];
        updateCart();
        billingForm.classList.add('d-none');
    });
});
