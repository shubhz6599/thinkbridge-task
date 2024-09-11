import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RestaurantMockService } from '../../services/restaurant.service';

@Component({
  selector: 'app-restaurant-form',
  templateUrl: './restaurant-form.component.html',
})
export class RestaurantFormComponent implements OnInit {
  restaurantForm: FormGroup;
  isEditMode: boolean = false;
  restaurantId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private restaurantService: RestaurantMockService,
    private snackBar: MatSnackBar
  ) {
    this.restaurantForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
    });
  }

  async ngOnInit() {
    this.restaurantId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.restaurantId;

    if (this.isEditMode && this.restaurantId) {
      try {
        const restaurants = await this.restaurantService.getRestaurants();
        const restaurant = restaurants.find((r) => r.id === this.restaurantId);
        if (restaurant) {
          this.restaurantForm.patchValue(restaurant);
        }
      } catch (error) {
        console.error('Error fetching restaurant details:', error);
        this.snackBar.open('Failed to load restaurant details.', 'Close', { duration: 3000 });
      }
    }
  }

  async onSubmit() {
    if (this.restaurantForm.invalid) {
      this.snackBar.open('Please fill out all required fields.', 'Close', { duration: 3000 });
      return;
    }

    try {
      if (this.isEditMode && this.restaurantId) {
        await this.restaurantService.updateRestaurant(this.restaurantId, this.restaurantForm.value);
        this.snackBar.open('Restaurant updated successfully!', 'Close', { duration: 3000 });
      } else {
        await this.restaurantService.addRestaurant(this.restaurantForm.value);
        this.snackBar.open('Restaurant added successfully!', 'Close', { duration: 3000 });
      }
      this.router.navigate(['/restaurants']);
    } catch (error) {
      console.error('Error:', error);
      this.snackBar.open('An error occurred. Please try again.', 'Close', { duration: 3000 });
    }
  }
}
