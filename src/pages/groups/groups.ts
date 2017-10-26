import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, App} from 'ionic-angular';

import { UsersProvider } from '../../providers/users/users';
import { LocalInfoProvider } from '../../providers/local-info/local-info';
import { GroupsProvider } from '../../providers/groups/groups';


import { GroupViewPage } from '../group-view/group-view';
import { GroupEditPage } from '../group-edit/group-edit';

/**
 * Generated class for the GroupsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-groups',
  templateUrl: 'groups.html',
})
export class GroupsPage {

  loading: any;
  CurrentSearchGroups: any;

  groupViewPage: any = GroupViewPage;
  groupEditPage: any = GroupEditPage;

  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public UsersService: UsersProvider,
    public loadingCtrl: LoadingController,
    public LocalInfo: LocalInfoProvider,
    public GroupsService: GroupsProvider,
    public app: App
  ) {

    this.loading = this.loadingCtrl.create();
    this.LocalInfo.CurrentMatchID = this.navParams.get('matchId');
    console.log(this.LocalInfo.CurrentMatchID);

  }

  ionViewDidLoad() {
    this.loading = this.loadingCtrl.create();
    this.loading.present();
    this.refreshData();
  }


  refreshData(){
    this.GroupsService.getUserGroups(this.LocalInfo.CurrentUserID).subscribe(data=>{
      this.LocalInfo.CurrentUserGroups = data;
      this.CurrentSearchGroups = this.LocalInfo.CurrentUserGroups;
        console.log(this.LocalInfo.CurrentUserGroups);
        this.loading.dismiss();
    });
  };

  onInput(event:any){
    let val:string = event.target.value;
    console.log(val);

    if(val.length>=2)
    {
      this.GroupsService.getGroups(val).subscribe(data=>{
        this.CurrentSearchGroups = data;
          console.log(this.CurrentSearchGroups);
      });
    }else{
      this.refreshData();
    }
  }

  gotoGroup(id:string){
    this.app.getRootNav().push('GroupViewPage', {groupId: id});
  }

  createGroup(){
    this.app.getRootNav().push('GroupEditPage', {groupId: -1});
  }

}
