import { Injectable } from '@angular/core';

interface Restaurant {
  id: string;
  name: string;
  description: string;
  location: string;
}

@Injectable({
  providedIn: 'root',
})
export class RestaurantMockService {
  private restaurants: Restaurant[] = [
    { id: '1', name: 'The Spicy Chef', description: 'Spicy and delicious food', location: 'Downtown' },
    { id: '2', name: 'Green Garden', description: 'Healthy and green meals', location: 'Uptown' },
    { id: '3', name: 'Ocean Breeze', description: 'Seafood and beach vibe', location: 'Seaside' },
  ];

  async getRestaurants(): Promise<Restaurant[]> {
    return this.restaurants;
  }

  async addRestaurant(restaurant: Restaurant): Promise<void> {
    restaurant.id = (this.restaurants.length + 1).toString(); // Generate new ID
    this.restaurants.push(restaurant);
  }

  async updateRestaurant(id: string, updatedRestaurant: Restaurant): Promise<void> {
    const index = this.restaurants.findIndex((r) => r.id === id);
    if (index !== -1) {
      this.restaurants[index] = { ...updatedRestaurant, id }; // Ensure ID is unchanged
    } else {
      throw new Error('Restaurant not found.');
    }
  }

  async deleteRestaurant(id: string): Promise<void> {
    this.restaurants = this.restaurants.filter((restaurant) => restaurant.id !== id);
  }
}
