import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, App  } from 'ionic-angular';

import { LocalInfoProvider } from '../../providers/local-info/local-info';

import { GroupsProvider } from '../../providers/groups/groups';
import { GroupEditPage } from '../group-edit/group-edit';

/**
 * Generated class for the GroupViewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-group-view',
  templateUrl: 'group-view.html',
})
export class GroupViewPage {

  CurrentGroup: any;
  current_group_id:any;

  loading: any;


  CurrentGroupStatusText: string = "Sei un membro di questo gruppo!";
  CurrentGroupStatusValue: string = "2"; 
  
  constructor(
      public navCtrl: NavController, 
      public app: App,
      public LocalInfo: LocalInfoProvider,
      public loadingCtrl: LoadingController,
      public GroupsService: GroupsProvider,
      public navParams: NavParams
  ) {
    this.loading = this.loadingCtrl.create();
    this.current_group_id = this.navParams.get('groupId');
    console.log(this.current_group_id);
  }

  ionViewDidLoad() {
    this.loading = this.loadingCtrl.create();
    this.loading.present();

    this.refreshData();
  }

  refreshData(){

    this.GroupsService.getGroup(this.current_group_id).subscribe(data=>{
      this.CurrentGroup = data;
      this.loading.dismiss();
    });
  };

  editGroup(){
    this.app.getRootNav().push(GroupEditPage, {groupId: this.current_group_id});
  }

  shareGroup(){}

  groupAction(action:string){}

}
