function renderIpayButton(containerOrSelector, options = {}) {
  const {
    label = 'Open iPay',
    url = 'https://bikerc-5a1dd.web.app/',
    id,
    className,
    target = '_self'
  } = options;

  const container = typeof containerOrSelector === 'string'
    ? document.querySelector(containerOrSelector)
    : containerOrSelector;

  if (!container) {
    throw new Error('renderIpayButton: Container not found');
  }

  const buttonElement = document.createElement('button');
  buttonElement.type = 'button';
  buttonElement.textContent = label;
  if (id) buttonElement.id = id;
  if (className) buttonElement.className = className;

  buttonElement.addEventListener('click', () => {
    if (target === '_blank') {
      window.open(url, '_blank', 'noopener,noreferrer');
      return;
    }
    window.location.assign(url);
  });

  container.appendChild(buttonElement);
  return buttonElement;
}
module.exports = { renderIpayButton };
