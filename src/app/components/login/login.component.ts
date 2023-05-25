import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Credentials } from 'src/app/models/credentials';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials: Credentials = {
    email: '',
    password: '' ,
  }

  email = new FormControl(null, Validators.email);
  password = new FormControl(null, Validators.minLength(6));
  constructor() { }

  ngOnInit(): void {
  }

  validateFields():boolean{
    if(this.email.valid && this.password.valid){
      return true;
    }else{
      return false;
    }
  
    }
  
}
