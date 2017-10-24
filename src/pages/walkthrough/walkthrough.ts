import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, LoadingController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { TabsNavigationPage } from '../../pages/tabs-navigation/tabs-navigation';

import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';

import { UsersProvider } from '../../providers/users/users';
import { LocalInfoProvider } from '../../providers/local-info/local-info';

@Component({
  selector: 'walkthrough-page',
  templateUrl: 'walkthrough.html'
})
export class WalkthroughPage {

  lastSlide = false;
  loading: any;
  
  @ViewChild('slider') slider: Slides;

  constructor(
    public nativeStorage: NativeStorage,
    public nav: NavController,
    public loadingCtrl: LoadingController,
    public UsersService: UsersProvider,
    public LocalInfo: LocalInfoProvider
  ) {

  }

  ionViewDidLoad() {

    this.nativeStorage.getItem('UserDeviceAuth')
    .then(
    data => {
      console.log(data);
      console.log(data.UserID);
      if (data.UserID == 'undefined') {
        console.log("Never LoggedIn or LoggedOut!");
      }
      else {

        this.loading = this.loadingCtrl.create();
        this.loading.present();

        this.UsersService.getUserByID(data.UserID).subscribe(data => {
          this.LocalInfo.CurrentUserID = data.ID;
          this.LocalInfo.CurrentUserObj = data;

          this.loading.dismiss();
          this.nav.setRoot(TabsNavigationPage);
        })

      }

    });

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
