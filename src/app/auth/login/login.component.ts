import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';
import { HttpService } from 'src/app/http.service';
import { UserService } from 'src/app/user.service';
import { AppComponent } from '../../app.component';
import { FormBuilder, Validators, FormGroup, AbstractControl, ValidatorFn, FormControl} from '@angular/forms';
import {  nameValidator } from '../../validators';
import { UserLogin, User } from '../../interfaces';
import { Router, NavigationExtras } from '@angular/router';
import * as moment from 'moment';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user: UserLogin = { name: '', password: '' };

  constructor(
    public translate: TranslateService,
    public router: Router,
    private fb: FormBuilder,
    private http: HttpService,
    public userService: UserService,
    private appComponent: AppComponent

  ) { }

  ngOnInit(){
    this.loginForm = this.fb.group({
      'username':['',[],nameValidator],
      'password': ['', Validators.required],
      'pconfirm':['', [Validators.required],this.passValidator() ]
    });
  }

  passValidator(  ):ValidatorFn{
    return ( {value}: AbstractControl):Observable<boolean |{}>=>{
      const passValue = this.loginForm.value.password;
      const pconfirmValue = value;
      if(passValue && pconfirmValue){
        const valid = passValue === pconfirmValue;
        return of(valid ? null : { errors:{
          password: true ,
          passwordValue: passValue,
          pconfirmValue: pconfirmValue
        } }).pipe(delay(100));
      }else{
        return of({password:false}).pipe(delay(100));
      }
    };
      
  }
  login(user:UserLogin) {
    this.appComponent.setLoading(true);
    this.http.login(user).subscribe((val) => {
        if (val) {
          val.birthDate = moment(val.birthDate).format("YYYY/MM/DD").toString();
          val.firstLogin = moment(val.firstLogin).format("DD MMMM YYYY").toString();
          val.notifyDate = moment(val.notifyDate).format("DD-MMM-YY").toString();

          this.appComponent.setLogged(true);
          this.userService.setUser(val);
          this.router.navigate(['/user-info']);
        } 
      },
      ()=>{this.appComponent.setLoading(false)},
      ()=>{
        this.appComponent.setLoading(false);
      }
    );
  }
 

  onSubmit() {
    if (this.loginForm.valid) {
      this.user.name = this.loginForm.get('username').value;
      this.user.password = this.loginForm.get('password').value;
      this.login(this.user);
    }
  }

}
