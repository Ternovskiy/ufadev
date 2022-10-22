import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MarkDirective} from './shared/mark.directive';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BaseUrlInterceptor} from './shared/base-url.interceptor';
import { ParadigmsComponent } from './paradigms/paradigms.component';
import { ParadigmItemComponent } from './paradigms/paradigm-item/paradigm-item.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MarkDirective,
    ParadigmsComponent,
    ParadigmItemComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule
    ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
