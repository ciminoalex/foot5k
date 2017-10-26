import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, LoadingController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { TabsNavigationPage } from '../../pages/tabs-navigation/tabs-navigation';

import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';

import { UsersProvider } from '../../providers/users/users';
import { LocalInfoProvider } from '../../providers/local-info/local-info';


export interface INativeStorageError {
  code: number;
  source: string;
  exception: any;
}

// https://github.com/TheCocoaProject/cordova-plugin-nativestorage#error-codes
export const ERROR_CODE = {
  NATIVE_WRITE_FAILED: 1,
  ITEM_NOT_FOUND: 2,
  NULL_REFERENCE: 3,
  UNDEFINED_TYPE: 4,
  JSON_ERROR: 5,
  WRONG_PARAMETER: 6,
};

@Component({
  selector: 'walkthrough-page',
  templateUrl: 'walkthrough.html'
})
export class WalkthroughPage {

  lastSlide = false;
  loading: any;

  debug: string = "";
  loggedUserID: any = "";
  
  @ViewChild('slider') slider: Slides;

  constructor(
    public nativeStorage: NativeStorage,
    public nav: NavController,
    public loadingCtrl: LoadingController,
    public UsersService: UsersProvider,
    public LocalInfo: LocalInfoProvider
  ) {

    this.debug = "START ";    

    nativeStorage.getItem('UserDeviceAuth')
    .then(data => {

      this.debug += " | "+data.UserID;
      
      console.log(data);
      console.log(data.UserID);
      if (data.UserID == 'undefined') {
        this.debug += " | Never Logged In";
        console.log("Never LoggedIn or LoggedOut!");
      }
      else {

        this.loading = this.loadingCtrl.create();
        this.loading.present();

        this.UsersService.getUserByID(data.UserID).subscribe(data => {
          this.LocalInfo.CurrentUserID = data.ID;
          this.LocalInfo.CurrentUserObj = data;

          this.debug += " | Logged In";
          
          this.loading.dismiss();
          this.nav.setRoot(TabsNavigationPage);
        })

      }

    })
    .catch((err: INativeStorageError) => {
      // resolve only if item not found and default value is provided

      this.debug += " | " + err.source;
      
      if (err.code === ERROR_CODE.ITEM_NOT_FOUND) {
        this.debug += " | Item Not Found";
      }

    });;
  }

  ionViewDidLoad() {
}


  skipIntro() {
    // You can skip to main app
    // this.nav.setRoot(TabsNavigationPage);

    // Or you can skip to last slide (login/signup slide)
    this.lastSlide = true;
    this.slider.slideTo(this.slider.length());
  }

  onSlideChanged() {
    // If it's the last slide, then hide the 'Skip' button on the header
    this.lastSlide = this.slider.isEnd();
  }

  goToLogin() {
    this.nav.push(LoginPage);
  }

  goToSignup() {
    this.nav.push(SignupPage);
  }
}
