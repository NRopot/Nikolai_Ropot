import { AbstractControl } from '@angular/forms';

import { Observable , of} from 'rxjs';
import { delay } from 'rxjs/operators';

export function nameValidator( {value}: AbstractControl ):Observable<any>{
	if(!value){
		return of({name:false});
	}else{
		const valid = 
			value.split(' ')
				.every( item =>item.charAt(0) === item.charAt(0).toUpperCase() ) && 
				value.split(' ').length <= 2;
		return of(valid ? null : { errors:{
			name: true ,
			nameValue: value
		}}).pipe(delay(3000));
	}
	
}