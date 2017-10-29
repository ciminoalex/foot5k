import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';

import { TabsNavigationPage } from '../tabs-navigation/tabs-navigation';
import { SignupPage } from '../signup/signup';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';

import { SettingsPage } from '../settings/settings';

import { FacebookLoginService } from '../facebook-login/facebook-login.service';
import { GoogleLoginService } from '../google-login/google-login.service';
import { TwitterLoginService } from '../twitter-login/twitter-login.service';

import { UsersProvider } from '../../providers/users/users';
import { LocalInfoProvider } from '../../providers/local-info/local-info';
import { UserObject } from '../../providers/users/users.model';

import { NativeStorage } from '@ionic-native/native-storage';
import { Storage } from '@ionic/Storage';


@Component({
  selector: 'login-page',
  templateUrl: 'login.html'
})
export class LoginPage {
  login: FormGroup;
  main_page: { component: any };
  loading: any;
  user: UserObject;
  msg: string;
  

  constructor(
    public nav: NavController,
    public facebookLoginService: FacebookLoginService,
    public googleLoginService: GoogleLoginService,
    public twitterLoginService: TwitterLoginService,
    public loadingCtrl: LoadingController,
    public UsersService: UsersProvider,
    public nativeStorage: NativeStorage,
    public storage: Storage,
    public LocalInfo: LocalInfoProvider ) {
    this.main_page = { component: TabsNavigationPage };

    this.loading = this.loadingCtrl.create();
    
    this.login = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  doLogin(){
    this.loading.present();
    
    this.UsersService.logInMail(this.login.controls.email.value,this.login.controls.password.value).subscribe(data=>{
      this.user = data; 
      console.log(this.user)
      if(this.user==null)
      {
        this.msg = "Email not found!";
        this.loading.dismiss();
      }else{

        this.main_page = { component: TabsNavigationPage };

        if(this.user.NomeCompleto==this.user.Email)
        {
          this.main_page = { component: SettingsPage };
        }
        

        this.UsersService.getUserByID(this.user.ID).subscribe(data=>{
          this.user = data; 

          this.LocalInfo.CurrentUserID = this.user.ID;
          this.LocalInfo.CurrentUserObj = this.user;
          this.storage.set('UserDeviceAuth',{UserID: this.LocalInfo.CurrentUserID});
          this.loading.dismiss();
          this.nav.setRoot(this.main_page.component);

        });
    
      }
    })
  }

  doFacebookLogin() {
    this.loading = this.loadingCtrl.create();
    this.loading.present();
    
    // Here we will check if the user is already logged in because we don't want to ask users to log in each time they open the app
    // let this = this;

    //this.msg = 'START';

    this.facebookLoginService.getFacebookUser()
    .then((data) => {
       // user is previously logged with FB and we have his data we will let him access the app
       //this.msg = 'START | '+ data.userId + ' | '+ data.name + ' | '+ data.email + '' ;

       this.UsersService.logInFacebook(data.userId,data.name,data.email).subscribe(data=>{
        this.user = data; 
        console.log(this.user)
        if(this.user==null)
        {
          this.loading.dismiss();
          //this.msg = "Account not found!";
        }else{
  
          this.main_page = { component: TabsNavigationPage };
  
          if(this.user.NomeCompleto==this.user.Email)
          {
            this.main_page = { component: SettingsPage };
          }
          
          this.LocalInfo.CurrentUserID = this.user.ID;
          this.LocalInfo.CurrentUserObj = this.user;
          this.storage.set('UserDeviceAuth',{UserID: this.LocalInfo.CurrentUserID});
          this.loading.dismiss();
          this.nav.setRoot(this.main_page.component);
        }
      })
     
       //this.nav.setRoot(this.main_page.component);
    }, (error) => {
      //this.msg = 'START | ERROR | ';
      //we don't have the user data so we will ask him to log in
      this.facebookLoginService.doFacebookLogin()
      .then((res) => {

        this.UsersService.logInFacebook(res.userId,res.name,res.email).subscribe(data=>{
          this.user = data; 
          console.log(this.user)
          if(this.user==null)
          {
            this.loading.dismiss();
            //this.msg = "Account not found!";
          }else{
    
            this.main_page = { component: TabsNavigationPage };
    
            if(this.user.NomeCompleto==this.user.Email)
            {
              this.main_page = { component: SettingsPage };
            }
          
            this.LocalInfo.CurrentUserID = this.user.ID;
            this.LocalInfo.CurrentUserObj = this.user;
            this.storage.set('UserDeviceAuth',{UserID: this.LocalInfo.CurrentUserID});
            this.loading.dismiss();
            this.nav.setRoot(this.main_page.component);
            }
        })
            
      }, (err) => {
        console.log("Facebook Login error", err);
      });
    });
  }

  doGoogleLogin() {
    this.loading = this.loadingCtrl.create();

    // Here we will check if the user is already logged in because we don't want to ask users to log in each time they open the app

    this.googleLoginService.trySilentLogin()
    .then((data) => {
       // user is previously logged with Google and we have his data we will let him access the app
      //this.msg = "Account:"+data.email;
      this.nav.setRoot(this.main_page.component);
    }, (error) => {
      //we don't have the user data so we will ask him to log in
      this.googleLoginService.doGoogleLogin()
      .then((res) => {

        //this.msg = "Account:"+res.email;
        

        this.UsersService.logInGoogle(res.userId,res.name,res.email,res.image).subscribe(data=>{
          this.user = data; 
          console.log(this.user)
          if(this.user==null)
          {
            this.loading.dismiss();
            this.msg = "Account not found!";
          }else{
    
            this.main_page = { component: TabsNavigationPage };
    
            if(this.user.NomeCompleto==this.user.Email)
            {
              this.main_page = { component: SettingsPage };
            }
          
            this.LocalInfo.CurrentUserID = this.user.ID;
            this.LocalInfo.CurrentUserObj = this.user;
            this.storage.set('UserDeviceAuth',{UserID: this.LocalInfo.CurrentUserID});
            this.loading.dismiss();
            this.nav.setRoot(this.main_page.component);
            }
        })
      }, (err) => {
        this.msg = "Google Login error, "+err;
        console.log("Google Login error", err);
      });
    });
  }

  doTwitterLogin(){
    this.loading = this.loadingCtrl.create();

    // Here we will check if the user is already logged in because we don't want to ask users to log in each time they open the app

    this.twitterLoginService.getTwitterUser()
    .then((data) => {
       // user is previously logged with FB and we have his data we will let him access the app
      this.nav.setRoot(this.main_page.component);
    }, (error) => {
      //we don't have the user data so we will ask him to log in
      this.twitterLoginService.doTwitterLogin()
      .then((res) => {
        this.loading.dismiss();
        this.nav.setRoot(this.main_page.component);
      }, (err) => {
        console.log("Twitter Login error", err);
      });
    });
  }

  goToSignup() {
    this.nav.push(SignupPage);
  }

  goToForgotPassword() {
    this.nav.push(ForgotPasswordPage);
  }

}
