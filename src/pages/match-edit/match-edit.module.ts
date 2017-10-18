import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MatchEditPage } from './match-edit';

@NgModule({
  declarations: [
    MatchEditPage,
  ],
  imports: [
    IonicPageModule.forChild(MatchEditPage),
  ],
})
export class MatchEditPageModule {}
