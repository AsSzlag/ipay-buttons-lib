// import { ipayLogo } from './ipay-logo.svg';

class IPayButton {
  constructor({  id , url, price, name, email,}) {
    this.id = id;
    this.url = url;
    this.price = price;
    this.name = name;
    this.email = email;

  }

  render(containerOrSelector) {
    const container = typeof containerOrSelector === 'string'
      ? document.querySelector(containerOrSelector)
      : containerOrSelector;

    if (!container) {
      throw new Error('IPayButton: Container not found');
    }

    const buttonElement = document.createElement('button');
    buttonElement.type = 'button';
    buttonElement.textContent = `Sprawdź zakup przez Ipay`;
    buttonElement.id = this.id;

    buttonElement.addEventListener('click', () => {
      const params = new URLSearchParams({
        name: this.name,
        email: this.email,
        price: this.price,
        id: this.id,
        url: this.url
      });
      const fullUrl = `https://bikerc-5a1dd.web.app/pomiary`;
      window.open(fullUrl, '_blank', 'noopener,noreferrer');
    });

    container.appendChild(buttonElement);
    return buttonElement;
  }
}

module.exports = { IPayButton };
