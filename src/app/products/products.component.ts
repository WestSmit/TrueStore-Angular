import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { CategoriesService } from '../services/categories.service';
import { CartService } from '../services/cart.service';
import { Product } from '../models/product';
import { Category } from '../models/category';
import { Subcategory } from '../models/subcategory';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  subcategoryId: number;
  selectedProducts: Product[] = [];
  public categories: Category[] = [];
  public subcategories: Subcategory[] = [];

  constructor(private activateRoute: ActivatedRoute,
    private cartService: CartService,
    private searchService: SearchService) {

  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      let subcategoryId = params['subcategoryId'] ?? 0;
      let searchString;
      this.activateRoute.queryParams.subscribe(params=>{searchString = params['searchString'] ?? ""})

      this.searchService.search(searchString, subcategoryId).then(data => this.selectedProducts = data.products);
      console.log(this.selectedProducts)
    });
  }
  ngDoCheck() { }

  addProductToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
