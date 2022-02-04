const getSavedCartItems = () => {
  const cartHold = localStorage.getItem('cartItems');
  document.querySelector('.cart__items').innerHTML = cartHold;  
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
