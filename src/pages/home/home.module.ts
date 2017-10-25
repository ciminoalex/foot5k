import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { SharedModule } from '../../app/shared.module';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    SharedModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
  
})
export class HomePageModule {}

export class ListingModel {
  populars: Array<ListingItemModel>;
  categories: Array<ListingItemModel>;
  banner_title: string;
  banner_image: string;
}

export class ListingItemModel {
  title: string;
  image: string;
}
