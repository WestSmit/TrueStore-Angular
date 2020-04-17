import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SearchResult } from '../models/searchResult';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

   async search(searchString: string, subcategoryId: number): Promise<SearchResult> {
    let params = new HttpParams().set("searchString", searchString).set("subcategoryId", subcategoryId.toString());
    let httpOptions = {
      params: params
    }
    let result = await this.http.get<SearchResult>(`${environment.apiUrl}Product/Search`, httpOptions).toPromise();    
    return result;
  }
}


