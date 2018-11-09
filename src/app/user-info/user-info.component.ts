import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';

import { HttpService } from '../http.service';
import { UserService } from '../user.service';
import { AuthService } from '../auth/auth.service';
import { User } from '../interfaces';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  user:User;
	formModel: FormGroup;
  constructor( 
  	public http: HttpService, 
  	public router: Router,
    public fb: FormBuilder,
    public userService: UserService
  ) { }

  ngOnInit() {
    this.formModel = this.fb.group({
      'username': [''],
      'birthday': [''],
      'dateLogin': [''],
      'dateNotification': [''],
      'information':['']
    });

    this.user = this.userService.getUser();
    if(this.user){
      this.setFormValue();
    }
  }

  setFormValue(){
    this.formModel.patchValue({
      username: this.user.name,
      birthday: this.user.birthDate,
      dateNotification: this.user.notifyDate,
      dateLogin: this.user.firstLogin,
      information: this.user.information
    });
  }
}
