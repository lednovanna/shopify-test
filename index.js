import { GET_PRODUCTS_QUERY } from './queries.js';

const API_URL = 'https://tsodykteststore.myshopify.com/api/2023-01/graphql.json';
const ACCESS_TOKEN = '7e174585a317d187255660745da44cc7';

async function fetchProducts() {
  console.log('Call fetchProducts'); 

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': ACCESS_TOKEN
      },
      body: JSON.stringify({ query: GET_PRODUCTS_QUERY })
    });

    console.log(' Response status:', response.status); 

    const data = await response.json();
    console.log(' API data:', data); 
  

  const products = data.data.products.edges;
  displayProducts(products); 
} catch (error) {
  console.error('Error fetching products:', error);
}
}

fetchProducts();



function displayProducts(products) {
    const cardBlocks = document.querySelectorAll('.card-block');
    const template = document.querySelector('#product-template');
  
    products.forEach(({ node }) => {
        const mainImage = node.images.edges[0]?.node.url || '';
        const hoverImage = node.images.edges[1]?.node.url || '';
        const title = node.title;
        const description = node.description || 'No description available';
        const price = node.variants.edges[0].node.price.amount;
        const currency = node.variants.edges[0].node.price.currencyCode;

  
      const clone = template.content.cloneNode(true);

      clone.querySelector('.main-img').src = mainImage;
      clone.querySelector('.main-img').alt = title;
      clone.querySelector('.hover-img').src = hoverImage;
      clone.querySelector('.hover-img').alt = title;
  
      clone.querySelector('.product-title').textContent = title;
      clone.querySelector('.product-price').textContent = `${price} ${currency}`;
      clone.querySelector('.product-description').textContent = description;
  
      cardBlocks.forEach(container => container.appendChild(clone.cloneNode(true)));
    });
  }

  const faqItems = document.querySelectorAll('.question-answer');

  faqItems.forEach(item => {
      const toggleBtn = item.querySelector('.question-icon'); 
      const answer = item.querySelector('.answer');
      const icon = item.querySelector('.plus-icon'); 
       
      answer.style.display = 'none';

      toggleBtn.addEventListener('click', () => {
          
          item.classList.toggle('active');
  
          
          if (item.classList.contains('active')) {
              answer.style.display = 'block';
              item.style.backgroundColor = '#ddf3f1'; 
              icon.src = './assets/icons/minus.png'; 
          } else {
              answer.style.display = 'none';
              item.style.backgroundColor = '#F7F8FB'; 
              icon.src = './assets/icons/plus.png'; 
          }
      });
  });

  document.addEventListener("DOMContentLoaded", () => {

    document.body.classList.add("loading");
  
    window.addEventListener("load", () => {
      const preloader = document.getElementById("preloader");
      preloader.style.opacity = "0";
      setTimeout(() => {
        preloader.style.display = "none";
        document.body.classList.remove("loading"); 
      }, 500); 
    });
  });