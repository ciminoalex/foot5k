import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, App  } from 'ionic-angular';

import { UsersProvider } from '../../providers/users/users';
import { MatchesProvider } from '../../providers/matches/matches';
import { LocalInfoProvider } from '../../providers/local-info/local-info';
import { MatchObject } from '../../providers/matches/matches.model';

import { MatchEditPage } from '../match-edit/match-edit';

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
  CurrentMatchPlayerStatus: any;
  loading: any;
  CurrentMatchStatusText: string = 'Vuoi partecipare a questa partita?';
  CurrentMatchStatusValue: number = -1;
  CurrentMatchStatusClass: string = 'match-action';
  
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public UsersService: UsersProvider,
    public loadingCtrl: LoadingController,
    public MatchesService: MatchesProvider,
    public LocalInfo: LocalInfoProvider,
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

   //console.log('ionViewDidLoad MatchViewPage');
  }

  matchAction(value:string){
    this.loading = this.loadingCtrl.create();
    this.loading.present();
    this.MatchesService.matchAction(this.LocalInfo.CurrentMatchID, this.LocalInfo.CurrentUserID, value).subscribe(data=>{
      this.refreshData();
    });
  }

  editMatch(){
    this.app.getRootNav().push(MatchEditPage, {matchId: this.LocalInfo.CurrentMatchID});
  }

  refreshData(){
    this.MatchesService.getaMatchByID(this.LocalInfo.CurrentMatchID).subscribe(data=>{
      this.CurrentMatch = data;
      this.MatchesService.getaPlayerMatchStatus(this.LocalInfo.CurrentMatchID,this.LocalInfo.CurrentUserID).subscribe(data=>{
        this.CurrentMatchPlayerStatus = data;

        this.CurrentMatchStatusClass = "match-action";
        if(this.CurrentMatchPlayerStatus[0].status=='2')
        {
          this.CurrentMatchStatusText = 'Ottimo! Stai partecipando alla partita.'
          this.CurrentMatchStatusValue = 2;
          this.CurrentMatchStatusClass = "match-action status-2";
        }
        if(this.CurrentMatchPlayerStatus[0].status!='2')
        {
          this.CurrentMatchStatusText = 'Non stai partecipando alla partita. Vuoi partecpare?'
          this.CurrentMatchStatusValue = 0;
        }

        console.log(this.CurrentMatchPlayerStatus[0]);
        this.loading.dismiss();
      });
    });

    this.UsersService.getUserByID(this.LocalInfo.CurrentUserID).subscribe(data=>{
      this.LocalInfo.CurrentUserObj = data;
    });

  };
  
}
