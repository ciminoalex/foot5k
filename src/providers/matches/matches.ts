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
  
  getaPlayerMatchStatus(ID:string, pID:string): Observable<any> {
    console.log(this.global_vars.json_url + '?action=mymatchstatus&mid='+ID+'&uid='+pID+'');
    return this.http.get(this.global_vars.json_url + '?action=mymatchstatus&mid='+ID+'&uid='+pID+'').map(res => res.json());
  }

  matchAction(ID:string, pID:string, Value:string): Observable<any> {
    console.log(this.global_vars.json_url + '?action=matchaction&mid='+ID+'&uid='+pID+'&value='+Value);
    return this.http.get(this.global_vars.json_url + '?action=matchaction&mid='+ID+'&uid='+pID+'&value='+Value).map(res => res.json());
  }

  addMatch(date:string, time:string, timeto:string, campo:string, owner:string, players:string, groupid:string): Observable<any> {
    console.log(this.global_vars.json_url + '?action=addmatch&date='+date+'&time='+timeto+'&campo='+campo+'&owner='+owner+'&type=1&players'+players+'&groupid='+groupid+'&allgroup=1');
    return this.http.get(this.global_vars.json_url + '?action=addmatch&date='+date+'&time='+timeto+'&campo='+campo+'&owner='+owner+'&type=1&players'+players+'&groupid='+groupid+'&allgroup=1').map(res => res.json());
  }


}
