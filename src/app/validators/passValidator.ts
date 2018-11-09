import { ValidatorFn, AbstractControl } from "@angular/forms";
import { Observable, of } from "rxjs";
import { delay } from "rxjs/operators";

export function passValidator(  ):ValidatorFn{
    return ( {value}: AbstractControl):Observable<boolean | {}>=>{
        console.log( this.loginForm);
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