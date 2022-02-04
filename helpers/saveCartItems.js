const saveCartItems = () => {
  const cartHolder = document.querySelector('.cart__items');
  localStorage.clear();
  localStorage.setItem('cartItems', cartHolder.innerHTML);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
