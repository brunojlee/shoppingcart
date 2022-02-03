const fetchProducts = async (argumento) => {
  try {
    const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${argumento}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return 'You must provide an url';
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
