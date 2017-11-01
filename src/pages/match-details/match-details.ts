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

  setGoal(player:any,goal:number){
    console.log(player.ID);
    console.log(player.goals);
    console.log(goal);

    var goals:number = parseInt(player.goals)+goal;
    console.log(goals);
    
    this.MatchesService.updatePlayerGoals(this.LocalInfo.CurrentMatchID,player.ID,goals).subscribe(data=>{
      this.loading.dismiss();
      this.refreshData();
    });
}
  
  checkGoalMarker(goals:number, index:number)
  {

    var _return:boolean = false;


    if(index<0&&goals<=index){
    _return = true;}

    if(index>0&&goals>=index){
    _return = true;}

    return _return;
  }

  getGoalImage(goals:number){
    var _return:string = './assets/images/football.png';
    if(goals<0)
      _return = './assets/images/football-auto.png';

    console.log(goals);
    return _return;
  }


  shareMatch() {
    
        var title: string = this.CurrentMatch.campo;
        var description: string = this.CurrentMatch.campo + "\n";
        var thumbnail: string = null;
    
        let newDate = new Date(this.CurrentMatch.data);
        description+=("0"+newDate.getDate()).slice(-2)+"/"+("0"+(newDate.getMonth()+1)).slice(-2)+ "/"+newDate.getFullYear()+ " ("+this.CurrentMatch.ora.slice(0,5)+"-"+this.CurrentMatch.ora_a.slice(0,5)+") \n\n";

        
        description+="Squadra A: \n";
        var i:number = 1;
        for (let users of this.CurrentMatch.players_a) {
          description += ("0"+i).slice(-2)+". "+ users.NomeCompleto + "\n";
          i++;
        } 
        description+="\n";
        description+="Squadra B: \n";
        i = 1;
        for (let users of this.CurrentMatch.players_b) {
          description += ("0"+i).slice(-2)+". "+ users.NomeCompleto + "\n";
          i++;
        } 
    
        if(this.CurrentMatch.conferme_num<Number(this.CurrentMatch.giocatori)){
          description += "\n";
          description += "Mancano "+(Number(this.CurrentMatch.giocatori)-this.CurrentMatch.conferme_num)+" giocatori.";
        }
      
        console.log(description);
    
         this.socialSharing.share(description, title, thumbnail, null)
         .then(() => {
           console.log('Success!');
         })
         .catch(() => {
            console.log('Error');
         });
        }
    
}
