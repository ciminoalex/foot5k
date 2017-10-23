import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { GlobalVars } from '../../components/global-variables';

/*
  Generated class for the GroupsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class GroupsProvider {

  CurrentGroup: any;

  constructor(public http: Http, public global_vars: GlobalVars) {
    console.log('Hello GroupsProvider Provider');
  }

  getUserGroups(uid:string): Observable<any> {
    console.log(this.global_vars.json_url + '?action=getusergroups&uid='+uid);
    return this.http.get(this.global_vars.json_url + '?action=getusergroups&uid='+uid).map(res => res.json());
  }

  getGroups(text:string): Observable<any> {
    text = encodeURIComponent(text);
    console.log(this.global_vars.json_url + '?action=getgroups&text='+text);
    return this.http.get(this.global_vars.json_url + '?action=getgroups&text='+text).map(res => res.json());
  }

  getGroup(id:string): Observable<any> {
    id = encodeURIComponent(id);
    console.log(this.global_vars.json_url + '?action=getgroup&gid='+id);
    return this.http.get(this.global_vars.json_url + '?action=getgroup&gid='+id).map(res => res.json());
  }

  addGroup(name:string, descrizione:string, passcode:string, owner:string, image:string, color:string): Observable<any> {
    name = encodeURIComponent(name);
    descrizione = encodeURIComponent(descrizione);
    passcode = encodeURIComponent(passcode);
    owner = encodeURIComponent(owner);
    image = encodeURIComponent(image);
    color = encodeURIComponent(color);
    
    console.log(this.global_vars.json_url + '?action=addgroup&nome='+name+'&passcode='+passcode+'&owner='+owner+'&descrizione='+descrizione+'&image='+image+'&color='+color);
    return this.http.get(this.global_vars.json_url + '?action=addgroup&nome='+name+'&passcode='+passcode+'&owner='+owner+'&descrizione='+descrizione+'&image='+image+'&color='+color).map(res => res.json());
  }

  updateGroup(id:string, name:string, descrizione:string, passcode:string, image:string, color:string): Observable<any> {
    id = encodeURIComponent(id);
    name = encodeURIComponent(name);
    descrizione = encodeURIComponent(descrizione);
    passcode = encodeURIComponent(passcode);
    image = encodeURIComponent(image);
    color = encodeURIComponent(color);
    
    console.log(this.global_vars.json_url + '?action=updategroup&gid='+id+'&nome='+name+'&passcode='+passcode+'&descrizione='+descrizione+'&image='+image+'&color='+color);
    return this.http.get(this.global_vars.json_url + '?action=updategroup&gid='+id+'&nome='+name+'&passcode='+passcode+'&descrizione='+descrizione+'&image='+image+'&color='+color).map(res => res.json());
  }

  deleteGroup(id:string){
    console.log(this.global_vars.json_url + '?action=deletegroup&gid='+id+'');
    return this.http.get(this.global_vars.json_url + '?action=deletegroup&gid='+id+'').map(res => res.json());
  }

  isMyGroup(id:string, uid:string): Observable<any> {
    id = encodeURIComponent(id);
    uid = encodeURIComponent(uid);
   
    console.log(this.global_vars.json_url + '?action=ismygroup&gid='+id+'&uid='+uid);
    return this.http.get(this.global_vars.json_url + '?action=ismygroup&gid='+id+'&uid='+uid).map(res => res.json());
  }

  enterGroup(uid:string, gid:string, passcode:string): Observable<any> {
    uid = encodeURIComponent(uid);
    gid = encodeURIComponent(gid);
    passcode = encodeURIComponent(passcode);
    
    console.log(this.global_vars.json_url + '?action=entergroup&gid='+gid+'&uid='+uid+'&passcode='+passcode);
    return this.http.get(this.global_vars.json_url + '?action=entergroup&gid='+gid+'&uid='+uid+'&passcode='+passcode).map(res => res.json());
  }

  leaveGroup(uid:string, gid:string): Observable<any> {
    uid = encodeURIComponent(uid);
    gid = encodeURIComponent(gid);
    
    console.log(this.global_vars.json_url + '?action=leavegroup&gid='+gid+'&uid='+uid);
    return this.http.get(this.global_vars.json_url + '?action=leavegroup&gid='+gid+'&uid='+uid).map(res => res.json());
  }

}
