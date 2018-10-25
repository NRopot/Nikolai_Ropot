import { ValidatorFn, AbstractControl } from '@angular/forms';

import * as moment from'moment';

export function dateValidator(format:string):ValidatorFn{
	return ({value}: AbstractControl)=>{
		const enterDate = moment(value,format,true);
		return enterDate.isValid() ? null : { errors : {isValid : false}};
	};
}