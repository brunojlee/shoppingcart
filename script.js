const ol = document.querySelector('.cart__items');
const priceHolder = document.querySelector('.total-price');

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

function createProductItemElement({ sku, name, image, salePrice }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('span', 'item__price', `Preço: R$${salePrice}`));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!', sku));

  return section;
}
const precoSalvo = +localStorage.getItem('precoTotal');
let precoTotal = precoSalvo;
priceHolder.innerText = `R$${parseFloat(precoTotal.toFixed(2))}`;

function dec(subtraendo) {
  precoTotal -= subtraendo;
  priceHolder.innerText = `R$${parseFloat(precoTotal.toFixed(2))}`;
}

function adi(aditivo) {
  precoTotal += aditivo;
  priceHolder.innerText = `R$${parseFloat(precoTotal.toFixed(2))}`;
}

function createCartItemElement({ name, salePrice, thumbnail }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerHTML = `<div>${name} | PRICE: $${salePrice}</div>`; 
  li.insertAdjacentElement('afterbegin', createProductImageElement(thumbnail));
  li.id = salePrice;
  li.setAttribute('onclick',
  `this.remove(); dec(this.id);
   saveCartItems(document.querySelector(".cart__items").innerHTML, precoTotal);`);
  
  adi(+salePrice.toFixed(2));
  return li;
}

const show = async () => {
  const dados = await fetchProducts('computador');
  dados.results.forEach((produto) => {
    const { id: sku, title: name, thumbnail: image, price: salePrice } = produto;
    document
    .querySelector('.items').appendChild(createProductItemElement({ sku, name, image, salePrice }));
  });  
};

const appendCart = async (idProduto) => {
  const dados = await fetchItem(idProduto);
  const { id: sku, title: name, price: salePrice, thumbnail } = dados;
  await ol.appendChild(createCartItemElement({ sku, name, salePrice, thumbnail }));  
  localStorage.clear();
  saveCartItems(ol.innerHTML, precoTotal);
};

function cleanCart() {
  document.querySelector('.cart__items').innerHTML = '';
  localStorage.clear();
  precoTotal = 0;
  document.querySelector('.total-price').innerText = parseFloat(precoTotal.toFixed(2));
}

function carregando() {
    const section = document.createElement('section');
    section.textContent = 'carregando...';
    section.className = 'loading';
    document.querySelector('.items').appendChild(section);
}

function fechaCarregando() {
  document.querySelector('.loading').remove();
}

const loadSaved = () => {
  ol.innerHTML = getSavedCartItems();
};

document.querySelector('.empty-cart').addEventListener('click', cleanCart);

window.onload = async () => {
  await carregando();
  await loadSaved();
  await show();
  fechaCarregando();
};
