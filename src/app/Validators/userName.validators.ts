import { AbstractControl } from '@angular/forms';

export function userNameValidator(control : AbstractControl) : {[key : string] : any} | null{
    const admins = /admin/.test(control.value);
    return admins ? {'adminName' : {value: control.value} } : null; 
}