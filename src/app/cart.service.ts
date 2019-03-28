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

  addToCart(product: Product, itemNumber?: number): void {
    const numberOfItems = (itemNumber) ? itemNumber : 1;
    // Making a copy of the existing cart
    const copyofCartItems = this.copyCart(); // To copy the cart items in the object of the BehaviorSubject;
    let newCartItem = [];
    // Search if the item is already in the cart
    const matchedItem = copyofCartItems.filter(it => it.id === product.id);
    if (matchedItem.length) {
      const index = copyofCartItems.findIndex(x => x.id === product.id);
      copyofCartItems[index].item += numberOfItems;
      copyofCartItems[index].total = copyofCartItems[index].price * copyofCartItems[index].item;
      newCartItem = [...copyofCartItems];
    } else {
      // Append the product if not in the cart.
      const  productObj = {
        ...product,
        'item': numberOfItems,
        'total': product.price * numberOfItems
      };
      newCartItem = [
        ...copyofCartItems,
        productObj
      ];
    }
    this.calcTotal(newCartItem);
    this.cartItems.next(newCartItem);
  }

  removeQntyCart(product: Product) {
    const copyofCartItems = this.copyCart();
    let newCartItem = [];
    const index = copyofCartItems.findIndex(p => p.id === product.id);
    if (copyofCartItems[index].item > 1) {
      copyofCartItems[index].item -= 1;
      copyofCartItems[index].total = copyofCartItems[index].total - copyofCartItems[index].price;
      newCartItem = [...copyofCartItems];
    } else {
      /* TODO's */
      // Change item variable to quantity;
      // Remove the item from cart array if quantity is 0;
    }
    this.calcTotal(newCartItem);
    this.cartItems.next(newCartItem);
    console.log(index);
    // const newCartItem = copyofCartItems.filter(item => item.id !== product.id);
  }

  getCartItems(): Observable<Product[]> {
    return this.cartItems;
  }

  getCartTotal(): Observable<number> {
    return this.cartTotalPrice;
  }

  private calcTotal(Items: any[]) {
    let sum = 0;
    Items.forEach(item => {
      sum += item.total;
    });
    this.cartTotalPrice.next(sum);
  }

  private copyCart(): Product[] {
    let items = [];
    this.cartItems.subscribe(cartItems => items = [...cartItems]).unsubscribe();
    return items;
  }
}
