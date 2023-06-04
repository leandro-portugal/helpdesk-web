// ticket-create.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { Technical } from 'src/app/models/technical';
import { CustomerService } from 'src/app/services/customer.service';
import { TechnicalService } from 'src/app/services/technical.service';
import { TicketsService } from 'src/app/services/tickets.service';

@Component({
  selector: 'app-ticket-create',
  templateUrl: './ticket-create.component.html',
  styleUrls: ['./ticket-create.component.css']
})
export class TicketCreateComponent implements OnInit {
  
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  customers: Customer [] = [];
  technicals: Technical [] = [];


  constructor(private formBuilder: FormBuilder, private router: Router,
    private customerService: CustomerService, private technicalService: TechnicalService, private ticketService: TicketsService) {}

  ngOnInit(): void {
    this.router.navigate(['tickets/create']);
    this.findAllCustomers();
    this.findAllTechnicals();
    this.firstFormGroup = this.createFirstFormGroup();
    this.secondFormGroup = this.createSecondFormGroup();
  }

  findAllCustomers(): void{
    this.customerService.findAll().subscribe(response =>{
      this.customers = response;
    })
  }

  findAllTechnicals(): void{
    this.technicalService.findAll().subscribe(response =>{
      this.technicals = response;
    })
  }



  private createFirstFormGroup(): FormGroup {
    return this.formBuilder.group({
      title: ['', Validators.required],
      status: ['', Validators.required],
      priority: ['', Validators.required],
      technical: ['', Validators.required],
      customer: ['', Validators.required]
    });
  }

  private createSecondFormGroup(): FormGroup {
    return this.formBuilder.group({
      observation: ['', Validators.required]
    });
  }


}
