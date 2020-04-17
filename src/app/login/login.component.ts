import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//Custom
import { MustMatch } from '../helpers/mustMuch.validator';
import { LoginService } from '../services/login.service';
import { User } from "../models/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  registerForm: FormGroup;
  loginForm : FormGroup;
  

  message: string = "";

  constructor(private loginService: LoginService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        firstName: ['', [Validators.required, Validators.pattern("[A-Za-z]{2,}")]],
        secondName: ['', [Validators.required, Validators.pattern("[A-Za-z]{2,}")]],
        userName: ['', [Validators.required, Validators.pattern("[A-Za-z0-9]{2,}")]],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: ['', [Validators.required, Validators.pattern("[0-9]{11}")]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      }, {
      validator: MustMatch('password', 'confirmPassword')
    }
    );
    this.loginForm = this.formBuilder.group(
      {
        userName: ['',Validators.required],
        password: ['', Validators.required]
      }
    )
  }

  get regForm() { return this.registerForm.controls; }

  async logIn() {
    if (this.loginForm.invalid) { return; }

    var result = await this.loginService.logIn(this.loginForm.controls.userName.value,this.loginForm.controls.password.value);

    if (result) {
      document.getElementById('SignInModal').style.display = 'none';
      this.loginForm.reset();
    }
    else {
      this.message = this.loginService.errors;
    }
  }

  async SignUp() {

    if (this.registerForm.invalid) {
      return;
    }
    var result = this.loginService.SingUp(this.registerForm.value);
    if (result) {
      document.getElementById('SignUpModal').style.display = 'none';
      this.registerForm.reset();
    }
    else {
      this.message = this.loginService.errors;
    }


  }
}
