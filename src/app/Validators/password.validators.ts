import { AbstractControl } from '@angular/forms';

export function passwordValidator(control : AbstractControl) : {[key : string] : boolean} | null {
    const password = control.get('password');
    const confPassword = control.get('confPassword');
    if(password.pristine || confPassword.pristine){
        return null;
    }
    
    return password && confPassword && password.value !== confPassword.value ?
     {'misMatch' : true} : null;
}