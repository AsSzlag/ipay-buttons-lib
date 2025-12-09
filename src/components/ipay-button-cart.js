import { BaseIpayButton } from '../shared/base-button.js';
import { buttonBaseStyles, variantStyles } from '../shared/styles.js';
import { ipayLogo } from '../shared/logo.js';

const BASE_URL = 'http://185.25.151.171:8411';
const TARGET_URL = `${BASE_URL}/new-individual-application`;

class IpayButtonCart extends HTMLElement {
  static get observedAttributes() {
    return [
      'id', 
      'name', 
      'email', 
      'phone', 
      'delivery_price', 
      'product_id',
      'cart-items' // JSON string with array of cart items
    ];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.addEventListeners();
  }

  addEventListeners() {
    const button = this.shadowRoot.querySelector('button');
    if (button) {
      button.addEventListener('click', () => {
        this.handleClick();
      });
    }
  }

  parseCartItems() {
    const cartItemsAttr = this.getAttribute('cart-items');
    if (!cartItemsAttr) {
      return [];
    }

    try {
      const items = JSON.parse(cartItemsAttr);
      if (!Array.isArray(items)) {
        console.warn('ipay-button-cart: cart-items must be an array');
        return [];
      }
      return items;
    } catch (e) {
      console.error('ipay-button-cart: Invalid JSON in cart-items attribute', e);
      return [];
    }
  }

  handleClick() {
    // Get standard attributes
    const id = this.getAttribute('id');
    const name = this.getAttribute('name');
    const email = this.getAttribute('email');
    const phone = this.getAttribute('phone');
    const delivery_price = this.getAttribute('delivery_price');
    const product_id = this.getAttribute('product_id');

    // Parse cart items
    const cartItems = this.parseCartItems();

    if (cartItems.length === 0) {
      console.warn('ipay-button-cart: No cart items provided');
      return;
    }

    // Build query parameters
    const params = new URLSearchParams();

    // Add standard parameters
    if (id) params.append('id', id);
    if (name) params.append('name', name);
    if (email) params.append('email', email);
    if (phone) params.append('phone', phone);
    if (delivery_price) params.append('delivery_price', delivery_price);
    if (product_id) params.append('product_id', product_id);

    // Add cart items
    // Format: items[0][url]=...&items[0][price]=...&items[0][count]=...
    cartItems.forEach((item, index) => {
      if (item.url) params.append(`items[${index}][url]`, item.url);
      if (item.price) params.append(`items[${index}][price]`, item.price);
      if (item.count) params.append(`items[${index}][count]`, item.count);
      
      // Optional: also support product_id per item if provided
      if (item.product_id) params.append(`items[${index}][product_id]`, item.product_id);
    });

    // Add total count of items
    params.append('items_count', cartItems.length.toString());

    // Navigate to URL with parameters
    const targetUrl = `${TARGET_URL}?${params.toString()}`;
    window.open(targetUrl, '_blank');
  }

  render() {
    this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: inline-block;
          }
  
          button {
            background: white;
            border: 1px solid #E5E7EB;
            border-radius: 12px;
            padding: 12px 16px;
            cursor: pointer;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            transition: all 0.2s ease;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            min-width: 240px;
            height: 64px;
          }

          button:hover {
            background: #003574;
            border-color: #003574;
            box-shadow: 0 4px 12px rgba(0, 53, 116, 0.3);
            transform: translateY(-2px);
          }
  
          button:active {
            transform: translateY(0);
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
          }
  
          .content {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 4px;
            flex: 1;
          }
  
          .brand {
            display: flex;
            align-items: center;
            gap: 8px;
          }
  
          .logo {
            transition: filter 0.2s ease;
          }

          .title {
            font-size: 14px;
            color: #1F2937;
            font-weight: 600;
            margin: 0;
            transition: color 0.2s ease;
          }

          .subtitle {
            color: var(--Colorblack, #111);
            font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-size: 12px;
            font-style: normal;
            font-weight: 500;
            line-height: 100%; /* 12px */
            letter-spacing: 0.15px;
            margin: 0;
            transition: color 0.2s ease;
          }

          .action {
            display: flex;
            align-items: center;
            gap: 8px;
            color: var(--Colorblack, #111);
            font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-size: 12px;
            font-style: normal;
            font-weight: 500;
            line-height: 100%; /* 12px */
            letter-spacing: 0.15px;
            transition: color 0.2s ease;
          }

          button:hover .logo {
            filter: brightness(0) invert(1);
          }

          button:hover .title {
            color: white;
          }

          button:hover .subtitle {
            color: white;
            opacity: 0.9;
          }

          button:hover .action {
            color: white;
          }
  
          .green-dot {
            width: 12px;
            height: 12px;
            background: #10B981;
            border-radius: 50%;
            flex-shrink: 0;
            position: relative;
          }

          .chevron-right {
            position: absolute;
            right: 2px;
            top: 50%;
            transform: translateY(-50%);
            width: 8px;
            height: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .chevron-right svg {
            width: 100%;
            height: 100%;
          }
        </style>
        <button>
          <div class="content">
            <div class="brand">
              <div class="logo">${ipayLogo}</div>
            </div>
            <p class="title">Finansowanie koszyka</p>
            <p class="subtitle">dla osób i firm</p>
          </div>
          <div class="action">
            <span>Oblicz</span>
            <div class="green-dot">
              <div class="chevron-right">
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 6L5 4L3 2" stroke="#FFFFFF" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </button>
      `;
  }

  attributeChangedCallback() {
    if (this.shadowRoot) {
      this.render();
      this.addEventListeners();
    }
  }
}

// Register the component
customElements.define('ipay-button-cart', IpayButtonCart);

// Export for module usage
export { IpayButtonCart };

