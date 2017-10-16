import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { GlobalVars } from '../../components/global-variables';

/*
  Generated class for the MatchesProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class MatchesProvider {

  constructor(public http: Http, public global_vars: GlobalVars) {
  }

  CurrentMatch: any;
  
  getaMatchByID(ID:string): Observable<any> {
    console.log(this.global_vars.json_url + '?action=match&mid='+ID+'');
    return this.http.get(this.global_vars.json_url + '?action=match&mid='+ID+'').map(res => res.json());
  }


}
