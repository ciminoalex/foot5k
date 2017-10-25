import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WalkthroughPage } from './walkthrough';
import { SharedModule } from '../../app/shared.module';

@NgModule({
  declarations: [
    WalkthroughPage,
  ],
  imports: [
    IonicPageModule.forChild(WalkthroughPage),
    SharedModule,
  ],
})
export class WalkthroughPageModule {}
