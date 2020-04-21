import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Product} from '../models/product';
import { environment } from 'src/environments/environment';
import { SearchResult } from '../models/searchResult';
import { SearchParams } from '../models/searchParams';



@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { 
  }

  getProductById(id:number):Promise<Product>{
    return this.http.get<Product>(`${environment.apiUrl}Product/GetProduct/${id}`).toPromise()
  }
  
  async getOptions(searchString: string): Promise<SearchResult> {
    let params = new HttpParams().set("searchString", searchString).set("subcategoryId", "0");
    let httpOptions = {
      params: params
    }
    let result = await this.http.get<SearchResult>(`${environment.apiUrl}Product/GetSearchOptions`, httpOptions).toPromise();    
    return result;
  }

  async getProducts(setParams:SearchParams){
    
    let params = new HttpParams()
    .set("searchString", setParams.searchString)
    .set("subcategoryId", setParams.subcategoryId.toString())
    .set("brandId", setParams.brandId.toString());

    let httpOptions = { params: params }

    let result = await this.http.get<SearchResult>(`${environment.apiUrl}Product/GetProducts`, httpOptions).toPromise();    
    return result;
  }
}
