import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ParadigmsComponent} from './paradigms/paradigms.component';
import {CartComponent} from './cart/cart.component';

const routes: Routes = [
  { path: '', component: ParadigmsComponent, title: 'Ufadev'},
  { path: 'cart', component: CartComponent, title: 'Cart'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
