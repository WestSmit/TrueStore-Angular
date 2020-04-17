import { Injectable } from '@angular/core';
import { Product } from '../models/product'

export class CartItem {
  product: Product;
  count: number;

  constructor(p: Product, n: number) {
    this.product = p;
    this.count = n;
  }
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems: CartItem[] = [];

  constructor() {
    let cart = JSON.parse(localStorage.getItem('Cart'));
    if(cart != null){
      this.cartItems= cart;
    }
   }

  addToCart(product) {

    if (this.cartItems.filter(a => a.product.id == product.id).length > 0) {
      this.cartItems.find(a => a.product == product).count++;
    }
    else {
      this.cartItems.push(new CartItem(product, 1));
    }
    localStorage.setItem("Cart",JSON.stringify(this.cartItems));
  }

  getItems() {
    return this.cartItems;
  }

  clearCart() {
    this.cartItems = [];
    localStorage.removeItem("Cart");    
  }

  getTotalQuantity(): number {
    var sum: number = 0;
    this.cartItems.forEach(element => {
      sum += element.count
    });
    return sum;
  }

  plusOne(id: number) {
    this.cartItems.find(p => p.product.id == id).count++;
    localStorage.setItem("Cart",JSON.stringify(this.cartItems));
  }

  minusOne(id: number) {
    if (this.cartItems.find(p => p.product.id == id).count > 1) {
      this.cartItems.find(p => p.product.id == id).count--;
    }
    localStorage.setItem("Cart",JSON.stringify(this.cartItems));
  }
  removeItem(id: number) {
    var index = this.cartItems.indexOf(this.cartItems.find(p => p.product.id == id));
    this.cartItems.splice(index, 1);
    localStorage.setItem("Cart",JSON.stringify(this.cartItems));
  }
  getTotalPrice() : number {
    var sum:number= 0;
    for (var i = 0; i < this.cartItems.length; i++) {
      sum += this.cartItems[i].product.price * this.cartItems[i].count;
    }
    return sum;
  }

}
