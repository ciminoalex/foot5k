import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { UsersProvider } from '../../providers/users/users';
import { LocalInfoProvider } from '../../providers/local-info/local-info';
import { UserObject } from '../../providers/users/users.model';

import { WalkthroughPage } from '../walkthrough/walkthrough';
import { SettingsPage } from '../settings/settings';

/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  rootPage: any = WalkthroughPage;
  settingPage: any = SettingsPage;
  CurrentUser: UserObject = null;
  
  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public UsersService: UsersProvider,
      public LocalInfo: LocalInfoProvider
      ) {

        this.CurrentUser = this.LocalInfo.CurrentUserObj;

        if(this.CurrentUser==null)
        {
          this.navCtrl.setRoot(this.rootPage);
        }

        console.log(this.CurrentUser.Matches)

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }


  goToSettings(){
    this.navCtrl.push(this.settingPage);
  }

  onSegmentChanged(segmentButton: any) {
    console.log('Segment changed to', segmentButton);
  }

  onSegmentSelected(segmentButton: any) {
    console.log('Segment selected', segmentButton);
  }


}
