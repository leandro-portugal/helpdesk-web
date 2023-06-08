import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { Technical } from 'src/app/models/technical';
import { Ticket } from 'src/app/models/ticket';
import { CustomerService } from 'src/app/services/customer.service';
import { TechnicalService } from 'src/app/services/technical.service';
import { TicketsService } from 'src/app/services/tickets.service';

@Component({
  selector: 'app-ticket-update',
  templateUrl: './ticket-update.component.html',
  styleUrls: ['./ticket-update.component.css']
})
export class TicketUpdateComponent implements OnInit {

  ticket: Ticket = {

    title: '',
    observation: '',
    priority: '',
    status: '',
    customer: '',
    technical: '',
    customerName: '',
    technicalName: '',
    lastUpdate: ''
  }


  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  customers: Customer [] = []
  technicals: Technical [] = []

  priority: FormControl = new FormControl(null, [Validators.required]);
  status: FormControl = new FormControl(null, [Validators.required]);
  title: FormControl = new FormControl(null, [Validators.required]);
  observation: FormControl = new FormControl(null, [Validators.required]);
  technical: FormControl = new FormControl(null, [Validators.required]);
  customer: FormControl = new FormControl(null, [Validators.required]);
  lastUpdate: FormControl = new FormControl(null, [Validators.required]);

  constructor(private formBuilder: FormBuilder, private router: Router,
    private customerService: CustomerService, private technicalService: TechnicalService, 
    private ticketService: TicketsService, private toastr: ToastrService) { }

  ngOnInit(): void {
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
      title: this.title,
      status: this.status,
      priority: this.priority,
      technical: this.technical,
      customer: this.customer,
    });
  }

  private createSecondFormGroup(): FormGroup {
    return this.formBuilder.group({
      observation: this.observation
    });
  }

  validateFields(): boolean {
    return this.priority.valid && this.status.valid && this.title.valid
       && this.observation.valid && this.technical.valid && this.customer.valid
  }

}
