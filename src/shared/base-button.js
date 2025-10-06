import { buttonBaseStyles, variantStyles } from './styles.js';
import { ipayLogo } from './logo.js';

export class BaseIpayButton extends HTMLElement {
  static get observedAttributes() {
    return ['href', 'variant', 'target', 'show-logo'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  getStyles() {
    return `${buttonBaseStyles}${variantStyles}`;
  }

  getLogo() {
    const showLogo = this.getAttribute('show-logo') !== 'false';
    return showLogo ? ipayLogo : '';
  }

}