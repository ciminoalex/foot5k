import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, App, AlertController  } from 'ionic-angular';

import { UsersProvider } from '../../providers/users/users';
import { MatchesProvider } from '../../providers/matches/matches';
import { LocalInfoProvider } from '../../providers/local-info/local-info';
import { MatchObject } from '../../providers/matches/matches.model';
import { MatchEditPage } from '../match-edit/match-edit';
import { SocialSharing } from '@ionic-native/social-sharing';

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
  
  ImOwner: boolean = false;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public UsersService: UsersProvider,
    public loadingCtrl: LoadingController,
    public MatchesService: MatchesProvider,
    public LocalInfo: LocalInfoProvider,
    public app: App,
    public socialSharing: SocialSharing,
    public alertCtrl: AlertController
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
    this.app.getRootNav().push('MatchEditPage', {matchId: this.LocalInfo.CurrentMatchID});
  }

  refreshData(){
    this.MatchesService.getaMatchByID(this.LocalInfo.CurrentMatchID).subscribe(data=>{
      this.CurrentMatch = data;
      this.MatchesService.getaPlayerMatchStatus(this.LocalInfo.CurrentMatchID,this.LocalInfo.CurrentUserID).subscribe(data=>{
        this.CurrentMatchPlayerStatus = data;

        console.log(this.CurrentMatch.owner.ID);
        console.log(this.LocalInfo.CurrentUserID);
        
        if(this.CurrentMatch.owner.ID == this.LocalInfo.CurrentUserID){
          this.ImOwner = true;
        }

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

  shareMatch() {

    var title: string = this.CurrentMatch.campo;
    var description: string = this.CurrentMatch.campo + "\n";
    var thumbnail: string = null;

    let newDate = new Date(this.CurrentMatch.data);
    description+=("0"+newDate.getDay()).slice(-2)+"/"+("0"+newDate.getMonth()).slice(-2)+ "/"+newDate.getFullYear()+ " ("+this.CurrentMatch.ora.slice(0,5)+"-"+this.CurrentMatch.ora_a.slice(0,5)+") \n";

    var i:number = 1;
    for (let users of this.CurrentMatch.conferme) {
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

    
    addGuest() {
      
          let prompt = this.alertCtrl.create({
            title: 'Aggiungi ospite',
            message: "Inserisci il nome dell'ospite invitato alla partita.",
            inputs: [
              {
                name: 'name',
                placeholder: 'Nome e Cognome'
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
                text: 'Aggiungi',
                handler: data => {
                  console.log('Saved clicked');
                  console.log(data.passcode);
                  this.loading = this.loadingCtrl.create();
                  this.loading.present();
                  this.MatchesService.addGuest(this.CurrentMatch.id, data.name).subscribe(data => {
                    console.log(data);
                    this.refreshData();
                  });
                }
              }
            ]
          });
          prompt.present();

        }

        deleteGuest(ID:string, Type:string){


          console.log("Pressed! "+ID);

          if(Type!='guest')
            return false;

          let confirm = this.alertCtrl.create({
            title: 'Attenzione!',
            message: 'Sicuro di voler rimuovere l\'ospite dalla partita?',
            buttons: [
              {
                text: 'No, mi sono sbagliato',
                handler: () => {
                  console.log('UNDO DELETE');
                }
              },
              {
                text: 'Si, sono sicuro',
                handler: () => {
                  this.loading = this.loadingCtrl.create();
                  this.loading.present();
                  this.MatchesService.deleteGuest(ID).subscribe(data => {
                    this.refreshData();
                  });
                }
              }
            ]
          });
          confirm.present();  
        }
          

}
