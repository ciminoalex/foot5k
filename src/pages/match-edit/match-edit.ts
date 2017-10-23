import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';

import { LocalInfoProvider } from '../../providers/local-info/local-info';
import { MatchesProvider } from '../../providers/matches/matches';
import { MatchObject } from '../../providers/matches/matches.model';
import { UsersProvider } from '../../providers/users/users';

import { TabsNavigationPage } from '../tabs-navigation/tabs-navigation';


/**
 * Generated class for the MatchEditPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-match-edit',
  templateUrl: 'match-edit.html',
})
export class MatchEditPage {

  event_form: FormGroup;
  categories_checkbox_open: boolean;
  categories_checkbox_result;

  CurrentMatch: MatchObject;
  current_match_id: any;
  loading: any;

  homePage: any = TabsNavigationPage;
  

  formStatusCaption: string = "";
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public loadingCtrl: LoadingController,
    public MatchesService: MatchesProvider,
    public LocalInfo: LocalInfoProvider,
    public UsersService: UsersProvider,
    public alertCtrl: AlertController
  ) {

    this.loading = this.loadingCtrl.create();

    this.event_form = new FormGroup({
      location: new FormControl('', Validators.required),
      date: new FormControl(new Date().toISOString(), Validators.required),
      from_time: new FormControl('00:00', Validators.required),
      to_time: new FormControl('', Validators.required),
      players: new FormControl(10, Validators.required)
    });

    this.current_match_id = this.navParams.get('matchId');
    console.log(this.current_match_id);

  }

  ionViewDidLoad() {
    this.loading = this.loadingCtrl.create();
    this.loading.present();

    this.refreshData();
  }


  deleteConfirmation(){
    let confirm = this.alertCtrl.create({
      title: 'Attenzione!',
      message: 'Sicuro di voler eliminare la partita?',
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
            this.deleteMatch();
          }
        }
      ]
    });
    confirm.present();  
  }


  saveEvent(){
    this.loading = this.loadingCtrl.create();
    this.loading.present();

    //date:string, time:string, timeto:string, campo:string, owner:string, players:string, groupid:string
    var date:string = this.event_form.controls.date.value;
    var time:string = this.event_form.controls.from_time.value;
    var timeto:string = this.event_form.controls.to_time.value;
    var campo:string = this.event_form.controls.location.value;
    var owner:string = this.LocalInfo.CurrentUserID;
    var players:string = this.event_form.controls.players.value;
    var groupid:string = this.LocalInfo.CurrentUserObj.CurrentGroup;

    console.log('date:'+date);
    console.log('time:'+time);
    console.log('timeto:'+timeto);
    console.log('campo:'+campo);
    console.log('owner:'+owner);
    console.log('players:'+players);
    console.log('groupid:'+groupid);
    
    if(this.current_match_id==-1){
        this.MatchesService.addMatch(date,time,timeto,campo,owner,players,groupid).subscribe(data=>{
          this.UsersService.getUserByID(this.LocalInfo.CurrentUserID).subscribe(data=>{
            this.LocalInfo.CurrentUserObj = data;
            this.loading.dismiss();
            this.navCtrl.setRoot(this.homePage);
          });
        });
      }else{
        this.MatchesService.updateMatch(this.current_match_id,date,time,timeto,campo,owner,players,groupid).subscribe(data=>{
          this.UsersService.getUserByID(this.LocalInfo.CurrentUserID).subscribe(data=>{
            this.LocalInfo.CurrentUserObj = data;
            this.loading.dismiss();
            this.navCtrl.setRoot(this.homePage);
          });
        });
      }

    }

  deleteMatch() {
    this.loading = this.loadingCtrl.create();
    this.loading.present();

    if(this.current_match_id!=-1){

      this.MatchesService.deleteMatch(this.current_match_id).subscribe(data=>{
        this.UsersService.getUserByID(this.LocalInfo.CurrentUserID).subscribe(data=>{
          this.LocalInfo.CurrentUserObj = data;
          this.loading.dismiss();
          this.navCtrl.setRoot(this.homePage);
        });
      });
    
    }
  }

  refreshData(){
    if(this.current_match_id==-1){
      this.loading.dismiss();
      this.formStatusCaption = "Crea una nuova partita";
      return
    }

    this.formStatusCaption = "Modifica la partita";
    
    this.MatchesService.getaMatchByID(this.LocalInfo.CurrentMatchID).subscribe(data=>{
      this.CurrentMatch = data;

      this.event_form = new FormGroup({
        title: new FormControl('-', Validators.required),
        location: new FormControl(this.CurrentMatch.campo, Validators.required),
        date: new FormControl(this.CurrentMatch.data, Validators.required),
        from_time: new FormControl(this.CurrentMatch.ora, Validators.required),
        to_time: new FormControl(this.CurrentMatch.ora_a, Validators.required),
        players: new FormControl(this.CurrentMatch.giocatori, Validators.required)
      });

      this.loading.dismiss();
    });
  };
    


}
