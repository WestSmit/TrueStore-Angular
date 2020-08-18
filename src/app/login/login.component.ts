import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MustMatch } from "../helpers/mustMuch.validator";
import { LoginService } from "../services/login.service";
import { NotificationService } from '../services/notification.service';

declare var $: any;

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  registerForm: FormGroup;
  loginForm: FormGroup;

  message: string = "";
  errorMessage: string = "";
  inProgress = false;

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        firstName: [
          "",
          [Validators.required, Validators.pattern("[A-Za-z]{2,}")],
        ],
        secondName: [
          "",
          [Validators.required, Validators.pattern("[A-Za-z]{2,}")],
        ],
        userName: [
          "",
          [Validators.required, Validators.pattern("[A-Za-z0-9]{2,}")],
        ],
        email: ["", [Validators.required, Validators.email]],
        phoneNumber: [
          "",
          [Validators.required, Validators.pattern("[0-9]{11}")],
        ],
        password: ["", [Validators.required, Validators.minLength(6)]],
        confirmPassword: ["", Validators.required],
      },
      {
        validator: MustMatch("password", "confirmPassword"),
      }
    );
    this.loginForm = this.formBuilder.group({
      userName: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  get regForm() {
    return this.registerForm.controls;
  }

  async logIn() {
    this.message = "";
    this.errorMessage = "";

    if (this.loginForm.invalid) {
      return;
    }
    this.inProgress = true;
    this.loginService
      .logIn(
        this.loginForm.controls.userName.value,
        this.loginForm.controls.password.value
      )
      .subscribe(
        (res) => {
          var user = res.user;
          localStorage.setItem("CurrentUser", JSON.stringify(user));
          this.inProgress = false;
          this.closeSignInForm();
          this.notificationService.addNotice(
            "Welcome!!! You can go to",
            "/MyAccount/Details",
            "account details"
          );
          if (user.emailConfirmed == false) {
            this.notificationService.addNotice(
              "Your email is mot confirmed. We have sended you letter with link to confirm. Check your inbox..."
            );
          }          
        },
        (error) => {
          this.inProgress = false;
          this.errorMessage = "Loging failed";
        });
  }

  signUp() {
    this.message = "";
    this.errorMessage = "";
    this.inProgress = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.loginService.singUp(this.registerForm.value).subscribe(
      () => {
        this.message = "Welcome!";
        this.inProgress = false;
      },
      (error) => {
        if (error.error && error.error[0] && error.error[0].description) {
          this.errorMessage = error.error[0].description;
        } else {
          this.errorMessage = "Registration failed";
        }
        this.inProgress = false;        
      }
    );
  }

  closeSignInForm() {
    $("#SignInModal").hide();
    this.message = "";
    this.errorMessage = "";
  }

  closeSignUpForm() {
    $("#SignUpModal").hide();
    this.message = "";
    this.errorMessage = "";
  }
}
