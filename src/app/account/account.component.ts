import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//Custom
import { User } from '../models/user';
import { LoginService } from '../services/login.service';
import { MustMatch } from '../helpers/mustMuch.validator';
import { AccountService } from '../services/account.service';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
    
  }


}
