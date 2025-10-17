# ipay-buttons

Beautiful, framework-agnostic Web Components library for launching iPay flows from any site or app. Features 14 different button variants with consistent styling and hover effects.

## Installation

```bash
npm install ipay-buttons
# or
yarn add ipay-buttons
```

## Features

- **14 Button Variants**: Multiple button designs for different use cases
- **Web Components**: Works in React, Vue, Angular, Svelte, and vanilla JS
- **Zero dependencies** and lightweight
- **TypeScript-ready** via standard DOM custom element typing
- **Consistent API**: Pass `url`, `price`, `name`, `email`, `id` to any button
- **Modern Design**: Dark blue theme with smooth hover effects and shadows
- **Responsive**: Adapts to content and maintains consistent styling

## Button Components

### Standard Buttons

#### `ipay-button`
Main button with "dla osób i firm" text and iPay logo.

#### `ipay-button-personal`
Personal button with "dla osób" text.

#### `ipay-button-leasing`
Leasing button with "dla firm + leasing" text.

#### `ipay-button-basic`
Basic button with logo aligned to bottom.

#### `ipay-button-rates`
Standard rates button.

### Specialized Buttons

#### `ipay-button-leasing-rates`
Two-part button with main section and "Rata od" component showing calculated rates.

#### `ipay-button-leasing-small`
Compact button: 60px tall × 220px wide.

#### `ipay-button-leasing-small-wide`
Small wide variant of the leasing button.

#### `ipay-button-leasing-wrapped`
Wrapped version of the leasing button.

#### `ipay-button-double`
Two-button stacked design with shadow hover effects.

### Modal & Bubble Buttons

#### `ipay-bubble`
Horizontal button with "Kup na raty" text and arrow icon.

#### `ipay-modal-side-short`
Vertical button with dark blue top section and 180° rotated text.

#### `ipay-modal-side`
Side modal button variant.

#### `ipay-modal-side-dark`
Dark themed side modal button.

## Quick Start (Vanilla HTML/JS)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <!-- Use the UMD build directly in the browser -->
  <script src="./dist/index.umd.js"></script>
</head>
<body>
  <!-- Main button -->
  <ipay-button 
    id="order-123"
    price="299.99"
    name="John Doe"
    email="john@example.com"
    url="https://mediamarkt.pl/pl/promo-list/Apple_premiera_iPad_Pro">
  </ipay-button>

  <!-- Leasing rates button with dynamic rate calculation -->
  <ipay-button-leasing-rates 
    id="order-124"
    price="1200.00">
  </ipay-button-leasing-rates>

  <!-- Compact button -->
  <ipay-button-leasing-small 
    id="order-125"
    price="799.99">
  </ipay-button-leasing-small>

  <!-- Bubble button with arrow -->
  <ipay-bubble 
    id="order-126"
    price="149.99">
  </ipay-bubble>
</body>
</html>
```

When clicked, any button will navigate to iPay website with the provided attributes encoded as query parameters.

Example navigation:
```
https://app.ipay-dev.host06.300devs.com/?id=order-123&price=299.99&name=John%20Doe&email=john%40example.com
```

## React Usage

The package registers custom elements. In React you can use them directly:

```tsx
import 'ipay-buttons';

export default function App() {
  return (
    <div>
      {/* Main button */}
      <ipay-button 
        id="order-123"
        price="299.99"
        name="John Doe"
        email="john@example.com"
        url="https://mediamarkt.pl/pl/promo-list/Apple_premiera_iPad_Pro"
      />

      {/* Leasing rates button */}
      <ipay-button-leasing-rates 
        id="order-124"
        price="1200.00"
      />

      {/* Double button */}
      <ipay-button-double 
        id="order-125"
        price="999.99"
      />
    </div>
  );
}
```

If you prefer typed wrapper components:

```tsx
import 'ipay-buttons';
import React from 'react';

type IpayButtonProps = {
  id?: string;
  price?: string | number;
  name?: string;
  email?: string;
  phone?: string;
  url?: string;
  count?: string | number;
};

