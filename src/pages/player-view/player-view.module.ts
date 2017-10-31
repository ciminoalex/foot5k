import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlayerViewPage } from './player-view';

@NgModule({
  declarations: [
    PlayerViewPage,
  ],
  imports: [
    IonicPageModule.forChild(PlayerViewPage),
  ],
})
export class PlayerViewPageModule {}
