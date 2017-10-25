import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Http } from '@angular/http';

import { LoginPage } from '../pages/login/login';
import { NotificationsPage } from '../pages/notifications/notifications';
import { TabsNavigationPage } from '../pages/tabs-navigation/tabs-navigation';
import { WalkthroughPage } from '../pages/walkthrough/walkthrough';
import { SettingsPage } from '../pages/settings/settings';
import { SignupPage } from '../pages/signup/signup';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
import { TermsOfServicePage } from '../pages/terms-of-service/terms-of-service';
import { PrivacyPolicyPage } from '../pages/privacy-policy/privacy-policy';

import { ProfileService } from '../pages/profile/profile.service';
import { FacebookLoginService } from '../pages/facebook-login/facebook-login.service';
import { GoogleLoginService } from '../pages/google-login/google-login.service';
import { TwitterLoginService } from '../pages/twitter-login/twitter-login.service';

import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SocialSharing } from '@ionic-native/social-sharing';
import { NativeStorage } from '@ionic-native/native-storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { Keyboard } from '@ionic-native/keyboard';
import { Geolocation } from '@ionic-native/geolocation';
import { TwitterConnect } from '@ionic-native/twitter-connect';
import { AdMobFree } from '@ionic-native/admob-free';
import { AppRate } from '@ionic-native/app-rate';
import { ImagePicker } from '@ionic-native/image-picker';
import { Crop } from '@ionic-native/crop';
import { EmailComposer } from '@ionic-native/email-composer';

// Functionalities

import { VideoPlayerModule } from '../components/video-player/video-player.module';
import { ValidatorsModule } from '../components/validators/validators.module';

import { LanguageService } from '../providers/language/language.service';
import { UsersProvider } from '../providers/users/users';

import { GlobalVars } from '../components/global-variables';
import { LocalInfoProvider } from '../providers/local-info/local-info';
import { MatchesProvider } from '../providers/matches/matches';
import { GroupsProvider } from '../providers/groups/groups';

export function createTranslateLoader(http: Http) {
	return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    NotificationsPage,
    TabsNavigationPage,
    WalkthroughPage,
    SettingsPage,
    SignupPage,
    ForgotPasswordPage,
    TermsOfServicePage,
    PrivacyPolicyPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
			modalEnter: 'modal-slide-in',
			modalLeave: 'modal-slide-out',
			pageTransition: 'ios-transition',
			swipeBackEnabled: false
		}),
		TranslateModule.forRoot({
    loader: {
				provide: TranslateLoader,
				useFactory: (createTranslateLoader),
				deps: [Http]
			}
		}),
		VideoPlayerModule,
		ValidatorsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    NotificationsPage,
    TabsNavigationPage,
    WalkthroughPage,
    SettingsPage,
    ForgotPasswordPage,
    SignupPage,
    TermsOfServicePage,
    PrivacyPolicyPage,
  ],
  providers: [
    ProfileService,

    FacebookLoginService,
    GoogleLoginService,
    TwitterLoginService,
		LanguageService,

	  SplashScreen,
	  StatusBar,
    SocialSharing,
    NativeStorage,
    InAppBrowser,
    Facebook,
    GooglePlus,
    Keyboard,
    Geolocation,
    TwitterConnect,
		AdMobFree,
		AppRate,
		ImagePicker,
		Crop,
		EmailComposer,
    UsersProvider,
    GlobalVars,
    LocalInfoProvider,
    MatchesProvider,
    GroupsProvider
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
