import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GroupViewPage } from './group-view';

@NgModule({
  declarations: [
    GroupViewPage,
  ],
  imports: [
    IonicPageModule.forChild(GroupViewPage),
  ],
})
export class GroupViewPageModule {}
