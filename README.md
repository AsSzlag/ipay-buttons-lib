# ipay-buttons

Beautiful, framework-agnostic Web Component for launching iPay flows from any site or app.

## Installation

```bash
npm install ipay-buttons
# or
yarn add ipay-buttons
```

## Features

- **Web Component**: works in React, Vue, Angular, Svelte, and vanilla JS
- **Zero dependencies** and lightweight
- **TypeScript-ready** via standard DOM custom element typing
- **Simple API**: pass `url`, `price`, `name`, `email`, `id`

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
  <ipay-button 
    id="order-123"
    price="299.99"
    name="John Doe"
    email="john@example.com"
    url="https://bikerc-5a1dd.web.app/pomiary">
  </ipay-button>
</body>
</html>
```

When clicked, the button will navigate to `url` with the provided attributes encoded as query parameters.

Example navigation:
```
https://bikerc-5a1dd.web.app/pomiary?id=order-123&price=299.99&name=John%20Doe&email=john%40example.com
```

## React Usage

The package registers a custom element. In React you can use it directly:

```tsx
import 'ipay-buttons';

export default function App() {
  return (
    <ipay-button 
      id="order-123"
      price="299.99"
      name="John Doe"
      email="john@example.com"
      url="https://bikerc-5a1dd.web.app/pomiary"
    />
  );
}
```

If you prefer a typed wrapper component:

```tsx
import 'ipay-buttons';
import React from 'react';

type IpayButtonProps = {
  id?: string;
  price?: string | number;
  name?: string;
  email?: string;
  url?: string;
};

export function IpayButton(props: IpayButtonProps) {
  const { id, price, name, email, url } = props;
  return (
    <ipay-button
      id={id}
      price={price as any}
      name={name}
      email={email}
      url={url}
    />
  );
}
```

## Vue / Angular / Svelte

Import the package once (e.g., in your app entry) and use the `ipay-button` tag in templates. For Angular, ensure `CUSTOM_ELEMENTS_SCHEMA` is added.

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
  <ipay-button id="order-1" price="99.00" url="https://example.com/pay" />
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

<ipay-button id="order-2" price="149.00" url="https://example.com/pay" />
```

## Props / Attributes

| Attribute | Type            | Default                                            | Description                         |
|----------|-----------------|----------------------------------------------------|-------------------------------------|
| `id`     | string          | undefined                                          | Optional identifier for the payment |
| `price`  | string/number   | undefined                                          | Price amount to pass                |
| `name`   | string          | undefined                                          | Payer name                          |
| `email`  | string          | undefined                                          | Payer email                         |
| `url`    | string          | `https://bikerc-5a1dd.web.app/pomiary`             | Destination URL                     |

Behavior:
- On click, the component builds `?id=...&price=...&name=...&email=...` and navigates to `url` in the same tab.
- Only attributes present on the element are included in the query string.

## Local Preview

A ready-made preview file is included for quick manual testing:

- Open `preview.html` in your browser.
- Two buttons are rendered with different attribute sets.
- Check the browser console for diagnostics.

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Any browser with Web Components support

## License

MIT © a.s.szlag@gmail.com

## Contributing

Contributions are welcome! Please open a PR or issue if you have suggestions.
