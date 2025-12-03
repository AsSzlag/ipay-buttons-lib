import { ipayLogo } from '../shared/logo.js';

const BASE_URL = 'http://185.25.151.171:8411';
const INDIVIDUAL_TARGET_URL = `${BASE_URL}/new-individual-application`;
const BUSINESS_TARGET_URL = `${BASE_URL}/new-company-application`;

// SVG Icons
const personIcon = `
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 8C9.65685 8 11 6.65685 11 5C11 3.34315 9.65685 2 8 2C6.34315 2 5 3.34315 5 5C5 6.65685 6.34315 8 8 8Z" fill="currentColor"/>
    <path d="M8 9C5.23858 9 3 11.2386 3 14V15H13V14C13 11.2386 10.7614 9 8 9Z" fill="currentColor"/>
  </svg>
`;

const briefcaseIcon = `
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 3V2C5 1.44772 5.44772 1 6 1H10C10.5523 1 11 1.44772 11 2V3H14C14.5523 3 15 3.44772 15 4V13C15 13.5523 14.5523 14 14 14H2C1.44772 14 1 13.5523 1 13V4C1 3.44772 1.44772 3 2 3H5ZM6 2V3H10V2H6Z" fill="currentColor"/>
  </svg>
`;

const iRatyLogo = `
  <svg width="60" height="20" viewBox="0 0 60 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="0" y="14" font-family="Arial, sans-serif" font-size="14" font-weight="600" fill="#003574">iRaty</text>
  </svg>
`;

const checkmarkIcon = `
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="8" fill="#10B981"/>
    <path d="M5 8L7 10L11 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
`;

const arrowIcon = `
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 12L10 8L6 4" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
`;

