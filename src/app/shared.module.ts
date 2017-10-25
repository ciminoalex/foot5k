import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Http } from '@angular/http';
import {TranslateService} from '@ngx-translate/core';
import { CommonModule } from '@angular/common';


import { PreloadImage } from '../components/preload-image/preload-image';
import { BackgroundImage } from '../components/background-image/background-image';
import { ShowHideContainer } from '../components/show-hide-password/show-hide-container';
import { ShowHideInput } from '../components/show-hide-password/show-hide-input';
import { ColorRadio } from '../components/color-radio/color-radio';
import { CounterInput } from '../components/counter-input/counter-input';
import { Rating } from '../components/rating/rating';

export function TranslateLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    PreloadImage,
    BackgroundImage,
    ShowHideContainer,
    ShowHideInput,
    ColorRadio,
    CounterInput,
    Rating
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (TranslateLoaderFactory),
        deps: [ Http ]
      }
    })
  ],
  exports: [
    PreloadImage,
    BackgroundImage,
    ShowHideContainer,
    ShowHideInput,
    ColorRadio,
    CounterInput,
    Rating,
    TranslateModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class SharedModule {
}