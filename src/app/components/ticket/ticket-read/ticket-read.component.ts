import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Ticket } from 'src/app/models/ticket';
import { TicketsService } from 'src/app/services/tickets.service';

@Component({
  selector: 'app-ticket-read',
  templateUrl: './ticket-read.component.html',
  styleUrls: ['./ticket-read.component.css']
})
export class TicketReadComponent implements OnInit {

  ticket: Ticket = {
    id: '',
    title: '',
    observation: '',
    priority: '',
    status: '',
    customer: '',
    technical: '',
    customerName: '',
    technicalName: '',
    lastUpdate: ''
  };
  

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  title: any;
  status: any;
  priority: any;
  technical: any;
  customer: any;
  observation: any;



  constructor(private ticketService: TicketsService, private toastr: ToastrService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.ticket.id = this.route.snapshot.paramMap.get('id');
    this.findById();
   
  }

  findById(): void{
    this.ticketService.findById(this.ticket.id).subscribe( response =>{
      this.ticket = response;
    }, ex =>{ 
      this.toastr.error(ex.error.message);})
}




}
