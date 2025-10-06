/**
 * Type definitions for ipay-buttons
 * @version 1.2.0
 * @author a.s.szlag@gmail.com
 */

// Declare the IpayButton class
export interface IpayButtonElement extends HTMLElement {
    href: string;
    variant: 'primary' | 'secondary' | 'success' | 'outline' | 'danger';
    target: '_self' | '_blank' | '_parent' | '_top';
  }
  
  export class IpayButton extends HTMLElement {
    static readonly observedAttributes: string[];
    href: string;
    variant: string;
    target: string;
    
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
  }
  
  export default IpayButton;
  
  // Declare the custom element for JSX (React, Preact, etc.)
  declare global {
    namespace JSX {
      interface IntrinsicElements {
        'ipay-button': {
          href?: string;
          variant?: 'primary' | 'secondary' | 'success' | 'outline' | 'danger';
          target?: '_self' | '_blank' | '_parent' | '_top';
          children?: React.ReactNode;
          className?: string;
          style?: React.CSSProperties;
        };
      }
    }
  }
  
  // For Vue
  declare module '@vue/runtime-dom' {
    export interface GlobalComponents {
      'ipay-button': IpayButtonElement;
    }
  }
  
  // For Angular (template type checking)
  declare module '@angular/core' {
    interface ElementRef {
      nativeElement: IpayButtonElement;
    }
  }