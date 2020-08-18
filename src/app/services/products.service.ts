import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Product } from "../models/product";
import { environment } from "src/environments/environment";
import { SearchResult } from "../models/searchResult";
import { ParamMap } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProductById(id: number): Promise<Product> {
    return this.http
      .get<Product>(`${environment.apiUrl}Product/GetProduct/${id}`)
      .toPromise();
  }

  async getOptions(searchString: string): Promise<SearchResult> {
    let params = new HttpParams()
      .set("searchString", searchString)
      .set("subcategoryId", "0");
    let httpOptions = {
      params: params,
    };
    let result = await this.http
      .get<SearchResult>(
        `${environment.apiUrl}Product/GetSearchOptions`,
        httpOptions
      )
      .toPromise();
    return result;
  }

  async getProducts(setParams: ParamMap): Promise<SearchResult> {
    let params = new HttpParams();
    for (let i = 0; i < setParams.keys.length; i++) {
      if (
        setParams.get(setParams.keys[i]) == "" ||
        setParams.get(setParams.keys[i]) == null
      ) {
        continue;
      }
      params = params.set(setParams.keys[i], setParams.get(setParams.keys[i]));
    }
    if (params.keys().length == 0) {
      return;
    }
    let httpOptions = { params: params };

    let result = await this.http
      .get<SearchResult>(
        `${environment.apiUrl}Product/GetProducts`,
        httpOptions
      )
      .toPromise();
    return result;
  }
}
