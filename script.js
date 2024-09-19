      // Cart Functionality
      let cart = [];
      let total = 0;

      document.querySelectorAll('.add-to-cart').forEach(button => {
          button.addEventListener('click', function () {
              const name = this.getAttribute('data-name');
              const price = parseFloat(this.getAttribute('data-price'));

              // Add item to cart
              cart.push({ name, price });
              updateCart();
          });
      });

      function updateCart() {
          const cartItems = document.getElementById('cart-items');
          const cartCount = document.getElementById('cart-count');
          cartItems.innerHTML = '';

          cart.forEach((item, index) => {
              const li = document.createElement('li');
              li.className = 'list-group-item d-flex justify-content-between align-items-center';
              li.innerHTML = `${item.name} - $${item.price.toFixed(2)}
                  <button class="btn btn-danger btn-sm remove-from-cart" data-index="${index}">Remove</button>`;
              cartItems.appendChild(li);
          });

          // Update total
          total = cart.reduce((acc, item) => acc + item.price, 0);
          document.getElementById('total').innerText = total.toFixed(2);

          // Update cart count
          cartCount.innerText = cart.length;

          // Remove from cart functionality
          document.querySelectorAll('.remove-from-cart').forEach(button => {
              button.addEventListener('click', function () {
                  const index = this.getAttribute('data-index');
                  cart.splice(index, 1);
                  updateCart();
              });
          });
      }

      // Form Validation and Reset
      (function () {
          'use strict';

          const form = document.getElementById('checkout-form');

          form.addEventListener('submit', function (event) {
              if (cart.length === 0) {
                  event.preventDefault();
                  alert('Product not selected. Please add products to your cart first.');
              } else if (!form.checkValidity()) {
                  event.preventDefault();
                  event.stopPropagation();
              } else {
                  event.preventDefault();
                  alert('Order placed successfully!');

                  // Reset form and cart
                  form.reset();
                  cart = [];
                  updateCart();
                  document.getElementById('total').innerText = '0.00';
              }

              form.classList.add('was-validated');
          }, false);
      })();