let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartSummary() {
    document.getElementById('cart-icon').textContent = `Carrito (${cart.length})`;
}

function mostrarCarrito() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.product} (Talla: ${item.talla}) - $${item.price}`;
        cartItems.appendChild(li);
    });
}

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        const product = event.target.getAttribute('data-product');
        const price = parseFloat(event.target.getAttribute('data-price'));
        const talla = event.target.parentElement.querySelector('.select-talla').value;
        cart.push({ product, price, talla });
        localStorage.setItem('cart', JSON.stringify(cart));
        mostrarCarrito();
        updateCartSummary();
        alert('Producto añadido');
    });
});

// Agregar evento para mostrar el modal con detalles del producto
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
        const title = card.querySelector('.card-title').textContent;
        const description = card.querySelector('.card-description').textContent;
        const price = card.querySelector('.card-price').textContent;
        const imageSrc = card.querySelector('.product-image').src;

        // Actualizar el contenido del modal
        document.getElementById('modal-product-title').textContent = title;
        document.getElementById('modal-product-description').textContent = description;
        document.getElementById('modal-product-price').textContent = price;
        document.getElementById('modal-product-image').src = imageSrc;

        // Actualizar atributos del botón "Añadir al carrito" en el modal
        const addToCartModalButton = document.querySelector('.add-to-cart-modal');
        addToCartModalButton.setAttribute('data-product', title);
        addToCartModalButton.setAttribute('data-price', price.replace('$', ''));

        // Mostrar el modal
        const modal = new bootstrap.Modal(document.getElementById('productModal'));
        modal.show();
    });
});

// Agregar evento para añadir productos al carrito desde el modal
document.querySelector('.add-to-cart-modal').addEventListener('click', (event) => {
    const product = event.target.getAttribute('data-product');
    const price = parseFloat(event.target.getAttribute('data-price'));
    const talla = document.getElementById('modal-select-talla').value;
    cart.push({ product, price, talla });
    localStorage.setItem('cart', JSON.stringify(cart));
    mostrarCarrito();
    updateCartSummary();
    alert('Producto añadido desde el modal');
});

// Función para mostrar más detalles de la descripción
document.querySelectorAll('.show-more-btn').forEach(button => {
    button.addEventListener('click', () => {
        const description = button.previousElementSibling;
        if (description.classList.contains('expanded')) {
            description.classList.remove('expanded');
            button.textContent = 'Mostrar más';
        } else {
            description.classList.add('expanded');
            button.textContent = 'Mostrar menos';
        }
    });
});

// Funcionalidad para el slider de imágenes
document.querySelectorAll('.image-slider').forEach(slider => {
    const images = slider.querySelectorAll('.product-image');
    let currentIndex = 0;

    slider.querySelector('.right-arrow').addEventListener('click', () => {
        images[currentIndex].style.display = 'none';
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].style.display = 'block';
    });

    slider.querySelector('.left-arrow').addEventListener('click', () => {
        images[currentIndex].style.display = 'none';
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        images[currentIndex].style.display = 'block';
    });
});

// Finalizar compra y enviar mensaje de WhatsApp
document.getElementById('finalize-purchase').addEventListener('click', (event) => {
    event.preventDefault();
    let message = 'Hola, me gustaría comprar los siguientes productos:%0A';
    cart.forEach(item => {
        message += `- ${item.product} (Talla: ${item.talla}): $${item.price}%0A`;
    });
    window.open(`https://wa.me/921838549?text=${message}`, '_blank');
});

// Función para vaciar el carrito
function vaciarCarrito() {
    cart = [];
    localStorage.removeItem('cart');
    mostrarCarrito();
    updateCartSummary();
    alert('Carrito vaciado.');
}

updateCartSummary();
mostrarCarrito();
