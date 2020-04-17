import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Product} from '../models/product';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { 
  }

  getProductByCategory(subcategoryId:number): Observable<Product[]>{
    return this.http.get<Product[]>(`${environment.apiUrl}Product/GetProductsBySubcategory/${subcategoryId}`)
  }
  getProductById(id:number):Promise<Product>{
    return this.http.get<Product>(`${environment.apiUrl}Product/GetProduct/${id}`).toPromise()
  }

}
