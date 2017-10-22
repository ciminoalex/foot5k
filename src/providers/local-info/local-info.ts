import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { UserObject } from '../../providers/users/users.model';

/*
  Generated class for the LocalInfoProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class LocalInfoProvider {

  public CurrentUserID: string;
  public CurrentUserObj: UserObject;
  public CurrentMatchID: string;
  public CurrentGroupID: string;
  public CurrentUserGroups: any[];
  
  constructor(public http: Http) {
    this.CurrentUserID = '';
    this.CurrentUserObj = null;
    this.CurrentMatchID = '';
    this.CurrentGroupID = '';
  }

}
