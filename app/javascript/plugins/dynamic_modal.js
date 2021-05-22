
const initDynamicModal = () => {
  const modalElement = document.querySelector('#exampleModal');

  if (modalElement) {
    // Using JQuery here because Bootstrap relies on it
    // To manage events
    // https://getbootstrap.com/docs/4.6/components/modal/#varying-modal-content
    $('#exampleModal').on('show.bs.modal', function (event) {
      var button = $(event.relatedTarget) // Button that triggered the modal
      var dishName = button.data('dish-name')
      var dishPrice = button.data('dish-price')
      var dishId = button.data('dish-id')
      var modal = $(this)
      modal.find('.modal-title').text('Order ' + dishName)
      modal.find('.modal-price').text(dishPrice + " USD")
      debugger
      fillInputs(modal, dishId);

      initAddToCart(button);
    })
  }
}

const initAddToCart = (button) => {
  const dishId = button.data('dish-id');
  const sendToCart = document.querySelector('.btn-modal');
  const amount = document.querySelector('#dish-amount');
  const specialInstructions = document.querySelector('#special-instructions');
  sendToCart.addEventListener('click', () => {
    // If there is an order key
    if (window.localStorage.order) {
      const order = JSON.parse(window.localStorage.order);
      const orderInCart = findInCart(order, dishId)
      debugger
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
          {dishId: dishId,
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
        dishId: button.data('dish-id'),
        amount: amount.value,
        specialInstructions: specialInstructions.value
      }
      ])
    }
  })
}

const fillInputs = (modal, dishId) => {
  if (window.localStorage.order) {
    const order = JSON.parse(window.localStorage.order)
    const dishInCart = findInCart(order, dishId)
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
