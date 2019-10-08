import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, NgForm } from '@angular/forms';
import { passwordValidator } from './Validators/password.validators';
import { userNameValidator } from './Validators/userName.validators';
import { SignupService } from './signup.service';
import { emailValidator } from './Validators/email.validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'reactiveForms';
  signupForm : FormGroup;
  public errorMsg="";
  
  public pinRegex = "^[0-9]{6}";
  public phoneRegex = "^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$";
  public emailRegex = "^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$";
  public nameRegex = "^[a-zA-Z \s]+$";
  

  constructor(private fb : FormBuilder, private _signup : SignupService){}

 // Creating Form Model using FormBuilder

 get userName(){
   return this.signupForm.get('userName');
 }
 get email(){
   return this.signupForm.get('email');
 }
 get password(){
   return this.signupForm.get('password');
 }
 get cPassword(){
   return this.signupForm.get('confPassword');
 }
 get pin(){
  return this.signupForm.controls.address.get('pin');
 }
 get state(){
   return this.signupForm.controls.address.get('state');
 }
 get city(){
   return this.signupForm.controls.address.get('city');
 }



  ngOnInit(){
    this.signupForm = this.fb.group({
      userName : ['',[Validators.pattern,Validators.required,Validators.minLength(2),Validators.maxLength(20),userNameValidator]],
      email : [''],
      subscribe : [false],
      password : ['',[Validators.required,Validators.minLength(6),Validators.maxLength(10)]],
      confPassword : ['',[Validators.required]],
      address : this.fb.group({
        city : ['',[Validators.required]],
        state : ['',[Validators.required]],
        pin : ['',[Validators.required,Validators.maxLength(6),Validators.minLength(6),Validators.pattern(this.pinRegex)]]
      })
    },{validator : passwordValidator});


    this.signupForm.get('subscribe').valueChanges
        .subscribe(checkedValue =>
          {
            
            const email =this.signupForm.get('email');      
            if(checkedValue){
              email.setValidators([Validators.required,Validators.pattern(this.emailRegex)]);
            }
            else{
              email.clearValidators();
            }
            email.updateValueAndValidity();
          })
  }




  // Creating Form Model using FormGroup
 /* signupForm = new FormGroup({
    userName : new FormControl('Arun'),
    password : new FormControl(''),
    confPassword : new FormControl(''),
    address : new FormGroup({
      city : new FormControl(''),
      state : new FormControl(''),
      pin : new FormControl('')
    })

  }); */

  loadApi(){
    this.signupForm.setValue({ //for seting data in fields
      userName : "Amal",
      email : "abc@123.com",
      subscribe : [true],
      password : "abcdef",
      confPassword : "abcdef",
      address :{
        city : "Kochi",
        state : "Kerala",
        pin : 682010
      }
    });
  }

patchApi(){   
  this.signupForm.patchValue({  //for patching data in fields
    userName : "Akshay",
    password :124565,
    confPassword :124565
  })
}

onSubmit(myForm : NgForm){
  this._signup.signUpData(this.signupForm.value)
            .subscribe(res => {
              alert("Submitted!");
              myForm.reset();
            },
              error => this.errorMsg = error.statusText);
}
}
