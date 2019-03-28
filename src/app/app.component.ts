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
    this.cart.addToCart(product);
  }

  removeItemCart(product: Product) {
    this.cart.removeFromCart(product);
  }

  emptyCart() {
    this.cart.doEmptyCart();
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
