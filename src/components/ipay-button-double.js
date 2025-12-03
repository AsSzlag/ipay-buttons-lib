import { BaseIpayButton } from '../shared/base-button.js';
import { buttonBaseStyles, variantStyles } from '../shared/styles.js';
import { ipayLogo } from '../shared/logo.js';

const BASE_URL = 'http://185.25.151.171:8411';
const TARGET_URL = `${BASE_URL}/new-individual-application`;

class IpayButtonDouble extends HTMLElement {
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
    const buttonGroup = this.shadowRoot.querySelector('.button-group');
    if (buttonGroup) {
      buttonGroup.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', () => {
          this.handleClick();
        });
      });
    }
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
            cursor: pointer;
          }

          .button-group {
            display: flex;
            flex-direction: column;
            width: 220px;
            border-radius: 12px;
            overflow: visible;
            transition: box-shadow 0.2s ease, transform 0.2s ease;
            gap: 6px;
          }

          .button-group:hover {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            transform: translateY(-2px);
          }

          button {
            cursor: pointer;
            border: 1px solid;
            padding: 12px 16px;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 8px;
            width: 100%;
            box-sizing: border-box;
            border-radius: 12px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            transition: border-color 0.2s ease;
          }

          .top-button {
            background: white;
            border-color: #E5E7EB;
          }

          .bottom-button {
            background: #003574;
            border-color: #003574;
          }

          .button-group:hover .top-button {
            border-color: #D1D5DB;
          }

          .button-group:hover .bottom-button {
            border-color: #002147;
          }

          .content {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 2px;
          }

          .main-text {
            font-size: 14px;
            font-weight: 600;
            line-height: 1.2;
          }

          .sub-text {
            font-size: 10px;
            font-weight: 400;
            line-height: 1.2;
          }

          .top-button .main-text, .top-button .sub-text {
            color: #003574;
          }

          .bottom-button .main-text, .bottom-button .sub-text {
            color: white;
          }

          .logo {
            display: flex;
            align-items: center;
            height: 24px;
            width: auto;
          }

          .top-button .logo {
            filter: none;
          }

          .bottom-button .logo {
            filter: brightness(0) invert(1);
          }
        </style>
        <div class="button-group">
          <button class="top-button">
            <div class="content">
              <span class="main-text">Sprawdź Raty</span>
              <span class="sub-text">dla osób</span>
            </div>
            <div class="logo">${ipayLogo}</div>
          </button>
          <button class="bottom-button">
            <div class="content">
              <span class="main-text">Raty i leasing</span>
              <span class="sub-text">dla firm</span>
            </div>
            <div class="logo">${ipayLogo}</div>
          </button>
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
customElements.define('ipay-button-double', IpayButtonDouble);

// Export for module usage
export { IpayButtonDouble };