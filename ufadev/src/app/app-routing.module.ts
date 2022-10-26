import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ParadigmsComponent} from './paradigms/paradigms.component';

const routes: Routes = [
  { path: '', component: ParadigmsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
