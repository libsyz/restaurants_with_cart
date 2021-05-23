import { csrfToken } from "@rails/ujs";


const initShowCart = () => {
  const cartContainer = document.querySelector('#cart');
  if (cartContainer) {
    showCart(cartContainer);
  }
  // If we don't have a cart, let the user know we have nothing

  // Otherwise, show all the items in the cart
}

const showCart = (cartContainer) => {
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
    .then((data) => {
      renderCart(data, cartContainer);
    })
  } else {
    cartContainer.innerHTML = "<p> You don't have anything in your cart yet <p>"
  }
}

const renderCart = (data, cartContainer) => {
  data.items.forEach((element) => {
    console.log(element);
    cartContainer.innerHTML += `
      <p> ${element.dishName} - ${element.dishPrice} <p>
    `
  });
  cartContainer.insertAdjacentHTML('beforeend', `<p class='text-bold'> total: ${data.total} </p>`)

  const createOrderBtn = document.querySelector('#submit-order');
  createOrderBtn.classList.remove('d-none');
  createOrderBtn.addEventListener('click', () => {
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
