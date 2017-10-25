import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GroupViewPage } from './group-view';
import { SharedModule } from '../../app/shared.module';

@NgModule({
  declarations: [
    GroupViewPage,
  ],
  imports: [
    IonicPageModule.forChild(GroupViewPage),
    SharedModule,
  ],
})
export class GroupViewPageModule {}
