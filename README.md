# ipay-buttons

Beautiful, stylish payment buttons that work across all frameworks and vanilla JS.

## Installation

```bash
npm install ipay-buttons
# or
yarn add ipay-buttons
```

## Features

✅ Works with React, Vue, Angular, Svelte, and vanilla JS  
✅ Full TypeScript support included  
✅ Zero dependencies  
✅ Beautiful gradient styles  
✅ Lightweight (~2KB gzipped)

## Usage

### React / TypeScript

TypeScript definitions are included automatically! Just import and use:

```tsx
import 'ipay-buttons';

function App() {
  return (
    <ipay-button href="https://google.com" variant="primary">
      Go to Google
    </ipay-button>
  );
}
```

**TypeScript will automatically recognize the component with full autocomplete!**

### React Wrapper (Optional)

For better React integration, create a wrapper component:

```tsx
import 'ipay-buttons';
import { ReactNode } from 'react';

interface IpayButtonProps {
  href: string;
  variant?: 'primary' | 'secondary' | 'success' | 'outline' | 'danger';
  target?: '_self' | '_blank' | '_parent' | '_top';
  children: ReactNode;
}

export function IpayButton({ 
  href, 
  variant = 'primary', 
  target = '_self', 
  children 
}: IpayButtonProps) {
  return (
    <ipay-button href={href} variant={variant} target={target}>
      {children}
    </ipay-button>
  );
}

// Usage
<IpayButton href="https://google.com" variant="primary">
  Click me
</IpayButton>
```

### Vanilla JavaScript / HTML

```html
<!DOCTYPE html>
<html>
<head>
  <script type="module">
    import 'ipay-buttons';
  </script>
</head>
<body>
  <ipay-button href="https://google.com" variant="primary">
    Go to Google
  </ipay-button>
</body>
</html>
```

### Vue 3

```vue
<template>
  <ipay-button href="https://google.com" variant="primary">
    Go to Google
  </ipay-button>
</template>

<script setup lang="ts">
import 'ipay-buttons';
</script>
```

### Angular

```typescript
// app.module.ts
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import 'ipay-buttons';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
```

```html
<!-- app.component.html -->
<ipay-button href="https://google.com" variant="primary">
  Go to Google
</ipay-button>
```

### Svelte

```svelte
<script lang="ts">
  import 'ipay-buttons';
</script>

<ipay-button href="https://google.com" variant="primary">
  Go to Google
</ipay-button>
```

## Props / Attributes

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | `string` | **required** | URL to navigate to |
| `variant` | `'primary' \| 'secondary' \| 'success' \| 'outline' \| 'danger'` | `'primary'` | Button style variant |
| `target` | `'_self' \| '_blank' \| '_parent' \| '_top'` | `'_self'` | Where to open the link |

## Available Variants

### `primary`
Purple gradient button (default)

### `secondary`
Pink gradient button

### `success`
Blue gradient button

### `outline`
Outlined button with hover fill

### `danger`
Red/yellow gradient button

## Examples

```tsx
// Basic usage
<ipay-button href="https://google.com">
  Click me
</ipay-button>

// With variant
<ipay-button href="https://google.com" variant="success">
  Success Button
</ipay-button>

// Open in new tab
<ipay-button href="https://google.com" target="_blank" variant="secondary">
  Open in New Tab
</ipay-button>
```

## TypeScript Support

This package includes TypeScript definitions out of the box. No need to install `@types/ipay-buttons` or create custom declarations!

The types are automatically picked up by:
- ✅ React / Preact
- ✅ Vue 3
- ✅ Angular
- ✅ Svelte
- ✅ Any TypeScript project

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- All browsers with Web Components support

## License

MIT © a.s.szlag@gmail.com

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Issues

Found a bug? Please [open an issue](https://github.com/yourusername/ipay-buttons/issues).