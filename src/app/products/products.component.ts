import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { ProductsService } from '../services/products.service';
import { CartService } from '../services/cart.service';
import { Product } from '../models/product';
import { Category } from '../models/category';
import { Subcategory } from '../models/subcategory';
import { CheckboxItem } from '../models/checkBoxItem';
import { FormControl, FormGroup} from '@angular/forms';
import { SearchResult } from '../models/searchResult';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  searchResult = new SearchResult();
  filterBrandOptions = new Array<CheckboxItem>();
  sortControl = new FormControl();
  priceSlider = new FormGroup(
    {
      lower: new FormControl(),
      upper: new FormControl()
    }
  );
  priceRangeInput = new FormGroup(
    {
      lower: new FormControl(),
      upper: new FormControl()
    }
  );
  constructor(private activateRoute: ActivatedRoute,
    private cartService: CartService,
    private productService: ProductsService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.activateRoute.queryParamMap.subscribe(params => {
      this.productService.getProducts(params).then(data => {
        this.searchResult = data;
        this.filterBrandOptions = this.searchResult.brands
          .map(x => new CheckboxItem(x.id, x.name, this.searchResult.selectedBrands?.includes(x.id)));
        this.priceSlider.controls.lower.setValue(this.searchResult.setMinPrice);
        this.priceSlider.controls.upper.setValue(this.searchResult.setMaxPrice);
      });
    });

    this.priceSlider.valueChanges.subscribe(() => this.priceSliderChanged());
    this.sortControl.valueChanges.subscribe(() => this.sortOptionsChanged(this.sortControl.value));
  }

  addProductToCart(product: Product) {
    this.cartService.addToCart(product);
  }
  selectCategory(subcategoryId: number) {
    this.router.navigate(
      ['/Products'],
      {
        relativeTo: this.activateRoute,
        queryParams: { subcategoryId },
        queryParamsHandling: 'merge'
      }
    );
  }
  brandsChanged() {
    let selected = this.filterBrandOptions.filter(x => x.checked == true).map(x => x.value);
    let brands = selected.join(';');
    if (brands == "") {
      brands = null;
    }
    this.router.navigate(
      ['/Products'],
      {
        relativeTo: this.activateRoute,
        queryParams: { brands },
        queryParamsHandling: 'merge'
      }
    );
  }
  sortOptionsChanged(sort: string) {
    if(sort=="default"){
      sort=null;
    }
    this.router.navigate(
      ['/Products'],
      {
        relativeTo: this.activateRoute,
        queryParams: { sort },
        queryParamsHandling: 'merge'
      }
    );
  }
  priceSliderChanged() {
    let lowerValue: number = this.priceSlider.controls.lower.value;
    let upperValue: number = this.priceSlider.controls.upper.value;
    if (lowerValue > upperValue - 20) {
      upperValue = lowerValue + 20;
      this.priceSlider.controls.upper.setValue(upperValue);
    }
    this.priceRangeInput.controls.lower.setValue(lowerValue);
    this.priceRangeInput.controls.upper.setValue(upperValue);
  }
  priceRangeInputChanged() {
    let lowerValue: number = this.priceRangeInput.controls.lower.value;
    let upperValue: number = this.priceRangeInput.controls.upper.value;
    if (lowerValue > upperValue - 20) {
      upperValue = lowerValue + 20;
      this.priceRangeInput.controls.upper.setValue(upperValue);
    }
    this.priceSlider.controls.lower.setValue(lowerValue);
    this.priceSlider.controls.upper.setValue(upperValue);
  }
  setMinMaxPrice() {
    let minPrice: number = this.priceRangeInput.controls.lower.value;
    let maxPrice: number = this.priceRangeInput.controls.upper.value;
    this.router.navigate(
      ['/Products'],
      {
        relativeTo: this.activateRoute,
        queryParams: { minPrice, maxPrice },
        queryParamsHandling: 'merge'
      });
  }
  resetFilters(){
    this.router.navigate(
      ['/Products'],
      {
        relativeTo: this.activateRoute,
        queryParams: { 
          minPrice:null,
          maxPrice:null,
          sort:null,
          brands:null
        },
        queryParamsHandling: 'merge'
      });
  }
}
