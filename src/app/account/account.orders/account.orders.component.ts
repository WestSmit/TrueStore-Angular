import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accountOrders',
  templateUrl: './account.orders.component.html',
  styleUrls: ['./account.orders.component.css']
})
export class AccountOrdersComponent implements OnInit {

  constructor(private orderService:OrderService, private router:Router, private productService:ProductsService) { }

  userOrders:Order[]=[];

  async ngOnInit():Promise<void> {
    this.userOrders = await this.orderService.getUserOrders();
    
  }

  async getProduct(id:number):Promise<Product>{
    return await this.productService.getProductById(id);
  }

  async deleteOrder(orderId:number){
    await this.orderService.deleteUserOrder(orderId);
    this.userOrders = await this.orderService.getUserOrders();    
  }

  async confirmDelivery(orderId:number){
    await this.orderService.confirmOrder(orderId);
    this.userOrders = await this.orderService.getUserOrders();
  }

}
