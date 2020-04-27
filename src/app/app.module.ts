import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './services/login.service';
import { ParamInterceptor } from './api.interceptor';
import { AccountComponent } from './account/account.component';
import { OrderComponent } from './order/order.component';
import { AccountDetailsComponent } from './account/account.details/account.details.component';
import { AccountOrdersComponent } from './account/account.orders/account.orders.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';



const accountRoutes: Routes = [
  { path: 'Details', component: AccountDetailsComponent },
  { path: 'Orders', component: AccountOrdersComponent }
];
const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Home', component: HomeComponent },
  { path: 'Products', component: ProductsComponent },
  { path: 'Cart', component: CartComponent },
  { path: 'MyAccount', component: AccountComponent, children: accountRoutes },
  { path: 'Order/:orderId', component: OrderComponent,}
];

const matmodules = [  
  MatAutocompleteModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  MatSelectModule
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    CartComponent,
    LoginComponent,
    AccountComponent,
    OrderComponent,
    AccountDetailsComponent,
    AccountOrdersComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    matmodules
  ],
  providers: [
    LoginService, {
      provide: HTTP_INTERCEPTORS,
      useClass: ParamInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
