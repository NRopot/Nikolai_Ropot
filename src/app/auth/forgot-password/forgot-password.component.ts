import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';

import { HttpService } from 'src/app/http.service';
import { ageValidator, dateValidator, nameValidator } from '../../validators';
import { AuthService } from '../auth.service';
import { UserLogin } from '../../interfaces';
import { UserService } from '../../user.service';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  private forgotForm:FormGroup;
  private userFrogot: UserLogin = { name:'', password:''};

  constructor(
    public authService: AuthService,
    private router:Router,
    private fb: FormBuilder,
    private http: HttpService,
    private userService:UserService ,
    private appComponent: AppComponent ) { }

  ngOnInit() {
    this.forgotForm = this.fb.group({
      'username':['',null,nameValidator],
      'newPassword': ['',Validators.required ],
      'pconfirm':['',Validators.required]
    });
  }

  login() {
    this.userFrogot.name = this.forgotForm.get('username').value;
    this.userFrogot.password = this.forgotForm.get('newPassword').value;
    this.appComponent.setLoading(true);
    this.http.forgotPassword(this.userFrogot).subscribe((val) => {
      if (val) {
        val.birthDate = moment(val.birthDate).format("YYYY/MM/DD").toString();
        val.firstLogin = moment(val.firstLogin).format("DD MMMM YYYY").toString();
        val.notifyDate = moment(val.notifyDate).format("DD-MMM-YY").toString();

        this.userService.setUser(val);
        this.router.navigate(['/user-info']);
      }
    },
    (err)=>{this.appComponent.setLoading(false);console.log(err)},
    ()=>{this.appComponent.setLoading(false)}
  );
  }

  onSubmit(){
    if (this.forgotForm.valid){
      this.login();
    }
  }

}
