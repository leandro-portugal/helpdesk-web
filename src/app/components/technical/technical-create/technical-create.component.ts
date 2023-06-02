import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Technical } from 'src/app/models/technical';
import { TechnicalService } from 'src/app/services/technical.service';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-technical-create',
  templateUrl: './technical-create.component.html',
  styleUrls: ['./technical-create.component.css']
})
export class TechnicalCreateComponent implements OnInit {

  technical: Technical = {
    id: '',
    name: '',
    email: '',
    password: '',
    document: '',
    creationDate: '',
    profiles: []
  }



  name: FormControl = new FormControl(null, Validators.minLength(3));
  email: FormControl = new FormControl(null, Validators.email);
  password: FormControl = new FormControl(null, Validators.minLength(6));
  document: FormControl = new FormControl(null, Validators.required);

  constructor(private service: TechnicalService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
  }

  create(): void {

    if (this.technical.profiles.length === 0) {
      this.toastr.warning('Escolha pelo menos um perfil', 'Aviso');
      return; 
    }
    
    this.technical.creationDate = moment().format('DD/MM/YYYY');

    this.service.create(this.technical).subscribe(() => {
      this.toastr.success('Técnico cadastrado com sucesso', 'Cadastro');
      this.router.navigate(['/technicals']);
    }, ex => {
      if (ex.error.errors) {
        ex.error.errors.forEach(element => {
          this.toastr.error(element.message);
        });
      } else {
        this.toastr.error(ex.error.message);
      }
    });
  }

  addProfile(profile: any): void {

    
    if(this.technical.profiles.includes(profile)) {
      this.technical.profiles.splice(this.technical.profiles.indexOf(profile), 1);
    } else {
      this.technical.profiles.push(profile);
    }
    
  }

  validateFields(): boolean {
    return this.email.valid && this.password.valid && this.document.valid && this.name.valid;
  }
}
