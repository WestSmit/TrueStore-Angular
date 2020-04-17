import { Output, Component, OnInit, EventEmitter } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { AppComponent } from '../app.component';
import { Subscriber } from 'rxjs';
import { Category } from '../models/category';
import { Subcategory } from '../models/subcategory';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  categories: Category[] = [];
  subcategories: Subcategory[] = [];
  constructor(private categoriesService: CategoriesService) {
  }


  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe((a) => this.categories = a);

    
  }

  ngDoCheck(){     
    this.subcategories = this.categoriesService.subcategories;
  }

  getSubcategories(id: number) {
    this.categoriesService.getSubcategories(id);
  }
  
  showMenu(){this.categoriesService.showMenu()}
  hideMenu(){this.categoriesService.hideMenu()}



}
