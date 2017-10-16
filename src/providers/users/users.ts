import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { UserObject } from './users.model';
import { GlobalVars } from '../../components/global-variables';


/*
  Generated class for the UsersProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UsersProvider {

  constructor(public http: Http, public global_vars: GlobalVars) {
  }

  CurrentUser: UserObject;

  load() {
  }

  addUser(){

  }

  updateUser(id:string, name:string, role:string, description:string): Observable<UserObject> {

    name = encodeURIComponent(name);
    role = encodeURIComponent(role);
    description = encodeURIComponent(description);
        
    console.log(this.global_vars.json_url + '?action=updateuser&id='+id+'&name='+name+'&role='+role+'&description='+description+'');
    return this.http.get(this.global_vars.json_url + '?action=updateuser&id='+id+'&name='+name+'&role='+role+'&description='+description+'').map(res => res.json());
  }

  deleteUser(){

  }

  logInMail(email:string, password:string): Observable<UserObject> {
    return this.http.get(this.global_vars.json_url + '?action=userbyem&eml='+email+'&pwd='+password+'').map(res => res.json());
  }

  getUserByID(ID:string): Observable<UserObject> {
    console.log(this.global_vars.json_url + '?action=userbyid&uid='+ID+'&load=true');
    return this.http.get(this.global_vars.json_url + '?action=userbyid&uid='+ID+'&load=true').map(res => res.json());
  }

  signUpMail(email:string, password:string): Observable<UserObject> {
    return this.http.get(this.global_vars.json_url + '?action=signupmail&eml='+email+'&pwd='+password+'').map(res => res.json());
  }
  
  logOut(){

  }

}
