import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GroupEditPage } from './group-edit';
import { SharedModule } from '../../app/shared.module';

@NgModule({
  declarations: [
    GroupEditPage
  ],
  imports: [
    IonicPageModule.forChild(GroupEditPage),
    SharedModule
  ],
})
export class GroupEditPageModule {}