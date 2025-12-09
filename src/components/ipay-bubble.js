import { BaseIpayButton } from '../shared/base-button.js';
import { buttonBaseStyles, variantStyles } from '../shared/styles.js';
import { bubbleLogo } from '../shared/bubbleLogo.js';

const BASE_URL = 'http://185.25.151.171:8411';
const TARGET_URL = `${BASE_URL}/new-individual-application`;

class IpayBubble extends HTMLElement {
  static get observedAttributes() {
    return ['id', 'price', 'url', 'count', 'name', 'email', 'phone', 'delivery_price', 'product_id'];
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
    const popup = this.shadowRoot.querySelector('.popup');
    const closeButton = this.shadowRoot.querySelector('.close-button');

    if (popup) {
      popup.addEventListener('click', () => {
        this.handleClick();
      });
    }

    if (closeButton) {
      closeButton.addEventListener('click', (e) => {
        e.stopPropagation();
        this.closePopup();
      });
    }
  }

  closePopup() {
    this.style.display = 'none';
  }

  handleClick() {
    // Get all attributes
    const id = this.getAttribute('id');
    const price = this.getAttribute('price');
    const count = this.getAttribute('count');
    const url = this.getAttribute('url');
    const name = this.getAttribute('name');
    const email = this.getAttribute('email');
    const phone = this.getAttribute('phone');
    const delivery_price = this.getAttribute('delivery_price');
    const product_id = this.getAttribute('product_id');

    // Build query parameters
    const params = new URLSearchParams();
    if (id) params.append('id', id);
    if (price) params.append('price', price);
    if (count) params.append('count', count);
    if (url) params.append('url', url);
    if (name) params.append('name', name);
    if (email) params.append('email', email);
    if (phone) params.append('phone', phone);
    if (delivery_price) params.append('delivery_price', delivery_price);
    if (product_id) params.append('product_id', product_id);

    // Navigate to URL with parameters
    const targetUrl = `${TARGET_URL}?${params.toString()}`;
    window.open(targetUrl, '_blank');
  }

  render() {
    this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: inline-block;
            position: relative;
          }

          .popup {
            background: white;
            border-radius: 12px;
            padding: 16px 24px;
            cursor: pointer;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            width: 124px;
            height: 86px;
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            // gap: 16px;
          }

          .popup:hover {
            box-shadow: 0 6px 25px rgba(0, 0, 0, 0.2);
            transform: translateY(-2px);
            transition: all 0.2s ease;
          }

          .close-button {
            position: absolute;
            top: -8px;
            right: -8px;
            width: 32px;
            height: 32px;
            background: #003574;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 16px;
            font-weight: bold;
            transition: background-color 0.2s ease;
          }

          .close-button:hover {
            background: #002147;
          }

          .green-logo {
            width: 64px;
            height: 64px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
            position: relative;
          }

          .green-logo svg {
            width: 32px;
            height: 32px;
          }

          .chevron-right {
            position: absolute;
            right: -6px;
            top: 50%;
            transform: translateY(-50%);
            width: 12px;
            height: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .chevron-right svg {
            width: 100%;
            height: 100%;
          }

          .main-text {
            font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-size: 12px;
            font-style: normal;
            font-weight: 500;
            line-height: 100%; /* 12px */
            letter-spacing: 0.15px;
            color: var(--Colorblack, #111);
            text-align: center;
            margin: 0;
          }
        </style>
        <div class="popup">
          <button class="close-button" type="button">×</button>
          <div class="logo green-logo">
            ${bubbleLogo}
          </div>
          <h2 class="main-text">Kup na raty</h2>
        </div>
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
customElements.define('ipay-bubble', IpayBubble);

// Export for module usage
export { IpayBubble };