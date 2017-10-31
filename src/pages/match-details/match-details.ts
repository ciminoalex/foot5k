import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, App, AlertController, ActionSheetController  } from 'ionic-angular';

import { UsersProvider } from '../../providers/users/users';
import { MatchesProvider } from '../../providers/matches/matches';
import { LocalInfoProvider } from '../../providers/local-info/local-info';
import { MatchObject } from '../../providers/matches/matches.model';
import { MatchEditPage } from '../match-edit/match-edit';
import { SocialSharing } from '@ionic-native/social-sharing';

/**
 * Generated class for the MatchDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-match-details',
  templateUrl: 'match-details.html',
})
export class MatchDetailsPage {

  CurrentMatch: MatchObject;
  loading: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public UsersService: UsersProvider,
    public loadingCtrl: LoadingController,
    public MatchesService: MatchesProvider,
    public LocalInfo: LocalInfoProvider,
    public app: App,
    public socialSharing: SocialSharing,
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController
  ) {

    this.loading = this.loadingCtrl.create();
    this.LocalInfo.CurrentMatchID = this.navParams.get('matchId');
    console.log(this.LocalInfo.CurrentMatchID);

}

  ionViewDidLoad() {
    this.refreshData();
  }

  refreshData(){
    this.loading = this.loadingCtrl.create();
    this.loading.present();
    this.MatchesService.getaMatchByID(this.LocalInfo.CurrentMatchID).subscribe(data=>{
      this.CurrentMatch = data;
      console.log(this.CurrentMatch);
      this.loading.dismiss();
  });
  }

  assPlayerToTeam(playerID:string, team:string){
      this.loading = this.loadingCtrl.create();
      this.loading.present();
      this.MatchesService.assignPlayerToTeam(this.LocalInfo.CurrentMatchID,playerID,team).subscribe(data=>{
        this.loading.dismiss();
        this.refreshData();
      });
  }

}
