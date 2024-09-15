import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from '../components/product-list/product-list.component'; 
import { ProductFormComponent } from '../components/product-form/product-form.component';

const routes: Routes = [
  { path: 'products', component: ProductListComponent },
  { path: 'create-product', component: ProductFormComponent },
  { path: 'test', component: ProductListComponent }, // Test route
  { path: '', redirectTo: '/products', pathMatch: 'full' }, // Default route
  { path: '**', redirectTo: '/products', pathMatch: 'full' }  // Catch-all route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
