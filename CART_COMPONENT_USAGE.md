# ipay-button-cart Component Usage

The `ipay-button-cart` component allows you to send multiple cart items (1-100) to the iPay application along with customer information and delivery details.

## Attributes

### Standard Attributes
- `id` - Partner ID
- `name` - Customer name
- `email` - Customer email
- `phone` - Customer phone
- `delivery_price` - Delivery price
- `product_id` - Product ID (optional)

### Cart Items Attribute
- `cart-items` - **JSON string** containing an array of cart items

Each cart item in the array should have:
- `url` - Product URL (required)
- `price` - Product price (required)
- `count` - Quantity (required)
- `product_id` - Product ID (optional, per item)

## Usage Examples

### HTML Example

```html
<ipay-button-cart
  id="PARTNER-12345"
  name="Jan Kowalski"
  email="jan@example.com"
  phone="+48123456789"
  delivery_price="15.99"
  product_id="MAIN-PRODUCT-001"
  cart-items='[
    {
      "url": "https://example.com/product/1",
      "price": "299.99",
      "count": "2",
      "product_id": "PROD-001"
    },
    {
      "url": "https://example.com/product/2",
      "price": "149.99",
      "count": "1",
      "product_id": "PROD-002"
    },
    {
      "url": "https://example.com/product/3",
      "price": "89.99",
      "count": "3"
    }
  ]'
></ipay-button-cart>
```

### JavaScript Example

```javascript
// Prepare cart items
const cartItems = [
  {
    url: 'https://example.com/product/1',
    price: '299.99',
    count: '2',
    product_id: 'PROD-001'
  },
  {
    url: 'https://example.com/product/2',
    price: '149.99',
    count: '1',
    product_id: 'PROD-002'
  }
];

// Create component
const button = document.createElement('ipay-button-cart');
button.setAttribute('id', 'PARTNER-12345');
button.setAttribute('name', 'Jan Kowalski');
button.setAttribute('email', 'jan@example.com');
button.setAttribute('phone', '+48123456789');
button.setAttribute('delivery_price', '15.99');
button.setAttribute('cart-items', JSON.stringify(cartItems));

document.body.appendChild(button);
```

### React Example

```jsx
import 'ipay-buttons';

function CartButton() {
  const cartItems = [
    {
      url: 'https://example.com/product/1',
      price: '299.99',
      count: '2',
      product_id: 'PROD-001'
    },
    {
      url: 'https://example.com/product/2',
      price: '149.99',
      count: '1',
      product_id: 'PROD-002'
    }
  ];

  return (
    <ipay-button-cart
      id="PARTNER-12345"
      name="Jan Kowalski"
      email="jan@example.com"
      phone="+48123456789"
      delivery_price="15.99"
      cart-items={JSON.stringify(cartItems)}
    />
  );
}
```

### Vue Example

```vue
<template>
  <ipay-button-cart
    :id="partnerId"
    :name="customerName"
    :email="customerEmail"
    :phone="customerPhone"
    :delivery_price="deliveryPrice"
    :cart-items="cartItemsJson"
  />
</template>

<script setup>
import { computed } from 'vue';
import 'ipay-buttons';

const partnerId = 'PARTNER-12345';
const customerName = 'Jan Kowalski';
const customerEmail = 'jan@example.com';
const customerPhone = '+48123456789';
const deliveryPrice = '15.99';

const cartItems = [
  {
    url: 'https://example.com/product/1',
    price: '299.99',
    count: '2',
    product_id: 'PROD-001'
  },
  {
    url: 'https://example.com/product/2',
    price: '149.99',
    count: '1',
    product_id: 'PROD-002'
  }
];

const cartItemsJson = computed(() => JSON.stringify(cartItems));
</script>
```

## URL Parameters Format

The component sends data in the following format:

```
https://app.ipay-dev.host06.300devs.com/new-individual-application?
  id=PARTNER-12345&
  name=Jan+Kowalski&
  email=jan%40example.com&
  phone=%2B48123456789&
  delivery_price=15.99&
  product_id=MAIN-PRODUCT-001&
  items[0][url]=https%3A%2F%2Fexample.com%2Fproduct%2F1&
  items[0][price]=299.99&
  items[0][count]=2&
  items[0][product_id]=PROD-001&
  items[1][url]=https%3A%2F%2Fexample.com%2Fproduct%2F2&
  items[1][price]=149.99&
  items[1][count]=1&
  items[1][product_id]=PROD-002&
  items_count=2
```

## Notes

- The `cart-items` attribute must be a valid JSON string
- Cart items array can contain 1 to 100 items
- Each item must have `url`, `price`, and `count`
- `product_id` is optional for individual items
- The component validates the JSON and logs warnings/errors to console if invalid
- If no cart items are provided, the component will not navigate (logs warning)

## Error Handling

The component includes error handling:
- Invalid JSON in `cart-items` will log an error and use an empty array
- Non-array values will log a warning and use an empty array
- Missing cart items will log a warning and prevent navigation

