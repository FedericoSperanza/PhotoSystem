import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import {PhotoGridComponent} from '../app/PhotoGrid/PhotoGrid.component';
const routes: Routes = [
  { path: 'PhotoGrid', component: PhotoGridComponent },
  {path: '', component: PhotoGridComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
