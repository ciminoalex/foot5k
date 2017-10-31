import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MatchDetailsPage } from './match-details';
import { SharedModule } from '../../app/shared.module';

@NgModule({
  declarations: [
    MatchDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(MatchDetailsPage),
    SharedModule,
  ],
})
export class MatchDetailsPageModule {}
