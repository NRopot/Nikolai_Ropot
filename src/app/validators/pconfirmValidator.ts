import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';

import { Observable , of} from 'rxjs';
import { delay } from 'rxjs/operators';

export function pconfirmValidator( formModel: FormGroup ):ValidatorFn{
	return ({value}: AbstractControl)=> {
		if(value){
			console.log(formModel.value);
			const valid = formModel.get('password').value === value;
			return valid ? null : { errors:{
				password: true ,
				passValue: value
		}};
		}else{
		return {password:false};
		}
	};
}