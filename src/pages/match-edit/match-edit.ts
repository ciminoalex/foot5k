import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';

import { LocalInfoProvider } from '../../providers/local-info/local-info';
import { MatchesProvider } from '../../providers/matches/matches';
import { MatchObject } from '../../providers/matches/matches.model';

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

  formStatusCaption: string = "";
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public loadingCtrl: LoadingController,
    public MatchesService: MatchesProvider,
    public LocalInfo: LocalInfoProvider,
    public alertCtrl: AlertController
  ) {

    this.loading = this.loadingCtrl.create();
    
    this.event_form = new FormGroup({
      title: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      date: new FormControl('2016-09-18', Validators.required),
      from_time: new FormControl('13:00', Validators.required),
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

  saveEvent(){
    this.loading = this.loadingCtrl.create();
    this.loading.present();

    if(this.current_match_id==-1){
        this.MatchesService.addMatch('','','','','','','').subscribe(data=>{
          this.loading.dismiss();
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
