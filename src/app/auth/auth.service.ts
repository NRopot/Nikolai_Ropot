import { Injectable, OnInit } from '@angular/core';

import { Observable, of, Subject } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { HttpService } from '../http.service';
import { UserService } from 'src/app/user.service';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Injectable({
  providedIn:'root'
})
export class AuthService implements OnInit{
  
  constructor(
    private httpService: HttpService,
    private userService: UserService,
    public router:Router
  ) {}

  ngOnInit() {
  }

}
