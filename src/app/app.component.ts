import { Component, OnInit  } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';

import { ageValidator } from './shared/ageValidator';
import { dateValidator } from './shared/dateValidator';
import { nameValidator } from './shared/nameValidator';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  formModel: FormGroup;

	ngOnInit(){
	    this.formModel = this.fb.group({
			'firstName': ['',null,
				nameValidator
			],
			'age':  ['',
				ageValidator
			],
			'birthday':['',[
				Validators.required,
				dateValidator("YYYY/MM/DD")
			]],
			'dateLogin':['',[
				Validators.required,
				dateValidator("DD MMMM YYYY")
			]],
			'dateNotification':['',[
				Validators.required,
				dateValidator("DD-MMM-YY")
			]]
		});
	}

	onSubmit() {
		if(this.formModel.valid){
			console.warn('Submit', this.formModel.value);
		}
	}
  constructor(private fb: FormBuilder) { }

}

//спросить про иконки
//сделать 1 таск
