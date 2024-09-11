import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestaurantMockService } from '../../services/restaurant.service';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent implements OnInit {
  restaurants: any = [];
  searchTerm = '';
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private restaurantService: RestaurantMockService, private router: Router) { }

  ngOnInit(): void {
    this.loadRestaurants();
  }

  async loadRestaurants() {
    try {
      this.restaurants = await this.restaurantService.getRestaurants();
    } catch (error) {
      this.errorMessage = 'Failed to load restaurants. Please try again.';
    }
  }

  async deleteRestaurant(id: string) {
    try {
      await this.restaurantService.deleteRestaurant(id);
      this.restaurants = this.restaurants.filter((r: any) => r.id !== id);
      this.successMessage = 'Restaurant deleted successfully.';
    } catch (error) {
      this.errorMessage = 'Failed to delete restaurant. Please try again.';
    }
  }

  filteredRestaurants() {
    if (!this.searchTerm) {
      return this.restaurants;
    }
    return this.restaurants.filter((restaurant: any) =>
      restaurant.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