class IpayCalculator extends HTMLElement {
    static get observedAttributes() {
        return ['id', 'price', 'url', 'count', 'name', 'email', 'phone', 'delivery_price', 'product_id', 'tax'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.clientType = 'individual'; // 'individual' or 'business'
        this.months = 10; // Default to 10 months
    }

    connectedCallback() {
        if (!this.shadowRoot) {
            this.attachShadow({ mode: 'open' });
        }
        this.render();
        this.addEventListeners();
    }

    addEventListeners() {
        // Tab switching
        const tabs = this.shadowRoot.querySelectorAll('.tab');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabType = tab.getAttribute('data-tab');
                if (tabType === 'individual' || tabType === 'business') {
                    this.clientType = tabType;
                    this.render();
                    this.addEventListeners();
                }
            });
        });

        // Slider
        const slider = this.shadowRoot.querySelector('.slider');
        slider?.addEventListener('input', (e) => {
            this.months = parseInt(e.target.value);
            this.updateSliderTooltip();
            this.updateMonthlyRate();
            this.updateBadge();
        });

        // iRaty button
        const iratyButton = this.shadowRoot.querySelector('.iraty-button');
        iratyButton?.addEventListener('click', () => {
            this.handleClick();
        });
    }

    calculateMonthlyRate() {
        const price = parseFloat(this.getAttribute('price')) || 0;
        const tax = parseFloat(this.getAttribute('tax')) || 0;
        
        // If no tax (or tax is 0%), calculate as simple division
        if (tax === 0 || !this.getAttribute('tax')) {
            return price / this.months;
        }
        
        // If tax is provided, calculate like a bank would:
        // Add tax/interest to the total amount, then divide by months
        const taxRate = tax / 100; // Convert percentage to decimal
        const totalWithTax = price * (1 + taxRate);
        const monthlyRate = totalWithTax / this.months;
        return monthlyRate;
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('pl-PL', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount);
    }

    updateMonthlyRate() {
        const rateElement = this.shadowRoot.querySelector('.monthly-rate');
        if (rateElement) {
            const rate = this.calculateMonthlyRate();
            rateElement.textContent = `${this.formatCurrency(rate)} zł`;
        }
    }

    updateSliderTooltip() {
        const tooltip = this.shadowRoot.querySelector('.slider-tooltip');
        const sliderWrapper = this.shadowRoot.querySelector('.slider-wrapper');
        if (tooltip && sliderWrapper) {
            const percentage = ((this.months - 6) / (60 - 6)) * 100;
            tooltip.style.left = `${percentage}%`;
            tooltip.textContent = this.months;
            sliderWrapper.style.setProperty('--slider-progress', `${percentage}%`);
        }
    }

    updateBadge() {
        const tax = parseFloat(this.getAttribute('tax')) || 0;
        const showBadge = tax === 0;
        const badge = this.shadowRoot.querySelector('.badge');
        
        if (showBadge) {
            if (!badge) {
                // Badge doesn't exist, need to re-render
                this.render();
                this.addEventListeners();
            } else {
                badge.textContent = `${this.months} rat 0%`;
                badge.classList.remove('hidden');
            }
        } else {
            if (badge) {
                badge.classList.add('hidden');
            }
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
        params.append('months', this.months);
        params.append('client_type', this.clientType);

        // Select target URL based on client type
        const targetUrl = this.clientType === 'individual' 
            ? `${INDIVIDUAL_TARGET_URL}?${params.toString()}`
            : `${BUSINESS_TARGET_URL}?${params.toString()}`;

        // Navigate to URL with parameters
        window.open(targetUrl, '_blank');
    }

    render() {
        if (!this.shadowRoot) {
            return;
        }

        const monthlyRate = this.calculateMonthlyRate();
        const sliderPercentage = ((this.months - 6) / (60 - 6)) * 100;
        const tax = parseFloat(this.getAttribute('tax')) || 0;
        const showBadge = tax === 0;

        this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            width: 100%;
            max-width: 400px;
            min-width: 300px;
            min-height: 300px;
            margin: 0 auto;
            box-sizing: border-box;
          }

          * {
            box-sizing: border-box;
          }

          .calculator-container {
            padding: 0;
            width: 100%;
            min-height: 300px;
            display: flex;
            flex-direction: column;
          }

          /* Section 1: Tabs */
          .tabs-section {
            margin-bottom: 16px;
            padding: 16px 20px;
            background: white;
            border: 1px solid #E5E7EB;  
            border-radius: 12px;
            box-shadow: 0px 4.99px 6.24px 0px #0000000F;
          }

          .tabs {
            display: flex;
            gap: 8px;
          }

          .tab {
            flex: 1;
            padding: 12px 16px;
            border-radius: 8px;
            border: none;
            background: white;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            font-size: 14px;
            font-weight: 500;
            color: #6B7280;
            transition: all 0.2s ease;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
          }

          .tab:hover:not(.active) {
            background: #F9FAFB;
          }

          .tab.active {
            background: #003574;
            color: white;
            box-shadow: 0 2px 4px rgba(0, 53, 116, 0.2);
          }

          .tab-icon {
            width: 16px;
            height: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .tab-icon svg {
            width: 100%;
            height: 100%;
          }

          /* Section 2: Monthly Rate Section */
          .rate-section {
            padding: 24px 20px;
            background: white;
            flex: 1;
            display: flex;
            flex-direction: column;
            border: 1px solid #E5E7EB;  
            border-radius: 12px;
            box-shadow: 0px 4.99px 6.24px 0px #0000000F;
          }

          .rate-title {
            font-size: 14px;
            color: #6B7280;
            margin-bottom: 16px;
            font-weight: 400;
          }

          .monthly-rate {
            font-size: 36px;
            font-weight: 700;
            color: #003574;
            margin-bottom: 24px;
            line-height: 1.2;
          }

          /* Slider */
          .slider-container {
            position: relative;
            margin-top: auto;
          }

          .slider-wrapper {
            position: relative;
            height: 40px;
            margin-bottom: 8px;
            display: flex;
            align-items: center;
          }

          .slider {
            width: 100%;
            height: 6px;
            border-radius: 3px;
            background: transparent;
            outline: none;
            -webkit-appearance: none;
            appearance: none;
            position: relative;
            z-index: 2;
            margin: 0;
            padding: 0;
          }

          /* Webkit browsers (Chrome, Safari, Edge) */
          .slider::-webkit-slider-runnable-track {
            width: 100%;
            height: 6px;
            border-radius: 3px;
            background: transparent;
          }

          .slider-wrapper::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            height: 6px;
            background: #E5E7EB;
            border-radius: 3px;
            width: 100%;
            pointer-events: none;
            z-index: 0;
          }

          .slider-wrapper::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            height: 6px;
            background: #003574;
            border-radius: 3px;
            width: var(--slider-progress, 0%);
            pointer-events: none;
            z-index: 1;
          }

          .slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #003574;
            cursor: pointer;
            margin-top: -7px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            position: relative;
            z-index: 3;
          }

          /* Firefox */
          .slider::-moz-range-track {
            width: 100%;
            height: 6px;
            border-radius: 3px;
            background: #E5E7EB;
            border: none;
          }

          .slider::-moz-range-progress {
            height: 6px;
            border-radius: 3px 0 0 3px;
            background: #003574;
            border: none;
          }

          .slider::-moz-range-thumb {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #003574;
            cursor: pointer;
            border: none;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            position: relative;
            z-index: 3;
          }

          .slider-track {
            display: none;
          }

          .slider-tooltip {
            position: absolute;
            top: -32px;
            transform: translateX(-50%);
            background: white;
            color: #003574;
            padding: 4px 10px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 600;
            white-space: nowrap;
            pointer-events: none;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            border: 1px solid #E5E7EB;
          }

          .slider-labels {
            display: flex;
            justify-content: space-between;
            font-size: 12px;
            color: #003574;
            padding: 0 2px;
            font-weight: 500;
          }

          /* Section 3: Bottom Section */
          .bottom-section {
            margin-top: 16px;
            padding: 20px;
            background: white;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            border: 1px solid #E5E7EB;  
            border-radius: 12px;
            box-shadow: 0px 4.99px 6.24px 0px #0000000F;
          }

          .iraty-button {
            background: transparent;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 0;
            padding: 0;
            transition: opacity 0.2s ease;
            text-align: center;
          }

          .iraty-button:hover {
            opacity: 0.8;
          }

          .iraty-logo {
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .iraty-logo-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            height: 24px;
          }

          .iraty-logo-icon svg {
            width: auto;
            height: 100%;
          }

          .iraty-text {
            font-size: 14px;
            font-weight: 400;
            color: black;
            margin: 0;
            white-space: nowrap;
          }

          .iraty-arrow {
            width: 16px;
            height: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: 4px;
            flex-shrink: 0;
          }

          .iraty-arrow svg {
            width: 100%;
            height: 100%;
          }

          .badge {
            position: absolute;
            bottom: -5px;
            right: 0px;
            background: #003574;
            color: white;
            padding: 10px 16px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            white-space: nowrap;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
          }

          .badge.hidden {
            display: none;
          }
        </style>
        <div class="calculator-container">
          <!-- Section 1: Tabs -->
          <div class="tabs-section">
            <div class="tabs">
              <button class="tab ${this.clientType === 'individual' ? 'active' : ''}" data-tab="individual">
                <span class="tab-icon">${personIcon}</span>
                <span>Klient indywidualny</span>
              </button>
              <button class="tab ${this.clientType === 'business' ? 'active' : ''}" data-tab="business">
                <span class="tab-icon">${briefcaseIcon}</span>
                <span>Klient firmowy</span>
              </button>
            </div>
          </div>

          <!-- Section 2: Monthly Rate Section -->
          <div class="rate-section">
            <div class="rate-title">Dopasuj miesięczną ratę</div>
            <div class="monthly-rate">${this.formatCurrency(monthlyRate)} zł</div>
            
            <!-- Slider -->
            <div class="slider-container">
              <div class="slider-wrapper" style="--slider-progress: ${sliderPercentage}%">
                <input 
                  type="range" 
                  class="slider" 
                  min="6" 
                  max="60" 
                  value="${this.months}"
                  step="1"
                />
                <div class="slider-tooltip" style="left: ${sliderPercentage}%">${this.months}</div>
              </div>
              <div class="slider-labels">
                <span>6</span>
                <span>60</span>
              </div>
            </div>
          </div>

          <!-- Section 3: Bottom Section -->
          <div class="bottom-section">
            <button class="iraty-button">
              <div class="iraty-logo">
                <div class="iraty-logo-icon">${ipayLogo}</div>
                <span class="iraty-text">Przejdź dalej</span>
                <div class="iraty-arrow">${arrowIcon}</div>
              </div>
            </button>
            ${showBadge ? `<div class="badge">${this.months} rat 0%</div>` : ''}
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
customElements.define('ipay-calculator', IpayCalculator);

// Export for module usage
export { IpayCalculator };