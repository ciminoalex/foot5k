import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, App, AlertController } from 'ionic-angular';

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
  current_group_id: any;

  loading: any;


  CurrentGroupStatusText: string = "";
  CurrentGroupStatusValue: string = "0";
  CurrentGroupStatusClass: string = 'group-action';
  

  constructor(
    public navCtrl: NavController,
    public app: App,
    public LocalInfo: LocalInfoProvider,
    public loadingCtrl: LoadingController,
    public GroupsService: GroupsProvider,
    public navParams: NavParams,
    public alertCtrl: AlertController
  ) {
    this.loading = this.loadingCtrl.create();
    this.current_group_id = this.navParams.get('groupId');
    console.log(this.current_group_id);
  }


  enterGroup() {

    let prompt = this.alertCtrl.create({
      title: 'Entra nel gruppo',
      message: "Inserisci la password di accesso al gruppo selezionato. Se non ce l'hai, chiedila all'ADMIN.",
      inputs: [
        {
          name: 'passcode',
          placeholder: 'password',
          type: 'password'
        },
      ],
      buttons: [
        {
          text: 'Annulla',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Entra',
          handler: data => {
            console.log('Saved clicked');
            console.log(data.passcode);
            this.loading = this.loadingCtrl.create();
            this.loading.present();
            this.GroupsService.enterGroup(this.LocalInfo.CurrentUserID, this.current_group_id,data.passcode).subscribe(data => {
              console.log(data);
              this.refreshData();
            });
          }
        }
      ]
    });
    prompt.present();




  }

  leaveGroup() {
    this.loading = this.loadingCtrl.create();
    this.loading.present();
    this.GroupsService.leaveGroup(this.LocalInfo.CurrentUserID, this.current_group_id).subscribe(data => {
      console.log(data);
      this.refreshData();
    });
  }

  ionViewDidLoad() {
    this.loading = this.loadingCtrl.create();
    this.loading.present();

    this.refreshData();
  }

  refreshData() {

    this.GroupsService.getGroup(this.current_group_id).subscribe(data => {
      this.CurrentGroup = data;

      this.CurrentGroupStatusClass = "group-action";
      this.GroupsService.isMyGroup(this.current_group_id, this.LocalInfo.CurrentUserID).subscribe(data => {
        if (data == true) {
          this.CurrentGroupStatusClass = "group-action status-2";
          this.CurrentGroupStatusText = "Fai parte di questo gruppo!";
          this.CurrentGroupStatusValue = "1";
        }
        else {
          this.CurrentGroupStatusClass = "group-action";
          this.CurrentGroupStatusText = "Non fai parte di questo gruppo";
          this.CurrentGroupStatusValue = "0";
        }
        this.loading.dismiss();
      });

    });
  };

  editGroup() {
    this.app.getRootNav().push('GroupEditPage', { groupId: this.current_group_id });
  }

  shareGroup() { }

}
