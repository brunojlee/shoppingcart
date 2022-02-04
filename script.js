function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText, sku) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  if (element === 'button') {
    e.setAttribute('onclick', `appendCart('${sku}')`);
  }
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!', sku));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener() {
  this.remove();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const show = async () => {
  const dados = await fetchProducts('computador');
  dados.results.forEach((produto) => {
    const { id: sku, title: name, thumbnail: image } = produto;
    document.querySelector('.items').appendChild(createProductItemElement({ sku, name, image }));
  });
  await console.log(dados.results);
};

const appendCart = async (idProduto) => {
  const dados = await fetchItem(idProduto);
  const ol = document.querySelector('.cart__items');  
  const { id: sku, title: name, price: salePrice } = dados;
  await ol.appendChild(createCartItemElement({ sku, name, salePrice }));
  localStorage.clear();
  saveCartItems();
};

window.onload = async () => {
  getSavedCartItems();
  await show();
};
