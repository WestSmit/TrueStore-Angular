import { Component, OnInit } from '@angular/core';
import { Order } from '../models/order';
import { OrderService } from '../services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { LoginService } from '../services/login.service';
import { BaseModel } from '../models/baseModel';
import { OrderItem } from '../models/orderItem';
import { Route } from '@angular/compiler/src/core';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  order: Order = new Order();
  orderId: number;
  isloaded: boolean = false;
  user: User;
  result: BaseModel = new BaseModel();
  timer: number = 5;

  constructor(private orderService: OrderService,
    private activateRoute: ActivatedRoute,
    private loginService: LoginService,
    private router: Router,
    private noticeService: NotificationService) {
  }


  ngOnInit(): void {
    this.result.successed = false;
    this.result.message = '';
    this.order.items = [];

    this.orderId = this.activateRoute.snapshot.params['orderId'];
    this.orderService.getUserOrder(this.orderId).then(date => { this.order = date });
    this.user = this.loginService.user;
    this.isloaded = true;
  }

  async paymentOrder(orderId: number): Promise<void> {
    this.result = await this.orderService.paymentOrder(orderId);
    let timerId = setInterval(() => { this.timer-- }, 1000);
    this.noticeService.addNotice("You have bought some items. Would you like to check the status","/MyAccount/Orders", "click");

    setTimeout(() => { clearInterval(timerId); this.router.navigate(['/MyAccount/Orders']) }, 5000);
  }



}
