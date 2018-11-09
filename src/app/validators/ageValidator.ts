import { AbstractControl } from '@angular/forms';

export function ageValidator( {value}: AbstractControl ):boolean | {}{
	if(isNaN(+value)){
		return { age : true };
	}else{
		const valid = +value >= 18 && +value <= 65;
		return valid ? null : { errors: {
			age: true,
			isNaN: isNaN(+value)
		} };
	}
};