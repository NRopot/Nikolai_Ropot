import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { AuthService } from './auth/auth.service';
import { Observable, pipe } from 'rxjs';
import { Router, NavigationExtras } from '@angular/router';
import { UserService } from './user.service';
import { map, delay } from 'rxjs/operators';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private isLogged:  boolean;
  private isLoading: boolean = false;

  constructor(
    public translate: TranslateService,
    public router: Router,
    public userService: UserService,
    public httpService: HttpService
  ) {
    translate.addLangs(['en', 'ru']);
    translate.setDefaultLang('en');
    //const browserLang = translate.getBrowserLang();
    //translate.use(browserLang.match(/en|ru/) ? browserLang : 'en');
  }

  ngOnInit() {
  }

  logout() {
    this.isLogged = false;
    this.userService.setUser(null);
    this.httpService.deleteCookie().subscribe();

    pipe(delay(2000));
    
    this.router.navigate(['/login']);
  }
  setLogged(logged:boolean) {
    this.isLogged = logged;
  }
  
  setLoading(loading:boolean) {
    this.isLoading = loading;
  }
}
