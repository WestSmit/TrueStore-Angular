import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Order } from "../models/order";
import { environment } from "src/environments/environment";
import { ProductsService } from "./products.service";
import { BaseModel } from "../models/baseModel";
import { LoginService } from "./login.service";

@Injectable({
  providedIn: "root",
})
export class OrderService {
  constructor(
    private http: HttpClient,
    private productService: ProductsService,
    private loginService: LoginService
  ) {}

  async createOrder(order: Order): Promise<number> {
    if (this.loginService.loggedIn == true) {
      let headers = new HttpHeaders({ "Content-Type": "application/json" });
      let httpOptions = {
        headers: headers,
      };
      return await this.http
        .post<number>(
          `${environment.apiUrl}Order/CreateOrder`,
          order,
          httpOptions
        )
        .toPromise();
    }
  }

  async getUserOrders(): Promise<Order[]> {
    let httpParams = new HttpParams();
    let httpOptions = {
      params: httpParams,
    };

    let orders = await this.http
      .get<Order[]>(`${environment.apiUrl}Order/GetUserOrders`, httpOptions)
      .toPromise();
    orders.forEach((order) => {
      order.items.forEach(async (item) => {
        item.product = await this.productService.getProductById(item.productId);
      });
    });
    return orders;
  }

  async getUserOrder(orderId: number): Promise<Order> {
    var order = await this.http
      .get<Order>(`${environment.apiUrl}Order/GetUserOrder/${orderId}`)
      .toPromise();
    order.items.forEach(async (item) => {
      item.product = await this.productService.getProductById(item.productId);
    });
    return order;
  }

  async deleteUserOrder(orderId: number): Promise<void> {
    await this.http
      .post(`${environment.apiUrl}Order/DeleteUserOrder`, orderId)
      .toPromise();
  }

  async paymentOrder(orderId: number): Promise<BaseModel> {
    return await this.http
      .post<BaseModel>(`${environment.apiUrl}Order/OrderPayment`, orderId)
      .toPromise();
  }

  async confirmOrder(orderId: number): Promise<void> {
    await this.http
      .post(`${environment.apiUrl}Order/ConfirmDelivery`, orderId)
      .toPromise();
  }
}
