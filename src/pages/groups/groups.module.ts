import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GroupsPage } from './groups';
import { SharedModule } from '../../app/shared.module';

@NgModule({
  declarations: [
    GroupsPage,
  ],
  imports: [
    IonicPageModule.forChild(GroupsPage),
    SharedModule,
  ],
})
export class GroupsPageModule {}
