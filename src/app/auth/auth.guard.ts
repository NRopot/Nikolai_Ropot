import { Injectable, ViewChild } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { HttpService } from '../http.service';
import { UserService } from '../user.service';
import { map, delay,  } from 'rxjs/operators';
import * as moment from 'moment';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn:'root'
})
export class AuthGuard implements CanActivate {
  isLogged:boolean;

  constructor(
    private authService:AuthService, 
    private router: Router,
    private httpService: HttpService,
    private userService: UserService
  ){
    this.httpService.login(null).subscribe((val)=>{
      if(val){
        val.birthDate = moment(val.birthDate).format("YYYY/MM/DD").toString();
        val.firstLogin = moment(val.firstLogin).format("DD MMMM YYYY").toString();
        val.notifyDate = moment(val.notifyDate).format("DD-MMM-YY").toString();
        this.userService.setUser(val);
        
        
        this.router.navigate(['/user-info']); 
      }
    });
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    if(this.userService.getUser()){
      this.router.navigate(['/user-info']);
      return of(false) ;
    }
    return of(true);
  }
}
