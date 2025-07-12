document.addEventListener('DOMContentLoaded', () => {
      // Animaciones
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
      }, { threshold: 0.3 });
      document.querySelectorAll('.animate-up').forEach(sec => observer.observe(sec));

      // Formulario
      const form = document.getElementById('form-contacto');
      form.addEventListener('submit', e => {
        e.preventDefault();
        if(form.checkValidity()) { alert('¡Mensaje enviado!'); form.reset(); }
        else alert('Por favor, completa todos los campos.');
      });

      // Chat
      document.getElementById('chat-btn')
        .addEventListener('click', () => window.open('https://wa.me/989592507', '_blank')); 

      // Carrito
      const addBtns = document.querySelectorAll('.btn-add');
      const openCartBtn = document.getElementById('openCart');
      const cartOverlay = document.getElementById('cartOverlay');
      const closeCartBtn = document.getElementById('closeCart');
      const cartItemsContainer = document.getElementById('cartItems');
      const cartTotalSpan = document.getElementById('cartTotal');
      let cart = [];

      function actualizarBotonCarrito() {
        const count = cart.reduce((sum,item) => sum + item.cantidad, 0);
        openCartBtn.textContent = `Ver Carrito (${count})`;
      }
      function renderizarCarrito() {
        cartItemsContainer.innerHTML = '';
        cart.forEach(item => {
          const div = document.createElement('div');
          div.className = 'cart-item';
          div.innerHTML = `<span>${item.nombre} x ${item.cantidad}</span><span>S/. ${(item.precio*item.cantidad).toFixed(2)}</span>`;
          cartItemsContainer.appendChild(div);
        });
        const total = cart.reduce((sum,item) => sum + item.precio*item.cantidad, 0);
        cartTotalSpan.textContent = total.toFixed(2);
      }
      addBtns.forEach(btn => btn.addEventListener('click', () => {
        const nombre = btn.dataset.nombre;
        const precio = parseFloat(btn.dataset.precio);
        const existing = cart.find(i => i.nombre===nombre);
        if(existing) existing.cantidad++;
        else cart.push({nombre,precio,cantidad:1});
        actualizarBotonCarrito(); renderizarCarrito();
      }));
      openCartBtn.addEventListener('click', () => cartOverlay.style.display='flex');
      closeCartBtn.addEventListener('click', () => cartOverlay.style.display='none');
      actualizarBotonCarrito();
    });

    const productos = document.querySelectorAll('.producto-card');

  const mostrarElemento = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Solo una vez
      }
    });
  };

  const observer = new IntersectionObserver(mostrarElemento, {
    threshold: 0.2 // Se activa cuando el 20% del producto está visible
  });

  productos.forEach(producto => {
    observer.observe(producto);
  });