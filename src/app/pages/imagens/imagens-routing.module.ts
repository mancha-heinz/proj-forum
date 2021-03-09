import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImagensPage } from './imagens.page';

const routes: Routes = [
  {
    path: '',
    component: ImagensPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImagensPageRoutingModule {}
