
const initDynamicModal = () => {
  const modalElement = document.querySelector('#exampleModal');

  if (modalElement) {
    initAddToCart();
    // Using JQuery here because Bootstrap relies on it
    // To manage modal events
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
    let order;
    // If there is an order key
    if (window.localStorage.order) {
      order = JSON.parse(window.localStorage.order);
      const orderInCart = findInCart(order, currentDishId)
      if (orderInCart) {
        orderInCart.amount = amount.value
        orderInCart.specialInstructions = specialInstructions.value
      } else {
        order.push(
          buildOrderItem(currentDishId, amount.value, specialInstructions.value)
        )
      }
    } else {
      order = [
          buildOrderItem(currentDishId, amount.value, specialInstructions.value)
        ]
    }
    saveToLocalStorage(order);
  })
}

const fillInputs = (jqmodal, dishId) => {
  if (window.localStorage.order) {
    const order = JSON.parse(window.localStorage.order)
    const dishInCart = findInCart(order, dishId.toString())
    if (dishInCart) {
      jqmodal.find('#dish-amount').val(dishInCart.amount)
      jqmodal.find('#special-instructions').val(dishInCart.specialInstructions);
    } else {
      jqmodal.find('#dish-amount').val('')
      jqmodal.find('#special-instructions').val('')
    }
  }
}

const findInCart = (order, dishId) => {
  return order.find( (item) => item.dishId === dishId )
}

const saveToLocalStorage = (order) => {
  window.localStorage.setItem('order', JSON.stringify(order))
}

const buildOrderItem = (dishId, amount, instructions) => {
  return {
    dishId: dishId,
    amount: amount,
    specialInstructions: instructions
  }
}

export { initDynamicModal }
