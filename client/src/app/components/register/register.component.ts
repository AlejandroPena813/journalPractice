import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;//exporting the form

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  createForm(){ //todo service to make forms
    this.form = this.formBuilder.group({
      email: ['', Validators.compose([ //compose allows array of validators
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30), //todo extend this in front/back
        this.validateEmail //custom validation
      ])],
      username: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
        this.validateUsername
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(35),
        this.validatePassword
      ])],
      confirm: ['', Validators.required]

    },
      { validator: this.matchingPasswords('password', 'confirm')
      //above is validator for whole form not just one field
    });
  }

  validateEmail(controls){ //controls is value passed in from form
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    if(regExp.test(controls.value)){
      return null;
    } else {
      return { 'validateEmail': true }
    }
  }

  validateUsername(controls){
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);

    if(regExp.test(controls.value)){
      return null;
    } else{
      return { 'validateUsername': true }
    }
  }

  validatePassword(controls){
    const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);

    if(regExp.test(controls.value)){
      return null;
    } else{
      return { 'validatePassword': true}
    }
  }

  matchingPasswords(password, confirm){
    return (group: FormGroup) => {
      if(group.controls[password].value === group.controls[confirm].value){
        return null; //matching
      } else{
        return { 'matchingPasswords': true }
      }
    }
  }

  onRegisterSubmit(){
    console.log('form submitted!');
  }

  ngOnInit() {
  }

}
