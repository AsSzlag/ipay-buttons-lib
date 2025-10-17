import { BaseIpayButton } from '../shared/base-button.js';
import { buttonBaseStyles, variantStyles } from '../shared/styles.js';
import { arrowLogo } from '../shared/arrowLogo.js';

const TARGET_URL = 'https://app.ipay-dev.host06.300devs.com/';

class IpayModalSide extends HTMLElement {
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
      const button = this.shadowRoot.querySelector('.vertical-button');
      button.addEventListener('click', () => {
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
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: inline-block;
          }

          .vertical-button {
            background: white;
            border-radius: 12px;
            cursor: pointer;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            transition: all 0.2s ease;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            display: flex;
            flex-direction: column;
            width: 60px;
            overflow: hidden;
          }

          .vertical-button:hover {
            box-shadow: 0 4px 12px rgba(0, 53, 116, 0.3);
            transform: translateY(-2px);
          }

          .top-section {
            background: #50C878;
            border-radius: 12px;
            padding: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex: 1;
            min-height: 40px;
          }

          .arrow {
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .arrow svg {
            width: 20px;
            height: 20px;
            filter: brightness(0) invert(1);
          }

          .text-section {
            background: white;
            padding: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex: 2;
          }

          .vertical-text {
            color: #003574;
            font-size: 20px;
            font-weight: 600;
            writing-mode: vertical-rl;
            text-orientation: mixed;
            transform: rotate(180deg);
            letter-spacing: 1px;
            line-height: 1.2;
          }
        </style>
        <div class="vertical-button">
          <div class="top-section">
            <div class="arrow">${arrowLogo}</div>
          </div>
          <div class="text-section">
            <span class="vertical-text">Finansowanie dla osób i firm</span>
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
  customElements.define('ipay-modal-side', IpayModalSide);
  
  // Export for module usage
  export { IpayModalSide };