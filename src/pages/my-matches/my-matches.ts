import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, App, LoadingController } from 'ionic-angular';

import { UsersProvider } from '../../providers/users/users';
import { LocalInfoProvider } from '../../providers/local-info/local-info';
import { UserObject } from '../../providers/users/users.model';

import { MatchViewPage } from '../match-view/match-view';
import { MatchEditPage } from '../match-edit/match-edit';

/**
 * Generated class for the MyMatchesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-matches',
  templateUrl: 'my-matches.html',
})
export class MyMatchesPage {

  matchViewPage: any = MatchViewPage;
  matchEditPage: any = MatchEditPage;
  CurrentUser: UserObject = null;
  loading: any;

  constructor(
    public menu: MenuController,
    public app: App,
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public UsersService: UsersProvider,
    public LocalInfo: LocalInfoProvider
  ) {
    this.loading = this.loadingCtrl.create();
    this.loading.present();

    this.CurrentUser = this.LocalInfo.CurrentUserObj;

    this.loading.dismiss();
  }

  ionViewDidLoad() {
  }

  createNewMatch() {
    this.menu.close();
    this.app.getRootNav().push(MatchEditPage, { matchId: -1 });
  }


  goToMatch(match: any) {
    console.log(match);
    // close the menu when clicking a link from the menu
    this.menu.close();
    this.app.getRootNav().push(MatchViewPage, { matchId: match });
  }

}
