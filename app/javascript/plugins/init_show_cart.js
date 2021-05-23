import { csrfToken } from "@rails/ujs";

const initShowCart = () => {
  const cartContainer = document.querySelector('#cart');
  if (cartContainer) {
    getCart(cartContainer);
  }
}

const getCart = (cartContainer) => {
  if (window.localStorage.order) {
    // make a post request with the current order
    // submit
    fetchWithToken("/cartinfo", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: window.localStorage.order
    })
    .then((res) => res.json())
    .then((cartItems) => {
      renderCart(cartItems, cartContainer);
      loadSubmitOrderBtn();
    })
  } else {
    cartContainer.innerHTML = "<p> You don't have anything in your cart yet <p>"
  }
}

const renderCart = (cartItems, cartContainer) => {
  cartItems.items.forEach((element) => {
    cartContainer.innerHTML += `
      <p> ${element.dishName} - ${element.dishPrice} <p>
    `
  });
  cartContainer.insertAdjacentHTML('beforeend', `<p class='text-bold'> total: ${cartItems.total} </p>`)
}

const loadSubmitOrderBtn = () => {
  const submitOrderBtn = document.querySelector('#submit-order');
  submitOrderBtn.classList.remove('d-none');
  submitOrderBtn.addEventListener('click', () => {
    fetchWithToken('/orders', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
      body: window.localStorage.order
      }).then((res) => {
        if (res.status === 200) {
          window.localStorage.clear();
          window.location.href = '/order_success';
        }
      })
    })
}

const fetchWithToken = (url, options) => {
  options.headers = {
    "X-CSRF-Token": csrfToken(),
    ...options.headers
  };

  return fetch(url, options);
}

export { initShowCart }
