import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MatchAllPage } from './match-all';
import { SharedModule } from '../../app/shared.module';

@NgModule({
  declarations: [
    MatchAllPage,
  ],
  imports: [
    IonicPageModule.forChild(MatchAllPage),
    SharedModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class MatchAllPageModule {}
