import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantListComponent } from './components/restaurant-list/restaurant-list.component';
import { RestaurantFormComponent } from './components/restaurant-form/restaurant-form.component';

const routes: Routes = [
  { path: 'restaurants', component: RestaurantListComponent },
  { path: 'edit/:id', component: RestaurantFormComponent },
  { path: 'add', component: RestaurantFormComponent },
  { path: '', redirectTo: '/restaurants', pathMatch: 'full' },
  { path: '**', redirectTo: '/restaurants' } // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
