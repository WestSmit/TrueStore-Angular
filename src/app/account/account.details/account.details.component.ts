import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
//Custom
import { User } from "../../models/user";
import { LoginService } from "../../services/login.service";
import { MustMatch } from "../../helpers/mustMuch.validator";
import { AccountService } from "../../services/account.service";

@Component({
  selector: "app-accountDetails",
  templateUrl: "./account.details.component.html",
  styleUrls: ["./account.details.component.css"],
})
export class AccountDetailsComponent implements OnInit {
  user: User;
  infoForm: FormGroup;
  emailForm: FormGroup;
  passwordForm: FormGroup;

  infoformMessage: string;
  infoFormResult: boolean;
  infoFormCompleted: boolean;

  emailFormMessage: string;
  emailFormResult: boolean;
  emailFormCompleted: boolean;

  passwordFormMessage: string;
  passwordFormResult: boolean;
  passwordFormCompleted: boolean;

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private accountService: AccountService
  ) {
    this.user = this.loginService.user;
  }

  ngOnInit(): void {
    this.infoForm = this.formBuilder.group({
      firstName: [
        this.user.firstName,
        [Validators.required, Validators.pattern("[A-Za-z]{2,}")],
      ],
      secondName: [
        this.user.secondName,
        [Validators.required, Validators.pattern("[A-Za-z]{2,}")],
      ],
      userName: [
        this.user.userName,
        [Validators.required, Validators.pattern("[A-Za-z0-9]{2,}")],
      ],
      phoneNumber: [
        this.user.phoneNumber,
        [Validators.required, Validators.pattern("[0-9]{11}")],
      ],
    });

    this.emailForm = this.formBuilder.group({
      email: [this.user.email, [Validators.required, Validators.email]],
    });
    this.passwordForm = this.formBuilder.group(
      {
        currentPassword: ["", [Validators.required]],
        newPassword: ["", [Validators.required, Validators.minLength(6)]],
        confirmPassword: ["", [Validators.required, Validators.minLength(6)]],
      },
      {
        validator: MustMatch("newPassword", "confirmPassword"),
      }
    );
  }

  async updateInfo() {
    this.infoFormResult = await this.accountService.updateUserInfo(
      this.infoForm.value
    );
    this.infoformMessage = this.accountService.message;
    this.infoFormCompleted = true;
  }

  async changeEmail() {
    this.emailFormResult = await this.accountService.changeEmail(
      this.user.id,
      this.emailForm.controls.email.value
    );
    this.emailFormMessage = this.accountService.message;
    this.emailFormCompleted = true;
  }

  async changePassword() {
    this.passwordFormResult = await this.accountService.changePassword(
      this.user.id,
      this.passwordForm.controls.currentPassword.value,
      this.passwordForm.controls.newPassword.value
    );
    this.passwordFormMessage = this.accountService.message;
    this.passwordFormCompleted = true;
  }
}
