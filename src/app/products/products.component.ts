import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, Params } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { CategoriesService } from '../services/categories.service';
import { CartService } from '../services/cart.service';
import { Product } from '../models/product';
import { Category } from '../models/category';
import { Subcategory } from '../models/subcategory';
import { Brand } from '../models/brand';
import { SearchParams } from '../models/searchParams';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  subcategoryId: number;
  selectedProducts: Product[] = [];
  selectedSubcategories: Subcategory[] = [];
  selectedBrands: Brand[] = [];
  public categories: Category[] = [];
  public subcategories: Subcategory[] = [];

  constructor(private activateRoute: ActivatedRoute,
    private cartService: CartService,
    private productService: ProductsService,
    private router: Router) {

  }

  ngOnInit(): void {


    this.activateRoute.queryParams.subscribe(params => {
      let setParams: SearchParams = new SearchParams();
      setParams.subcategoryId = params['subcategoryId'] ?? 0;
      setParams.searchString = params['searchString'] ?? "";
      setParams.brandId = params['brandId'] ?? 0;

      this.productService.getProducts(setParams).then(data => {
        this.selectedProducts = data.products;
        this.selectedSubcategories = data.subcategories;
        this.selectedBrands = data.brands
      });
    })



  }
  ngDoCheck() { }

  addProductToCart(product: Product) {
    this.cartService.addToCart(product);
  }
  selectCategory(subcategoryId: number) {    
    this.router.navigate(
      ['/Products'],
      {
        relativeTo: this.activateRoute,
        queryParams: {subcategoryId},
        queryParamsHandling: 'merge'
      }
    );
  }

  selectBrand(brandId: number) {
    this.router.navigate(
      ['/Products'],
      {
        relativeTo: this.activateRoute,
        queryParams: {  brandId },
        queryParamsHandling: 'merge'
      }
    );
  }
}
