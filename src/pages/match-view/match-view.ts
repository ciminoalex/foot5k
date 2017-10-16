import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController  } from 'ionic-angular';

import { UsersProvider } from '../../providers/users/users';
import { MatchesProvider } from '../../providers/matches/matches';
import { LocalInfoProvider } from '../../providers/local-info/local-info';
import { UserObject } from '../../providers/users/users.model';
import { MatchObject } from '../../providers/matches/matches.model';

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

  CurrentMatch: MatchObject;
  loading: any;
  
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public UsersService: UsersProvider,
    public loadingCtrl: LoadingController,
    public MatchesService: MatchesProvider,
    public LocalInfo: LocalInfoProvider
    ) {

      this.loading = this.loadingCtrl.create();
      
      this.LocalInfo.CurrentMatchID = this.navParams.get('matchId');
      console.log(this.LocalInfo.CurrentMatchID);

  }

  ionViewDidLoad() {
    this.loading.present();
    
    this.MatchesService.getaMatchByID(this.LocalInfo.CurrentMatchID).subscribe(data=>{
      this.CurrentMatch = data;
      console.log(this.CurrentMatch);

      this.loading.dismiss();
    });
    //console.log('ionViewDidLoad MatchViewPage');

  }

}
