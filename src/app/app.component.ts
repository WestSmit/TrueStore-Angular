import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../app/services/categories.service'
import { CartService } from './services/cart.service';
import { LoginService } from './services/login.service';
import { User } from './models/user';
import { Notice } from './models/notice';
import { NotificationService } from './services/notification.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Category } from './models/category';
import { Subcategory } from './models/subcategory';
import { SearchResult } from './models/searchResult';
import { Product } from './models/product';
import { Router } from '@angular/router';
import { ProductsService } from './services/products.service';

interface Options {
  products: Product[];
  subcategories: Subcategory[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'TrueStore';
  categories: Category[];
  subcategories: Subcategory[];
  numberInCart: Number;
  isLoggedIn: boolean;
  notices: Notice[] = [];
  searchResult: SearchResult;

  currentUser: User;
  searchForm: FormGroup;

  options: SearchResult;
  productOptions: Product[];
  subcategoryOptions: Subcategory[];

  searchControl = new FormControl();

  constructor(
    private categoriesService: CategoriesService,
    private cartService: CartService,
    private loginService: LoginService,
    private notificationService: NotificationService,
    private productService: ProductsService,
    private router: Router
  ) {
    this.currentUser = this.loginService.user;
    this.isLoggedIn = this.loginService.loggedIn;
  }

  ngOnInit() {

    this.getCategories();
    this.searchControl.valueChanges.subscribe(async value => {
      this.options = await this.getOptions(value);
      this.productOptions = this.options.products.slice(0, 4);
      this.subcategoryOptions = this.options.subcategories.slice(0, 2)
    });

  }
  private async getOptions(value: string): Promise<SearchResult> {
    if (value == "") {
      return;
    }
    let result = await this.productService.getOptions(value);
    return result;
  }

  ngDoCheck() {
    this.numberInCart = this.cartService.getTotalQuantity();
    this.subcategories = this.categoriesService.subcategories;
    this.currentUser = this.loginService.user;
    this.isLoggedIn = this.loginService.loggedIn;    
    this.notices = this.notificationService.notifications;
  }

  getCategories() {
    this.categoriesService.getCategories().subscribe((a) => this.categories = a);
  }
  getSubcategories(id: number) {
    this.categoriesService.getSubcategories(id);
  }

  search() {
    this.router.navigate(
      ['/Products'],
      {
        queryParams: {
          'searchString': this.searchControl.value,
        }
      }
    );
  }

  logOut() {
    this.loginService.logOut();
  }

  deleteNotice(index: number) {
    this.notificationService.deleteNotice(index);
  }

  showMenu() { this.categoriesService.showMenu() }
  hideMenu() { this.categoriesService.hideMenu() }
}
