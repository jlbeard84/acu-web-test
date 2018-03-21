import { Component, OnInit } from '@angular/core';

import { AppService } from './app.service';
import { AppLocation, Category, Results } from '../models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public title = 'app';
  public hasLoaded = false;

  public categories: Category[] = [];
  public selectedCategory: Category = null;
  public selectedLocations: AppLocation[] = [];
  public selectedSingleLocation: AppLocation = null;

  private locations: AppLocation[] = [];

  constructor(
    private appService: AppService) {
  }

  public ngOnInit(): void {
    this.appService.getLocations().subscribe((appLocationResults: Results) => {

      const retrievedLocations = appLocationResults.results;

      if (retrievedLocations) {
        this.locations.push(...retrievedLocations);
      }

      this.extractCategories();

      this.hasLoaded = true;
    });
  }

  public handleCategory(type: string) {

    this.selectedLocations = [];
    this.selectedSingleLocation = null;

    for (let i = 0; i < this.locations.length; i++) {
      if (this.locations[i].types.indexOf(type) > -1) {
        this.selectedLocations.push(this.locations[i]);
      }
    }

    this.selectedLocations = this.selectedLocations.sort((left, right) => {
      return left.name.localeCompare(right.name);
    });

    for (let i = 0; i < this.categories.length; i++) {
      if (this.categories[i].type === type) {
        this.selectedCategory = this.categories[i];
        break;
      }
    }
  }

  public handleLocationSelection(location: AppLocation) {
    this.selectedSingleLocation = location;
  }

  private extractCategories(): void {

    const rawCategories: string[] = [];

    for (let i = 0; i < this.locations.length; i++) {
      rawCategories.push(...this.locations[i].types);
    }

    const uniqueCategories = rawCategories
      .filter((val, i, arr) => {
        return arr.indexOf(val) === i;
      })
      .sort();

    uniqueCategories.forEach(element => {

      const category = new Category();
      category.type = element;
      category.name = this.createTitleCase(element);

      this.categories.push(category);
    });
  }

  private createTitleCase(lowerString: string) {
    return lowerString.replace(/_/g, ' ').replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
}
