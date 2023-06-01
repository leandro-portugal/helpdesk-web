import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-customer-delete',
  templateUrl: './customer-delete.component.html',
  styleUrls: ['./customer-delete.component.css']
})
export class CustomerDeleteComponent implements OnInit {

  customer: Customer = {
    id: '',
    name: '',
    email: '',
    password: '',
    document: '',
    creationDate: '',
    profiles: []
  }

  

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

  delete(): void {
    
    this.customer.creationDate = moment().format('DD/MM/YYYY');

    this.service.delete(this.customer.id).subscribe(() => {
      this.toastr.warning('Cliente removido com sucesso', 'Remoçãp');
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



}
