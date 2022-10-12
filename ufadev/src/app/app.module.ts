import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MarkDirective} from './shared/mark.directive';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BaseUrlInterceptor} from './shared/base-url.interceptor';
import { ParadigmsComponent } from './paradigms/paradigms.component';
import { ParadigmItemComponent } from './paradigms/paradigm-item/paradigm-item.component';
import {ReactiveFormsModule} from '@angular/forms';
import { CartComponent } from './cart/cart.component';
import { CartBadgeComponent } from './cart/cart-badge/cart-badge.component';

@NgModule({
  declarations: [
    AppComponent,
    MarkDirective,
    ParadigmsComponent,
    ParadigmItemComponent,
    CartComponent,
    CartBadgeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
