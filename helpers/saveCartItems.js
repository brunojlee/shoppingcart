const saveCartItems = (element, precoTotal) => {  
  localStorage.setItem('cartItems', element);
  localStorage.setItem('precoTotal', precoTotal);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
