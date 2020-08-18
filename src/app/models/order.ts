import { OrderItem } from './orderItem'
export class Order {
  public id: number;
  public status: string;
  public userId: string;
  public date: string = '';
  public totalCost: number;
  public items: OrderItem[] =[];
}