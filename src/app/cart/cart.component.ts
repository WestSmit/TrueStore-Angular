import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../services/cart.service';
import { OrderItem } from '../models/orderItem';
import { Order } from '../models/order';
import { LoginService } from '../services/login.service';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items:CartItem[] = [];
  totalPrice:number = 0;
  isLoggedIn:boolean = false;

  
  constructor(private cartService:CartService, private loginService:LoginService, private orderService:OrderService, private router:Router) { }
  
  ngOnInit(): void {
   this.items = this.cartService.getItems();  
   this.isLoggedIn = this.loginService.loggedIn;
  }
  ngDoCheck(){
    
   this.isLoggedIn = this.loginService.loggedIn;
    this.totalPrice = this.cartService.getTotalPrice();
  }
  plusOne(id:number){
    this.cartService.plusOne(id);
  }
  minusOne(id:number){
    this.cartService.minusOne(id);
  }
  removeItem(id:number){
    this.cartService.removeItem(id);
  }
  
  async createOrder(){
    let orderItems:OrderItem[] = [];
    this.items.forEach(item=>{
      let orderItem:OrderItem = new OrderItem();      
      orderItem.productId = item.product.id;
      orderItem.count = item.count;
      orderItems.push(orderItem);
    })
    let order:Order = new Order();;
    order.items = orderItems;
    order.userId = this.loginService.user.id;

    let orderId = await this.orderService.createOrder(order);
    this.cartService.clearCart();
    await this.router.navigate(['Order',orderId],{});    
  }


}
