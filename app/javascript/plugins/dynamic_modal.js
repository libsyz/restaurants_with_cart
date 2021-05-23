
const initDynamicModal = () => {
  const modalElement = document.querySelector('#exampleModal');

  if (modalElement) {
    initAddToCart();
    // Using JQuery here because Bootstrap relies on it
    // To manage events
    // https://getbootstrap.com/docs/4.6/components/modal/#varying-modal-content
    $('#exampleModal').on('show.bs.modal', function (event) {
      var button = $(event.relatedTarget) // Button that triggered the modal
      var dishName = button.data('dish-name')
      var dishPrice = button.data('dish-price')
      var dishId = button.data('dish-id')
      var modal = $(this)
      modal.attr('data-current-dish-id', dishId);
      modal.find('.modal-title').text('Order ' + dishName)
      modal.find('.modal-price').text(dishPrice + " USD")

      fillInputs(modal, dishId);

    })
  }
}

const initAddToCart = () => {
  const sendToCart = document.querySelector('.btn-modal');

  sendToCart.addEventListener('click', () => {
    const modal = document.querySelector('.modal.fade');
    const currentDishId = modal.dataset.currentDishId;
    const specialInstructions = document.querySelector('#special-instructions');
    const amount = document.querySelector('#dish-amount');
    // If there is an order key
    console.log('clicking!');
    if (window.localStorage.order) {
      const order = JSON.parse(window.localStorage.order);
      debugger
      const orderInCart = findInCart(order, currentDishId)
      if (orderInCart) {
        console.log('working as expected');
        orderInCart.amount = amount.value
        // If I already have this dish in the cart
        orderInCart.specialInstructions = specialInstructions.value
        // Update the quantity and the special instructions
        window.localStorage.order = JSON.stringify(order);
      } else {
        // else
        order.push(
          {dishId: currentDishId,
           amount: amount.value,
           specialInstructions: specialInstructions.value
         })
        window.localStorage.order = JSON.stringify(order);
        // Set this dish in the cart with the quantity
      }
    } else {
      // Start the order
      window.localStorage.order = JSON.stringify([
      {
        dishId: currentDishId,
        amount: amount.value,
        specialInstructions: specialInstructions.value
      }
      ])
    }
  })
}

const fillInputs = (modal, dishId) => {
  debugger
  if (window.localStorage.order) {
    const order = JSON.parse(window.localStorage.order)
    const dishInCart = findInCart(order, dishId.toString())
    if (dishInCart) {
      modal.find('#dish-amount').val(dishInCart.amount)
      modal.find('#special-instructions').val(dishInCart.specialInstructions);
    } else {
      modal.find('#dish-amount').val('')
      modal.find('#special-instructions').val('')
    }
  }
}

const findInCart = (order, dishId) => {
  return order.find( (item) => item.dishId === dishId )
}

export { initDynamicModal }
