import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryComponent } from '@presentation/inventory/inventory.component';

const routes: Routes = [
  {
    path: '',
    component: InventoryComponent,
  },
  {
    path: ':categoryId',
    component: InventoryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventoryRoutingModule {}
