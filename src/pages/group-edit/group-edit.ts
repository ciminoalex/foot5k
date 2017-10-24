import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';

import { LocalInfoProvider } from '../../providers/local-info/local-info';
import { GroupsProvider } from '../../providers/groups/groups';
import { UsersProvider } from '../../providers/users/users';
//import { GroupObject } from '../../providers/matches/matches.model';

import { TabsNavigationPage } from '../tabs-navigation/tabs-navigation';


/**
 * Generated class for the GroupEditPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-group-edit',
  templateUrl: 'group-edit.html',
})
export class GroupEditPage {

  CurrentGroup: any;
  current_group_id: any;

  group_edit_form: FormGroup;
  radioColorForm: FormGroup;
  
  loading: any;

  formStatusCaption: string = "";

  homePage: any = TabsNavigationPage;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public loadingCtrl: LoadingController,
    public LocalInfo: LocalInfoProvider,
    public GroupsService: GroupsProvider,
    public UsersService: UsersProvider,
    public alertCtrl: AlertController
  ) {

    this.loading = this.loadingCtrl.create();

    this.group_edit_form = new FormGroup({
      name: new FormControl('', Validators.required),
      descrizione: new FormControl(''),
      passcode: new FormControl('', Validators.required),
      image: new FormControl(''),
      color: new FormControl('')
    });

    this.radioColorForm = new FormGroup({
      selected_color: new FormControl('#fc9961')
    });


    this.current_group_id = this.navParams.get('groupId');
    console.log(this.current_group_id);

  }

  ionViewDidLoad() {
    this.loading = this.loadingCtrl.create();
    this.loading.present();

    this.refreshData();
  }

  refreshData(){
    if(this.current_group_id==-1){
      this.loading.dismiss();
      this.formStatusCaption = "Crea un nuovo gruppo";
      return
    }

    this.formStatusCaption = "Modifica il gruppo";
    
    this.GroupsService.getGroup(this.current_group_id).subscribe(data=>{
      this.CurrentGroup = data;

      this.group_edit_form = new FormGroup({
        name: new FormControl(this.CurrentGroup.nome, Validators.required),
        descrizione: new FormControl(this.CurrentGroup.descrizione),
        passcode: new FormControl(this.CurrentGroup.passcode, Validators.required),
        image: new FormControl(this.CurrentGroup.image),
        color: new FormControl(this.CurrentGroup.color)
      });

      this.radioColorForm.controls.selected_color.setValue(this.CurrentGroup.color);
  
      this.loading.dismiss();
    });
  };

  
  saveGroup(){
    this.loading = this.loadingCtrl.create();
    this.loading.present();

    //date:string, time:string, timeto:string, campo:string, owner:string, players:string, groupid:string
    var name:string = this.group_edit_form.controls.name.value;
    var descrizione:string = this.group_edit_form.controls.descrizione.value;
    var passcode:string = this.group_edit_form.controls.passcode.value;
    var image:string = "";
    var color:string = this.radioColorForm.controls.selected_color.value;;

    console.log('name:'+name);
    console.log('descrizione:'+descrizione);
    console.log('passcode:'+passcode);
    console.log('image:'+image);
    console.log('color:'+color);
    
    console.log(this.LocalInfo.CurrentUserID);
    

    if(this.current_group_id==-1){
        this.GroupsService.addGroup(name,descrizione,passcode,this.LocalInfo.CurrentUserID,image,color).subscribe(data=>{
          this.UsersService.getUserByID(this.LocalInfo.CurrentUserID).subscribe(data=>{
            this.LocalInfo.CurrentUserObj = data;
            this.loading.dismiss();
            this.navCtrl.setRoot(this.homePage);
          });
        });
      }else{
        this.GroupsService.updateGroup(this.current_group_id,name,descrizione,passcode,image,color).subscribe(data=>{
          this.UsersService.getUserByID(this.LocalInfo.CurrentUserID).subscribe(data=>{
            this.LocalInfo.CurrentUserObj = data;
            this.loading.dismiss();
            this.navCtrl.setRoot(this.homePage);
          });
        });
      }

    }

    deleteConfirmation(){
      let confirm = this.alertCtrl.create({
        title: 'Attenzione!',
        message: 'Sicuro di voler eliminare il gruppo?',
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
              this.deleteGroup();
            }
          }
        ]
      });
      confirm.present();  
    }

    deleteGroup() {
      this.loading = this.loadingCtrl.create();
      this.loading.present();
  
      if(this.current_group_id!=-1){
  
        this.GroupsService.deleteGroup(this.current_group_id).subscribe(data=>{
          this.UsersService.getUserByID(this.LocalInfo.CurrentUserID).subscribe(data=>{
            this.LocalInfo.CurrentUserObj = data;
            this.loading.dismiss();
            this.navCtrl.setRoot(this.homePage);
          });
        });
      
      }
    }
  
}
