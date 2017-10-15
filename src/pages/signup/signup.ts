import { Component } from '@angular/core';
import { NavController, ModalController, LoadingController } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';

import { TermsOfServicePage } from '../terms-of-service/terms-of-service';
import { PrivacyPolicyPage } from '../privacy-policy/privacy-policy';

import { TabsNavigationPage } from '../tabs-navigation/tabs-navigation';

import { SettingsPage } from '../settings/settings';

import { FacebookLoginService } from '../facebook-login/facebook-login.service';
import { GoogleLoginService } from '../google-login/google-login.service';
import { TwitterLoginService } from '../twitter-login/twitter-login.service';

import { UsersProvider } from '../../providers/users/users';
import { UserObject } from '../../providers/users/users.model';

@Component({
  selector: 'signup-page',
  templateUrl: 'signup.html'
})
export class SignupPage {
  signup: FormGroup;
  main_page: { component: any };
  loading: any;
  msg: string;
  
  constructor(
    public nav: NavController,
    public modal: ModalController,
    public facebookLoginService: FacebookLoginService,
    public googleLoginService: GoogleLoginService,
    public twitterLoginService: TwitterLoginService,
    public loadingCtrl: LoadingController,
    public UsersService: UsersProvider
  ) {
    this.main_page = { component: SettingsPage };

    this.signup = new FormGroup({
      email: new FormControl('pippo@paperino.com', Validators.required),
      password: new FormControl('test', Validators.required),
      confirm_password: new FormControl('test', Validators.required)
    });
  }

  doSignup(){
    this.loading = this.loadingCtrl.create();

    var _user: UserObject;
    
    var _email: string = this.signup.controls.email.value;
    var _password: string = this.signup.controls.password.value;
    var _conf_pwd: string = this.signup.controls.confirm_password.value;

    if(_password!=_conf_pwd){
      console.log("PAssword and Confirm not matchs")
      return false;
    }

    this.UsersService.logInMail(_email,_password).subscribe(data=>{
      _user = data; 
      console.log(_user)
      if(_user!=null)
      {
        this.msg = "Email already exist! Goto Login!";
        this.loading.dismiss();
      }else{
        this.UsersService.signUpMail(_email,_password).subscribe(data=>{
          this.loading.dismiss();
          _user = data; 
          console.log(_user)
          if(_user==null)
          {
            this.msg = "Errors during Signing Up!";
          }else{
            console.log(_user.ID)
            this.nav.setRoot(this.main_page.component);
          }
        })
          }
    })
  }

  doFacebookSignup() {
    this.loading = this.loadingCtrl.create();
    // Here we will check if the user is already logged in
    // because we don't want to ask users to log in each time they open the app
    let env = this;

    this.facebookLoginService.getFacebookUser()
    .then(function(data) {
       // user is previously logged with FB and we have his data we will let him access the app
      env.nav.setRoot(env.main_page.component);
    }, function(error){
      //we don't have the user data so we will ask him to log in
      env.facebookLoginService.doFacebookLogin()
      .then(function(res){
        env.loading.dismiss();
        env.nav.setRoot(env.main_page.component);
      }, function(err){
        console.log("Facebook Login error", err);
        env.loading.dismiss();
      });
    });
  }

  doTwitterSignup() {
    this.loading = this.loadingCtrl.create();
    // Here we will check if the user is already logged in
    // because we don't want to ask users to log in each time they open the app
    let env = this;

    this.twitterLoginService.getTwitterUser()
    .then(function(data) {
       // user is previously logged with FB and we have his data we will let him access the app
      env.nav.setRoot(env.main_page.component);
    }, function(error){
      //we don't have the user data so we will ask him to log in
      env.twitterLoginService.doTwitterLogin()
      .then(function(res){
        env.loading.dismiss();
        env.nav.setRoot(env.main_page.component);
      }, function(err){
        console.log("Facebook Login error", err);
        env.loading.dismiss();
      });
    });
  }

  doGoogleSignup() {
    this.loading = this.loadingCtrl.create();

    // Here we will check if the user is already logged in because we don't want to ask users to log in each time they open the app
    let env = this;

    this.googleLoginService.trySilentLogin()
    .then(function(data) {
       // user is previously logged with Google and we have his data we will let him access the app
      env.nav.setRoot(env.main_page.component);
    }, function(error){
      //we don't have the user data so we will ask him to log in
      env.googleLoginService.doGoogleLogin()
      .then(function(res){
        env.loading.dismiss();
        env.nav.setRoot(env.main_page.component);
      }, function(err){
        console.log("Google Login error", err);
        env.loading.dismiss();
      });
    });
  }

  showTermsModal() {
    let modal = this.modal.create(TermsOfServicePage);
    modal.present();
  }

  showPrivacyModal() {
    let modal = this.modal.create(PrivacyPolicyPage);
    modal.present();
  }

}
