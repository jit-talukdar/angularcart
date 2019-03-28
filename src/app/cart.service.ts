import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from './product.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartTotalPrice = new BehaviorSubject(0);
  private cartItems = new BehaviorSubject([]);

  constructor() { }

  /**
   * @param1 : Product Object
   * @param2 : Quantity (Optional) Default 1
   * this.cart.addToCart(product, 2);
   */
  addToCart(product: Product, itemNumber?: number): void {
    const numberOfItems = (itemNumber) ? itemNumber : 1;
    // Making a copy of the existing cart
    const copyofCartItems = [...this.cartItems.getValue()]; // To copy the cart items in the object of the BehaviorSubject;
    let newCartItem = [];
    // Search if the item is already in the cart
    const matchedItem = copyofCartItems.filter(it => it.id === product.id);
    if (matchedItem.length) {
      const index = copyofCartItems.findIndex(x => x.id === product.id);
      copyofCartItems[index].qty += numberOfItems;
      copyofCartItems[index].total = copyofCartItems[index].price * copyofCartItems[index].qty;
      newCartItem = [...copyofCartItems];
    } else {
      // Append the product if not in the cart.
      const  productObj = {
        ...product,
        'qty': numberOfItems,
        'total': product.price * numberOfItems
      };
      newCartItem = [
        ...copyofCartItems,
        productObj
      ];
    }
    this.updateNetTotal(newCartItem);
    this.cartItems.next(newCartItem);
  }

  removeFromCart(product: Product): void {
    const copyofCartItems = [...this.cartItems.getValue()];
    let newCartItem = [];
    const index = copyofCartItems.findIndex(p => p.id === product.id);
    if (copyofCartItems[index].qty > 1) {
      copyofCartItems[index].qty -= 1;
      copyofCartItems[index].total = copyofCartItems[index].total - copyofCartItems[index].price;
      newCartItem = [...copyofCartItems];
    } else {
      const filteredObj = copyofCartItems.filter(item => item.id !== product.id);
      newCartItem = [...filteredObj];
    }
    this.updateNetTotal(newCartItem);
    this.cartItems.next(newCartItem);
    // const newCartItem = copyofCartItems.filter(item => item.id !== product.id);
  }

  getCartItems(): Observable<Product[]> {
    return this.cartItems;
  }

  getCartTotal(): Observable<number> {
    return this.cartTotalPrice;
  }

  doEmptyCart(): void {
    this.updateNetTotal([]);
    this.cartItems.next([]);
  }

  private updateNetTotal(Items: any[]) {
    let sum = 0;
    Items.forEach(item => {
      sum += item.total;
    });
    this.cartTotalPrice.next(sum);
  }
}
