import { ipayLogo } from '../shared/logo.js';

const BASE_URL = 'http://185.25.151.171:8411';
const TARGET_URL = `${BASE_URL}/new-company-application`;

// SVG Icons - Imported from Figma
const documentIcon = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.9443 1.4502H13.0557C14.8988 1.4502 16.3393 1.45081 17.4619 1.60156C18.6118 1.75658 19.5121 2.07758 20.2178 2.78223C20.9224 3.48787 21.2434 4.38821 21.3984 5.53809C21.5492 6.66171 21.5498 8.10127 21.5498 9.94434V14.0557C21.5498 15.8988 21.5492 17.3393 21.3984 18.4619C21.2434 19.6118 20.9224 20.5121 20.2178 21.2178C19.5121 21.9224 18.6118 22.2434 17.4619 22.3984C16.3383 22.5492 14.8987 22.5498 13.0557 22.5498H10.9443C9.10124 22.5498 7.66069 22.5492 6.53809 22.3984C5.38821 22.2434 4.48787 21.9224 3.78223 21.2178C3.07758 20.5121 2.75658 19.6118 2.60156 18.4619C2.45081 17.3383 2.4502 15.8987 2.4502 14.0557V9.94434C2.4502 8.10124 2.45081 6.66069 2.60156 5.53809C2.75658 4.38821 3.07758 3.48787 3.78223 2.78223C4.48787 2.07758 5.38821 1.75658 6.53809 1.60156C7.66171 1.45081 9.10127 1.4502 10.9443 1.4502ZM10.999 2.5498C9.0978 2.5498 7.72895 2.55124 6.68359 2.69141C5.78394 2.81213 5.18961 3.0299 4.74219 3.39453L4.55859 3.56055C4.09345 4.0268 3.82843 4.65623 3.69043 5.68457C3.55026 6.72895 3.54883 8.09879 3.54883 10V14C3.54883 15.9012 3.55026 17.272 3.69043 18.3164C3.82843 19.3438 4.09329 19.9732 4.55957 20.4395C5.02587 20.9057 5.65527 21.1706 6.68359 21.3086C7.72797 21.4488 9.09783 21.4502 10.999 21.4502H12.999C14.9002 21.4502 16.2711 21.4488 17.3154 21.3086C18.3428 21.1706 18.9722 20.9057 19.4385 20.4395C19.9048 19.9732 20.1696 19.3438 20.3076 18.3154C20.4478 17.272 20.4492 15.9012 20.4492 14V10C20.4492 8.09878 20.4478 6.72895 20.3076 5.68359C20.1696 4.65626 19.9048 4.02683 19.4385 3.56055C18.9722 3.09424 18.3428 2.8294 17.3145 2.69141C16.2711 2.55123 14.9002 2.5498 12.999 2.5498H10.999ZM8 13.4502H13C13.1459 13.4502 13.2855 13.5082 13.3887 13.6113C13.4918 13.7145 13.5498 13.8541 13.5498 14C13.5498 14.1459 13.4918 14.2855 13.3887 14.3887C13.2855 14.4918 13.1459 14.5498 13 14.5498H8C7.85413 14.5498 7.71447 14.4918 7.61133 14.3887C7.50818 14.2855 7.4502 14.1459 7.4502 14C7.4502 13.8541 7.50818 13.7145 7.61133 13.6113C7.71447 13.5082 7.85413 13.4502 8 13.4502ZM8 9.4502H16C16.1459 9.4502 16.2855 9.50818 16.3887 9.61133C16.4918 9.71447 16.5498 9.85413 16.5498 10C16.5498 10.1459 16.4918 10.2855 16.3887 10.3887C16.2855 10.4918 16.1459 10.5498 16 10.5498H8C7.85413 10.5498 7.71447 10.4918 7.61133 10.3887C7.50818 10.2855 7.4502 10.1459 7.4502 10C7.4502 9.85413 7.50818 9.71447 7.61133 9.61133C7.71447 9.50818 7.85413 9.4502 8 9.4502Z" fill="#003574" stroke="white" stroke-width="0.4"/>
</svg>
`;

const signatureIcon = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.4241 2.5436C13.7523 2.2037 14.1449 1.93257 14.579 1.74604C15.0132 1.55951 15.4801 1.46131 15.9525 1.45717C16.425 1.45303 16.8936 1.54304 17.3309 1.72194C17.7682 1.90084 18.1655 2.16505 18.4996 2.49915C18.8337 2.83324 19.0979 3.23054 19.2768 3.66785C19.4557 4.10516 19.5457 4.57372 19.5416 5.04619C19.5374 5.51866 19.4392 5.98557 19.2527 6.41968C19.0662 6.85379 18.795 7.2464 18.4551 7.5746L17.9586 8.0711L17.9796 8.0921C18.2235 8.33592 18.4169 8.62539 18.5488 8.94399C18.6808 9.26258 18.7486 9.60404 18.7486 9.94888C18.7485 10.2937 18.6805 10.6351 18.5484 10.9537C18.4164 11.2722 18.2228 11.5616 17.9789 11.8053L15.6411 14.1408C15.6065 14.1767 15.5652 14.2052 15.5194 14.2249C15.4737 14.2445 15.4244 14.2549 15.3747 14.2553C15.3249 14.2557 15.2755 14.2463 15.2294 14.2274C15.1833 14.2085 15.1414 14.1807 15.1062 14.1455C15.071 14.1103 15.0432 14.0684 15.0243 14.0223C15.0055 13.9762 14.996 13.9269 14.9964 13.8771C14.9968 13.8273 15.0072 13.7781 15.0268 13.7323C15.0465 13.6866 15.0751 13.6452 15.1109 13.6106L17.4486 11.2751C17.6228 11.101 17.7609 10.8943 17.8552 10.6667C17.9495 10.4392 17.998 10.1954 17.998 9.9491C17.998 9.70283 17.9495 9.45897 17.8552 9.23145C17.7609 9.00393 17.6228 8.79721 17.4486 8.6231L17.4284 8.60135L8.46288 17.5668C8.12831 17.9014 7.70955 18.1393 7.25088 18.2553L2.43363 19.4748C2.30766 19.5067 2.17559 19.5052 2.05036 19.4706C1.92513 19.436 1.81103 19.3695 1.71923 19.2776C1.62744 19.1856 1.56111 19.0714 1.52673 18.9461C1.49235 18.8208 1.49111 18.6888 1.52313 18.5628L2.74713 13.7418C2.86337 13.2841 3.10097 12.8661 3.43488 12.5321L13.4241 2.5436ZM17.9241 3.07385C17.3976 2.54743 16.6835 2.25171 15.9389 2.25171C15.1943 2.25171 14.4802 2.54743 13.9536 3.07385L3.96513 13.0623C3.72664 13.3009 3.55693 13.5994 3.47388 13.9263L2.24913 18.7481L7.06638 17.5293C7.39395 17.4463 7.69299 17.2763 7.93188 17.0373L17.9249 7.0436C18.4513 6.51702 18.747 5.80292 18.747 5.05835C18.747 4.31377 18.4513 3.59967 17.9249 3.0731M3.00063 20.4911C3.28563 20.7618 3.60963 21.0236 3.96063 21.2636C4.98138 21.9611 6.27363 22.5011 7.49913 22.5011C8.41563 22.5011 9.29313 22.1636 10.0941 21.6941C10.8966 21.2238 11.6474 20.6066 12.3141 20.0163C12.5751 19.7838 12.8204 19.5588 13.0506 19.3488C13.4196 19.0113 13.7504 18.7076 14.0534 18.4623C14.2949 18.2648 14.4954 18.1268 14.6549 18.0483C14.7107 18.0196 14.7699 17.9979 14.8311 17.9838C14.8468 17.9814 14.8626 17.9807 14.8784 17.9816H14.8806C15.0696 18.0446 15.2256 18.2028 15.3756 18.5021C15.5039 18.7556 15.6029 19.0586 15.7146 19.4021L15.7851 19.6166C16.0499 20.4161 16.4301 21.4638 17.5326 21.7398C18.0156 21.8606 18.4379 21.7646 18.8166 21.5681C19.1781 21.3806 19.5164 21.0926 19.8366 20.8173L19.8479 20.8076C20.5086 20.2413 21.1829 19.6631 22.1856 19.4958C22.2354 19.4891 22.2833 19.4724 22.3264 19.4469C22.3696 19.4213 22.4072 19.3873 22.437 19.3469C22.4668 19.3065 22.4882 19.2605 22.4999 19.2117C22.5116 19.1629 22.5134 19.1122 22.5052 19.0627C22.497 19.0132 22.4789 18.9658 22.452 18.9234C22.4251 18.8811 22.39 18.8445 22.3487 18.8159C22.3074 18.7873 22.2609 18.7673 22.2117 18.7571C22.1626 18.7469 22.1119 18.7466 22.0626 18.7563C20.8521 18.9581 20.0391 19.6563 19.3979 20.2053L19.3491 20.2473C19.0131 20.5353 18.7416 20.7618 18.4716 20.9028C18.2166 21.0348 17.9826 21.0791 17.7149 21.0123C17.0624 20.8488 16.7811 20.2383 16.4969 19.3811L16.4331 19.1861C16.3221 18.8433 16.2021 18.4743 16.0461 18.1646C15.8564 17.7881 15.5789 17.4243 15.1176 17.2706C14.8356 17.1761 14.5514 17.2631 14.3241 17.3756C14.0871 17.4918 13.8359 17.6726 13.5801 17.8796C13.2636 18.1368 12.9014 18.4683 12.5174 18.8201C12.2853 19.0334 12.0515 19.2449 11.8161 19.4546C11.1599 20.0366 10.4534 20.6141 9.71538 21.0468C8.97738 21.4796 8.23263 21.7511 7.49913 21.7511C6.47463 21.7511 5.32938 21.2906 4.38213 20.6441C4.20948 20.5262 4.04183 20.401 3.87963 20.2691L3.00063 20.4911Z" fill="#003574"/>
</svg>
`;