export function IpayButton(props: IpayButtonProps) {
  const { id, price, name, email, phone, url, count } = props;
  return (
    <ipay-button
      id={id}
      price={price as any}
      name={name}
      email={email}
      phone={phone}
      url={url}
      count={count as any}
    />
  );
}

export function IpayButtonLeasingRates(props: IpayButtonProps) {
  const { id, price, name, email, phone, url, count } = props;
  return (
    <ipay-button-leasing-rates
      id={id}
      price={price as any}
      name={name}
      email={email}
      phone={phone}
      url={url}
      count={count as any}
    />
  );
}

export function IpayBubble(props: IpayButtonProps) {
  const { id, price, name, email, phone, url, count } = props;
  return (
    <ipay-bubble
      id={id}
      price={price as any}
      name={name}
      email={email}
      phone={phone}
      url={url}
      count={count as any}
    />
  );
}
```

## Vue / Angular / Svelte

Import the package once (e.g., in your app entry) and use any of the button tags in templates. For Angular, ensure `CUSTOM_ELEMENTS_SCHEMA` is added.

```ts
// Angular example
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import 'ipay-buttons';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
```

```vue
<!-- Vue 3 example -->
<template>
  <div>
    <ipay-button id="order-1" price="99.00" url="https://example.com/pay" />
    <ipay-button-leasing-rates id="order-2" price="1200.00" />
    <ipay-bubble id="order-3" price="299.99" />
  </div>
</template>

<script setup>
import 'ipay-buttons';
</script>
```

```svelte
<!-- Svelte example -->
<script>
  import 'ipay-buttons';
</script>

<div>
  <ipay-button id="order-1" price="149.00" url="https://example.com/product" />
  <ipay-button-double id="order-2" price="799.99" />
  <ipay-modal-side-short id="order-3" price="199.99" />
</div>
```

## Props / Attributes

| Attribute | Type            | Default                                            | Description                         |
|----------|-----------------|----------------------------------------------------|-------------------------------------|
| `id`     | string          | undefined                                          | Unique identifier for the payment   |
| `price`  | string/number   | undefined                                          | Price amount                        |
| `name`   | string          | undefined                                          | Payer name                          |
| `email`  | string          | undefined                                          | Payer email                         |
| `phone`  | string          | undefined                                          | Payer phone number                  |
| `url`    | string          | undefined                                          | Product URL                         |
| `count`  | string/number   | undefined                                          | Product quantity                    |

### Behavior:
- On click, any component builds `?id=...&price=...&name=...&email=...&phone=...&count=...` and navigates to `url` in the same tab.
- Only attributes present on the element are included in the query string.
- The `price` attribute is used by `ipay-button-leasing-rates` to calculate and display dynamic rates.

### Special Features:

#### Rate Calculation (`ipay-button-leasing-rates`)
- Automatically calculates rate as `price / 10`
- Displays "Rata od X zł" where X is the calculated rate
- Falls back to "Rata od 12,00 zł" if no price is provided

#### Hover Effects
- All buttons have consistent hover effects with dark blue background (`#003574`)
- Text and icons change to white on hover
- Subtle lift animation and enhanced shadow effects
- Smooth transitions (0.2s ease)

## Preview

A comprehensive preview file is hosted on: https://asszlag.github.io/ipay-buttons-lib/preview.html

## Styling & Design

### Color Scheme
- **Primary Color**: Dark blue (`#003574`)
- **Background**: White with subtle shadows
- **Hover State**: Dark blue background with white text/icons
- **Borders**: Light gray (`#E5E7EB`) with rounded corners

### Typography
- **Font Family**: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
- **Font Weights**: 400 (regular), 600 (semi-bold), 700 (bold)
- **Font Sizes**: 10px-24px depending on button variant

### Layout
- **Border Radius**: 12px for modern appearance
- **Padding**: 8px-24px depending on button size
- **Shadows**: Subtle `0 1px 3px rgba(0, 0, 0, 0.1)` with enhanced hover effects
- **Transitions**: Smooth 0.2s ease animations

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Any browser with Web Components support

## License

MIT © a.s.szlag@gmail.com

## Contributing

Contributions are welcome! Please open a PR or issue if you have suggestions.
