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

  deleteMatch(id:string){
    console.log(this.global_vars.json_url + '?action=deletematch&mid='+id+'');
    return this.http.get(this.global_vars.json_url + '?action=deletematch&mid='+id+'').map(res => res.json());
  }
  addMatch(date:string, time:string, timeto:string, campo:string, owner:string, players:string, groupid:string, allgroup:boolean): Observable<any> {
    date = encodeURIComponent(date);
    time = encodeURIComponent(time);
    timeto = encodeURIComponent(timeto);
    campo = encodeURIComponent(campo);
    owner = encodeURIComponent(owner);
    players = encodeURIComponent(players);
    groupid = encodeURIComponent(groupid);
    var all_group = "off";
    if(allgroup)
      all_group = "on";
    
    console.log(this.global_vars.json_url + '?action=addmatch&date='+date+'&time='+time+'&timeto='+timeto+'&campo='+campo+'&owner='+owner+'&type=1&players='+players+'&groupid='+groupid+'&allgroups='+all_group);
    return this.http.get(this.global_vars.json_url + '?action=addmatch&date='+date+'&time='+time+'&timeto='+timeto+'&campo='+campo+'&owner='+owner+'&type=1&players='+players+'&groupid='+groupid+'&allgroups='+all_group).map(res => res.json());
  }

  updateMatch(id:string, date:string, time:string, timeto:string, campo:string, owner:string, players:string, groupid:string, allgroup:boolean): Observable<any> {
    date = encodeURIComponent(date);
    time = encodeURIComponent(time);
    timeto = encodeURIComponent(timeto);
    campo = encodeURIComponent(campo);
    owner = encodeURIComponent(owner);
    players = encodeURIComponent(players);
    groupid = encodeURIComponent(groupid);
    var all_group = "off";
    if(allgroup)
      all_group = "on";
    
    console.log(this.global_vars.json_url + '?action=updatematch&mid='+id+'&date='+date+'&time='+time+'&timeto='+timeto+'&campo='+campo+'&owner='+owner+'&type=1&players='+players+'&groupid='+groupid+'&allgroups='+all_group);
    return this.http.get(this.global_vars.json_url + '?action=updatematch&mid='+id+'&date='+date+'&time='+time+'&timeto='+timeto+'&campo='+campo+'&owner='+owner+'&type=1&players='+players+'&groupid='+groupid+'&allgroups='+all_group).map(res => res.json());
  }

  addGuest(id:string,guestName:string){
    guestName = encodeURIComponent(guestName);
    console.log(this.global_vars.json_url + '?action=addguest&mid='+id+'&name='+guestName);
    return this.http.get(this.global_vars.json_url + '?action=addguest&mid='+id+'&name='+guestName).map(res => res.json());
  }

  deleteGuest(guestId:string){
    console.log(this.global_vars.json_url + '?action=deleteguest&uid='+guestId);
    return this.http.get(this.global_vars.json_url + '?action=deleteguest&uid='+guestId).map(res => res.json());
  }

}
