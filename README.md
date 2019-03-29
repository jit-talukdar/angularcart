# Cart Application with Angular 7

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.6.

## Initialize & Deploy
Clone and cd into this repo and Run 
```bash
$ npm install
$ ng serve -o
```
## Code scaffolding
```
addToCart(@param1: ProductObject, @param2: number(Optional)) | removeItemCart(@paramItemObject) | doEmptyCart()
```

#### Observable return types
`getCartItems() | getCartTotalPrice()`

## Snippets`
```typescript
constructor(private cart: CartService) { }

addCart() {
/**
 * @param1 : Product Object
 * @param2 : Quantity (Optional) Default 1
 * this.cart.addToCart(product, 2);
 */
  this.cart.addToCart(product);
}

removeItemCart() {
  this.cart.removeFromCart(product);
}

emptyCart() {
  this.cart.doEmptyCart();
}
```
