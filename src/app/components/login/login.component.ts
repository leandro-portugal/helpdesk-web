import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Credentials } from 'src/app/models/credentials';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';



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
  constructor(private toastr: ToastrService, private service: AuthService, private router: Router) { }

  ngOnInit(): void {
  }


  login(){
   this.service.authenticate(this.credentials).subscribe(response =>{
   this.service.successfulLogin(response.headers.get('Authorization').substring(7));
   this.router.navigate(['/']);
  
   }, () => {
    this.toastr.error('Credenciais invalidas','Falha no login');
  })
   
  
  }
  validateFields():boolean{
    return this.email.valid && this.password.valid;
  
}
}
