import { Component } from '@angular/core';
import { NavController, ModalController, LoadingController, Platform, ActionSheetController, ToastController } from 'ionic-angular';
import { FormGroup, FormControl } from '@angular/forms';

import { TermsOfServicePage } from '../terms-of-service/terms-of-service';
import { PrivacyPolicyPage } from '../privacy-policy/privacy-policy';

import { WalkthroughPage } from '../walkthrough/walkthrough';
import { TabsNavigationPage } from '../tabs-navigation/tabs-navigation';

import 'rxjs/Rx';

import { ProfileModel } from '../profile/profile.model';
import { ProfileService } from '../profile/profile.service';

import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from "../../providers/language/language.service";
import { LanguageModel } from "../../providers/language/language.model";
import { AppRate } from '@ionic-native/app-rate';
import { ImagePicker } from '@ionic-native/image-picker';
import { Crop } from '@ionic-native/crop';

import { UsersProvider } from '../../providers/users/users';
import { LocalInfoProvider } from '../../providers/local-info/local-info';
import { UserObject } from '../../providers/users/users.model';

import { Storage } from '@ionic/Storage';

import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
declare var cordova: any;


@Component({
  selector: 'settings-page',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  settingsForm: FormGroup;
  // make WalkthroughPage the root (or first) page
  rootPage: any = WalkthroughPage;
  homePage: any = TabsNavigationPage;
  loading: any;

  profile: ProfileModel = new ProfileModel();
  languages: Array<LanguageModel>;

  public CurrentUser: UserObject;

  constructor(
    public nav: NavController,
    public modal: ModalController,
    public loadingCtrl: LoadingController,
    public translate: TranslateService,
    public languageService: LanguageService,
    public profileService: ProfileService,
    public appRate: AppRate,
    public imagePicker: ImagePicker,
    public cropService: Crop,
    public platform: Platform,
    public UsersService: UsersProvider,
    public storage: Storage,
    public LocalInfo: LocalInfoProvider,
    private camera: Camera, 
    private transfer: Transfer, 
    private file: File, 
    private filePath: FilePath, 
    public actionSheetCtrl: ActionSheetController, 
    public toastCtrl: ToastController

  ) {

    this.loading = this.loadingCtrl.create();
    this.languages = this.languageService.getLanguages();

    this.CurrentUser = this.LocalInfo.CurrentUserObj;

    this.settingsForm = new FormGroup({
      name: new FormControl(),
      role: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      repassword: new FormControl(),
      description: new FormControl(),
      currency: new FormControl(),
      weather: new FormControl(),
      notifications: new FormControl(),
      language: new FormControl()
    });

  }

  ionViewDidLoad() {
    this.loading.present();
    this.UsersService.getUserByID(this.LocalInfo.CurrentUserID).subscribe(data=>{
      this.CurrentUser = data;

      console.log(this.CurrentUser);

      // setValue: With setValue, you assign every form control value at once by passing in a data object whose properties exactly match the form model behind the FormGroup.
      // patchValue: With patchValue, you can assign values to specific controls in a FormGroup by supplying an object of key/value pairs for just the controls of interest.
      // More info: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#populate-the-form-model-with-_setvalue_-and-_patchvalue_
      this.settingsForm.patchValue({
        name: this.CurrentUser.NomeCompleto,
        role: this.CurrentUser.Ruolo,
        description: this.CurrentUser.description,
        email: this.CurrentUser.Email,
        password: '',
        repassword: '',
        notifications: true,
        language: this.languages[0]
      });

      this.loading.dismiss();

      this.settingsForm.get('language').valueChanges.subscribe((lang) => {
        this.setLanguage(lang);
      });
    });
      
  }

  logout() {
    // navigate to the new page if it is not the current page
    this.storage.remove('UserDeviceAuth');
    this.nav.setRoot(this.rootPage);
  }

  showTermsModal() {
    let modal = this.modal.create(TermsOfServicePage);
    modal.present();
  }

  showPrivacyModal() {
    let modal = this.modal.create(PrivacyPolicyPage);
    modal.present();
  }

  setLanguage(lang: LanguageModel){
    let language_to_set = this.translate.getDefaultLang();

    if(lang){
      language_to_set = lang.code;
    }

    this.translate.setDefaultLang(language_to_set);
    this.translate.use(language_to_set);
  }

  rateApp(){
    this.appRate.preferences.storeAppURL = {
      ios: '<my_app_id>',
      android: 'market://details?id=<package_name>',
      windows: 'ms-windows-store://review/?ProductId=<Store_ID>'
    };

    this.appRate.promptForRating(true);
  }

  updateUser(){
    var id:string = this.LocalInfo.CurrentUserID;
    var name:string = this.settingsForm.controls.name.value;
    var role:string = this.settingsForm.controls.role.value;
    var description:string = this.settingsForm.controls.description.value;

    this.UsersService.updateUser(id,name,role,description).subscribe(data=>{
      this.UsersService.getUserByID(id).subscribe(data=>{
        this.LocalInfo.CurrentUserObj = data;
        this.nav.setRoot(this.homePage);
      });
    });
  }


  debug:any;

  /*openImagePicker(){

   this.debug = "openImagePicker";

   this.imagePicker.hasReadPermission().then(
     (result) => {

      this.debug = "openImagePicker: "+result;
      

       if(result == false){
         // no callbacks required as this opens a popup which returns async
         this.imagePicker.requestReadPermission();
       }
       else if(result == true){
         this.imagePicker.getPictures({ maximumImagesCount: 1 }).then(
           (results) => {
             for (var i = 0; i < results.length; i++) {
               this.cropService.crop(results[i], {quality: 75}).then(
                 newImage => {
                   this.profileService.setUserImage(newImage);
                   this.profile.user.image = newImage;
                 },
                 error => console.error("Error cropping image", error)
               );
             }
           }, (err) => console.log(err)
         );
       }
     }
   )
  }*/

  openImagePicker(){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();    
  }

  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
   
    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            //this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        //this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      //this.presentToast('Error while selecting image.');
    });
  }

}
