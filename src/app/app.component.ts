import { CartService } from './cart.service';
import { Component, OnInit } from '@angular/core';
import { Product } from './product.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  products: Product[] = [
    {
      'id': 1,
      'name': 'Product 1',
      'price': 100
    },
    {
      'id': 2,
      'name': 'Product 2',
      'price': 80
    },
    {
      'id': 3,
      'name': 'Product 3',
      'price': 20
    },
    {
      'id': 4,
      'name': 'Product 4',
      'price': 110
    },
    {
      'id': 5,
      'name': 'Product 5',
      'price': 30
    }
  ];
  cartItems = [];
  cartTotal = 0;
  constructor(private cart: CartService) { }

  addItemToCart(product: Product) {
    this.cart.addToCart(product); // Here 1 item will be added in the cart as default.
    /**
     * Number of items can also be passed as second argument
     */
    // this.cart.addToCart(product, 2); // Here 2 items will be added
  }

  removeItemCart(product: Product) {
    this.cart.removeQntyCart(product);
  }

  ngOnInit() {
    this.cart.getCartItems().subscribe(item => {
      this.cartItems = item;
    });
    this.cart.getCartTotal().subscribe(sum => {
      this.cartTotal = sum;
    });
  }
}
