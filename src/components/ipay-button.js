import { BaseIpayButton } from '../shared/base-button.js';
import { buttonBaseStyles, variantStyles } from '../shared/styles.js';
import { ipayLogo } from '../shared/logo.js';

class IpayButton extends HTMLElement {
    static get observedAttributes() {
      return ['id', 'price', 'url', 'name', 'email'];
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
      button.addEventListener('click', () => {
        this.handleClick();
      });
    }
  
    handleClick() {
      // Get all attributes
      const id = this.getAttribute('id');
      const price = this.getAttribute('price');
      const url = this.getAttribute('url') || 'https://bikerc-5a1dd.web.app/pomiary';
      const name = this.getAttribute('name');
      const email = this.getAttribute('email');
  
      // Build query parameters
      const params = new URLSearchParams();
      if (id) params.append('id', id);
      if (price) params.append('price', price);
      if (name) params.append('name', name);
      if (email) params.append('email', email);
  
      // Navigate to URL with parameters
      const targetUrl = `${url}?${params.toString()}`;
      window.open(targetUrl, '_self');
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
            padding: 16px 24px;
            cursor: pointer;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            transition: all 0.2s ease;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
            min-width: 280px;
          }
  
          button:hover {
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transform: translateY(-1px);
            border-color: #D1D5DB;
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
          }
  
          .brand {
            display: flex;
            align-items: center;
            gap: 8px;
          }
  
          .logo-text {
            font-size: 24px;
            font-weight: 700;
            color: #003574;
            letter-spacing: -0.5px;
          }
  
          .subtitle {
            font-size: 12px;
            color: #6B7280;
            font-weight: 400;
            margin: 0;
          }
  
          .action {
            display: flex;
            align-items: center;
            gap: 8px;
            color: #10B981;
            font-size: 14px;
            font-weight: 600;
          }
  
          .green-dot {
            width: 8px;
            height: 8px;
            background: #10B981;
            border-radius: 50%;
            flex-shrink: 0;
          }
        </style>
        <button>
          <div class="content">
            <div class="brand">
              <span class="logo-text">iRaty</span>
            </div>
            <p class="subtitle">dla osób i firm</p>
          </div>
          <div class="action">
            <span>Oblicz</span>
            <div class="green-dot"></div>
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
  customElements.define('ipay-button', IpayButton);
  
  // Export for module usage
  export default IpayButton;