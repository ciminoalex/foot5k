import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MatchViewPage } from './match-view';
import { SharedModule } from '../../app/shared.module';

@NgModule({
  declarations: [
    MatchViewPage,
  ],
  imports: [
    IonicPageModule.forChild(MatchViewPage),
    SharedModule,
  ],
})
export class MatchViewPageModule {}
