/**
 * NavButton - A cross-framework navigation button component
 * @version 1.2.0
 * @author a.s.szlag@gmail.com
 * @license MIT
 */

class IpayButton extends HTMLElement {
    static get observedAttributes() {
      return ['href', 'variant', 'target'];
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
        const href = this.getAttribute('href');
        const target = this.getAttribute('target') || '_self';
        
        if (href) {
          window.open(href, target);
        }
      });
    }
  
    render() {
      const variant = this.getAttribute('variant') || 'primary';
      
      this.shadowRoot.innerHTML = `
        <style>
          button {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-size: 16px;
            font-weight: 600;
            padding: 12px 24px;
            border-radius: 8px;
            border: none;
            cursor: pointer;
            transition: all 0.2s ease;
            text-decoration: none;
          }
  
          button:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          }
  
          button:active {
            transform: translateY(0);
          }
  
          /* Variants */
          .primary {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
          }
  
          .secondary {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            color: white;
          }
  
          .success {
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            color: white;
          }
  
          .outline {
            background: transparent;
            border: 2px solid #667eea;
            color: #667eea;
          }
  
          .outline:hover {
            background: #667eea;
            color: white;
          }
  
          .danger {
            background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
            color: white;
          }
        </style>
        <button class="${variant}">
          <slot></slot>
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