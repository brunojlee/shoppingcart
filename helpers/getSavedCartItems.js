const getSavedCartItems = () => localStorage.getItem('cartItems');

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}

/* const cartHold = localStorage.getItem('cartItems');
  document.querySelector('.cart__items').innerHTML = cartHold; */