import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent implements OnInit {

  customer: Customer = {
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

  constructor(private service: CustomerService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
  }

  create(): void {

    if (this.customer.profiles.length === 0) {
      this.toastr.warning('Escolha pelo menos um perfil', 'Aviso');
      return; 
    }
    
    this.customer.creationDate = moment().format('DD/MM/YYYY');

    this.service.create(this.customer).subscribe(() => {
      this.toastr.success('Cliente cadastrado com sucesso', 'Cadastro');
      this.router.navigate(['/customers']);
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

    
    if(this.customer.profiles.includes(profile)) {
      this.customer.profiles.splice(this.customer.profiles.indexOf(profile), 1);
    } else {
      this.customer.profiles.push(profile);
    }
    
  }

  validateFields(): boolean {
    return this.email.valid && this.password.valid && this.document.valid && this.name.valid;
  }
}
