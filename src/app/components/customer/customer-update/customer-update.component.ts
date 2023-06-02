import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.component.html',
  styleUrls: ['./customer-update.component.css']
})
export class CustomerUpdateComponent implements OnInit {

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

  constructor(private service: CustomerService, private toastr: ToastrService,
     private router: Router, private activatedRoute : ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.customer.id = this.activatedRoute.snapshot.paramMap.get('id');
    this,this.findById();
  }

  findById(): void{
    this.service.findById(this.customer.id).subscribe(response =>{
      response.profiles = [ ]
      this.customer = response;
    })
  }

  update(): void {

    if (this.customer.profiles.length === 0) {
      this.toastr.warning('Escolha pelo menos um perfil', 'Aviso');
      return; 
    }
    
    this.customer.creationDate = moment().format('DD/MM/YYYY');

    this.service.update(this.customer).subscribe(() => {
      this.toastr.success('Cliente atualizado com sucesso', 'Atualização');
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
