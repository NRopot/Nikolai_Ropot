import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';

import { ageValidator, dateValidator, nameValidator } from '../validators';
import { UserService } from '../user.service';
import { AuthService } from '../auth/auth.service';
import { HttpService } from '../http.service';
import { User } from '../interfaces';

@Component({
	selector: 'app-user-edit',
	templateUrl: './user-edit.component.html',
	styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit{
  user: User;
  formModel: FormGroup;

  constructor(
    private fb: FormBuilder,
    public httpService: HttpService,
		public authService:AuthService,
    public router: Router,
    public userService: UserService) { }

  ngOnInit() {
    this.formModel = this.fb.group({
      'username': ['', null,
        nameValidator
      ],
      'birthday': ['', [
        Validators.required,
        dateValidator("YYYY/MM/DD")
      ]],
      'dateLogin': ['', [
        Validators.required,
        dateValidator("DD MMMM YYYY")
      ]],
      'dateNotification': ['', [
        Validators.required,
        dateValidator("DD-MMM-YY")
      ]],
      'information':['', Validators.required]
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
  onSubmit() {
    if (this.formModel.valid) {
      this.user.name = this.formModel.get('username').value;
      this.user.firstLogin = this.formModel.get('dateLogin').value;
      this.user.birthDate = this.formModel.get('birthday').value;
      this.user.notifyDate = this.formModel.get('dateNotification').value;
      this.user.information = this.formModel.get('information').value;
      
      this.httpService.setUser(this.user);
      this.router.navigate(['/user-info']);
    }
  }

}
