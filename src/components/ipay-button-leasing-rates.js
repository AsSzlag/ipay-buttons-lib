import { BaseIpayButton } from '../shared/base-button.js';
import { buttonBaseStyles, variantStyles } from '../shared/styles.js';
import { ipayLogo } from '../shared/logo.js';

const TARGET_URL = 'https://app.ipay-dev.host06.300devs.com/';

class IpayButtonLeasingRates extends HTMLElement {
    static get observedAttributes() {
      return ['id', 'price', 'url', 'count',  'name', 'email', 'phone'];
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
      const buttonContainer = this.shadowRoot.querySelector('.button-container');
      buttonContainer.addEventListener('click', () => {
        this.handleClick();
      });
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
  
      // Build query parameters
      const params = new URLSearchParams();
      if (id) params.append('id', id);
      if (price) params.append('price', price);
      if (count) params.append('count', count);
      if (name) params.append('name', name);
      if (email) params.append('email', email);
      if (phone) params.append('phone', phone);
  
      // Navigate to URL with parameters
      const targetUrl = `${TARGET_URL}?${params.toString()}`;
      window.open(targetUrl, '_blank');
    }
  
    render() {
      // Calculate the rate: price/10 or default to 12,00
      const price = this.getAttribute('price');
      const rate = price ? (parseFloat(price) / 10).toFixed(2) : '12,00';

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: inline-block;
            cursor: pointer;
          }

          .button-container {
            display: flex;
            flex-direction: column;
            gap: 4px;
            transition: all 0.2s ease;
          }

          .main-button {
            background: white;
            border: 1px solid #E5E7EB;
            border-radius: 12px;
            padding: 12px 16px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            transition: all 0.2s ease;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            width: fit-content;
          }

          .rata-component {
            background: white;
            border: 1px solid #E5E7EB;
            border-radius: 12px;
            padding: 8px 12px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            transition: all 0.2s ease;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            align-self: flex-end;
            margin-right: 24px;
          }

          .button-container:hover .main-button {
            background: #003574;
            border-color: #003574;
            box-shadow: 0 4px 12px rgba(0, 53, 116, 0.3);
            transform: translateY(-2px);
          }

          .button-container:hover .rata-component {
            background: #003574;
            border-color: #003574;
            box-shadow: 0 4px 12px rgba(0, 53, 116, 0.3);
            transform: translateY(-2px);
          }

          .button-container:active .main-button {
            transform: translateY(0);
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
          }

          .button-container:active .rata-component {
            transform: translateY(0);
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
          }

          .content {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 4px;
          }

          .brand {
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .logo {
            transition: filter 0.2s ease;
          }

          .subtitle {
            font-size: 12px;
            color: #6B7280;
            font-weight: 400;
            margin: 0;
            transition: color 0.2s ease;
          }

          .action {
            display: flex;
            align-items: center;
            gap: 8px;
            color: #6B7280;
            font-size: 14px;
            font-weight: 600;
            transition: color 0.2s ease;
          }

          .rata-text {
            font-size: 12px;
            color: #6B7280;
            margin: 0;
            transition: color 0.2s ease;
          }

          .rata-price {
            font-weight: 600;
          }

          .button-container:hover .logo {
            filter: brightness(0) invert(1);
          }

          .button-container:hover .subtitle {
            color: white;
            opacity: 0.9;
          }

          .button-container:hover .action {
            color: white;
          }

          .button-container:hover .rata-text {
            color: white;
          }

          .green-dot {
            width: 8px;
            height: 8px;
            background: #10B981;
            border-radius: 50%;
            flex-shrink: 0;
          }
        </style>
        <div class="button-container">
          <div class="main-button">
            <div class="content">
              <div class="brand">
                <div class="logo">${ipayLogo}</div>
              </div>
              <p class="subtitle">dla firm + leasing</p>
            </div>
            <div class="action">
              <span>Oblicz</span>
              <div class="green-dot"></div>
            </div>
          </div>
          <div class="rata-component">
            <p class="rata-text">Rata od <span class="rata-price">${rate} zł</span></p>
          </div>
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
  customElements.define('ipay-button-leasing-rates', IpayButtonLeasingRates);
  
  // Export for module usage
  export { IpayButtonLeasingRates };