import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { UserService } from '../user.service';
import { User } from '../interfaces';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserEditGuard implements CanActivate {
  user:User;

  constructor(private router: Router, private userService: UserService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    this.user = this.userService.getUser();
    if(!(this.user != undefined || this.user != null)){
      this.router.navigate(['/login']);
      return of(false );
    }
    return of(true);

  }
}