const deliveryIcon = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.14648 3H20.1465C20.7764 3 21.3805 3.25022 21.8259 3.69562C22.2713 4.14102 22.5215 4.74511 22.5215 5.375V19.625C22.5215 20.2549 22.2713 20.859 21.8259 21.3044C21.3805 21.7498 20.7764 22 20.1465 22H5.89648C5.2666 22 4.6625 21.7498 4.21711 21.3044C3.77171 20.859 3.52148 20.2549 3.52148 19.625V12.5M13.0215 8.9375V3M8.27149 7.75H2.33398" stroke="#003574" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const arrowRightIcon = `
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.5 10.5L9.5 5.5L4.5 0.5" stroke="#50C878" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
`;

const arrowRightSmallIcon = `
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.5 9L7.5 6L4.5 3" stroke="#50C878" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
`;

class IpayModalInfoLeasing extends HTMLElement {
    static get observedAttributes() {
        return ['id', 'price', 'url', 'count', 'name', 'email', 'phone', 'delivery_price', 'product_id'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        if (!this.shadowRoot) {
            this.attachShadow({ mode: 'open' });
        }
        this.render();
        this.addEventListeners();
    }

    addEventListeners() {
        // Main CTA button
        const mainCta = this.shadowRoot.querySelector('.main-cta');
        mainCta?.addEventListener('click', () => {
            this.handleClick();
        });

        // Footer CTA
        const footerCta = this.shadowRoot.querySelector('.footer-cta');
        footerCta?.addEventListener('click', () => {
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
        if (!this.shadowRoot) {
            return;
        }

        this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            width: 100%;
            max-width: 486px;
            margin: 0 auto;
            box-sizing: border-box;
          }

          * {
            box-sizing: border-box;
          }

          .container {
            background: #FFFFFF;
            border: 1px solid #E5E5E5;
            border-radius: 16px;
            box-shadow: 0px 16px 20px 0px rgba(0, 0, 0, 0.06);
            padding: 20px 40px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 42px;
          }

          /* Top Section */
          .top-section {
            display: flex;
            flex-direction: column;
            gap: 36px;
            width: 406px;
          }

          /* Header Section */
          .header-section {
            display: flex;
            flex-direction: column;
            align-self: stretch;
            gap: 18px;
          }

          .header-box {
            display: flex;
            justify-content: center;
            align-items: stretch;
            align-self: stretch;
            border-radius: 8px;
          }

          .header-text {
            font-family: Inter, sans-serif;
            font-weight: 400;
            font-size: 20px;
            line-height: 1.5em;
            letter-spacing: -0.02em;
            text-align: center;
            color: #111111;
            margin: 0;
            white-space: pre-line;
          }

          .subheader-text {
            font-family: Inter, sans-serif;
            font-weight: 300;
            font-size: 18px;
            line-height: 1.5em;
            letter-spacing: -0.02em;
            text-align: center;
            color: #111111;
            margin: 0;
          }

          /* Main CTA */
          .main-cta {
            display: flex;
            justify-content: center;
            align-items: center;
            align-self: stretch;
            gap: 14px;
            padding: 16px 24px;
            background: #003574;
            border-radius: 14px;
            border: none;
            cursor: pointer;
            transition: opacity 0.2s ease;
          }

          .main-cta:hover {
            opacity: 0.9;
          }

          .main-cta-content {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 6px;
          }

          .main-cta-text {
            font-family: Inter, sans-serif;
            font-weight: 400;
            font-size: 16px;
            line-height: 1em;
            color: #F7F9FB;
            margin: 0;
          }

          .main-cta-dot {
            width: 12px;
            height: 12px;
            background: #10B981;
            border-radius: 50%;
            flex-shrink: 0;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .main-cta-chevron {
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

          .main-cta-chevron svg {
            width: 100%;
            height: 100%;
          }

          /* Step Section */
          .step-section {
            display: flex;
            justify-content: center;
            align-items: center;
            align-self: stretch;
            gap: 18px;
          }

          .step-item {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 7px;
            flex: 1;
          }

          .step-icon {
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .step-icon svg {
            width: 100%;
            height: 100%;
          }

          .step-text {
            font-family: Inter, sans-serif;
            font-weight: 400;
            font-size: 14px;
            line-height: 1.4em;
            letter-spacing: -0.02em;
            text-align: center;
            color: #111111;
            margin: 0;
            white-space: pre-line;
          }

          .step-divider {
            width: 40px;
            height: 2px;
            background: #E5E5E5;
            border-radius: 4px;
            flex-shrink: 0;
          }

          /* Footer Section */
          .footer-section {
            display: flex;
            flex-direction: column;
            align-items: center;
            align-self: stretch;
            gap: 6px;
            padding: 12px 16px;
            border: 1px solid #E5E5E5;
            border-radius: 14px;
          }

          .footer-cta {
            display: flex;
            align-items: center;
            gap: 6px;
            background: transparent;
            border: none;
            cursor: pointer;
            padding: 0;
            transition: opacity 0.2s ease;
          }

          .footer-cta:hover {
            opacity: 0.8;
          }

          .footer-cta-text {
            font-family: Inter, sans-serif;
            font-weight: 400;
            font-size: 16px;
            line-height: 1.3em;
            letter-spacing: -0.02em;
            color: #003574;
            margin: 0;
          }

          .footer-cta-arrow {
            width: 12px;
            height: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 3px 2px;
            border-radius: 16px;
          }

          .footer-cta-arrow svg {
            width: 100%;
            height: 100%;
          }

          .footer-logo {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 7.13px;
            width: 166px;
          }

          .footer-logo svg {
            width: auto;
            height: 33px;
          }
        </style>
        <div class="container">
          <!-- Top Section -->
          <div class="top-section">
            <!-- Header Section -->
            <div class="header-section">
              <div class="header-box">
                <p class="header-text">Decyzja online na ekranie\nna Twoich warunkach</p>
              </div>
              <div class="header-box">
                <p class="subheader-text">Dostępne raty dla osób oraz raty i leasing dla firm</p>
              </div>
            </div>

            <!-- Main CTA -->
            <button class="main-cta">
              <div class="main-cta-content">
                <span class="main-cta-text">Sprawdź i dopasuj finasnowanie</span>
                <div class="main-cta-dot">
                  <div class="main-cta-chevron">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 6L5 4L3 2" stroke="#FFFFFF" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </button>
          </div>

          <!-- Step Section -->
          <div class="step-section">
            <div class="step-item">
              <div class="step-icon">${documentIcon}</div>
              <p class="step-text">Wniosek\nonline</p>
            </div>
            <div class="step-divider"></div>
            <div class="step-item">
              <div class="step-icon">${signatureIcon}</div>
              <p class="step-text">Zatwierdź\numowę</p>
            </div>
            <div class="step-divider"></div>
            <div class="step-item">
              <div class="step-icon">${deliveryIcon}</div>
              <p class="step-text">Odbierz\nusługę lub towar</p>
            </div>
          </div>

          <!-- Footer Section -->
          <div class="footer-section">
            <button class="footer-cta">
              <span class="footer-cta-text">Dowiedz się więcej</span>
              <div class="footer-cta-arrow">${arrowRightSmallIcon}</div>
            </button>
            <div class="footer-logo">
              ${ipayLogo}
            </div>
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
customElements.define('ipay-modal-info-leasing', IpayModalInfoLeasing);

// Export for module usage
export { IpayModalInfoLeasing };
