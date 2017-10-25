import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MatchEditPage } from './match-edit';
import { SharedModule } from '../../app/shared.module';

@NgModule({
  declarations: [
    MatchEditPage,
  ],
  imports: [
    IonicPageModule.forChild(MatchEditPage),
    SharedModule,
  ],
})
export class MatchEditPageModule {}
