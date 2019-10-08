import { AbstractControl } from '@angular/forms';

export function emailValidator(control : AbstractControl) : {[key : string] : any} | null{
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const eValid = emailRegex.test(control.value);
    return eValid ? {'emailValid' : {value: control.value} } : null; 
}