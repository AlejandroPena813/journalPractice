import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;//exporting the form
  messageClass: string;
  message: string;
  processing: boolean = false;
  usernameValid: boolean = false;
  usernameMessage: string;
  emailValid: boolean = false;
  emailMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
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

  disableForm() {
    this.form.controls['username'].disable();
    this.form.controls['email'].disable();
    this.form.controls['password'].disable();
    this.form.controls['confirm'].disable();
  }

  enableForm() {
    this.form.controls['username'].enable();
    this.form.controls['email'].enable();
    this.form.controls['password'].enable();
    this.form.controls['confirm'].enable();
  }

  onRegisterSubmit(){
    this.processing = true;
    this.disableForm();

    const user = {
      email: this.form.get('email').value,
      username: this.form.get('username').value,
      password: this.form.get('password').value
    };

    this.authService.registerUser(user).subscribe( data => {
        console.log(data);
        // todo toaster
        this.messageClass = 'alert alert-success';
        this.message = 'Successfully added user!'; // need standard/interface for http data.message;
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      }, errResp => { // can create interface for errors. Standard for back-end messages.
        this.messageClass = 'alert alert-danger';
        this.message = errResp.error.message;
        this.enableForm();
        this.processing = false;
      }
    );
  }

  // Function to check if e-mail is taken
  checkEmail() {
    this.authService.checkEmail(this.form.get('email').value).subscribe(resp => {
        this.emailValid = true;
        this.emailMessage = resp['message'];
    }, errResp => {
      this.emailValid = false;
      this.emailMessage = errResp.error.message;
    });
  }

  // Function to check if username is available
  checkUsername() {
    this.authService.checkUsername(this.form.get('username').value).subscribe(resp => {
      console.log(resp);
      this.usernameValid = true;
      this.usernameMessage = resp['message']; // proper way to read response message
    }, errResp => {
      this.usernameValid = false;
      this.usernameMessage = errResp.error.message;
    });
  }

  ngOnInit() {
  }

}
