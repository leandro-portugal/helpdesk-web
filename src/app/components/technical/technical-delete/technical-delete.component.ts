import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Technical } from 'src/app/models/technical';
import { TechnicalService } from 'src/app/services/technical.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-technical-delete',
  templateUrl: './technical-delete.component.html',
  styleUrls: ['./technical-delete.component.css']
})
export class TechnicalDeleteComponent implements OnInit {

  technical: Technical = {
    id: '',
    name: '',
    email: '',
    password: '',
    document: '',
    creationDate: '',
    profiles: []
  }

  

  constructor(private service: TechnicalService, private toastr: ToastrService,
     private router: Router, private activatedRoute : ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.technical.id = this.activatedRoute.snapshot.paramMap.get('id');
    this,this.findById();
  }

  findById(): void{
    this.service.findById(this.technical.id).subscribe(response =>{
      response.profiles = [ ]
      this.technical = response;
    })
  }

  delete(): void {
    
    this.technical.creationDate = moment().format('DD/MM/YYYY');

    this.service.delete(this.technical.id).subscribe(() => {
      this.toastr.warning('Técnico removido com sucesso', 'Remoçãp');
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



}
