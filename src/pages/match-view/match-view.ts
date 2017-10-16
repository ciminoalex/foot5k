import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { UsersProvider } from '../../providers/users/users';
import { LocalInfoProvider } from '../../providers/local-info/local-info';
import { UserObject } from '../../providers/users/users.model';

/**
 * Generated class for the MatchViewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-match-view',
  templateUrl: 'match-view.html',
})
export class MatchViewPage {

  CurrentUser: UserObject = null;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public UsersService: UsersProvider,
    public LocalInfo: LocalInfoProvider
    ) {

      this.LocalInfo.CurrentMatchID = this.navParams.get('matchId');
      console.log(this.LocalInfo.CurrentMatchID);

  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad MatchViewPage');
  }

}
