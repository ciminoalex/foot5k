import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, App, LoadingController } from 'ionic-angular';

import { UsersProvider } from '../../providers/users/users';
import { LocalInfoProvider } from '../../providers/local-info/local-info';
import { UserObject } from '../../providers/users/users.model';

import { WalkthroughPage } from '../walkthrough/walkthrough';
import { SettingsPage } from '../settings/settings';
import { MatchViewPage } from '../match-view/match-view';
import { MatchEditPage } from '../match-edit/match-edit';

/**
 * Generated class for the MatchAllPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-match-all',
  templateUrl: 'match-all.html',
})
export class MatchAllPage {

  rootPage: any = WalkthroughPage;
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
    
    if(this.CurrentUser==null)
    {
      this.navCtrl.setRoot(this.rootPage);
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MatchAllPage');
  }

  goToMatch(match:any)
  {
    console.log(match);
      // close the menu when clicking a link from the menu
      this.menu.close();
      this.app.getRootNav().push('MatchViewPage', {matchId: match});
    }

  createNewMatch(){
    this.menu.close();
    this.app.getRootNav().push('MatchEditPage', {matchId: -1});
  }

  getUserPicture(picture:string){
    var _return:string = picture;
    console.log(_return);
    if(picture=='/images/ospite.jpg'){_return= './assets/images/ospite.jpg';}
    return _return;
  }

}
