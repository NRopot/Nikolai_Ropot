import { Injectable, OnInit } from '@angular/core';

import { Observable, of, Subject } from 'rxjs';
import { User } from './interfaces';
import { delay } from 'rxjs/operators';
import { HttpUserEvent } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {
  private user: User;

  constructor() { }

  ngOnInit() {
		
  }
  getUser(): User{
    return this.user;
  }

  setUser(user: User){
    this.user = user;
  }
}
