import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User, UserLogin } from './interfaces';
import { delay, share, map } from 'rxjs/operators';
import { UserService } from 'src/app/user.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private BASE_URL = 'http://localhost:8080';
  options = {
    withCredentials:true,
    headers: new HttpHeaders({'content-type': 'application/json'})
  };

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private userService: UserService ) {
    }
  
  login(user: UserLogin): Observable<User> {
    return this.http.post<User>(`${this.BASE_URL}/login`, user, this.options).pipe(delay(1000), share());
  }

  forgotPassword(user: UserLogin): Observable<User> {
    return this.http.post<User>(`${this.BASE_URL}/forgotPassword`, user).pipe(delay(1000),share() );
  }

  getUsers(): Observable<User> {
    return this.http.get<User>(`${this.BASE_URL}/users`);
  }

  getUser(name:string): Observable<User> {
    return this.http.get<User>(`${this.BASE_URL}/users/${name}`);
  }

  setUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.BASE_URL}/users/${user.id}`, user);
  }

  changeUser(id: number,value:User): Observable<void> {
    return this.http.put<void>(`${this.BASE_URL}/users:${id}`, value);
  }

  saveCookie(key:string, value:string){
    this.cookieService.set(key, value);
  }

  checkCookie(key:string){
    return this.cookieService.check(key);
  }

  getCookie(key:string){
    return this.cookieService.get(key);
  }

  deleteCookie(){
    console.log(this.cookieService.get('isLogged'));
    return this.http.get<User>(`${this.BASE_URL}/logout`,this.options);
  }

}
