import { Product } from "./product";

export class OrderItem {
  public id: number;
  public amount: number;
  public currency: string;
  public productId: number;
  public orderId: number;
  public count: number;
  public product: Product;
}
