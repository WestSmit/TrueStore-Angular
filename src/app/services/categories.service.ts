import { Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Subcategory } from '../models/subcategory';
import { Category } from '../models/category';

declare var $: any;

@Injectable({ providedIn: "root" })
export class CategoriesService {

  public subcategories: Subcategory[] = [];

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.apiUrl}Product/GetCategories`);
  }
  getSubcategories(id: number) {
    this.http.get<Subcategory[]>(`${environment.apiUrl}Product/GetSubcategories/${id}`).subscribe(a => this.subcategories = a);
  }

  showMenu() {
    var modal = document.getElementById("myModal");
    
    modal.style.paddingTop = (148 - window.scrollY) + "px";
    document.body.style.overflow = 'hidden';
    
    var menu = document.getElementById("categoriesMenu");
    var btn = document.getElementById("categoriesButton");

    modal.style.display = "block";

    if (menu.hidden == false) {

      menu.style.position = "Absolute";
      menu.style.width = "100%";
      menu.style.zIndex = "3";
      menu.style.display = "block";

      btn.style.position = "Absolute";
      btn.style.width = "100%";
      btn.style.zIndex = "3";
    }
  }

  hideMenu() {
    document.body.style.overflow = 'auto';

    var modal = document.getElementById("myModal");
    var menu = document.getElementById("categoriesMenu");
    var btn = document.getElementById("categoriesButton");

    modal.style.display = "none";
    menu.style.position = "static";
    btn.style.position = "static";
  }

}