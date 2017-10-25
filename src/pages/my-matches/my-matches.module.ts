import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyMatchesPage } from './my-matches';
import { SharedModule } from '../../app/shared.module';

@NgModule({
  declarations: [
    MyMatchesPage,
  ],
  imports: [
    IonicPageModule.forChild(MyMatchesPage),
    SharedModule,
  ],
})
export class MyMatchesPageModule {}
